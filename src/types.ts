export type FaceExpression = 'smile' | 'wink' | 'sparkle' | 'cute' | 'shy' | 'sunglasses';

export type HairStyle = 'short' | 'bob' | 'twintail' | 'curly' | 'ponytail' | 'spiky' | 'fluffy';

export type HatType =
  | 'none'
  | 'cap'
  | 'beanie'
  | 'crown'
  | 'cat_ears'
  | 'beret'
  | 'wizard'
  | 'bucket'
  | 'ribbon';

export type TopType =
  | 'tshirt'
  | 'hoodie'
  | 'striped'
  | 'star_sweater'
  | 'school_vest'
  | 'heart_knit'
  | 'jacket';

export type BottomType =
  | 'shorts'
  | 'pants'
  | 'skirt'
  | 'overalls'
  | 'track_pants'
  | 'pleated_skirt';

export type ShoesType = 'sneakers' | 'boots' | 'slippers' | 'sandals';

export type AccessoryType =
  | 'none'
  | 'glasses'
  | 'backpack'
  | 'wings'
  | 'guitar'
  | 'magic_wand'
  | 'balloon';

export type BgTheme =
  | 'sunny_park'
  | 'rainbow_room'
  | 'starry_night'
  | 'candy_land'
  | 'classroom'
  | 'pixel_stage';

export type PoseType = 'idle' | 'wave' | 'dance' | 'jump' | 'heart';

export interface CharacterConfig {
  id: string;
  name: string;
  createdAt: number;
  // Core colors & items
  skinColor: string;
  faceExpression: FaceExpression;
  hairStyle: HairStyle;
  hairColor: string;
  hatType: HatType;
  hatColor: string;
  topType: TopType;
  topColor: string;
  bottomType: BottomType;
  bottomColor: string;
  shoesType: ShoesType;
  shoesColor: string;
  accessory: AccessoryType;
  bgTheme: BgTheme;
  pose: PoseType;
}

export type CategoryTab = 'hat' | 'top' | 'bottom' | 'face_hair' | 'shoes_acc' | 'bg_pose';

export interface ColorOption {
  name: string;
  hex: string;
  textColor?: string;
}
