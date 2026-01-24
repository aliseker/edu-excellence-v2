/**
 * Kapak resmi olmayan blog kartları ve detay sayfası için
 * resmi blog/makale ikonu.
 */
interface BlogPlaceholderIconProps {
  className?: string;
  size?: number;
}

export default function BlogPlaceholderIcon({ className = '', size = 80 }: BlogPlaceholderIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* Makale / blog yazısı - sayfa + metin satırları */}
      <rect x="8" y="4" width="48" height="56" rx="2" fill="rgba(255,255,255,0.15)" stroke="currentColor" />
      <line x1="16" y1="16" x2="48" y2="16" />
      <line x1="16" y1="24" x2="48" y2="24" />
      <line x1="16" y1="32" x2="40" y2="32" />
      <line x1="16" y1="40" x2="44" y2="40" />
      <line x1="16" y1="48" x2="36" y2="48" />
    </svg>
  );
}
