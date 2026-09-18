/** Haarlinie, die zu beiden Seiten ausläuft. Trennt Einwände von der Laufzeit. */
export function Divider() {
  return (
    <div className="grid content-center bg-ground px-[clamp(1.125rem,4vw,3.5rem)] py-[clamp(2.75rem,6vw,5.5rem)]">
      <div
        aria-hidden
        className="mx-auto h-px w-full max-w-[87.5rem] bg-[linear-gradient(90deg,transparent_0%,oklch(0.76_0.006_80)_16%,oklch(0.76_0.006_80)_84%,transparent_100%)]"
      />
    </div>
  );
}
