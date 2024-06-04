// Convert hex to RGB
const hexToRgb = (hex: string) => {
  hex = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => {
    return r + r + g + g + b + b;
  });
  const bigint = parseInt(hex.slice(1), 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
};

// Convert RGB to hex
const rgbToHex = (rgb: number[]) =>
  '#' +
  ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1);

// Parse RGB string to array
const parseRgbString = (rgb: string) => {
  const matches = rgb.match(/\d+/g);
  if (matches && matches.length === 3) {
    return matches.map(Number);
  }
  throw new Error('Invalid RGB string format');
};

const adjustColorBrightness = (color: string, percent = 20) => {
  if (color.startsWith('rgb')) {
    const rgbArray = parseRgbString(color);
    const max = 255;
    const newR = Math.round(
      rgbArray[0] + (max - rgbArray[0]) * (percent / 100)
    );
    const newG = Math.round(
      rgbArray[1] + (max - rgbArray[1]) * (percent / 100)
    );
    const newB = Math.round(
      rgbArray[2] + (max - rgbArray[2]) * (percent / 100)
    );
    return rgbToHex([newR, newG, newB]);
  } else if (color.startsWith('#')) {
    const [r, g, b] = hexToRgb(color);
    const max = 255;
    const newR = Math.round(r + (max - r) * (percent / 100));
    const newG = Math.round(g + (max - g) * (percent / 100));
    const newB = Math.round(b + (max - b) * (percent / 100));
    return rgbToHex([newR, newG, newB]);
  } else {
    throw new Error('Unsupported color format');
  }
};

export default adjustColorBrightness;
