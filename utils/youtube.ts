/**
 * YouTube URL'lerini embed formatına çeviren utility fonksiyonu
 * 
 * @param url - YouTube URL (watch?v=, youtu.be/, veya embed formatında olabilir)
 * @returns Embed URL formatında YouTube URL
 */
export function convertYouTubeUrlToEmbed(url: string): string {
  if (!url || typeof url !== 'string') {
    return '';
  }

  // Zaten embed formatındaysa direkt döndür
  if (url.includes('youtube.com/embed/')) {
    return url;
  }

  let videoId = '';

  // youtube.com/watch?v= formatı
  if (url.includes('youtube.com/watch?v=')) {
    const match = url.match(/[?&]v=([^&]+)/);
    videoId = match ? match[1] : '';
  }
  // youtu.be/ formatı
  else if (url.includes('youtu.be/')) {
    const match = url.match(/youtu\.be\/([^?]+)/);
    videoId = match ? match[1] : '';
  }
  // Sadece video ID ise
  else if (/^[a-zA-Z0-9_-]{11}$/.test(url.trim())) {
    videoId = url.trim();
  }

  if (!videoId) {
    console.warn('Invalid YouTube URL:', url);
    return '';
  }

  return `https://www.youtube.com/embed/${videoId}`;
}


