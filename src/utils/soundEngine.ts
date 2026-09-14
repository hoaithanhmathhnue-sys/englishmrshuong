/**
 * Web Audio API Soundboard Generator
 * Synthesizes classroom sound effects with AudioContext & supports real audio files (votay.mp3)
 */
import votayAudioUrl from '../assets/votay.mp3';

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/** 1. Attention Chime: Gentle double crystal bell chime to focus attention */
export function playAttentionChime(): void {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  // First chime: A5 (880 Hz)
  const osc1 = ctx.createOscillator();
  const gain1 = ctx.createGain();
  osc1.type = 'sine';
  osc1.frequency.setValueAtTime(880, now);
  gain1.gain.setValueAtTime(0, now);
  gain1.gain.linearRampToValueAtTime(0.3, now + 0.02);
  gain1.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
  osc1.connect(gain1);
  gain1.connect(ctx.destination);
  osc1.start(now);
  osc1.stop(now + 1.2);

  // Second chime: E6 (1318 Hz) ringing on +0.18s
  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();
  osc2.type = 'sine';
  osc2.frequency.setValueAtTime(1318.5, now + 0.18);
  gain2.gain.setValueAtTime(0, now);
  gain2.gain.setValueAtTime(0, now + 0.18);
  gain2.gain.linearRampToValueAtTime(0.35, now + 0.2);
  gain2.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);
  osc2.connect(gain2);
  gain2.connect(ctx.destination);
  osc2.start(now + 0.18);
  osc2.stop(now + 1.8);
}

/** 2. Magic Wand: Sparkling fast ascending arpeggio with high shimmer */
export function playMagicWand(): void {
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98, 2093.0]; // C5, E5, G5, C6, E6, G6, C7
  const stepTime = 0.06;

  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const noteStart = now + idx * stepTime;

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, noteStart);
    // Subtle vibrato shimmer
    osc.frequency.exponentialRampToValueAtTime(freq * 1.02, noteStart + 0.15);

    gain.gain.setValueAtTime(0, noteStart);
    gain.gain.linearRampToValueAtTime(0.2, noteStart + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.4);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(noteStart);
    osc.stop(noteStart + 0.45);
  });
}

let cachedClapAudio: HTMLAudioElement | null = null;

/** 3. Applause: Phát file âm thanh vỗ tay thực tế (votay.mp3) */
export function playApplause(): void {
  try {
    // Sử dụng file âm thanh votay.mp3 được import bởi Vite hoặc đường dẫn tĩnh /amthanh/votay.mp3
    const audioSrc = votayAudioUrl || '/amthanh/votay.mp3';
    
    // Tạo audio object mới hoặc reset lại để cho phép phát liên tiếp khi gv bấm nhiều lần
    const audio = new Audio(audioSrc);
    audio.volume = 0.9;
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn('Không thể phát file votay.mp3 trực tiếp, chuyển sang âm thanh dự phòng:', err);
        playSynthesizedApplause();
      });
    }
  } catch (err) {
    console.warn('Lỗi khi phát audio file, dùng fallback:', err);
    playSynthesizedApplause();
  }
}

/** Fallback: Âm thanh vỗ tay tổng hợp bằng Web Audio API khi không load được file */
export function playSynthesizedApplause(): void {
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  const totalClaps = 16;
  const bufferSize = Math.floor(ctx.sampleRate * 0.08);

  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let j = 0; j < bufferSize; j++) {
    data[j] = (Math.random() * 2 - 1) * Math.exp(-j / (ctx.sampleRate * 0.015));
  }

  for (let i = 0; i < totalClaps; i++) {
    const clapTime = now + (i * 0.06) + (Math.random() * 0.03);

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(900 + Math.random() * 800, clapTime);
    filter.Q.setValueAtTime(1.8, clapTime);

    const gain = ctx.createGain();
    const volume = 0.2 + Math.random() * 0.1;
    gain.gain.setValueAtTime(volume, clapTime);
    gain.gain.exponentialRampToValueAtTime(0.001, clapTime + 0.08);

    noiseSource.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noiseSource.start(clapTime);
    noiseSource.stop(clapTime + 0.09);
  }
}

/** 4. Victory Fanfare: Triumphant 4-note brass melody */
export function playVictoryFanfare(): void {
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  // C5, E5, G5, High C6 held
  const melody = [
    { freq: 523.25, duration: 0.14, start: 0 },
    { freq: 659.25, duration: 0.14, start: 0.15 },
    { freq: 783.99, duration: 0.16, start: 0.3 },
    { freq: 1046.5, duration: 0.8, start: 0.48 }
  ];

  melody.forEach(note => {
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sawtooth';
    osc2.type = 'triangle';
    osc1.frequency.setValueAtTime(note.freq, now + note.start);
    osc2.frequency.setValueAtTime(note.freq * 1.004, now + note.start); // slight detune for warmth

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2200, now + note.start);

    gain.gain.setValueAtTime(0, now + note.start);
    gain.gain.linearRampToValueAtTime(0.24, now + note.start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + note.start + note.duration);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now + note.start);
    osc2.start(now + note.start);
    osc1.stop(now + note.start + note.duration);
    osc2.stop(now + note.start + note.duration);
  });
}

/** 5. School Bell: Dual-frequency resonant bell ring with rapid amplitude flutter */
export function playSchoolBell(): void {
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  const duration = 2.0;

  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const ampLFO = ctx.createOscillator();
  const lfoGain = ctx.createGain();
  const mainGain = ctx.createGain();

  osc1.type = 'sine';
  osc1.frequency.setValueAtTime(680, now);

  osc2.type = 'sine';
  osc2.frequency.setValueAtTime(740, now);

  // LFO for bell striker vibration (12Hz)
  ampLFO.type = 'sine';
  ampLFO.frequency.setValueAtTime(14, now);
  lfoGain.gain.setValueAtTime(0.4, now);

  mainGain.gain.setValueAtTime(0, now);
  mainGain.gain.linearRampToValueAtTime(0.3, now + 0.05);
  mainGain.gain.setValueAtTime(0.25, now + 1.2);
  mainGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  ampLFO.connect(lfoGain);
  lfoGain.connect(mainGain.gain);

  osc1.connect(mainGain);
  osc2.connect(mainGain);
  mainGain.connect(ctx.destination);

  osc1.start(now);
  osc2.start(now);
  ampLFO.start(now);

  osc1.stop(now + duration);
  osc2.stop(now + duration);
  ampLFO.stop(now + duration);
}

/** 6. Rainstick Soothing: Soft calming ocean-rain wash to quiet down students */
export function playRainstick(): void {
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  const duration = 2.4;
  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  // Pink noise approximation
  let b0 = 0, b1 = 0, b2 = 0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.96900 * b2 + white * 0.1538520;
    data[i] = (b0 + b1 + b2 + white * 0.05) * 0.3;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(600, now);
  filter.frequency.linearRampToValueAtTime(1400, now + 1.0);
  filter.frequency.linearRampToValueAtTime(500, now + duration);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.22, now + 0.6);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  noise.start(now);
  noise.stop(now + duration);
}

/** 7. Gentle Buzzer: Soft, friendly wooden marimba knock (non-punitive) */
export function playGentleBuzzer(): void {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  const notes = [280, 240];
  notes.forEach((freq, idx) => {
    const noteStart = now + idx * 0.12;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, noteStart);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.85, noteStart + 0.1);

    gain.gain.setValueAtTime(0, noteStart);
    gain.gain.linearRampToValueAtTime(0.22, noteStart + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(noteStart);
    osc.stop(noteStart + 0.18);
  });
}

/** 8. N-Second Countdown: metronome wood clicks with a celebratory finishing bell */
let activeCountdownTimer: number | null = null;

export function playCountdownTick(
  onTick?: (count: number) => void,
  onComplete?: () => void,
  seconds: number = 5
): () => void {
  if (activeCountdownTimer) {
    clearInterval(activeCountdownTimer);
    activeCountdownTimer = null;
  }

  let count = Math.max(1, Math.min(60, Math.round(seconds)));
  const ctx = getAudioContext();

  const playSingleTick = (isFinal: boolean) => {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    if (!isFinal) {
      // Crisp woodblock click
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.06);
    } else {
      // Final celebration chime
      playAttentionChime();
    }
  };

  onTick?.(count);
  playSingleTick(false);

  activeCountdownTimer = window.setInterval(() => {
    count -= 1;
    if (count > 0) {
      onTick?.(count);
      playSingleTick(false);
    } else {
      onTick?.(0);
      playSingleTick(true);
      if (activeCountdownTimer) {
        clearInterval(activeCountdownTimer);
        activeCountdownTimer = null;
      }
      onComplete?.();
    }
  }, 1000);

  // Return cancel function
  return () => {
    if (activeCountdownTimer) {
      clearInterval(activeCountdownTimer);
      activeCountdownTimer = null;
    }
  };
}
