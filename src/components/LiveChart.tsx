import { useEffect, useRef } from 'react';

export function LiveChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let data = Array.from({ length: 50 }, () => Math.random() * 50 + 25);
    let animId: number;

    function draw() {
      data.shift();
      data.push(Math.random() * 50 + 25);

      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      ctx!.beginPath();
      ctx!.strokeStyle = '#00FF41';
      ctx!.lineWidth = 1;

      data.forEach((val, i) => {
        const x = (i / data.length) * canvas!.width;
        const y = canvas!.height - (val / 100) * canvas!.height;
        if (i === 0) ctx!.moveTo(x, y);
        else ctx!.lineTo(x, y);
      });

      ctx!.stroke();

      ctx!.lineTo(canvas!.width, canvas!.height);
      ctx!.lineTo(0, canvas!.height);
      ctx!.closePath();
      ctx!.fillStyle = 'rgba(0, 255, 65, 0.1)';
      ctx!.fill();

      animId = requestAnimationFrame(draw);
    }

    const timeout = setTimeout(() => {
      animId = requestAnimationFrame(draw);
    }, 100);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={300}
      height={100}
      className="w-full"
    />
  );
}
