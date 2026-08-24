import {
  ColorOption,
  CharacterConfig,
  HatType,
  TopType,
  BottomType,
  HairStyle,
  FaceExpression,
  AccessoryType,
  BgTheme,
  PoseType,
  ShoesType,
} from '../types';

// Palette of kid-friendly vibrant and pastel colors
export const COLOR_PALETTE: ColorOption[] = [
  { name: '딸기 핑크', hex: '#FF6B8B' },
  { name: '체리 레드', hex: '#EF4444' },
  { name: '당근 오렌지', hex: '#F97316' },
  { name: '바나나 옐로우', hex: '#FBBF24' },
  { name: '레몬 라임', hex: '#84CC16' },
  { name: '민트 그린', hex: '#10B981' },
  { name: '소다 청록', hex: '#06B6D4' },
  { name: '하늘 블루', hex: '#38BDF8' },
  { name: '청량 로열블루', hex: '#3B82F6' },
  { name: '라벤더 보라', hex: '#A855F7' },
  { name: '포도 퍼플', hex: '#7C3AED' },
  { name: '코튼 캔디', hex: '#F472B6' },
  { name: '달콤 초코', hex: '#78350F' },
  { name: '밀크티 베이지', hex: '#D97706' },
  { name: '순수 화이트', hex: '#F8FAFC' },
  { name: '시크 차콜', hex: '#334155' },
  { name: '나이트 블랙', hex: '#0F172A' },
  { name: '연보라 파스텔', hex: '#DDD6FE' },
  { name: '파스텔 옐로우', hex: '#FEF08A' },
  { name: '파스텔 핑크', hex: '#FBCFE8' },
];

export const SKIN_COLORS: ColorOption[] = [
  { name: '밝은 살구', hex: '#FFE0BD' },
  { name: '화사한 핑크톤', hex: '#FFD1DC' },
  { name: '자연스러운 베이지', hex: '#FCD5B5' },
  { name: '건강한 웜톤', hex: '#E8B993' },
  { name: '태닝 브라운', hex: '#C68642' },
  { name: '진한 초코톤', hex: '#8D5524' },
];

export const HAIR_COLORS: ColorOption[] = [
  { name: '자연 흑발', hex: '#1E293B' },
  { name: '초코 브라운', hex: '#582F0E' },
  { name: '밀크 골드', hex: '#EAB308' },
  { name: '루비 레드', hex: '#DC2626' },
  { name: '오렌지 카라멜', hex: '#EA580C' },
  { name: '파스텔 핑크', hex: '#F472B6' },
  { name: '라벤더 퍼플', hex: '#A855F7' },
  { name: '스카이 민트', hex: '#06B6D4' },
  { name: '스노우 화이트', hex: '#E2E8F0' },
];

export const HAT_OPTIONS: { type: HatType; label: string; icon: string }[] = [
  { type: 'none', label: '모자 없음', icon: '❌' },
  { type: 'cap', label: '야구 모자', icon: '🧢' },
  { type: 'beanie', label: '따뜻한 비니', icon: '🧶' },
  { type: 'beret', label: '예술가 베레모', icon: '🎨' },
  { type: 'crown', label: '황금 왕관', icon: '👑' },
  { type: 'cat_ears', label: '고양이 귀', icon: '🐱' },
  { type: 'ribbon', label: '왕 리본', icon: '🎀' },
  { type: 'bucket', label: '버킷햇', icon: '👒' },
  { type: 'wizard', label: '마법사 모자', icon: '🧙' },
];

export const TOP_OPTIONS: { type: TopType; label: string; icon: string }[] = [
  { type: 'tshirt', label: '기본 반팔티', icon: '👕' },
  { type: 'hoodie', label: '포근 후드티', icon: '🧥' },
  { type: 'striped', label: '줄무늬 티셔츠', icon: '🦓' },
  { type: 'star_sweater', label: '별빛 맨투맨', icon: '⭐' },
  { type: 'heart_knit', label: '하트 니트', icon: '💖' },
  { type: 'school_vest', label: '단정한 교복조끼', icon: '👔' },
  { type: 'jacket', label: '스포티 야구점퍼', icon: '⚾' },
];

export const BOTTOM_OPTIONS: { type: BottomType; label: string; icon: string }[] = [
  { type: 'shorts', label: '시원한 반바지', icon: '🩳' },
  { type: 'pants', label: '편한 긴바지', icon: '👖' },
  { type: 'skirt', label: '발랄한 치마', icon: '👗' },
  { type: 'pleated_skirt', label: '플리츠 스커트', icon: '🥻' },
  { type: 'overalls', label: '귀여운 멜빵', icon: '🧸' },
  { type: 'track_pants', label: '활동적 트레이닝', icon: '🏃' },
];

export const HAIR_OPTIONS: { type: HairStyle; label: string; icon: string }[] = [
  { type: 'short', label: '깔끔 숏컷', icon: '👦' },
  { type: 'bob', label: '단정한 단발', icon: '👧' },
  { type: 'twintail', label: '양갈래 머리', icon: '🎀' },
  { type: 'ponytail', label: '하이 포니테일', icon: '👱‍♀️' },
  { type: 'curly', label: '뽀글 곱슬머리', icon: '🐑' },
  { type: 'spiky', label: '개성 삐죽머리', icon: '⚡' },
  { type: 'fluffy', label: '풍성한 롱헤어', icon: '✨' },
];

export const EXPRESSION_OPTIONS: { type: FaceExpression; label: string; icon: string }[] = [
  { type: 'smile', label: '방긋 미소', icon: '😊' },
  { type: 'wink', label: '깜찍 윙크', icon: '😉' },
  { type: 'sparkle', label: '반짝 눈빛', icon: '🤩' },
  { type: 'cute', label: '귀여운 입모양', icon: '😋' },
  { type: 'shy', label: '발그레 수줍음', icon: '🥰' },
  { type: 'sunglasses', label: '멋쟁이 선글라스', icon: '😎' },
];

export const SHOES_OPTIONS: { type: ShoesType; label: string; icon: string }[] = [
  { type: 'sneakers', label: '운동화', icon: '👟' },
  { type: 'boots', label: '어그 부츠', icon: '👢' },
  { type: 'slippers', label: '귀여운 슬리퍼', icon: '🥿' },
  { type: 'sandals', label: '여름 샌들', icon: '🩴' },
];

export const ACCESSORY_OPTIONS: { type: AccessoryType; label: string; icon: string }[] = [
  { type: 'none', label: '없음', icon: '❌' },
  { type: 'glasses', label: '동글 안경', icon: '👓' },
  { type: 'backpack', label: '학교 책가방', icon: '🎒' },
  { type: 'wings', label: '천사 날개', icon: '🪽' },
  { type: 'magic_wand', label: '마법봉', icon: '🪄' },
  { type: 'guitar', label: '통기타', icon: '🎸' },
  { type: 'balloon', label: '하트 풍선', icon: '🎈' },
];

export const BG_THEMES: {
  type: BgTheme;
  label: string;
  icon: string;
  cssBg: string;
  groundColor: string;
}[] = [
  {
    type: 'sunny_park',
    label: '햇살 공원',
    icon: '🌳',
    cssBg: 'from-sky-300 via-sky-100 to-emerald-100',
    groundColor: '#86EFAC',
  },
  {
    type: 'rainbow_room',
    label: '무지개 방',
    icon: '🌈',
    cssBg: 'from-pink-200 via-purple-100 to-yellow-100',
    groundColor: '#FED7AA',
  },
  {
    type: 'starry_night',
    label: '반짝 밤하늘',
    icon: '✨',
    cssBg: 'from-indigo-950 via-slate-900 to-purple-900',
    groundColor: '#334155',
  },
  {
    type: 'candy_land',
    label: '달콤 캔디랜드',
    icon: '🍭',
    cssBg: 'from-pink-300 via-rose-100 to-fuchsia-200',
    groundColor: '#F472B6',
  },
  {
    type: 'classroom',
    label: '즐거운 교실',
    icon: '🏫',
    cssBg: 'from-amber-100 via-orange-50 to-amber-200',
    groundColor: '#B45309',
  },
  {
    type: 'pixel_stage',
    label: '아이돌 무대',
    icon: '🎤',
    cssBg: 'from-purple-600 via-pink-500 to-indigo-700',
    groundColor: '#4C1D95',
  },
];

export const POSE_OPTIONS: { type: PoseType; label: string; icon: string }[] = [
  { type: 'idle', label: '차렷 기본', icon: '🧍' },
  { type: 'wave', label: '안녕 손흔들기', icon: '👋' },
  { type: 'dance', label: '신나는 댄스', icon: '💃' },
  { type: 'jump', label: '폴짝 점프', icon: '🦘' },
  { type: 'heart', label: '하트 발사', icon: '🫶' },
];

export const DEFAULT_CHARACTER: CharacterConfig = {
  id: 'default-1',
  name: '나의 멋진 친구',
  createdAt: Date.now(),
  skinColor: '#FFE0BD',
  faceExpression: 'smile',
  hairStyle: 'short',
  hairColor: '#582F0E',
  hatType: 'cap',
  hatColor: '#EF4444',
  topType: 'tshirt',
  topColor: '#3B82F6',
  bottomType: 'pants',
  bottomColor: '#334155',
  shoesType: 'sneakers',
  shoesColor: '#F8FAFC',
  accessory: 'none',
  bgTheme: 'sunny_park',
  pose: 'idle',
};
