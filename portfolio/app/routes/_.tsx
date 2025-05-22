export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#336699] to-[#99ccff] px-6">
      <h1 className="text-6xl font-bold text-white mb-4">404</h1>
      <p className="text-xl text-white/80 mb-6">
        The page you're looking for doesn't exist.
      </p>
      <a
        href="/"
        className="text-sm text-[#336699] bg-white px-4 py-2 rounded shadow hover:bg-gray-100 transition"
      >
        ← Back to Home
      </a>
    </div>
  );
}
