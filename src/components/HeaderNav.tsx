import React from 'react';
import { Sparkles, FolderHeart, Dices, Palette } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface HeaderNavProps {
  savedCount: number;
  onOpenCloset: () => void;
  onRandomize: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  savedCount,
  onOpenCloset,
  onRandomize,
}) => {
  return (
    <header className="bg-white/90 backdrop-blur-md border-b-2 border-amber-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 md:w-11 md:h-11 rounded-2xl bg-gradient-to-tr from-amber-400 to-rose-400 flex items-center justify-center text-2xl shadow-md border border-white">
            ✨
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-black text-slate-800 flex items-center gap-1.5">
              <span>내 캐릭터 꾸미기</span>
              <span className="text-xs font-bold text-rose-500 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full hidden sm:inline-block">
                초등학생 옷입히기
              </span>
            </h1>
            <p className="text-[11px] md:text-xs font-bold text-slate-500">
              모자, 상의, 하의 색깔을 자유롭게 바꾸고 저장해보세요!
            </p>
          </div>
        </div>

        {/* Right Header Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundFx.playCombo();
              onRandomize();
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-extrabold text-xs transition-all active:scale-95 border border-amber-300"
          >
            <Dices className="w-4 h-4 text-amber-700" />
            <span>랜덤 뽑기</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              onOpenCloset();
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs md:text-sm shadow-md transition-all active:scale-95"
          >
            <FolderHeart className="w-4 h-4" />
            <span>내 옷장</span>
            {savedCount > 0 && (
              <span className="bg-amber-300 text-indigo-950 px-1.5 py-0.2 rounded-full text-[10px] font-extrabold">
                {savedCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
