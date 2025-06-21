"use client";

export function Loader() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
      <div className="relative h-48 w-48 animate-spin-slow transform-style-preserve-3d">
        {/* Nucleus */}
        <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_20px_theme(colors.primary)]"></div>

        {/* Orbit 1 */}
        <div className="absolute inset-0 animate-orbit-1 transform-style-preserve-3d rounded-full border-2 border-primary/30">
          <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_15px_theme(colors.accent)]"></div>
        </div>

        {/* Orbit 2 */}
        <div className="absolute inset-0 animate-orbit-2 transform-style-preserve-3d rounded-full border-2 border-primary/30">
           <div className="absolute right-0 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_15px_theme(colors.accent)]"></div>
        </div>

        {/* Orbit 3 */}
        <div className="absolute inset-0 animate-orbit-3 transform-style-preserve-3d rounded-full border-2 border-primary/30">
           <div className="absolute bottom-0 left-1/4 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_15px_theme(colors.accent)]"></div>
        </div>
      </div>
    </div>
  );
}
