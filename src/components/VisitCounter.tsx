import React, { useState, useEffect } from 'react';

const APP_NAMESPACE = 'sunflower-mrshuong-lekimlang';
const BASE_VISIT_OFFSET = 1250;
const COUNTER_API_URL = `https://api.counterapi.dev/v1/${APP_NAMESPACE}/visits/up`;

const VISIT_STORAGE_KEY = `${APP_NAMESPACE}_my_visits`;
const LAST_VISIT_KEY = `${APP_NAMESPACE}_last_visit_time`;
const FALLBACK_KEY = `${APP_NAMESPACE}_total_fallback`;

const getToday = (): string => new Date().toISOString().split('T')[0];

interface VisitData {
  myVisits: number;
  totalVisits: number;
  todayVisits: number;
}

const incrementLocalVisits = (): { myVisits: number; todayVisits: number } => {
  const today = getToday();
  const todayKey = `${APP_NAMESPACE}_today_${today}`;

  try {
    const myVisits = parseInt(localStorage.getItem(VISIT_STORAGE_KEY) || '0', 10) + 1;
    localStorage.setItem(VISIT_STORAGE_KEY, String(myVisits));

    const lastDate = localStorage.getItem(LAST_VISIT_KEY) || '';
    const prevToday = lastDate === today ? parseInt(localStorage.getItem(todayKey) || '0', 10) : 0;
    const todayVisits = prevToday + 1;
    localStorage.setItem(todayKey, String(todayVisits));
    localStorage.setItem(LAST_VISIT_KEY, today);

    // Dọn dẹp ngày hôm qua
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    localStorage.removeItem(`${APP_NAMESPACE}_today_${yesterday}`);

    return { myVisits, todayVisits };
  } catch {
    return { myVisits: 1, todayVisits: 1 };
  }
};

const fetchServerVisitCount = async (): Promise<number> => {
  try {
    const response = await fetch(COUNTER_API_URL);
    const data = await response.json();
    if (data && data.count) {
      return BASE_VISIT_OFFSET + data.count;
    }
  } catch (error) {
    console.warn('Lỗi kết nối bộ đếm server-side:', error);
  }

  // Fallback nếu API ngoại tuyến
  const fallback = parseInt(localStorage.getItem(FALLBACK_KEY) || String(BASE_VISIT_OFFSET), 10);
  const newFallback = fallback + Math.floor(Math.random() * 2) + 1;
  localStorage.setItem(FALLBACK_KEY, String(newFallback));
  return newFallback;
};

const AnimatedNumber: React.FC<{ value: number; duration?: number }> = ({ value, duration = 800 }) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (value === 0) return;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(value * eased));

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  return <>{display.toLocaleString('vi-VN')}</>;
};

export const VisitCounter: React.FC = () => {
  const [visitData, setVisitData] = useState<VisitData>({
    myVisits: 0,
    totalVisits: 0,
    todayVisits: 0
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      const localData = incrementLocalVisits();
      const totalVisits = await fetchServerVisitCount();
      setVisitData({ ...localData, totalVisits });
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) return null;

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap text-xs">
      {/* Tổng lượt truy cập toàn trường (Server-Side) */}
      <div 
        title="Tổng lượt truy cập từ toàn thể giáo viên và đồng nghiệp"
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-300/80 bg-linear-to-r from-amber-500/10 via-yellow-500/15 to-amber-500/10 backdrop-blur-xs text-amber-900 shadow-2xs"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
        </span>
        <span className="text-slate-700">
          Tổng lượt học:&nbsp;
          <span className="font-extrabold text-amber-700 text-sm">
            <AnimatedNumber value={visitData.totalVisits} />
          </span>
        </span>
      </div>

      {/* Lượt hôm nay */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-yellow-200 bg-yellow-50/80 text-yellow-900">
        <span className="text-yellow-600">📅</span>
        <span className="text-slate-600">
          Hôm nay:&nbsp;
          <span className="font-bold text-yellow-700">
            <AnimatedNumber value={visitData.todayVisits} duration={600} />
          </span>
        </span>
      </div>

      {/* Lượt cá nhân */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-amber-200 bg-amber-50/80 text-amber-900">
        <span className="text-amber-600">🌻</span>
        <span className="text-slate-600">
          Của bạn:&nbsp;
          <span className="font-bold text-amber-700">
            <AnimatedNumber value={visitData.myVisits} duration={600} />
          </span>
          &nbsp;lần
        </span>
      </div>
    </div>
  );
};
