import React from 'react';
import { CharacterConfig } from '../types';
import { CharacterSvg } from './CharacterSvg';
import { soundFx } from '../utils/audio';
import { downloadCharacterCard } from '../utils/exportImage';
import {
  FolderHeart,
  X,
  Trash2,
  Download,
  ArrowRight,
  Sparkles,
  Shirt,
} from 'lucide-react';

interface ClosetModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedCharacters: CharacterConfig[];
  onLoadCharacter: (char: CharacterConfig) => void;
  onDeleteCharacter: (id: string) => void;
}

export const ClosetModal: React.FC<ClosetModalProps> = ({
  isOpen,
  onClose,
  savedCharacters,
  onLoadCharacter,
  onDeleteCharacter,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border-4 border-indigo-200 flex flex-col max-h-[85vh] relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 flex items-center justify-center text-2xl">
              👗
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-800">
                내 캐릭터 옷장 보관함
              </h3>
              <p className="text-xs font-bold text-slate-500">
                저장된 캐릭터: {savedCharacters.length}명
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content List */}
        <div className="overflow-y-auto flex-1 pr-1 space-y-4">
          {savedCharacters.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="text-6xl animate-bounce">🧸</div>
              <h4 className="text-lg font-black text-slate-700">
                아직 옷장이 비어있어요!
              </h4>
              <p className="text-xs font-bold text-slate-400 max-w-xs mx-auto">
                캐릭터를 멋지게 꾸민 다음 '옷장에 저장' 버튼을 눌러보세요.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {savedCharacters.map((char) => (
                <div
                  key={char.id}
                  className="bg-slate-50 hover:bg-indigo-50/50 rounded-2xl border-2 border-slate-200 hover:border-indigo-300 p-3.5 flex items-center gap-3.5 transition-all shadow-xs group"
                >
                  {/* Miniature SVG View */}
                  <div className="w-20 h-24 bg-white rounded-xl border border-slate-200 p-1 shrink-0 flex items-center justify-center overflow-hidden">
                    <CharacterSvg config={char} isAnimated={false} />
                  </div>

                  {/* Details & Actions */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-black text-sm text-slate-800 truncate mb-1">
                      {char.name}
                    </h4>
                    <p className="text-[11px] font-bold text-slate-400 mb-2">
                      {new Date(char.createdAt).toLocaleDateString()}
                    </p>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          soundFx.playClick();
                          onLoadCharacter(char);
                          onClose();
                        }}
                        className="px-2.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs transition-all active:scale-95 flex items-center gap-1"
                        title="이 캐릭터 불러와서 입히기"
                      >
                        <span>불러오기</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>

                      <button
                        onClick={() => {
                          soundFx.playWrong();
                          if (confirm(`'${char.name}' 캐릭터를 삭제할까요?`)) {
                            onDeleteCharacter(char.id);
                          }
                        }}
                        className="p-1.5 rounded-xl hover:bg-rose-100 text-slate-400 hover:text-rose-600 transition-colors"
                        title="삭제"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-sm transition-all"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
