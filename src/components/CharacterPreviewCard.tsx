import React, { useRef } from 'react';
import { CharacterConfig } from '../types';
import { CharacterSvg } from './CharacterSvg';
import { BG_THEMES } from '../data/characterPresets';
import { soundFx } from '../utils/audio';
import { downloadCharacterCard } from '../utils/exportImage';
import {
  Dices,
  RotateCcw,
  Save,
  Download,
  Sparkles,
  Edit3,
  Heart,
  Volume2,
  VolumeX,
  FolderHeart,
} from 'lucide-react';

interface CharacterPreviewCardProps {
  config: CharacterConfig;
  onUpdateName: (name: string) => void;
  onRandomize: () => void;
  onReset: () => void;
  onOpenSaveModal: () => void;
  onOpenCloset: () => void;
  savedCount: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const CharacterPreviewCard: React.FC<CharacterPreviewCardProps> = ({
  config,
  onUpdateName,
  onRandomize,
  onReset,
  onOpenSaveModal,
  onOpenCloset,
  savedCount,
  soundEnabled,
  onToggleSound,
}) => {
  const currentTheme =
    BG_THEMES.find((t) => t.type === config.bgTheme) || BG_THEMES[0];
  const svgContainerRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    soundFx.playFanfare();
    const svgEl = svgContainerRef.current?.querySelector('svg') as SVGSVGElement | null;
    await downloadCharacterCard(config, svgEl);
  };

  return (
    <div className="bg-white rounded-3xl border-3 border-amber-300 shadow-xl overflow-hidden flex flex-col">
      {/* Top Header Bar */}
      <div className="p-3.5 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 border-b-2 border-amber-300 flex items-center justify-between">
        {/* Name Input Bar */}
        <div className="flex items-center gap-2 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-2xl border border-amber-300 shadow-xs flex-1 max-w-[260px]">
          <span className="text-sm">✨</span>
          <input
            type="text"
            value={config.name}
            onChange={(e) => onUpdateName(e.target.value)}
            placeholder="캐릭터 이름 입력"
            maxLength={12}
            className="w-full text-xs md:text-sm font-black text-slate-800 focus:outline-none bg-transparent"
          />
          <Edit3 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        </div>

        {/* Quick Toolbar: Sound & Closet */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onToggleSound}
            title={soundEnabled ? '소리 끄기' : '소리 켜기'}
            className="p-2 rounded-xl bg-white/80 hover:bg-white text-slate-700 font-bold transition-all active:scale-95 shadow-2xs"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              onOpenCloset();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black shadow-md transition-all active:scale-95"
          >
            <FolderHeart className="w-3.5 h-3.5" />
            <span>내 옷장</span>
            {savedCount > 0 && (
              <span className="bg-amber-300 text-indigo-950 px-1.5 py-0.2 rounded-full text-[10px] font-extrabold">
                {savedCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Character Stage */}
      <div
        className={`relative aspect-[3/4] max-h-[460px] w-full bg-gradient-to-b ${currentTheme.cssBg} flex flex-col items-center justify-center p-4 overflow-hidden select-none transition-colors duration-500`}
      >
        {/* Background Atmosphere Elements */}
        {config.bgTheme === 'sunny_park' && (
          <>
            <div className="absolute top-4 left-6 text-3xl animate-bounce">☀️</div>
            <div className="absolute top-8 right-10 text-2xl opacity-80">☁️</div>
            <div className="absolute bottom-0 inset-x-0 h-16 bg-emerald-300/80 rounded-t-[50px] border-t-2 border-emerald-400" />
          </>
        )}

        {config.bgTheme === 'starry_night' && (
          <>
            <div className="absolute top-4 left-6 text-2xl animate-pulse">⭐</div>
            <div className="absolute top-8 right-8 text-3xl">🌙</div>
            <div className="absolute top-20 left-16 text-xl animate-pulse delay-300">✨</div>
            <div className="absolute bottom-0 inset-x-0 h-14 bg-slate-800/80 rounded-t-[40px]" />
          </>
        )}

        {config.bgTheme === 'candy_land' && (
          <>
            <div className="absolute top-4 left-6 text-3xl animate-bounce">🍭</div>
            <div className="absolute top-8 right-8 text-2xl animate-spin">🍬</div>
            <div className="absolute bottom-0 inset-x-0 h-16 bg-rose-200/90 rounded-t-[40px] border-t-2 border-pink-300" />
          </>
        )}

        {config.bgTheme === 'rainbow_room' && (
          <>
            <div className="absolute top-3 inset-x-0 flex justify-center text-3xl">🌈</div>
            <div className="absolute bottom-0 inset-x-0 h-14 bg-amber-200/80 rounded-t-[40px]" />
          </>
        )}

        {config.bgTheme === 'classroom' && (
          <>
            <div className="absolute top-4 left-6 text-2xl">📚</div>
            <div className="absolute top-6 right-8 text-2xl">⏰</div>
            <div className="absolute bottom-0 inset-x-0 h-16 bg-amber-700/80 rounded-t-[30px]" />
          </>
        )}

        {config.bgTheme === 'pixel_stage' && (
          <>
            <div className="absolute top-3 left-6 text-2xl animate-pulse">🎵</div>
            <div className="absolute top-6 right-8 text-2xl animate-pulse">✨</div>
            <div className="absolute bottom-0 inset-x-0 h-16 bg-purple-900/90 rounded-t-[40px] border-t-2 border-pink-400" />
          </>
        )}

        {/* Character Vector SVG */}
        <div ref={svgContainerRef} className="relative z-10 w-full h-full max-w-[340px] flex items-center justify-center">
          <CharacterSvg config={config} />
        </div>

        {/* Shadow Under Character */}
        <div className="absolute bottom-6 w-36 h-6 bg-black/20 rounded-full filter blur-xs z-0" />
      </div>

      {/* Action Buttons Bar */}
      <div className="p-3.5 bg-amber-50/80 border-t-2 border-amber-200 grid grid-cols-2 sm:grid-cols-4 gap-2">
        {/* 1. Randomize */}
        <button
          onClick={() => {
            soundFx.playCombo();
            onRandomize();
          }}
          className="py-2.5 px-3 rounded-2xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-black text-xs md:text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5"
        >
          <Dices className="w-4 h-4" />
          <span>랜덤 코디 🎲</span>
        </button>

        {/* 2. Reset */}
        <button
          onClick={() => {
            soundFx.playClick();
            onReset();
          }}
          className="py-2.5 px-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs md:text-sm border border-slate-200 transition-all active:scale-95 flex items-center justify-center gap-1.5"
        >
          <RotateCcw className="w-4 h-4 text-slate-500" />
          <span>초기화</span>
        </button>

        {/* 3. Save to Closet */}
        <button
          onClick={() => {
            soundFx.playClick();
            onOpenSaveModal();
          }}
          className="py-2.5 px-3 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-black text-xs md:text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5"
        >
          <Save className="w-4 h-4" />
          <span>옷장에 저장</span>
        </button>

        {/* 4. Download Image */}
        <button
          onClick={handleDownload}
          className="py-2.5 px-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs md:text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5"
        >
          <Download className="w-4 h-4" />
          <span>사진 저장 📸</span>
        </button>
      </div>
    </div>
  );
};
