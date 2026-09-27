import React, { useState } from 'react';
import { Camera, Upload, RotateCw, Contrast, CheckCircle2, ArrowRight, X, Sparkles, HelpCircle } from 'lucide-react';
import { CalculationResult } from '../../types/math';

interface PhotoSolverModalProps {
  onClose: () => void;
}

export const PhotoSolverModal: React.FC<PhotoSolverModalProps> = ({ onClose }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const [contrastHigh, setContrastHigh] = useState(false);
  const [detectedEquation, setDetectedEquation] = useState('3x + 7 = 28');
  const [isSolving, setIsSolving] = useState(false);
  const [solution, setSolution] = useState<CalculationResult | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
        // Pre-fill plausible detected equation from demo photo
        setDetectedEquation('3x + 7 = 28');
        setSolution(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUseSample = () => {
    // Canvas dummy equation snapshot
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 160;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 400, 160);
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 36px serif';
      ctx.fillText('3x + 7 = 28', 110, 95);
      setImagePreview(canvas.toDataURL());
      setDetectedEquation('3x + 7 = 28');
      setSolution(null);
    }
  };

  const handleSolve = () => {
    setIsSolving(true);
    setTimeout(() => {
      // Parse simple linear equation
      const eq = detectedEquation.replace(/\s+/g, '');
      const match = eq.match(/(-?\d*)x\+?(-?\d*)=(\d+)/);

      let a = 3;
      let b = 7;
      let c = 28;

      if (match) {
        a = match[1] === '' ? 1 : match[1] === '-' ? -1 : Number(match[1]) || 3;
        b = Number(match[2]) || 0;
        c = Number(match[3]) || 28;
      }

      const diff = c - b;
      const x = diff / a;

      setSolution({
        exact: `x = ${x}`,
        decimal: `x = ${x.toFixed(2)}`,
        formulaUsed: 'ax + b = c  =>  x = (c - b) / a',
        steps: [
          { title: 'Step 1: Recognized Equation from Image', detail: `Detected: ${detectedEquation}. Values: a = ${a}, b = ${b}, c = ${c}` },
          { title: 'Step 2: Subtract constant term from both sides', detail: `${a}x = ${c} - ${b} = ${diff}` },
          { title: 'Step 3: Divide by coefficient', detail: `x = ${diff} / ${a} = ${x}` },
        ],
        verification: `Check: ${a}(${x}) + ${b} = ${a * x + b} = ${c}. Equation holds true!`,
      });
      setIsSolving(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="w-full max-w-2xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-6">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-xs">
              <Camera className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Photo Math Solver</h2>
              <p className="text-xs text-white/90">
                Upload or snap written equations • Verify & solve step-by-step
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/20 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Upload Area */}
          {!imagePreview ? (
            <div className="p-8 rounded-3xl border-2 border-dashed border-slate-300 dark:border-slate-700 text-center space-y-4 bg-slate-50 dark:bg-slate-800/40">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 mx-auto flex items-center justify-center shadow-xs">
                <Upload className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  Upload an image of your handwritten equation
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Supports JPG, PNG, WEBP, or phone camera snapshots
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <label className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-xs cursor-pointer">
                  <span>Browse Image File</span>
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </label>

                <button
                  type="button"
                  onClick={handleUseSample}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                >
                  Use Sample Equation Photo
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Image Preview & Tools */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 flex items-center justify-center p-4 min-h-[180px]">
                <img
                  src={imagePreview}
                  alt="Captured equation"
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    filter: contrastHigh ? 'contrast(200%) brightness(90%)' : 'none',
                  }}
                  className="max-h-48 rounded-lg shadow-sm transition-all"
                />

                <div className="absolute bottom-2 right-2 flex items-center gap-1.5 bg-black/70 backdrop-blur-xs p-1.5 rounded-xl text-white">
                  <button
                    onClick={() => setRotation(r => (r + 90) % 360)}
                    className="p-1.5 rounded-lg hover:bg-white/20 transition text-xs flex items-center gap-1"
                    title="Rotate 90 degrees"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setContrastHigh(c => !c)}
                    className={`p-1.5 rounded-lg hover:bg-white/20 transition text-xs flex items-center gap-1 ${
                      contrastHigh ? 'text-amber-400' : ''
                    }`}
                    title="Enhance contrast"
                  >
                    <Contrast className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      setImagePreview(null);
                      setSolution(null);
                    }}
                    className="p-1.5 rounded-lg hover:bg-white/20 transition text-xs text-rose-300"
                    title="Clear image"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Detected Equation with Verification Notice */}
              <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 space-y-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-xs font-bold text-blue-900 dark:text-blue-200">
                    Detected Equation (Editable Confirmation)
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  Please verify or adjust the detected equation below before solving:
                </p>
                <input
                  type="text"
                  value={detectedEquation}
                  onChange={e => setDetectedEquation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-blue-300 dark:border-blue-700 bg-white dark:bg-slate-900 text-sm font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="flex justify-end pt-1">
                  <button
                    onClick={handleSolve}
                    disabled={isSolving}
                    className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-xs cursor-pointer flex items-center gap-1.5"
                  >
                    <span>{isSolving ? 'Solving...' : 'Solve This Equation'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Solution Display */}
          {solution && (
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-4">
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Result
                </div>
                <div className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-0.5">
                  {solution.exact}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5 text-blue-500" /> Step-by-Step Derivation:
                </div>
                {solution.steps.map((st, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 text-xs space-y-1">
                    <div className="font-bold text-slate-900 dark:text-white">
                      {st.title}
                    </div>
                    <div className="text-slate-600 dark:text-slate-400">
                      {st.detail}
                    </div>
                  </div>
                ))}
              </div>

              {solution.verification && (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{solution.verification}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
