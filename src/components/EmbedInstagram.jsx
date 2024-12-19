import { useEffect } from 'react';

export default function EmbedInstagram() {
  useEffect(() => {
    // Memuat skrip Instagram ketika komponen di-mount
    const script = document.createElement('script');
    script.async = true;
    script.src = '//www.instagram.com/embed.js';
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  return (
    // <div className="h-80">
    <div className="instagram-container">
      <blockquote
        className="instagram-media"
        data-instgrm-captioned
        data-instgrm-permalink="https://www.instagram.com/p/Bn3k8FSHaA9/"
        data-instgrm-version="14"
      ></blockquote>
    </div>
    // </div>
  );
}
