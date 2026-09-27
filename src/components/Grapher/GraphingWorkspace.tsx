import React, { useState, useRef, useEffect } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, LineChart, Sparkles } from 'lucide-react';

export const GraphingWorkspace: React.FC = () => {
  const [equation, setEquation] = useState('2*x + 1');
  const [zoom, setZoom] = useState(30); // pixels per unit
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [hoverCoords, setHoverCoords] = useState<{ x: number; y: number } | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Safe function evaluator for standard expressions
  const evaluateY = (expr: string, x: number): number | null => {
    try {
      // Normalize simple algebra notation: e.g. 2x -> 2*x, x^2 -> Math.pow(x,2), etc.
      let sanitized = expr
        .replace(/(\d)x/g, '$1*x')
        .replace(/x\^2/g, 'Math.pow(x,2)')
        .replace(/x\^3/g, 'Math.pow(x,3)')
        .replace(/sin\(x\)/g, 'Math.sin(x)')
        .replace(/cos\(x\)/g, 'Math.cos(x)');

      // Using safe Function with bounded context
      const fn = new Function('x', 'Math', `return ${sanitized};`);
      const val = fn(x, Math);
      return typeof val === 'number' && !isNaN(val) && isFinite(val) ? val : null;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI
    const width = canvas.width;
    const height = canvas.height;
    const originX = width / 2 + offset.x;
    const originY = height / 2 + offset.y;

    ctx.clearRect(0, 0, width, height);

    // Grid lines
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;

    // Vertical grid
    const leftBound = Math.floor(-originX / zoom);
    const rightBound = Math.ceil((width - originX) / zoom);
    for (let gx = leftBound; gx <= rightBound; gx++) {
      const cx = originX + gx * zoom;
      ctx.beginPath();
      ctx.moveTo(cx, 0);
      ctx.lineTo(cx, height);
      ctx.stroke();
    }

    // Horizontal grid
    const topBound = Math.ceil(originY / zoom);
    const botBound = Math.floor((originY - height) / zoom);
    for (let gy = botBound; gy <= topBound; gy++) {
      const cy = originY - gy * zoom;
      ctx.beginPath();
      ctx.moveTo(0, cy);
      ctx.lineTo(width, cy);
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2;

    // X Axis
    ctx.beginPath();
    ctx.moveTo(0, originY);
    ctx.lineTo(width, originY);
    ctx.stroke();

    // Y Axis
    ctx.beginPath();
    ctx.moveTo(originX, 0);
    ctx.lineTo(originX, height);
    ctx.stroke();

    // Numbers on axes
    ctx.fillStyle = '#64748b';
    ctx.font = '10px monospace';
    for (let gx = leftBound; gx <= rightBound; gx++) {
      if (gx !== 0 && gx % 2 === 0) {
        ctx.fillText(String(gx), originX + gx * zoom - 6, originY + 14);
      }
    }
    for (let gy = botBound; gy <= topBound; gy++) {
      if (gy !== 0 && gy % 2 === 0) {
        ctx.fillText(String(gy), originX + 6, originY - gy * zoom + 3);
      }
    }

    // Plot Equation Curve
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 3;
    ctx.beginPath();

    let started = false;
    for (let px = 0; px <= width; px += 2) {
      const mathX = (px - originX) / zoom;
      const mathY = evaluateY(equation, mathX);

      if (mathY !== null) {
        const py = originY - mathY * zoom;
        if (!started) {
          ctx.moveTo(px, py);
          started = true;
        } else {
          ctx.lineTo(px, py);
        }
      } else {
        started = false;
      }
    }
    ctx.stroke();

    // Key Intercept Markers for y = mx + b
    const yIntercept = evaluateY(equation, 0);
    if (yIntercept !== null) {
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(originX, originY - yIntercept * zoom, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillText(`(0, ${yIntercept})`, originX + 8, originY - yIntercept * zoom - 6);
    }
  }, [equation, zoom, offset]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    const originX = canvas.width / 2 + offset.x;
    const originY = canvas.height / 2 + offset.y;

    const x = Number(((px - originX) / zoom).toFixed(2));
    const y = Number(((originY - py) / zoom).toFixed(2));
    setHoverCoords({ x, y });
  };

  const PRESETS = [
    { label: 'y = 2x + 1 (Slope 2)', eq: '2*x + 1' },
    { label: 'y = -x + 4 (Slope -1)', eq: '-1*x + 4' },
    { label: 'y = 0.5x - 3', eq: '0.5*x - 3' },
    { label: 'y = x² - 4 (Parabola)', eq: 'x^2 - 4' },
  ];

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-blue-800 dark:text-blue-300 text-xs font-bold mb-1">
            <LineChart className="w-3.5 h-3.5" />
            <span>Interactive Coordinate Plane</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Linear & Algebraic Graphing Workspace
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Plot linear equations, visualize slope m, see y-intercepts, and inspect coordinates.
          </p>
        </div>

        {/* Zoom & Reset Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoom(z => Math.min(60, z + 5))}
            className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4 text-slate-700 dark:text-slate-300" />
          </button>
          <button
            onClick={() => setZoom(z => Math.max(15, z - 5))}
            className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4 text-slate-700 dark:text-slate-300" />
          </button>
          <button
            onClick={() => {
              setZoom(30);
              setOffset({ x: 0, y: 0 });
            }}
            className="px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset View
          </button>
        </div>
      </div>

      {/* Input Bar & Presets */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-3">
        <div className="flex items-center gap-3">
          <span className="font-mono font-bold text-sm text-slate-700 dark:text-slate-300">
            f(x) = y =
          </span>
          <input
            type="text"
            value={equation}
            onChange={e => setEquation(e.target.value)}
            placeholder="e.g. 2*x + 1 or x^2 - 4"
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[11px] font-bold text-slate-400">Presets:</span>
          {PRESETS.map((p, i) => (
            <button
              key={i}
              onClick={() => setEquation(p.eq)}
              className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 transition cursor-pointer border border-slate-200 dark:border-slate-700"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Canvas Viewport */}
      <div className="relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-lg">
        <canvas
          ref={canvasRef}
          width={800}
          height={500}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoverCoords(null)}
          className="w-full h-[400px] sm:h-[500px] cursor-crosshair block"
        />

        {/* Hover Coordinate Tag */}
        {hoverCoords && (
          <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-xs text-white px-3 py-1.5 rounded-xl text-xs font-mono font-bold shadow-md">
            x: {hoverCoords.x}, y: {hoverCoords.y}
          </div>
        )}

        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs border border-slate-200 dark:border-slate-800 px-3 py-2 rounded-xl text-[11px] font-semibold text-slate-600 dark:text-slate-300 shadow-md space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-3 h-1 bg-blue-600 rounded-full" />
            <span>Graph curve y = {equation}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
            <span>y-intercept marker</span>
          </div>
        </div>
      </div>
    </div>
  );
};
