export function Slide11Gracias() {
  return (
    <div className="w-full max-w-4xl px-8 flex flex-col items-center justify-center gap-12">
      <img
        src="/assets/logo-gidas.png"
        className="h-28 opacity-80"
        alt="GiDAS"
      />

      <h1 className="font-sans text-6xl font-bold text-white text-center leading-tight">
        ¡Muchas Gracias!
      </h1>

      <h2 className="font-mono text-2xl text-accent-green text-center">
        Tiempo de preguntas
      </h2>

      <div className="flex flex-col items-center gap-2 mt-4">
        <a
          href="https://gidas.frlp.utn.edu.ar"
          target="_blank"
          className="font-mono text-lg text-gray-400 hover:text-accent-green transition-colors"
        >
          gidas.frlp.utn.edu.ar
        </a>
        <a
          href="mailto:gidas@frlp.utn.edu.ar"
          className="font-mono text-lg text-gray-400 hover:text-accent-green transition-colors"
        >
          gidas@frlp.utn.edu.ar
        </a>
      </div>
    </div>
  );
}
