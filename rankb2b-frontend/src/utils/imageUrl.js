// frontend/src/utils/imageUrl.js
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

export function getFullImageUrl(imagePath) {
  if (!imagePath) return '';
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  const uploadBase = API_URL.replace(/\/api\/v1\/?$/, '');
  const clean = imagePath.startsWith('/api/v1') ? imagePath.slice(7) : imagePath;
  return `${uploadBase}${clean}`;
}