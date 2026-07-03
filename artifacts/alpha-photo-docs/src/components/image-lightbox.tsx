import { useEffect, useState } from 'react';

type LightboxImage = {
  src: string;
  alt: string;
};

export default function ImageLightbox() {
  const [image, setImage] = useState<LightboxImage | null>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const clickedImage = target?.closest('img');

      if (!clickedImage || clickedImage.closest('.site-image-lightbox')) {
        return;
      }

      const src = clickedImage.currentSrc || clickedImage.src;
      if (!src) {
        return;
      }

      event.preventDefault();
      setImage({
        src,
        alt: clickedImage.alt || 'Hình ảnh trong khóa học',
      });
    };

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, []);

  useEffect(() => {
    if (!image) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setImage(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [image]);

  if (!image) {
    return null;
  }

  return (
    <div
      className="site-image-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Xem ảnh phóng to"
      onClick={() => setImage(null)}
    >
      <button
        className="site-image-lightbox-close"
        type="button"
        onClick={() => setImage(null)}
        aria-label="Đóng ảnh phóng to"
      >
        Đóng
      </button>

      <figure className="site-image-lightbox-stage" onClick={(event) => event.stopPropagation()}>
        <img src={image.src} alt={image.alt} />
        <figcaption>
          <span>Click bên ngoài hoặc nhấn ESC để đóng</span>
          <strong>{image.alt}</strong>
        </figcaption>
      </figure>
    </div>
  );
}
