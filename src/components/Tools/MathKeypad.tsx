import React from 'react';
import { Delete, RotateCcw } from 'lucide-react';

interface MathKeypadProps {
  onInsert: (value: string) => void;
  onBackspace: () => void;
  onClear: () => void;
  isCompact?: boolean;
}

export const MathKeypad: React.FC<MathKeypadProps> = ({
  onInsert,
  onBackspace,
  onClear,
  isCompact = false,
}) => {
  const basicRow = [
    { label: 'x', val: 'x' },
    { label: 'y', val: 'y' },
    { label: '+', val: ' + ' },
    { label: '−', val: ' - ' },
    { label: '×', val: ' * ' },
    { label: '÷', val: ' / ' },
    { label: '=', val: ' = ' },
  ];

  const advancedRow = [
    { label: 'x²', val: '²' },
    { label: 'xⁿ', val: '^' },
    { label: '√', val: '√(' },
    { label: 'π', val: 'π' },
    { label: '(', val: '(' },
    { label: ')', val: ')' },
    { label: '%', val: '%' },
  ];

  const numbers = [
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3'],
    ['0', '.', '±'],
  ];

  return (
    <div className="bg-slate-100 dark:bg-slate-800/80 p-3 rounded-2xl border border-slate-200 dark:border-slate-700/80 space-y-2">
      <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase px-1">
        <span>Math Keypad (Touch & Click)</span>
        <button
          type="button"
          onClick={onClear}
          className="text-rose-500 hover:text-rose-600 flex items-center gap-1 transition cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" /> Clear
        </button>
      </div>

      {/* Variables & Operators Row */}
      <div className="grid grid-cols-7 gap-1">
        {basicRow.map((btn, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onInsert(btn.val)}
            className="p-2 rounded-xl bg-white dark:bg-slate-700 font-bold text-xs text-slate-800 dark:text-slate-100 hover:bg-blue-50 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600 shadow-2xs transition active:scale-95 cursor-pointer"
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Advanced Row */}
      <div className="grid grid-cols-7 gap-1">
        {advancedRow.map((btn, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onInsert(btn.val)}
            className="p-2 rounded-xl bg-slate-200/80 dark:bg-slate-700/60 font-semibold text-xs text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600 shadow-2xs transition active:scale-95 cursor-pointer"
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Numpad & Controls */}
      <div className="grid grid-cols-4 gap-1 pt-1">
        <div className="col-span-3 grid grid-cols-3 gap-1">
          {numbers.map((row, rIdx) =>
            row.map((num, cIdx) => (
              <button
                key={`${rIdx}-${cIdx}`}
                type="button"
                onClick={() => {
                  if (num === '±') onInsert('-');
                  else onInsert(num);
                }}
                className="py-2.5 rounded-xl bg-white dark:bg-slate-700 text-sm font-bold text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600 shadow-2xs transition active:scale-95 cursor-pointer"
              >
                {num}
              </button>
            ))
          )}
        </div>

        <div className="flex flex-col gap-1">
          <button
            type="button"
            onClick={onBackspace}
            className="flex-1 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold text-xs flex items-center justify-center border border-amber-200 dark:border-amber-900 transition hover:bg-amber-200 active:scale-95 cursor-pointer"
            title="Backspace"
          >
            <Delete className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onInsert(', ')}
            className="py-2.5 rounded-xl bg-slate-200 dark:bg-slate-700 font-bold text-xs text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 transition active:scale-95 cursor-pointer"
          >
            ,
          </button>
        </div>
      </div>
    </div>
  );
};
