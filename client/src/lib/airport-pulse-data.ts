export type PulseStatus = "flowing" | "congested" | "critical";

export interface AirportConfig {
  code: string;
  name: string;
  nameAr: string;
  city: string;
  cityAr: string;
  region: string;
  regionAr: string;
  tier: 1 | 2 | 3;
  terminals: number;
  capacity: number;
  baseRate: number;
  gates: number;
  lat: number;
  lon: number;
}

export interface AirportState extends AirportConfig {
  currentThroughput: number;
  utilization: number;
  status: PulseStatus;
  history: number[];
  trend: number;
  totalToday: number;
  peakToday: number;
  peakTimeToday: string;
}

export interface NationalStats {
  totalPaxPerMin: number;
  peakToday: number;
  peakTimeToday: string;
  averageToday: number;
  totalPassengersToday: number;
  alerts: AlertItem[];
}

export interface AlertItem {
  code: string;
  name: string;
  status: PulseStatus;
  utilization: number;
}

export const PULSE_AIRPORTS: AirportConfig[] = [
  { code: "RUH", name: "King Khalid International Airport", nameAr: "مطار الملك خالد الدولي", city: "Riyadh", cityAr: "الرياض", region: "Central", regionAr: "الوسطى", tier: 1, terminals: 4, capacity: 3800, baseRate: 2800, gates: 82, lat: 24.96, lon: 46.70 },
  { code: "JED", name: "King Abdulaziz International Airport", nameAr: "مطار الملك عبدالعزيز الدولي", city: "Jeddah", cityAr: "جدة", region: "Western", regionAr: "الغربية", tier: 1, terminals: 3, capacity: 2800, baseRate: 1900, gates: 68, lat: 21.67, lon: 39.16 },
  { code: "DMM", name: "King Fahd International Airport", nameAr: "مطار الملك فهد الدولي", city: "Dammam", cityAr: "الدمام", region: "Eastern", regionAr: "الشرقية", tier: 1, terminals: 2, capacity: 1600, baseRate: 1100, gates: 42, lat: 26.47, lon: 49.80 },
  { code: "MED", name: "Prince Mohammad bin Abdulaziz Airport", nameAr: "مطار الأمير محمد بن عبدالعزيز", city: "Madinah", cityAr: "المدينة المنورة", region: "Western", regionAr: "الغربية", tier: 2, terminals: 2, capacity: 1200, baseRate: 800, gates: 28, lat: 24.55, lon: 39.70 },
  { code: "AHB", name: "Abha International Airport", nameAr: "مطار أبها الدولي", city: "Abha", cityAr: "أبها", region: "Southern", regionAr: "الجنوبية", tier: 2, terminals: 1, capacity: 600, baseRate: 400, gates: 12, lat: 18.24, lon: 42.66 },
  { code: "TIF", name: "Ta'if International Airport", nameAr: "مطار الطائف الدولي", city: "Ta'if", cityAr: "الطائف", region: "Western", regionAr: "الغربية", tier: 2, terminals: 1, capacity: 500, baseRate: 350, gates: 10, lat: 21.48, lon: 40.54 },
  { code: "GIZ", name: "Jazan Airport", nameAr: "مطار جازان", city: "Jazan", cityAr: "جازان", region: "Southern", regionAr: "الجنوبية", tier: 2, terminals: 1, capacity: 450, baseRate: 300, gates: 8, lat: 16.90, lon: 42.59 },
  { code: "TUU", name: "Tabuk Airport", nameAr: "مطار تبوك", city: "Tabuk", cityAr: "تبوك", region: "Northern", regionAr: "الشمالية", tier: 2, terminals: 1, capacity: 400, baseRate: 280, gates: 8, lat: 28.37, lon: 36.63 },
  { code: "ELQ", name: "Prince Nayef bin Abdulaziz Airport", nameAr: "مطار الأمير نايف بن عبدالعزيز", city: "Buraidah", cityAr: "بريدة", region: "Central", regionAr: "الوسطى", tier: 2, terminals: 1, capacity: 350, baseRate: 250, gates: 6, lat: 26.30, lon: 43.77 },
  { code: "ABT", name: "Al-Baha Airport", nameAr: "مطار الباحة", city: "Al-Baha", cityAr: "الباحة", region: "Southern", regionAr: "الجنوبية", tier: 2, terminals: 1, capacity: 200, baseRate: 120, gates: 4, lat: 20.30, lon: 41.63 },
  { code: "HAS", name: "Ha'il Airport", nameAr: "مطار حائل", city: "Ha'il", cityAr: "حائل", region: "Northern", regionAr: "الشمالية", tier: 2, terminals: 1, capacity: 300, baseRate: 200, gates: 6, lat: 27.44, lon: 41.69 },
  { code: "AJF", name: "Al-Jouf Airport", nameAr: "مطار الجوف", city: "Sakaka", cityAr: "سكاكا", region: "Northern", regionAr: "الشمالية", tier: 2, terminals: 1, capacity: 200, baseRate: 120, gates: 4, lat: 29.79, lon: 40.10 },
  { code: "RAE", name: "Arar Airport", nameAr: "مطار عرعر", city: "Arar", cityAr: "عرعر", region: "Northern", regionAr: "الشمالية", tier: 2, terminals: 1, capacity: 180, baseRate: 100, gates: 3, lat: 30.91, lon: 41.14 },
  { code: "TUI", name: "Turaif Airport", nameAr: "مطار طريف", city: "Turaif", cityAr: "طريف", region: "Northern", regionAr: "الشمالية", tier: 2, terminals: 1, capacity: 120, baseRate: 60, gates: 2, lat: 31.69, lon: 38.73 },
  { code: "YNB", name: "Yanbu Airport", nameAr: "مطار ينبع", city: "Yanbu", cityAr: "ينبع", region: "Western", regionAr: "الغربية", tier: 2, terminals: 1, capacity: 300, baseRate: 180, gates: 6, lat: 24.14, lon: 38.06 },
  { code: "HOF", name: "Al-Ahsa Airport", nameAr: "مطار الأحساء", city: "Al-Ahsa", cityAr: "الأحساء", region: "Eastern", regionAr: "الشرقية", tier: 3, terminals: 1, capacity: 200, baseRate: 110, gates: 4, lat: 25.29, lon: 49.49 },
  { code: "DWD", name: "Dawadmi Airport", nameAr: "مطار الدوادمي", city: "Dawadmi", cityAr: "الدوادمي", region: "Central", regionAr: "الوسطى", tier: 3, terminals: 1, capacity: 80, baseRate: 30, gates: 2, lat: 24.45, lon: 44.12 },
  { code: "WAE", name: "Wadi Al-Dawasir Airport", nameAr: "مطار وادي الدواسر", city: "Wadi Al-Dawasir", cityAr: "وادي الدواسر", region: "Central", regionAr: "الوسطى", tier: 3, terminals: 1, capacity: 80, baseRate: 30, gates: 2, lat: 20.50, lon: 45.00 },
  { code: "SHW", name: "Sharurah Airport", nameAr: "مطار شرورة", city: "Sharurah", cityAr: "شرورة", region: "Southern", regionAr: "الجنوبية", tier: 3, terminals: 1, capacity: 100, baseRate: 50, gates: 2, lat: 17.47, lon: 47.12 },
  { code: "BHH", name: "Bisha Airport", nameAr: "مطار بيشة", city: "Bisha", cityAr: "بيشة", region: "Southern", regionAr: "الجنوبية", tier: 3, terminals: 1, capacity: 100, baseRate: 50, gates: 2, lat: 19.98, lon: 42.62 },
  { code: "URY", name: "Gurayat Airport", nameAr: "مطار القريات", city: "Gurayat", cityAr: "القريات", region: "Northern", regionAr: "الشمالية", tier: 3, terminals: 1, capacity: 100, baseRate: 45, gates: 2, lat: 31.41, lon: 37.28 },
  { code: "EAM", name: "Najran Airport", nameAr: "مطار نجران", city: "Najran", cityAr: "نجران", region: "Southern", regionAr: "الجنوبية", tier: 3, terminals: 1, capacity: 200, baseRate: 110, gates: 4, lat: 17.61, lon: 44.42 },
  { code: "SLF", name: "Sulayel Airport", nameAr: "مطار السليل", city: "Sulayel", cityAr: "السليل", region: "Central", regionAr: "الوسطى", tier: 3, terminals: 1, capacity: 60, baseRate: 20, gates: 1, lat: 20.46, lon: 45.62 },
  { code: "RAH", name: "Rafha Airport", nameAr: "مطار رفحاء", city: "Rafha", cityAr: "رفحاء", region: "Northern", regionAr: "الشمالية", tier: 3, terminals: 1, capacity: 100, baseRate: 40, gates: 2, lat: 29.63, lon: 43.49 },
  { code: "QJB", name: "Qaisumah Airport", nameAr: "مطار القيصومة", city: "Hafar Al-Batin", cityAr: "حفر الباطن", region: "Eastern", regionAr: "الشرقية", tier: 3, terminals: 1, capacity: 80, baseRate: 35, gates: 2, lat: 28.33, lon: 46.13 },
  { code: "AKH", name: "Al-Kharj Airport", nameAr: "مطار الخرج", city: "Al-Kharj", cityAr: "الخرج", region: "Central", regionAr: "الوسطى", tier: 3, terminals: 1, capacity: 60, baseRate: 20, gates: 1, lat: 24.06, lon: 47.58 },
  { code: "NUM", name: "NEOM Bay Airport", nameAr: "مطار خليج نيوم", city: "NEOM", cityAr: "نيوم", region: "Northern", regionAr: "الشمالية", tier: 3, terminals: 1, capacity: 150, baseRate: 80, gates: 4, lat: 27.93, lon: 35.29 },
  { code: "AUL", name: "AlUla Airport", nameAr: "مطار العلا", city: "AlUla", cityAr: "العلا", region: "Western", regionAr: "الغربية", tier: 3, terminals: 1, capacity: 120, baseRate: 65, gates: 3, lat: 26.48, lon: 38.13 },
  { code: "RSI", name: "Red Sea International Airport", nameAr: "مطار البحر الأحمر الدولي", city: "Red Sea", cityAr: "البحر الأحمر", region: "Western", regionAr: "الغربية", tier: 3, terminals: 1, capacity: 180, baseRate: 90, gates: 4, lat: 22.50, lon: 38.74 },
];

const HISTORY_LENGTH = 200;

function getStatus(utilization: number): PulseStatus {
  if (utilization > 90) return "critical";
  if (utilization > 75) return "congested";
  return "flowing";
}

function generateEkgBeat(intensity: number): number[] {
  const normalized = Math.max(0.1, Math.min(1.0, intensity));
  const peakHeight = 0.3 + normalized * 0.6;
  const points: number[] = [];

  points.push(0.5);
  points.push(0.5 - 0.05 * normalized);
  points.push(0.5 + peakHeight * 0.3);
  points.push(0.5 + peakHeight);
  points.push(0.5 - peakHeight * 0.4);
  points.push(0.5 + peakHeight * 0.15);
  points.push(0.5 + 0.02 * normalized);
  points.push(0.5);

  return points;
}

class AirportSimulator {
  private states: Map<string, AirportState> = new Map();
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private listeners: Set<(states: AirportState[], national: NationalStats) => void> = new Set();
  private beatCounters: Map<string, number> = new Map();
  private scenarioTimer = 0;
  private activeScenarios: Map<string, { endTime: number; multiplier: number }> = new Map();
  private nationalPeakToday = 0;
  private nationalPeakTime = "00:00";
  private nationalSamples: number[] = [];

  constructor() {
    PULSE_AIRPORTS.forEach((config) => {
      const state: AirportState = {
        ...config,
        currentThroughput: config.baseRate,
        utilization: Math.round((config.baseRate / config.capacity) * 100),
        status: getStatus(Math.round((config.baseRate / config.capacity) * 100)),
        history: [],
        trend: 0,
        totalToday: Math.round(config.baseRate * 60 * (8 + Math.random() * 4)),
        peakToday: Math.round(config.baseRate * (1.2 + Math.random() * 0.3)),
        peakTimeToday: `${String(7 + Math.floor(Math.random() * 5)).padStart(2, "0")}:${String(Math.floor(Math.random() * 60)).padStart(2, "0")}`,
      };

      for (let i = 0; i < HISTORY_LENGTH; i++) {
        state.history.push(0.5);
      }

      this.states.set(config.code, state);
      this.beatCounters.set(config.code, Math.floor(Math.random() * 8));
    });
  }

  start() {
    if (this.intervalId) return;

    this.intervalId = setInterval(() => {
      this.states.forEach((state) => {
        this.advanceWaveform(state);
      });
      this.notify();
    }, 100);

    (this as any)._dataTick = setInterval(() => this.updateThroughput(), 2000);

    this.scenarioTimer = window.setInterval(() => this.triggerScenario(), 5000 + Math.random() * 3000) as unknown as number;
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.scenarioTimer) {
      clearInterval(this.scenarioTimer);
      this.scenarioTimer = 0;
    }
    if ((this as any)._dataTick) {
      clearInterval((this as any)._dataTick);
      (this as any)._dataTick = null;
    }
  }

  subscribe(fn: (states: AirportState[], national: NationalStats) => void) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  private notify() {
    const statesArray = Array.from(this.states.values());
    const national = this.computeNational(statesArray);
    this.listeners.forEach((fn) => fn(statesArray, national));
  }

  private updateThroughput() {
    const now = Date.now();

    this.states.forEach((state) => {
      let scenarioMult = 1;
      const scenario = this.activeScenarios.get(state.code);
      if (scenario) {
        if (now > scenario.endTime) {
          this.activeScenarios.delete(state.code);
        } else {
          scenarioMult = scenario.multiplier;
        }
      }

      const variance = state.baseRate * 0.15;
      const noise = (Math.random() - 0.5) * 2 * variance;
      const drift = Math.sin(now / 30000 + state.code.charCodeAt(0)) * state.baseRate * 0.08;

      const prevThroughput = state.currentThroughput;
      const rawThroughput = state.baseRate * scenarioMult + noise + drift;
      state.currentThroughput = Math.round(
        prevThroughput * 0.7 + rawThroughput * 0.3
      );
      state.currentThroughput = Math.max(
        Math.round(state.baseRate * 0.3),
        state.currentThroughput
      );

      state.utilization = Math.round(
        (state.currentThroughput / state.capacity) * 100
      );
      state.utilization = Math.min(100, Math.max(0, state.utilization));
      state.status = getStatus(state.utilization);

      state.totalToday += Math.round(state.currentThroughput * (2 / 60));
      if (state.currentThroughput > state.peakToday) {
        state.peakToday = state.currentThroughput;
        const d = new Date();
        state.peakTimeToday = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
      }

      const recentHistory = state.history.slice(-20);
      const olderHistory = state.history.slice(-40, -20);
      const recentAvg = recentHistory.reduce((a, b) => a + b, 0) / recentHistory.length;
      const olderAvg = olderHistory.length > 0 ? olderHistory.reduce((a, b) => a + b, 0) / olderHistory.length : recentAvg;
      state.trend = recentAvg - olderAvg;
    });
  }

  private advanceWaveform(state: AirportState) {
    const counter = (this.beatCounters.get(state.code) || 0) + 1;
    this.beatCounters.set(state.code, counter);

    const intensity = state.currentThroughput / state.capacity;
    const beatInterval = Math.max(3, Math.round(12 - intensity * 8));

    let newPoint: number;
    if (counter % beatInterval < 8) {
      const beatPhase = counter % beatInterval;
      const beatPoints = generateEkgBeat(intensity);
      const idx = Math.min(beatPhase, beatPoints.length - 1);
      newPoint = beatPoints[idx];
    } else {
      newPoint = 0.5 + (Math.random() - 0.5) * 0.03;
    }

    state.history.push(newPoint);
    if (state.history.length > HISTORY_LENGTH) {
      state.history.shift();
    }
  }

  private triggerScenario() {
    if (Math.random() > 0.15) return;

    const majorCodes = ["RUH", "JED", "DMM", "MED", "AHB"];
    const targetCode = majorCodes[Math.floor(Math.random() * majorCodes.length)];

    if (this.activeScenarios.has(targetCode)) return;

    const multiplier = 1.4 + Math.random() * 0.2;
    const duration = (120 + Math.random() * 60) * 1000;

    this.activeScenarios.set(targetCode, {
      endTime: Date.now() + duration,
      multiplier,
    });
  }

  private computeNational(states: AirportState[]): NationalStats {
    const totalPaxPerMin = states.reduce((sum, s) => sum + s.currentThroughput, 0);

    this.nationalSamples.push(totalPaxPerMin);
    if (this.nationalSamples.length > 500) this.nationalSamples.shift();

    if (totalPaxPerMin > this.nationalPeakToday) {
      this.nationalPeakToday = totalPaxPerMin;
      const d = new Date();
      this.nationalPeakTime = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
    }

    const averageToday = this.nationalSamples.length > 0
      ? Math.round(this.nationalSamples.reduce((a, b) => a + b, 0) / this.nationalSamples.length)
      : totalPaxPerMin;

    const totalPassengersToday = states.reduce((sum, s) => sum + s.totalToday, 0);

    const alerts: AlertItem[] = states
      .filter((s) => s.status !== "flowing")
      .map((s) => ({
        code: s.code,
        name: s.name,
        status: s.status,
        utilization: s.utilization,
      }))
      .sort((a, b) => b.utilization - a.utilization);

    return {
      totalPaxPerMin,
      peakToday: this.nationalPeakToday,
      peakTimeToday: this.nationalPeakTime,
      averageToday,
      totalPassengersToday,
      alerts,
    };
  }

  getSnapshot(): { states: AirportState[]; national: NationalStats } {
    const statesArray = Array.from(this.states.values());
    return { states: statesArray, national: this.computeNational(statesArray) };
  }
}

let simulatorInstance: AirportSimulator | null = null;

export function getSimulator(): AirportSimulator {
  if (!simulatorInstance) {
    simulatorInstance = new AirportSimulator();
  }
  return simulatorInstance;
}

import { useState, useEffect, useRef } from "react";

export function useAirportPulse() {
  const simRef = useRef<AirportSimulator>(getSimulator());
  const [airports, setAirports] = useState<AirportState[]>([]);
  const [national, setNational] = useState<NationalStats>({
    totalPaxPerMin: 0,
    peakToday: 0,
    peakTimeToday: "00:00",
    averageToday: 0,
    totalPassengersToday: 0,
    alerts: [],
  });

  useEffect(() => {
    const sim = simRef.current;
    sim.start();

    const snap = sim.getSnapshot();
    setAirports(snap.states);
    setNational(snap.national);

    const unsub = sim.subscribe((states, nat) => {
      setAirports([...states]);
      setNational({ ...nat });
    });

    return () => {
      unsub();
      sim.stop();
    };
  }, []);

  return { airports, national };
}
