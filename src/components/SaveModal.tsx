import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CharacterConfig } from '../types';
import { CharacterSvg } from './CharacterSvg';
import { soundFx } from '../utils/audio';
import { Sparkles, Save, Heart, X, Check } from 'lucide-react';

interface SaveModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: CharacterConfig;
  onConfirmSave: (name: string) => void;
}

export const SaveModal: React.FC<SaveModalProps> = ({
  isOpen,
  onClose,
  config,
  onConfirmSave,
}) => {
  const [name, setName] = useState<string>(config.name || '나의 멋진 캐릭터');

  useEffect(() => {
    if (isOpen) {
      setName(config.name || '나의 멋진 캐릭터');
    }
  }, [isOpen, config.name]);

  if (!isOpen) return null;

  const handleSave = () => {
    soundFx.playFanfare();
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // ignore
    }
    onConfirmSave(name.trim() || '이름 없는 친구');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border-4 border-amber-300 text-center relative overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Celebration Icon */}
        <div className="text-5xl mb-2 animate-bounce">💖</div>

        <h3 className="text-xl font-black text-slate-800 mb-1">
          캐릭터를 옷장에 저장할까요?
        </h3>
        <p className="text-xs font-bold text-slate-500 mb-4">
          멋지게 꾸민 캐릭터의 이름을 지어주세요!
        </p>

        {/* Mini Preview */}
        <div className="w-32 h-40 mx-auto mb-4 bg-amber-50 rounded-2xl border-2 border-amber-200 p-2 flex items-center justify-center">
          <CharacterSvg config={config} isAnimated={false} />
        </div>

        {/* Name Input */}
        <div className="mb-5 text-left">
          <label className="block text-xs font-bold text-slate-600 mb-1.5">
            캐릭터 이름
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={15}
            placeholder="예: 슈팅스타 민트, 귀요미 토끼..."
            className="w-full px-4 py-3 rounded-2xl border-2 border-amber-300 focus:border-indigo-500 focus:outline-none font-black text-sm text-slate-800 bg-amber-50/30"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2.5">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-sm transition-all"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-3 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-black text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>저장하기!</span>
          </button>
        </div>
      </div>
    </div>
  );
};
