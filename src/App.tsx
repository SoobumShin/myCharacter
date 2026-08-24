import React, { useState, useEffect } from 'react';
import { CharacterConfig } from './types';
import {
  DEFAULT_CHARACTER,
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
} from './data/characterPresets';
import { HeaderNav } from './components/HeaderNav';
import { CharacterPreviewCard } from './components/CharacterPreviewCard';
import { CustomizerPanel } from './components/CustomizerPanel';
import { SaveModal } from './components/SaveModal';
import { ClosetModal } from './components/ClosetModal';
import { soundFx } from './utils/audio';

const STORAGE_KEY = 'my_character_closet_v2';
const CURRENT_CHAR_KEY = 'my_current_character_v2';

export default function App() {
  // Current active character configuration
  const [character, setCharacter] = useState<CharacterConfig>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(CURRENT_CHAR_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          // ignore
        }
      }
    }
    return DEFAULT_CHARACTER;
  });

  // Saved Closet Gallery
  const [savedCharacters, setSavedCharacters] = useState<CharacterConfig[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          // ignore
        }
      }
    }
    return [
      {
        ...DEFAULT_CHARACTER,
        id: 'sample-1',
        name: '딸기 요정',
        hatType: 'cat_ears',
        hatColor: '#FF6B8B',
        topType: 'heart_knit',
        topColor: '#F472B6',
        bottomType: 'skirt',
        bottomColor: '#FF6B8B',
        hairStyle: 'twintail',
        hairColor: '#DC2626',
        faceExpression: 'wink',
        bgTheme: 'candy_land',
      },
      {
        ...DEFAULT_CHARACTER,
        id: 'sample-2',
        name: '멋쟁이 탐정',
        hatType: 'beret',
        hatColor: '#78350F',
        topType: 'school_vest',
        topColor: '#334155',
        bottomType: 'pants',
        bottomColor: '#334155',
        shoesType: 'boots',
        shoesColor: '#78350F',
        accessory: 'glasses',
        bgTheme: 'sunny_park',
      },
    ];
  });

  // Modals state
  const [isSaveModalOpen, setIsSaveModalOpen] = useState<boolean>(false);
  const [isClosetModalOpen, setIsClosetModalOpen] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Save current editing character to LocalStorage
  useEffect(() => {
    localStorage.setItem(CURRENT_CHAR_KEY, JSON.stringify(character));
  }, [character]);

  // Save closet list to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedCharacters));
  }, [savedCharacters]);

  // Update Character Properties
  const handleUpdateCharacter = (updated: Partial<CharacterConfig>) => {
    setCharacter((prev) => ({
      ...prev,
      ...updated,
    }));
  };

  // Randomize all character parts
  const handleRandomize = () => {
    const randomPick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

    const randomHat = randomPick(HAT_OPTIONS).type;
    const randomTop = randomPick(TOP_OPTIONS).type;
    const randomBottom = randomPick(BOTTOM_OPTIONS).type;
    const randomHair = randomPick(HAIR_OPTIONS).type;
    const randomExp = randomPick(EXPRESSION_OPTIONS).type;
    const randomShoes = randomPick(SHOES_OPTIONS).type;
    const randomAcc = randomPick(ACCESSORY_OPTIONS).type;
    const randomBg = randomPick(BG_THEMES).type;
    const randomPose = randomPick(POSE_OPTIONS).type;

    const randomHatColor = randomPick(COLOR_PALETTE).hex;
    const randomTopColor = randomPick(COLOR_PALETTE).hex;
    const randomBottomColor = randomPick(COLOR_PALETTE).hex;
    const randomHairColor = randomPick(HAIR_COLORS).hex;
    const randomSkinColor = randomPick(SKIN_COLORS).hex;
    const randomShoesColor = randomPick(COLOR_PALETTE).hex;

    setCharacter((prev) => ({
      ...prev,
      hatType: randomHat,
      hatColor: randomHatColor,
      topType: randomTop,
      topColor: randomTopColor,
      bottomType: randomBottom,
      bottomColor: randomBottomColor,
      hairStyle: randomHair,
      hairColor: randomHairColor,
      skinColor: randomSkinColor,
      faceExpression: randomExp,
      shoesType: randomShoes,
      shoesColor: randomShoesColor,
      accessory: randomAcc,
      bgTheme: randomBg,
      pose: randomPose,
    }));
  };

  // Reset to default character
  const handleReset = () => {
    setCharacter({
      ...DEFAULT_CHARACTER,
      id: Date.now().toString(),
      name: '새로운 친구',
    });
  };

  // Confirm Saving Character into Closet
  const handleConfirmSave = (savedName: string) => {
    const newChar: CharacterConfig = {
      ...character,
      id: `char-${Date.now()}`,
      name: savedName,
      createdAt: Date.now(),
    };

    setSavedCharacters((prev) => [newChar, ...prev]);
    setCharacter((prev) => ({ ...prev, name: savedName }));
  };

  // Load a character from Closet
  const handleLoadCharacter = (loadedChar: CharacterConfig) => {
    setCharacter(loadedChar);
  };

  // Delete a character from Closet
  const handleDeleteCharacter = (id: string) => {
    setSavedCharacters((prev) => prev.filter((c) => c.id !== id));
  };

  // Sound toggle
  const handleToggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    soundFx.setEnabled(newState);
    if (newState) soundFx.playClick();
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 flex flex-col font-sans selection:bg-amber-200">
      {/* Top Header Navigation */}
      <HeaderNav
        savedCount={savedCharacters.length}
        onOpenCloset={() => setIsClosetModalOpen(true)}
        onRandomize={handleRandomize}
      />

      {/* Main Studio Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Character Stage & Controls (5 cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <CharacterPreviewCard
              config={character}
              onUpdateName={(name) => handleUpdateCharacter({ name })}
              onRandomize={handleRandomize}
              onReset={handleReset}
              onOpenSaveModal={() => setIsSaveModalOpen(true)}
              onOpenCloset={() => setIsClosetModalOpen(true)}
              savedCount={savedCharacters.length}
              soundEnabled={soundEnabled}
              onToggleSound={handleToggleSound}
            />
          </div>

          {/* Right Column: Customization Panel with Tabs (7 cols) */}
          <div className="lg:col-span-7">
            <CustomizerPanel
              config={character}
              onChange={handleUpdateCharacter}
            />
          </div>
        </div>
      </main>

      {/* Save Modal */}
      <SaveModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        config={character}
        onConfirmSave={handleConfirmSave}
      />

      {/* Saved Closet Gallery Modal */}
      <ClosetModal
        isOpen={isClosetModalOpen}
        onClose={() => setIsClosetModalOpen(false)}
        savedCharacters={savedCharacters}
        onLoadCharacter={handleLoadCharacter}
        onDeleteCharacter={handleDeleteCharacter}
      />
    </div>
  );
}
