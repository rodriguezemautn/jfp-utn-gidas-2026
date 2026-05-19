import devsecopsGif from '../assets/DevSecOps.gif';

export function DevSecOpsScanner() {
  return (
    <div className="relative overflow-hidden rounded-lg" style={{ background: '#080808' }}>
      {/* Scanning line */}
      <div className="scanner-line absolute left-0 right-0 z-10 pointer-events-none" />

      {/* Corner brackets */}
      <div className="absolute top-2 left-2 z-20 pointer-events-none">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M0 0h20M0 0v20" stroke="#00FF41" strokeWidth="2" opacity="0.6" />
        </svg>
      </div>
      <div className="absolute top-2 right-2 z-20 pointer-events-none">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="scale-x-[-1]">
          <path d="M0 0h20M0 0v20" stroke="#00FF41" strokeWidth="2" opacity="0.6" />
        </svg>
      </div>
      <div className="absolute bottom-2 left-2 z-20 pointer-events-none">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="scale-y-[-1]">
          <path d="M0 0h20M0 0v20" stroke="#00FF41" strokeWidth="2" opacity="0.6" />
        </svg>
      </div>
      <div className="absolute bottom-2 right-2 z-20 pointer-events-none">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="scale-[-1]">
          <path d="M0 0h20M0 0v20" stroke="#00FF41" strokeWidth="2" opacity="0.6" />
        </svg>
      </div>

      {/* Floating data particles */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="data-particle absolute w-1 h-1 rounded-full bg-accent-green"
            style={{
              left: `${15 + i * 14}%`,
              top: `${20 + (i % 3) * 30}%`,
              opacity: 0.3 + (i * 0.1),
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${2 + (i % 3)}s`,
            }}
          />
        ))}
      </div>

      {/* Scanning status badge */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <div className="scanning-badge px-3 py-1 rounded-full border border-accent-green/30 bg-black/60 backdrop-blur-sm flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-accent-green pulse-dot" />
          <span className="font-mono text-[10px] text-accent-green tracking-widest uppercase">Scanning Pipeline</span>
        </div>
      </div>

      {/* Status log overlay */}
      <div className="absolute bottom-3 left-3 z-20 pointer-events-none">
          <div className="font-mono text-[10px] text-accent-green/60 leading-relaxed scan-log">
            <div className="typing-line" style={{ animationDelay: '0s' }}>{'>'} INIT: security_scan</div>
            <div className="typing-line" style={{ animationDelay: '2s' }}>{'>'} OK: pipeline_integrity</div>
            <div className="typing-line" style={{ animationDelay: '4s' }}>{'>'} RUN: devsecops_cycle</div>
          </div>
      </div>

      {/* The image */}
      <img
        src={devsecopsGif}
        alt="DevSecOps lifecycle"
        className="w-full block relative z-0"
        style={{ maxHeight: '340px', objectFit: 'contain' }}
      />

      {/* Bottom glow */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-accent-green/10 to-transparent z-10 pointer-events-none" />
    </div>
  );
}
