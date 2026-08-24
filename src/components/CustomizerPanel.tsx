import React, { useState } from 'react';
import {
  CharacterConfig,
  CategoryTab,
  HatType,
  TopType,
  BottomType,
  HairStyle,
  FaceExpression,
  ShoesType,
  AccessoryType,
  BgTheme,
  PoseType,
} from '../types';
import {
  COLOR_PALETTE,
  SKIN_COLORS,
  HAIR_COLORS,
  HAT_OPTIONS,
  TOP_OPTIONS,
  BOTTOM_OPTIONS,
  HAIR_OPTIONS,
  EXPRESSION_OPTIONS,
  SHOES_OPTIONS,
  ACCESSORY_OPTIONS,
  BG_THEMES,
  POSE_OPTIONS,
} from '../data/characterPresets';
import { ColorPalettePicker } from './ColorPalettePicker';
import { soundFx } from '../utils/audio';
import {
  Sparkles,
  Smile,
  Palette,
  Layers,
  Heart,
  Crown,
  Shirt,
  Scissors,
  Check,
} from 'lucide-react';

interface CustomizerPanelProps {
  config: CharacterConfig;
  onChange: (updated: Partial<CharacterConfig>) => void;
}

export const CustomizerPanel: React.FC<CustomizerPanelProps> = ({
  config,
  onChange,
}) => {
  const [activeTab, setActiveTab] = useState<CategoryTab>('hat');

  const tabs: { id: CategoryTab; label: string; icon: string }[] = [
    { id: 'hat', label: '모자', icon: '🧢' },
    { id: 'top', label: '상의', icon: '👕' },
    { id: 'bottom', label: '하의', icon: '👖' },
    { id: 'face_hair', label: '얼굴·헤어', icon: '💇' },
    { id: 'shoes_acc', label: '신발·소품', icon: '👟' },
    { id: 'bg_pose', label: '배경·포즈', icon: '🌈' },
  ];

  return (
    <div className="bg-white rounded-3xl border-3 border-amber-200 shadow-xl overflow-hidden flex flex-col h-full">
      {/* Category Tabs */}
      <div className="grid grid-cols-6 bg-amber-50/80 p-2 gap-1 border-b-2 border-amber-200">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                soundFx.playClick();
                setActiveTab(tab.id);
              }}
              className={`py-2 px-1 rounded-2xl font-black text-xs md:text-sm flex flex-col items-center justify-center gap-1 transition-all active:scale-95 ${
                isActive
                  ? 'bg-white text-indigo-700 shadow-md border-2 border-indigo-200 scale-105 z-10'
                  : 'text-slate-600 hover:bg-white/60 hover:text-slate-900'
              }`}
            >
              <span className="text-lg md:text-xl">{tab.icon}</span>
              <span className="truncate">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Contents Area */}
      <div className="p-4 md:p-6 overflow-y-auto flex-1 space-y-6 max-h-[480px]">
        {/* ================= 1. HAT (모자) ================= */}
        {activeTab === 'hat' && (
          <div className="space-y-6 animate-fade-in">
            {/* Hat Style Selection */}
            <div>
              <label className="text-xs md:text-sm font-black text-slate-700 mb-2.5 block flex items-center gap-1.5">
                <span>🧢</span>
                <span>모자 디자인 선택</span>
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
                {HAT_OPTIONS.map((opt) => {
                  const isSelected = config.hatType === opt.type;
                  return (
                    <button
                      key={opt.type}
                      onClick={() => {
                        soundFx.playClick();
                        onChange({ hatType: opt.type });
                      }}
                      className={`p-3 rounded-2xl border-2 font-bold text-xs flex flex-col items-center gap-1.5 transition-all active:scale-95 ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 shadow-md ring-2 ring-indigo-200'
                          : 'border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <span className="text-2xl">{opt.icon}</span>
                      <span className="text-[11px] truncate">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hat Color Palette (only show if hat is not 'none') */}
            {config.hatType !== 'none' && (
              <div className="pt-2 border-t border-slate-100">
                <ColorPalettePicker
                  label="모자"
                  selectedColor={config.hatColor}
                  onSelectColor={(color) => onChange({ hatColor: color })}
                  palette={COLOR_PALETTE}
                />
              </div>
            )}
          </div>
        )}

        {/* ================= 2. TOP (상의) ================= */}
        {activeTab === 'top' && (
          <div className="space-y-6 animate-fade-in">
            {/* Top Style Selection */}
            <div>
              <label className="text-xs md:text-sm font-black text-slate-700 mb-2.5 block flex items-center gap-1.5">
                <span>👕</span>
                <span>상의 디자인 선택</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {TOP_OPTIONS.map((opt) => {
                  const isSelected = config.topType === opt.type;
                  return (
                    <button
                      key={opt.type}
                      onClick={() => {
                        soundFx.playClick();
                        onChange({ topType: opt.type });
                      }}
                      className={`p-3 rounded-2xl border-2 font-bold text-xs flex flex-col items-center gap-1.5 transition-all active:scale-95 ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 shadow-md ring-2 ring-indigo-200'
                          : 'border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <span className="text-2xl">{opt.icon}</span>
                      <span className="text-[11px] truncate">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Top Color Palette */}
            <div className="pt-2 border-t border-slate-100">
              <ColorPalettePicker
                label="상의 (옷)"
                selectedColor={config.topColor}
                onSelectColor={(color) => onChange({ topColor: color })}
                palette={COLOR_PALETTE}
              />
            </div>
          </div>
        )}

        {/* ================= 3. BOTTOM (하의) ================= */}
        {activeTab === 'bottom' && (
          <div className="space-y-6 animate-fade-in">
            {/* Bottom Style Selection */}
            <div>
              <label className="text-xs md:text-sm font-black text-slate-700 mb-2.5 block flex items-center gap-1.5">
                <span>👖</span>
                <span>하의 디자인 선택</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {BOTTOM_OPTIONS.map((opt) => {
                  const isSelected = config.bottomType === opt.type;
                  return (
                    <button
                      key={opt.type}
                      onClick={() => {
                        soundFx.playClick();
                        onChange({ bottomType: opt.type });
                      }}
                      className={`p-3 rounded-2xl border-2 font-bold text-xs flex flex-col items-center gap-1.5 transition-all active:scale-95 ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 shadow-md ring-2 ring-indigo-200'
                          : 'border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <span className="text-2xl">{opt.icon}</span>
                      <span className="text-[11px] truncate">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Color Palette */}
            <div className="pt-2 border-t border-slate-100">
              <ColorPalettePicker
                label="하의 (바지·치마)"
                selectedColor={config.bottomColor}
                onSelectColor={(color) => onChange({ bottomColor: color })}
                palette={COLOR_PALETTE}
              />
            </div>
          </div>
        )}

        {/* ================= 4. FACE & HAIR (얼굴 & 헤어) ================= */}
        {activeTab === 'face_hair' && (
          <div className="space-y-6 animate-fade-in">
            {/* Expressions */}
            <div>
              <label className="text-xs md:text-sm font-black text-slate-700 mb-2.5 block flex items-center gap-1.5">
                <span>😊</span>
                <span>얼굴 표정 선택</span>
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {EXPRESSION_OPTIONS.map((opt) => {
                  const isSelected = config.faceExpression === opt.type;
                  return (
                    <button
                      key={opt.type}
                      onClick={() => {
                        soundFx.playClick();
                        onChange({ faceExpression: opt.type });
                      }}
                      className={`p-2.5 rounded-2xl border-2 font-bold text-xs flex flex-col items-center gap-1 transition-all active:scale-95 ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-900 shadow-md ring-2 ring-indigo-200'
                          : 'border-slate-200 bg-slate-50/50 hover:bg-white text-slate-700'
                      }`}
                    >
                      <span className="text-2xl">{opt.icon}</span>
                      <span className="text-[10px] truncate">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Skin Color Picker */}
            <div className="pt-2 border-t border-slate-100">
              <ColorPalettePicker
                label="피부톤"
                selectedColor={config.skinColor}
                onSelectColor={(color) => onChange({ skinColor: color })}
                palette={SKIN_COLORS}
              />
            </div>

            {/* Hair Style */}
            <div className="pt-2 border-t border-slate-100">
              <label className="text-xs md:text-sm font-black text-slate-700 mb-2.5 block flex items-center gap-1.5">
                <span>💇</span>
                <span>헤어스타일</span>
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {HAIR_OPTIONS.map((opt) => {
                  const isSelected = config.hairStyle === opt.type;
                  return (
                    <button
                      key={opt.type}
                      onClick={() => {
                        soundFx.playClick();
                        onChange({ hairStyle: opt.type });
                      }}
                      className={`p-2.5 rounded-2xl border-2 font-bold text-xs flex flex-col items-center gap-1 transition-all active:scale-95 ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-900 shadow-md ring-2 ring-indigo-200'
                          : 'border-slate-200 bg-slate-50/50 hover:bg-white text-slate-700'
                      }`}
                    >
                      <span className="text-2xl">{opt.icon}</span>
                      <span className="text-[10px] truncate">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hair Color */}
            <div className="pt-2 border-t border-slate-100">
              <ColorPalettePicker
                label="머리카락"
                selectedColor={config.hairColor}
                onSelectColor={(color) => onChange({ hairColor: color })}
                palette={HAIR_COLORS}
              />
            </div>
          </div>
        )}

        {/* ================= 5. SHOES & ACCESSORIES (신발 & 소품) ================= */}
        {activeTab === 'shoes_acc' && (
          <div className="space-y-6 animate-fade-in">
            {/* Shoes Style */}
            <div>
              <label className="text-xs md:text-sm font-black text-slate-700 mb-2.5 block flex items-center gap-1.5">
                <span>👟</span>
                <span>신발 선택</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {SHOES_OPTIONS.map((opt) => {
                  const isSelected = config.shoesType === opt.type;
                  return (
                    <button
                      key={opt.type}
                      onClick={() => {
                        soundFx.playClick();
                        onChange({ shoesType: opt.type });
                      }}
                      className={`p-3 rounded-2xl border-2 font-bold text-xs flex flex-col items-center gap-1.5 transition-all active:scale-95 ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-900 shadow-md ring-2 ring-indigo-200'
                          : 'border-slate-200 bg-slate-50/50 hover:bg-white text-slate-700'
                      }`}
                    >
                      <span className="text-2xl">{opt.icon}</span>
                      <span className="text-[11px] truncate">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Shoes Color */}
            <div className="pt-2 border-t border-slate-100">
              <ColorPalettePicker
                label="신발"
                selectedColor={config.shoesColor}
                onSelectColor={(color) => onChange({ shoesColor: color })}
                palette={COLOR_PALETTE}
              />
            </div>

            {/* Accessory Item */}
            <div className="pt-2 border-t border-slate-100">
              <label className="text-xs md:text-sm font-black text-slate-700 mb-2.5 block flex items-center gap-1.5">
                <span>🪄</span>
                <span>귀여운 소품·액세서리</span>
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {ACCESSORY_OPTIONS.map((opt) => {
                  const isSelected = config.accessory === opt.type;
                  return (
                    <button
                      key={opt.type}
                      onClick={() => {
                        soundFx.playClick();
                        onChange({ accessory: opt.type });
                      }}
                      className={`p-2.5 rounded-2xl border-2 font-bold text-xs flex flex-col items-center gap-1 transition-all active:scale-95 ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-900 shadow-md ring-2 ring-indigo-200'
                          : 'border-slate-200 bg-slate-50/50 hover:bg-white text-slate-700'
                      }`}
                    >
                      <span className="text-2xl">{opt.icon}</span>
                      <span className="text-[10px] truncate">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ================= 6. BG & POSE (배경 & 포즈) ================= */}
        {activeTab === 'bg_pose' && (
          <div className="space-y-6 animate-fade-in">
            {/* Background Theme */}
            <div>
              <label className="text-xs md:text-sm font-black text-slate-700 mb-2.5 block flex items-center gap-1.5">
                <span>🖼️</span>
                <span>배경 테마 선택</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {BG_THEMES.map((theme) => {
                  const isSelected = config.bgTheme === theme.type;
                  return (
                    <button
                      key={theme.type}
                      onClick={() => {
                        soundFx.playClick();
                        onChange({ bgTheme: theme.type });
                      }}
                      className={`p-3 rounded-2xl border-2 font-bold text-xs flex items-center gap-2.5 transition-all active:scale-95 ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-900 shadow-md ring-2 ring-indigo-200'
                          : 'border-slate-200 bg-slate-50/50 hover:bg-white text-slate-700'
                      }`}
                    >
                      <span className="text-2xl">{theme.icon}</span>
                      <div className="text-left">
                        <span className="block text-xs font-black">{theme.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pose & Animation */}
            <div className="pt-2 border-t border-slate-100">
              <label className="text-xs md:text-sm font-black text-slate-700 mb-2.5 block flex items-center gap-1.5">
                <span>💃</span>
                <span>동작 & 애니메이션</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {POSE_OPTIONS.map((pose) => {
                  const isSelected = config.pose === pose.type;
                  return (
                    <button
                      key={pose.type}
                      onClick={() => {
                        soundFx.playClick();
                        onChange({ pose: pose.type });
                      }}
                      className={`p-3 rounded-2xl border-2 font-bold text-xs flex items-center gap-2.5 transition-all active:scale-95 ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-900 shadow-md ring-2 ring-indigo-200'
                          : 'border-slate-200 bg-slate-50/50 hover:bg-white text-slate-700'
                      }`}
                    >
                      <span className="text-2xl">{pose.icon}</span>
                      <span className="text-xs font-black">{pose.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
