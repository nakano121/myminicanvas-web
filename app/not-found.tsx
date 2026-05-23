import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <div className="text-6xl mb-6">🎨</div>
      <h1 className="text-3xl font-black text-ink mb-3">Page not found</h1>
      <p className="text-muted text-lg mb-8 max-w-sm">
        This page seems to have wandered off. Maybe it drew itself into a corner.
      </p>
      <Link
        href="/"
        className="bg-coral text-white font-bold px-7 py-3.5 rounded-full hover:bg-coral/90 transition-colors no-underline"
      >
        Back to home
      </Link>
    </div>
  );
}
