interface MascotProps {
  src?: string;
  alt?: string;
  className?: string;
}

export function Mascot({ src, alt = 'Mascot', className = 'w-24 h-24' }: MascotProps) {
  const defaultSrc = 'https://media.tenor.com/TCMWkxIkF9IAAAAj/dancing-gopher.gif';

  return (
    <div className="fixed bottom-24 right-8 z-30 pointer-events-none select-none mascot-float">
      <img
        src={src || defaultSrc}
        alt={alt}
        className={`${className} object-contain rounded-lg`}
        style={{ filter: 'drop-shadow(0 0 8px rgba(0,255,65,0.3))' }}
      />
    </div>
  );
}
