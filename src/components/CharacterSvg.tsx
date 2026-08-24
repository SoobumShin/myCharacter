import React from 'react';
import { CharacterConfig } from '../types';

interface CharacterSvgProps {
  config: CharacterConfig;
  className?: string;
  isAnimated?: boolean;
}

export const CharacterSvg: React.FC<CharacterSvgProps> = ({
  config,
  className = '',
  isAnimated = true,
}) => {
  const {
    skinColor,
    faceExpression,
    hairStyle,
    hairColor,
    hatType,
    hatColor,
    topType,
    topColor,
    bottomType,
    bottomColor,
    shoesType,
    shoesColor,
    accessory,
    pose,
  } = config;

  // Derive pose animation classes
  let poseClass = '';
  if (isAnimated) {
    if (pose === 'dance') poseClass = 'animate-wiggle';
    else if (pose === 'jump') poseClass = 'animate-bounce';
    else if (pose === 'wave') poseClass = 'animate-pulse';
    else if (pose === 'heart') poseClass = 'animate-float';
  }

  // Darker shade helpers for shadows/strokes
  const shadowOf = (color: string) => `${color}CC`;

  return (
    <svg
      viewBox="0 0 300 400"
      className={`w-full h-full select-none ${poseClass} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Soft Drop Shadow Filter */}
        <filter id="char-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.15" />
        </filter>
        {/* Glow Filter */}
        <filter id="magic-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        {/* Striped Pattern */}
        <pattern id="striped-pattern" width="20" height="20" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="20" stroke="#FFFFFF" strokeWidth="8" strokeOpacity="0.4" />
        </pattern>
      </defs>

      {/* 1. BACK ACCESSORIES */}
      {accessory === 'wings' && (
        <g filter="url(#magic-glow)">
          {/* Left Wing */}
          <path
            d="M 110 200 C 40 160, 20 220, 50 250 C 70 270, 110 250, 120 230 Z"
            fill="#FFFFFF"
            stroke="#E2E8F0"
            strokeWidth="3"
            opacity="0.9"
          />
          <path
            d="M 90 210 C 50 180, 40 220, 65 240"
            stroke="#CBD5E1"
            strokeWidth="2"
            fill="none"
          />
          {/* Right Wing */}
          <path
            d="M 190 200 C 260 160, 280 220, 250 250 C 230 270, 190 250, 180 230 Z"
            fill="#FFFFFF"
            stroke="#E2E8F0"
            strokeWidth="3"
            opacity="0.9"
          />
          <path
            d="M 210 210 C 250 180, 260 220, 235 240"
            stroke="#CBD5E1"
            strokeWidth="2"
            fill="none"
          />
        </g>
      )}

      {accessory === 'backpack' && (
        <g>
          <rect x="105" y="195" width="90" height="85" rx="20" fill="#EA580C" stroke="#C2410C" strokeWidth="4" />
          <rect x="120" y="235" width="60" height="35" rx="10" fill="#FB923C" />
          <circle cx="150" cy="245" r="4" fill="#7C2D12" />
        </g>
      )}

      {accessory === 'balloon' && (
        <g className="animate-[bounce_2s_infinite]">
          <path d="M 70 190 Q 60 140 70 100" stroke="#94A3B8" strokeWidth="2" fill="none" strokeDasharray="3 3" />
          <path
            d="M 70 100 C 40 60, 20 90, 70 130 C 120 90, 100 60, 70 100 Z"
            fill="#F43F5E"
            stroke="#E11D48"
            strokeWidth="3"
          />
          <circle cx="58" cy="85" r="4" fill="#FFFFFF" opacity="0.6" />
        </g>
      )}

      {/* 2. BACK HAIR (Long styles / Twintails / Ponytail) */}
      {hairStyle === 'twintail' && (
        <g>
          {/* Left Pigtail */}
          <path
            d="M 85 130 C 45 150, 40 230, 75 250 C 90 220, 95 160, 85 130 Z"
            fill={hairColor}
            stroke="#1E293B"
            strokeWidth="3"
          />
          <circle cx="85" cy="138" r="7" fill="#F43F5E" />
          {/* Right Pigtail */}
          <path
            d="M 215 130 C 255 150, 260 230, 225 250 C 210 220, 205 160, 215 130 Z"
            fill={hairColor}
            stroke="#1E293B"
            strokeWidth="3"
          />
          <circle cx="215" cy="138" r="7" fill="#F43F5E" />
        </g>
      )}

      {hairStyle === 'ponytail' && (
        <g>
          <path
            d="M 200 110 C 260 120, 270 210, 230 240 C 220 200, 220 150, 195 125 Z"
            fill={hairColor}
            stroke="#1E293B"
            strokeWidth="3"
          />
          <ellipse cx="202" cy="115" rx="8" ry="12" fill="#3B82F6" />
        </g>
      )}

      {hairStyle === 'fluffy' && (
        <path
          d="M 75 140 C 50 190, 60 270, 95 285 C 105 270, 195 270, 205 285 C 240 270, 250 190, 225 140 Z"
          fill={hairColor}
          stroke="#1E293B"
          strokeWidth="3"
        />
      )}

      {/* 3. BODY BASE: LEGS & FEET */}
      <g id="legs">
        {/* Left Leg */}
        <rect x="118" y="270" width="24" height="60" rx="10" fill={skinColor} stroke="#1E293B" strokeWidth="3" />
        {/* Right Leg */}
        <rect x="158" y="270" width="24" height="60" rx="10" fill={skinColor} stroke="#1E293B" strokeWidth="3" />
      </g>

      {/* 4. SHOES */}
      <g id="shoes">
        {shoesType === 'sneakers' && (
          <g>
            {/* Left Sneaker */}
            <path
              d="M 112 322 L 144 322 C 146 322, 146 335, 142 338 L 105 338 C 103 332, 106 322, 112 322 Z"
              fill={shoesColor}
              stroke="#1E293B"
              strokeWidth="3"
            />
            <rect x="104" y="334" width="42" height="6" rx="3" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />
            {/* Right Sneaker */}
            <path
              d="M 156 322 L 188 322 C 194 322, 197 332, 195 338 L 158 338 C 154 335, 154 322, 156 322 Z"
              fill={shoesColor}
              stroke="#1E293B"
              strokeWidth="3"
            />
            <rect x="154" y="334" width="42" height="6" rx="3" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />
          </g>
        )}

        {shoesType === 'boots' && (
          <g>
            <rect x="114" y="305" width="28" height="34" rx="8" fill={shoesColor} stroke="#1E293B" strokeWidth="3" />
            <rect x="158" y="305" width="28" height="34" rx="8" fill={shoesColor} stroke="#1E293B" strokeWidth="3" />
            <ellipse cx="128" cy="305" rx="15" ry="5" fill="#FFFFFF" />
            <ellipse cx="172" cy="305" rx="15" ry="5" fill="#FFFFFF" />
          </g>
        )}

        {shoesType === 'slippers' && (
          <g>
            <ellipse cx="126" cy="332" rx="18" ry="9" fill={shoesColor} stroke="#1E293B" strokeWidth="3" />
            <circle cx="126" cy="328" r="4" fill="#F43F5E" />
            <ellipse cx="174" cy="332" rx="18" ry="9" fill={shoesColor} stroke="#1E293B" strokeWidth="3" />
            <circle cx="174" cy="328" r="4" fill="#F43F5E" />
          </g>
        )}

        {shoesType === 'sandals' && (
          <g>
            <ellipse cx="126" cy="334" rx="16" ry="6" fill="#78350F" stroke="#1E293B" strokeWidth="2" />
            <path d="M 115 330 Q 126 322 137 330" stroke={shoesColor} strokeWidth="4" fill="none" strokeLinecap="round" />
            <ellipse cx="174" cy="334" rx="16" ry="6" fill="#78350F" stroke="#1E293B" strokeWidth="2" />
            <path d="M 163 330 Q 174 322 185 330" stroke={shoesColor} strokeWidth="4" fill="none" strokeLinecap="round" />
          </g>
        )}
      </g>

      {/* 5. BOTTOM / PANTS / SKIRT */}
      <g id="bottom">
        {bottomType === 'shorts' && (
          <path
            d="M 115 240 L 185 240 L 190 280 L 158 280 L 150 258 L 142 280 L 110 280 Z"
            fill={bottomColor}
            stroke="#1E293B"
            strokeWidth="3"
          />
        )}

        {bottomType === 'pants' && (
          <path
            d="M 115 240 L 185 240 L 188 310 L 158 310 L 150 260 L 142 310 L 112 310 Z"
            fill={bottomColor}
            stroke="#1E293B"
            strokeWidth="3"
          />
        )}

        {bottomType === 'skirt' && (
          <path
            d="M 125 240 L 175 240 L 195 285 L 105 285 Z"
            fill={bottomColor}
            stroke="#1E293B"
            strokeWidth="3"
          />
        )}

        {bottomType === 'pleated_skirt' && (
          <g>
            <path
              d="M 125 240 L 175 240 L 198 285 L 102 285 Z"
              fill={bottomColor}
              stroke="#1E293B"
              strokeWidth="3"
            />
            {/* Pleats lines */}
            <line x1="120" y1="245" x2="115" y2="285" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.5" />
            <line x1="135" y1="245" x2="135" y2="285" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.5" />
            <line x1="150" y1="245" x2="150" y2="285" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.5" />
            <line x1="165" y1="245" x2="165" y2="285" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.5" />
            <line x1="180" y1="245" x2="185" y2="285" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.5" />
          </g>
        )}

        {bottomType === 'overalls' && (
          <g>
            {/* Pants part */}
            <path
              d="M 115 240 L 185 240 L 188 300 L 158 300 L 150 258 L 142 300 L 112 300 Z"
              fill={bottomColor}
              stroke="#1E293B"
              strokeWidth="3"
            />
            {/* Overalls bib & straps */}
            <rect x="126" y="215" width="48" height="28" fill={bottomColor} stroke="#1E293B" strokeWidth="3" />
            {/* Straps */}
            <line x1="130" y1="215" x2="122" y2="190" stroke={bottomColor} strokeWidth="7" strokeLinecap="round" />
            <line x1="170" y1="215" x2="178" y2="190" stroke={bottomColor} strokeWidth="7" strokeLinecap="round" />
            {/* Buttons */}
            <circle cx="132" cy="220" r="3" fill="#FBBF24" />
            <circle cx="168" cy="220" r="3" fill="#FBBF24" />
          </g>
        )}

        {bottomType === 'track_pants' && (
          <g>
            <path
              d="M 115 240 L 185 240 L 188 312 L 158 312 L 150 260 L 142 312 L 112 312 Z"
              fill={bottomColor}
              stroke="#1E293B"
              strokeWidth="3"
            />
            {/* Sporty side stripes */}
            <path d="M 116 242 L 114 310" stroke="#FFFFFF" strokeWidth="3" fill="none" />
            <path d="M 184 242 L 186 310" stroke="#FFFFFF" strokeWidth="3" fill="none" />
          </g>
        )}
      </g>

      {/* 6. TOP / SHIRT & ARMS */}
      <g id="top">
        {/* ARMS & HANDS based on pose */}
        {/* Left Arm */}
        {pose === 'wave' ? (
          <g>
            {/* Waving Arm raised up */}
            <path
              d="M 115 195 C 90 180, 70 140, 75 120"
              stroke={topColor}
              strokeWidth="18"
              strokeLinecap="round"
              fill="none"
            />
            {/* Left Hand */}
            <circle cx="75" cy="115" r="10" fill={skinColor} stroke="#1E293B" strokeWidth="2.5" />
          </g>
        ) : pose === 'heart' ? (
          <g>
            <path
              d="M 115 195 C 95 190, 110 160, 135 165"
              stroke={topColor}
              strokeWidth="16"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="138" cy="165" r="9" fill={skinColor} stroke="#1E293B" strokeWidth="2.5" />
          </g>
        ) : (
          <g>
            {/* Normal / idle left arm */}
            <path
              d="M 115 195 C 90 215, 95 245, 95 250"
              stroke={topColor}
              strokeWidth="16"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="95" cy="255" r="9" fill={skinColor} stroke="#1E293B" strokeWidth="2.5" />
          </g>
        )}

        {/* Right Arm */}
        {pose === 'heart' ? (
          <g>
            <path
              d="M 185 195 C 205 190, 190 160, 165 165"
              stroke={topColor}
              strokeWidth="16"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="162" cy="165" r="9" fill={skinColor} stroke="#1E293B" strokeWidth="2.5" />
            {/* Floating Mini Heart */}
            <path
              d="M 150 145 C 145 138, 135 140, 138 148 C 142 154, 150 160, 150 160 C 150 160, 158 154, 162 148 C 165 140, 155 138, 150 145 Z"
              fill="#F43F5E"
              className="animate-bounce"
            />
          </g>
        ) : pose === 'dance' ? (
          <g>
            <path
              d="M 185 195 C 215 180, 225 150, 230 135"
              stroke={topColor}
              strokeWidth="16"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="232" cy="130" r="9" fill={skinColor} stroke="#1E293B" strokeWidth="2.5" />
          </g>
        ) : (
          <g>
            {/* Normal right arm */}
            <path
              d="M 185 195 C 210 215, 205 245, 205 250"
              stroke={topColor}
              strokeWidth="16"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="205" cy="255" r="9" fill={skinColor} stroke="#1E293B" strokeWidth="2.5" />
          </g>
        )}

        {/* TOP TORSO BODY */}
        {topType === 'tshirt' && (
          <g>
            <path
              d="M 112 185 L 188 185 L 186 245 L 114 245 Z"
              fill={topColor}
              stroke="#1E293B"
              strokeWidth="3"
            />
            {/* Neck collar */}
            <path d="M 135 185 Q 150 198 165 185" fill={skinColor} stroke="#1E293B" strokeWidth="2" />
          </g>
        )}

        {topType === 'hoodie' && (
          <g>
            <path
              d="M 108 185 L 192 185 L 188 248 L 112 248 Z"
              fill={topColor}
              stroke="#1E293B"
              strokeWidth="3"
            />
            {/* Front Pocket */}
            <path
              d="M 130 220 L 170 220 L 175 242 L 125 242 Z"
              fill="#000000"
              fillOpacity="0.1"
              stroke="#1E293B"
              strokeWidth="2"
            />
            {/* Hoodie Strings */}
            <line x1="142" y1="190" x2="140" y2="210" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
            <line x1="158" y1="190" x2="160" y2="210" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
          </g>
        )}

        {topType === 'striped' && (
          <g>
            <path
              d="M 112 185 L 188 185 L 186 245 L 114 245 Z"
              fill={topColor}
              stroke="#1E293B"
              strokeWidth="3"
            />
            <path
              d="M 112 185 L 188 185 L 186 245 L 114 245 Z"
              fill="url(#striped-pattern)"
            />
            <path d="M 135 185 Q 150 198 165 185" fill={skinColor} stroke="#1E293B" strokeWidth="2" />
          </g>
        )}

        {topType === 'star_sweater' && (
          <g>
            <path
              d="M 110 185 L 190 185 L 186 245 L 114 245 Z"
              fill={topColor}
              stroke="#1E293B"
              strokeWidth="3"
            />
            {/* Big Golden Star Graphic */}
            <polygon
              points="150,202 153,212 163,212 155,218 158,228 150,222 142,228 145,218 137,212 147,212"
              fill="#FBBF24"
              stroke="#D97706"
              strokeWidth="1.5"
            />
          </g>
        )}

        {topType === 'heart_knit' && (
          <g>
            <path
              d="M 110 185 L 190 185 L 186 245 L 114 245 Z"
              fill={topColor}
              stroke="#1E293B"
              strokeWidth="3"
            />
            {/* Big Heart Graphic */}
            <path
              d="M 150 205 C 144 195, 130 198, 134 210 C 138 219, 150 228, 150 228 C 150 228, 162 219, 166 210 C 170 198, 156 195, 150 205 Z"
              fill="#F43F5E"
            />
          </g>
        )}

        {topType === 'school_vest' && (
          <g>
            {/* Inner White Shirt */}
            <path d="M 112 185 L 188 185 L 186 245 L 114 245 Z" fill="#F8FAFC" stroke="#1E293B" strokeWidth="3" />
            {/* Outer Vest */}
            <path d="M 112 185 L 132 185 L 140 245 L 114 245 Z" fill={topColor} stroke="#1E293B" strokeWidth="2" />
            <path d="M 188 185 L 168 185 L 160 245 L 186 245 Z" fill={topColor} stroke="#1E293B" strokeWidth="2" />
            {/* Red Tie */}
            <polygon points="146,188 154,188 156,220 150,226 144,220" fill="#DC2626" stroke="#991B1B" strokeWidth="1.5" />
          </g>
        )}

        {topType === 'jacket' && (
          <g>
            {/* Inner T-shirt */}
            <rect x="135" y="185" width="30" height="60" fill="#FFFFFF" />
            {/* Jacket body */}
            <path
              d="M 110 185 L 136 185 L 136 246 L 112 246 Z"
              fill={topColor}
              stroke="#1E293B"
              strokeWidth="3"
            />
            <path
              d="M 190 185 L 164 185 L 164 246 L 188 246 Z"
              fill={topColor}
              stroke="#1E293B"
              strokeWidth="3"
            />
            {/* Buttons */}
            <circle cx="150" cy="205" r="2.5" fill="#FBBF24" />
            <circle cx="150" cy="225" r="2.5" fill="#FBBF24" />
          </g>
        )}
      </g>

      {/* 7. HEAD & FACE BASE */}
      <g id="head" filter="url(#char-shadow)">
        {/* Neck */}
        <rect x="138" y="165" width="24" height="25" rx="6" fill={skinColor} stroke="#1E293B" strokeWidth="2.5" />

        {/* Ears */}
        <circle cx="95" cy="125" r="14" fill={skinColor} stroke="#1E293B" strokeWidth="3" />
        <circle cx="95" cy="125" r="7" fill="#FCA5A5" opacity="0.4" />
        <circle cx="205" cy="125" r="14" fill={skinColor} stroke="#1E293B" strokeWidth="3" />
        <circle cx="205" cy="125" r="7" fill="#FCA5A5" opacity="0.4" />

        {/* Main Head Shape */}
        <ellipse cx="150" cy="125" rx="55" ry="50" fill={skinColor} stroke="#1E293B" strokeWidth="3.5" />

        {/* Rosy Cheeks (Blush) */}
        <circle cx="118" cy="138" r="10" fill="#F43F5E" opacity="0.35" />
        <circle cx="182" cy="138" r="10" fill="#F43F5E" opacity="0.35" />

        {/* EXPRESSIONS / EYES & MOUTH */}
        {faceExpression === 'smile' && (
          <g>
            {/* Left Eye */}
            <ellipse cx="128" cy="120" rx="6" ry="8" fill="#1E293B" />
            <circle cx="126" cy="117" r="2.5" fill="#FFFFFF" />
            {/* Right Eye */}
            <ellipse cx="172" cy="120" rx="6" ry="8" fill="#1E293B" />
            <circle cx="170" cy="117" r="2.5" fill="#FFFFFF" />
            {/* Eyebrows */}
            <path d="M 120 108 Q 128 104 136 108" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M 164 108 Q 172 104 180 108" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {/* Happy Open Mouth */}
            <path d="M 140 135 Q 150 152 160 135 Z" fill="#DC2626" stroke="#1E293B" strokeWidth="2" />
            <path d="M 143 140 Q 150 148 157 140" fill="#FB7185" />
          </g>
        )}

        {faceExpression === 'wink' && (
          <g>
            {/* Left Eye: Big Sparkle Open */}
            <ellipse cx="128" cy="120" rx="6" ry="8" fill="#1E293B" />
            <circle cx="126" cy="117" r="2.5" fill="#FFFFFF" />
            {/* Right Eye: Wink Line */}
            <path d="M 164 122 Q 172 114 180 122" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            {/* Playful Mouth */}
            <path d="M 142 136 Q 150 148 158 136" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" fill="none" />
          </g>
        )}

        {faceExpression === 'sparkle' && (
          <g>
            {/* Left Star Eye */}
            <polygon points="128,112 130,118 136,120 130,122 128,128 126,122 120,120 126,118" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
            {/* Right Star Eye */}
            <polygon points="172,112 174,118 180,120 174,122 172,128 170,122 164,120 170,118" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
            {/* Happy Open Wow Mouth */}
            <ellipse cx="150" cy="140" rx="8" ry="10" fill="#DC2626" stroke="#1E293B" strokeWidth="2" />
          </g>
        )}

        {faceExpression === 'cute' && (
          <g>
            {/* Curved Happy Eyes */}
            <path d="M 120 120 Q 128 112 136 120" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path d="M 164 120 Q 172 112 180 120" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            {/* Cute Cat Mouth '3' */}
            <path d="M 142 135 Q 146 142 150 137 Q 154 142 158 135" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" fill="none" />
          </g>
        )}

        {faceExpression === 'shy' && (
          <g>
            {/* Blushing Shy Eyes */}
            <ellipse cx="128" cy="120" rx="5" ry="6" fill="#1E293B" />
            <ellipse cx="172" cy="120" rx="5" ry="6" fill="#1E293B" />
            <path d="M 144 136 Q 150 142 156 136" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {/* Extra Blush */}
            <circle cx="116" cy="136" r="12" fill="#FB7185" opacity="0.5" />
            <circle cx="184" cy="136" r="12" fill="#FB7185" opacity="0.5" />
          </g>
        )}

        {faceExpression === 'sunglasses' && (
          <g>
            {/* Cool Black Sunglasses */}
            <rect x="110" y="112" width="34" height="22" rx="6" fill="#0F172A" stroke="#334155" strokeWidth="2.5" />
            <rect x="156" y="112" width="34" height="22" rx="6" fill="#0F172A" stroke="#334155" strokeWidth="2.5" />
            <line x1="144" y1="120" x2="156" y2="120" stroke="#0F172A" strokeWidth="4" />
            {/* White Reflection line */}
            <line x1="116" y1="116" x2="128" y2="128" stroke="#FFFFFF" strokeWidth="2.5" strokeOpacity="0.7" strokeLinecap="round" />
            <line x1="162" y1="116" x2="174" y2="128" stroke="#FFFFFF" strokeWidth="2.5" strokeOpacity="0.7" strokeLinecap="round" />
            {/* Smug Smile */}
            <path d="M 142 140 Q 155 146 160 138" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" fill="none" />
          </g>
        )}
      </g>

      {/* 8. FRONT HAIR / BANGS */}
      <g id="hair-front">
        {hairStyle === 'short' && (
          <path
            d="M 96 115 C 90 70, 210 70, 204 115 C 190 100, 180 110, 165 95 C 150 110, 135 95, 120 110 C 110 100, 100 110, 96 115 Z"
            fill={hairColor}
            stroke="#1E293B"
            strokeWidth="3"
          />
        )}

        {hairStyle === 'bob' && (
          <g>
            <path
              d="M 94 135 C 90 60, 210 60, 206 135 C 200 150, 192 145, 190 105 C 175 110, 160 100, 150 108 C 140 100, 125 110, 110 105 C 108 145, 100 150, 94 135 Z"
              fill={hairColor}
              stroke="#1E293B"
              strokeWidth="3"
            />
          </g>
        )}

        {hairStyle === 'twintail' && (
          <path
            d="M 96 115 C 90 68, 210 68, 204 115 C 190 102, 175 108, 150 100 C 125 108, 110 102, 96 115 Z"
            fill={hairColor}
            stroke="#1E293B"
            strokeWidth="3"
          />
        )}

        {hairStyle === 'ponytail' && (
          <path
            d="M 96 115 C 90 68, 210 68, 204 115 C 185 100, 165 106, 150 98 C 135 106, 115 100, 96 115 Z"
            fill={hairColor}
            stroke="#1E293B"
            strokeWidth="3"
          />
        )}

        {hairStyle === 'curly' && (
          <g>
            <circle cx="105" cy="88" r="18" fill={hairColor} stroke="#1E293B" strokeWidth="2.5" />
            <circle cx="130" cy="76" r="18" fill={hairColor} stroke="#1E293B" strokeWidth="2.5" />
            <circle cx="155" cy="74" r="18" fill={hairColor} stroke="#1E293B" strokeWidth="2.5" />
            <circle cx="178" cy="78" r="18" fill={hairColor} stroke="#1E293B" strokeWidth="2.5" />
            <circle cx="196" cy="94" r="18" fill={hairColor} stroke="#1E293B" strokeWidth="2.5" />
            <circle cx="95" cy="110" r="15" fill={hairColor} stroke="#1E293B" strokeWidth="2.5" />
            <circle cx="205" cy="110" r="15" fill={hairColor} stroke="#1E293B" strokeWidth="2.5" />
          </g>
        )}

        {hairStyle === 'spiky' && (
          <path
            d="M 94 110 L 105 70 L 122 88 L 138 60 L 155 85 L 175 62 L 190 85 L 206 110 C 190 100, 110 100, 94 110 Z"
            fill={hairColor}
            stroke="#1E293B"
            strokeWidth="3"
          />
        )}

        {hairStyle === 'fluffy' && (
          <path
            d="M 94 125 C 90 65, 210 65, 206 125 C 190 105, 175 110, 150 102 C 125 110, 110 105, 94 125 Z"
            fill={hairColor}
            stroke="#1E293B"
            strokeWidth="3"
          />
        )}
      </g>

      {/* 9. HAT / HEADWEAR */}
      <g id="hat">
        {hatType === 'cap' && (
          <g filter="url(#char-shadow)">
            {/* Cap Dome */}
            <path
              d="M 95 95 C 95 45, 205 45, 205 95 Z"
              fill={hatColor}
              stroke="#1E293B"
              strokeWidth="3.5"
            />
            {/* Cap Visor (Front peak) */}
            <path
              d="M 90 92 Q 150 105 220 90 Q 150 82 90 92 Z"
              fill={shadowOf(hatColor)}
              stroke="#1E293B"
              strokeWidth="3"
            />
            {/* Top Button */}
            <circle cx="150" cy="50" r="6" fill="#FBBF24" stroke="#1E293B" strokeWidth="2" />
          </g>
        )}

        {hatType === 'beanie' && (
          <g filter="url(#char-shadow)">
            {/* Beanie Dome */}
            <path
              d="M 92 98 C 90 40, 210 40, 208 98 Z"
              fill={hatColor}
              stroke="#1E293B"
              strokeWidth="3.5"
            />
            {/* Folded Brim */}
            <rect x="88" y="85" width="124" height="20" rx="8" fill="#FFFFFF" fillOpacity="0.25" stroke="#1E293B" strokeWidth="3" />
            {/* Fluffy Pom-pom on top */}
            <circle cx="150" cy="38" r="15" fill="#FFFFFF" stroke="#1E293B" strokeWidth="3" />
          </g>
        )}

        {hatType === 'crown' && (
          <g filter="url(#magic-glow)">
            <polygon
              points="105,95 105,55 125,75 150,45 175,75 195,55 195,95"
              fill="#FBBF24"
              stroke="#B45309"
              strokeWidth="3.5"
            />
            {/* Jewels */}
            <circle cx="105" cy="55" r="4" fill="#EF4444" />
            <circle cx="150" cy="45" r="5" fill="#3B82F6" />
            <circle cx="195" cy="55" r="4" fill="#10B981" />
            <rect x="105" y="88" width="90" height="7" rx="3" fill="#D97706" />
          </g>
        )}

        {hatType === 'cat_ears' && (
          <g>
            {/* Headband base */}
            <path d="M 95 95 Q 150 65 205 95" stroke="#1E293B" strokeWidth="4" fill="none" />
            {/* Left Cat Ear */}
            <polygon points="105,82 120,40 135,76" fill={hatColor} stroke="#1E293B" strokeWidth="3" />
            <polygon points="112,75 120,52 128,72" fill="#FCA5A5" />
            {/* Right Cat Ear */}
            <polygon points="165,76 180,40 195,82" fill={hatColor} stroke="#1E293B" strokeWidth="3" />
            <polygon points="172,72 180,52 188,75" fill="#FCA5A5" />
          </g>
        )}

        {hatType === 'ribbon' && (
          <g filter="url(#char-shadow)">
            {/* Left Bow Loop */}
            <ellipse cx="120" cy="65" rx="22" ry="14" fill={hatColor} stroke="#1E293B" strokeWidth="3" transform="rotate(-15 120 65)" />
            {/* Right Bow Loop */}
            <ellipse cx="180" cy="65" rx="22" ry="14" fill={hatColor} stroke="#1E293B" strokeWidth="3" transform="rotate(15 180 65)" />
            {/* Center Knot */}
            <circle cx="150" cy="65" r="10" fill="#FFFFFF" fillOpacity="0.4" stroke="#1E293B" strokeWidth="3" />
          </g>
        )}

        {hatType === 'beret' && (
          <g filter="url(#char-shadow)">
            <path
              d="M 85 90 C 80 45, 215 35, 220 85 C 220 95, 95 105, 85 90 Z"
              fill={hatColor}
              stroke="#1E293B"
              strokeWidth="3.5"
            />
            {/* Beret little stem */}
            <line x1="160" y1="46" x2="162" y2="38" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
          </g>
        )}

        {hatType === 'wizard' && (
          <g filter="url(#char-shadow)">
            {/* Wizard Cone */}
            <path
              d="M 100 85 Q 160 20 180 15 Q 150 45 200 85 Z"
              fill={hatColor}
              stroke="#1E293B"
              strokeWidth="3.5"
            />
            {/* Wizard Brim */}
            <ellipse cx="150" cy="85" rx="65" ry="15" fill={shadowOf(hatColor)} stroke="#1E293B" strokeWidth="3.5" />
            {/* Star on hat */}
            <polygon points="145,50 147,56 153,56 148,60 150,66 145,62 140,66 142,60 137,56 143,56" fill="#FBBF24" />
          </g>
        )}

        {hatType === 'bucket' && (
          <g filter="url(#char-shadow)">
            <path
              d="M 105 85 L 115 50 L 185 50 L 195 85 Z"
              fill={hatColor}
              stroke="#1E293B"
              strokeWidth="3.5"
            />
            <path
              d="M 85 88 Q 150 102 215 88 Q 150 78 85 88 Z"
              fill={shadowOf(hatColor)}
              stroke="#1E293B"
              strokeWidth="3"
            />
          </g>
        )}
      </g>

      {/* 10. FRONT ACCESSORIES (Magic wand, Guitar, Glasses) */}
      {accessory === 'glasses' && (
        <g>
          {/* Glasses Frames */}
          <circle cx="128" cy="120" r="14" fill="none" stroke="#1E293B" strokeWidth="3" />
          <circle cx="172" cy="120" r="14" fill="none" stroke="#1E293B" strokeWidth="3" />
          <line x1="142" y1="120" x2="158" y2="120" stroke="#1E293B" strokeWidth="3" />
          <line x1="95" y1="116" x2="114" y2="120" stroke="#1E293B" strokeWidth="2.5" />
          <line x1="186" y1="120" x2="205" y2="116" stroke="#1E293B" strokeWidth="2.5" />
        </g>
      )}

      {accessory === 'magic_wand' && (
        <g filter="url(#magic-glow)">
          <line x1="210" y1="240" x2="245" y2="170" stroke="#F59E0B" strokeWidth="5" strokeLinecap="round" />
          {/* Star tip */}
          <polygon
            points="245,160 248,168 256,168 250,174 252,182 245,177 238,182 240,174 234,168 242,168"
            fill="#FBBF24"
            stroke="#D97706"
            strokeWidth="1.5"
          />
        </g>
      )}

      {accessory === 'guitar' && (
        <g>
          {/* Guitar body */}
          <ellipse cx="145" cy="245" rx="30" ry="22" fill="#EA580C" stroke="#7C2D12" strokeWidth="3" transform="rotate(-30 145 245)" />
          <circle cx="145" cy="245" r="7" fill="#1E293B" />
          {/* Guitar neck */}
          <line x1="145" y1="245" x2="90" y2="190" stroke="#B45309" strokeWidth="6" strokeLinecap="round" />
          <rect x="80" y="180" width="12" height="15" fill="#78350F" transform="rotate(-30 80 180)" />
        </g>
      )}
    </svg>
  );
};
