import React from 'react';
import { ColorOption } from '../types';
import { soundFx } from '../utils/audio';
import { Check, Pipette } from 'lucide-react';

interface ColorPalettePickerProps {
  label: string;
  selectedColor: string;
  onSelectColor: (color: string) => void;
  palette: ColorOption[];
}

export const ColorPalettePicker: React.FC<ColorPalettePickerProps> = ({
  label,
  selectedColor,
  onSelectColor,
  palette,
}) => {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <label className="text-xs md:text-sm font-black text-slate-700 flex items-center gap-1.5">
          <span>🎨</span>
          <span>{label} 색상 선택</span>
        </label>
        
        {/* Custom Color Input */}
        <div className="flex items-center gap-2">
          <label
            htmlFor={`custom-color-${label}`}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-indigo-600 cursor-pointer bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-xl transition-all"
            title="직접 색상 고르기"
          >
            <Pipette className="w-3.5 h-3.5" />
            <span>직접 선택</span>
          </label>
          <input
            id={`custom-color-${label}`}
            type="color"
            value={selectedColor}
            onChange={(e) => {
              soundFx.playClick();
              onSelectColor(e.target.value);
            }}
            className="w-7 h-7 rounded-lg cursor-pointer border-2 border-slate-300 overflow-hidden"
          />
        </div>
      </div>

      {/* Swatches Grid */}
      <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
        {palette.map((color) => {
          const isSelected = selectedColor.toUpperCase() === color.hex.toUpperCase();

          return (
            <button
              key={color.hex}
              onClick={() => {
                soundFx.playClick();
                onSelectColor(color.hex);
              }}
              title={color.name}
              className={`group relative aspect-square rounded-2xl border-2 transition-all flex items-center justify-center shadow-xs active:scale-95 ${
                isSelected
                  ? 'border-indigo-600 scale-110 shadow-md ring-4 ring-indigo-200 z-10'
                  : 'border-slate-200/80 hover:scale-105 hover:border-slate-400'
              }`}
              style={{ backgroundColor: color.hex }}
            >
              {isSelected && (
                <div className="bg-black/40 rounded-full p-0.5 text-white">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              )}

              {/* Tooltip on hover */}
              <span className="opacity-0 group-hover:opacity-100 pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-md transition-opacity z-20 shadow-sm">
                {color.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
