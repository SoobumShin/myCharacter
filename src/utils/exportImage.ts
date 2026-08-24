import { CharacterConfig } from '../types';

/**
 * Exports the current SVG character and card background to a high-resolution PNG image
 */
export async function downloadCharacterCard(
  config: CharacterConfig,
  svgElement: SVGSVGElement | null
): Promise<void> {
  if (!svgElement) return;

  try {
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const blobURL = window.URL.createObjectURL(svgBlob);

    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 700;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw background
    const gradient = ctx.createLinearGradient(0, 0, 0, 700);
    if (config.bgTheme === 'sunny_park') {
      gradient.addColorStop(0, '#7DD3FC');
      gradient.addColorStop(0.7, '#E0F2FE');
      gradient.addColorStop(1, '#86EFAC');
    } else if (config.bgTheme === 'starry_night') {
      gradient.addColorStop(0, '#0F172A');
      gradient.addColorStop(0.7, '#1E1B4B');
      gradient.addColorStop(1, '#334155');
    } else if (config.bgTheme === 'candy_land') {
      gradient.addColorStop(0, '#F472B6');
      gradient.addColorStop(0.7, '#FFE4E6');
      gradient.addColorStop(1, '#FB7185');
    } else if (config.bgTheme === 'classroom') {
      gradient.addColorStop(0, '#FEF3C7');
      gradient.addColorStop(0.7, '#FFFBEB');
      gradient.addColorStop(1, '#D97706');
    } else if (config.bgTheme === 'pixel_stage') {
      gradient.addColorStop(0, '#9333EA');
      gradient.addColorStop(0.7, '#EC4899');
      gradient.addColorStop(1, '#4338CA');
    } else {
      gradient.addColorStop(0, '#FBCFE8');
      gradient.addColorStop(0.7, '#F3E8FF');
      gradient.addColorStop(1, '#FED7AA');
    }

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 600, 700);

    // Decorative frame
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 12;
    ctx.strokeRect(16, 16, 568, 668);

    // Load SVG into Image
    const img = new Image();
    img.crossOrigin = 'anonymous';

    await new Promise<void>((resolve, reject) => {
      img.onload = () => {
        // Draw character centered
        ctx.drawImage(img, 75, 90, 450, 520);
        resolve();
      };
      img.onerror = (err) => reject(err);
      img.src = blobURL;
    });

    // Draw Name Tag at Top
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.roundRect(100, 36, 400, 50, [25]);
    ctx.fill();
    ctx.strokeStyle = '#4F46E5';
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.fillStyle = '#1E1B4B';
    ctx.font = 'bold 24px "Pretendard", "Noto Sans KR", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`✨ ${config.name || '나의 캐릭터'} ✨`, 300, 62);

    // Footer Watermark
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.font = '14px "Pretendard", "Noto Sans KR", sans-serif';
    ctx.fillText('내 캐릭터 꾸미기 • My Cute Character', 300, 650);

    // Convert canvas to image download
    const imageURL = canvas.toDataURL('image/png');
    const downloadLink = document.createElement('a');
    downloadLink.download = `${config.name || 'my_character'}.png`;
    downloadLink.href = imageURL;
    downloadLink.click();

    window.URL.revokeObjectURL(blobURL);
  } catch (error) {
    console.error('Failed to export character card:', error);
  }
}
