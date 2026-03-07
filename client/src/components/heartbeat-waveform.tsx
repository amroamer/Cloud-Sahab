import { useRef, useEffect } from "react";
import type { PulseStatus } from "@/lib/airport-pulse-data";

interface HeartbeatWaveformProps {
  dataHistory: number[];
  status: PulseStatus;
  width: number;
  height: number;
}

const STATUS_COLORS: Record<PulseStatus, { main: string; glow: string }> = {
  flowing: { main: "#34D399", glow: "#10B981" },
  congested: { main: "#FBBF24", glow: "#F59E0B" },
  critical: { main: "#F87171", glow: "#EF4444" },
};

export function HeartbeatWaveform({ dataHistory, status, width, height }: HeartbeatWaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const offsetRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    let running = true;

    function draw() {
      if (!running || !ctx) return;

      ctx.clearRect(0, 0, width, height);

      ctx.strokeStyle = "#1F2937";
      ctx.lineWidth = 0.5;
      for (let i = 1; i <= 3; i++) {
        const y = height * (i / 4);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const colors = STATUS_COLORS[status];
      const data = dataHistory;
      const len = data.length;
      if (len < 2) {
        animFrameRef.current = requestAnimationFrame(draw);
        return;
      }

      const stepX = width / (len - 1);

      const buildPath = () => {
        ctx.beginPath();
        for (let i = 0; i < len; i++) {
          const x = i * stepX;
          const y = height - data[i] * height;
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            const prevX = (i - 1) * stepX;
            const prevY = height - data[i - 1] * height;
            const cpX = (prevX + x) / 2;
            ctx.bezierCurveTo(cpX, prevY, cpX, y, x, y);
          }
        }
      };

      ctx.save();
      ctx.shadowBlur = 12;
      ctx.shadowColor = colors.glow;
      ctx.strokeStyle = colors.glow + "4D";
      ctx.lineWidth = 8;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      buildPath();
      ctx.stroke();
      ctx.restore();

      ctx.strokeStyle = colors.main;
      ctx.lineWidth = 2.5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.shadowBlur = 4;
      ctx.shadowColor = colors.glow;
      buildPath();
      ctx.stroke();
      ctx.shadowBlur = 0;

      const lastX = (len - 1) * stepX;
      const lastY = height - data[len - 1] * height;
      ctx.beginPath();
      ctx.arc(lastX, lastY, 3, 0, Math.PI * 2);
      ctx.fillStyle = colors.main;
      ctx.shadowBlur = 8;
      ctx.shadowColor = colors.glow;
      ctx.fill();
      ctx.shadowBlur = 0;

      animFrameRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      running = false;
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [dataHistory, status, width, height]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: `${width}px`, height: `${height}px` }}
      data-testid="heartbeat-waveform"
    />
  );
}
