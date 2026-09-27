import React, { useState } from 'react';
import { StudentProfile } from '../../types/math';
import { UserPlus, X } from 'lucide-react';

interface AddStudentModalProps {
  onClose: () => void;
  onAddStudent: (student: Partial<StudentProfile>) => void;
}

const AVATAR_OPTIONS = ['👨‍🎓', '👩‍🎓', '🧑‍💻', '👩‍🔬', '🧑‍🚀', '👩‍🎨', '🧑‍🏫', '👩‍💼'];

export const AddStudentModal: React.FC<AddStudentModalProps> = ({
  onClose,
  onAddStudent,
}) => {
  const [name, setName] = useState('');
  const [grade, setGrade] = useState<'6th' | '7th' | '8th'>('8th');
  const [avatar, setAvatar] = useState('👨‍🎓');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddStudent({
      name: name.trim(),
      grade,
      avatar,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600">
              <UserPlus className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Enroll New Student
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Student Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Taylor Morgan"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Grade Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['6th', '7th', '8th'] as const).map(g => (
                <button
                  type="button"
                  key={g}
                  onClick={() => setGrade(g)}
                  className={`py-2 rounded-xl text-xs font-bold transition border ${
                    grade === g
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  Grade {g}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Select Avatar
            </label>
            <div className="flex flex-wrap gap-2">
              {AVATAR_OPTIONS.map(av => (
                <button
                  type="button"
                  key={av}
                  onClick={() => setAvatar(av)}
                  className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center border transition ${
                    avatar === av
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/60 scale-110'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-xs"
            >
              Enroll Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
