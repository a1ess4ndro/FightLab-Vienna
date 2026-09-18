import { FightLabMark } from '@/components/ui/FightLabMark';

/**
 * Die Lockup: Bildmarke links, Wortmarke rechts, Sublabel unter der
 * Grundlinie — nie daneben, nie größer als ein Drittel der Wortmarkenhöhe
 * (Dokument 02).
 *
 * Der Schutzraum links entsteht über den Abstand zur Bildmarke, rechts über
 * das Raster der Fläche, in der die Lockup steht.
 */
const SIZES = {
  /** Kopfleiste. */
  sm: {
    mark: 'h-7 w-7',
    gap: 'gap-1',
    name: 'text-base',
    sub: 'text-[0.5rem] tracking-[0.24em]',
  },
  /** Fuß. */
  lg: {
    mark: 'h-[clamp(2.25rem,4.4vw,3.25rem)] w-[clamp(2.25rem,4.4vw,3.25rem)]',
    gap: 'gap-2',
    name: 'text-[clamp(1.5rem,3vw,2.375rem)]',
    sub: 'text-[0.5938rem] tracking-[0.26em]',
  },
} as const;

export function Wordmark({
  size = 'sm',
  sublabel,
  accent = false,
}: {
  size?: keyof typeof SIZES;
  sublabel: string;
  /** Kopfleiste setzt „Lab" in Ember ab, der Fuß bleibt einfarbig. */
  accent?: boolean;
}) {
  const s = SIZES[size];

  return (
    <span className={`flex items-end ${s.gap}`}>
      <FightLabMark className={`${s.mark} shrink-0`} />
      <span className="grid gap-[2px]">
        <span
          className={`${s.name} leading-none font-bold tracking-[-0.03em] uppercase`}
        >
          Fight{accent ? <span className="text-ember">Lab</span> : 'Lab'}
        </span>
        {/* leading-none: ohne das steht unter dem Sublabel noch eine halbe
            Zeilendurchschuss-Höhe Luft, und die Wortmarke sitzt sichtbar
            höher als der Kolben, obwohl die Boxen bündig sind. */}
        <span className={`data ${s.sub} leading-none text-chalk2 padding-0`}>
          {sublabel}
        </span>
      </span>
    </span>
  );
}
