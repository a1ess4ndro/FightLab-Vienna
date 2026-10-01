/**
 * Die Wortmarke: Schriftzug, darunter die Ortszeile auf die volle Breite
 * verteilt — nie daneben, nie größer als ein Drittel der Wortmarkenhöhe
 * (Dokument 02).
 *
 * Ohne Bildmarke. Der Kolben steht weiterhin als Favicon, im Apple-Touch-Icon
 * und in `public/brand`, aber nicht mehr in der Lockup.
 *
 * Ortszeile und das „Lab" in Ember stehen fest im Bauteil statt als
 * Eigenschaft: Sie gehören zur Marke, nicht zur Fläche, in der die Marke
 * hängt — zwei Aufrufe mit zwei verschiedenen Zeilen oder Farben wären zwei
 * verschiedene Logos. Kopf und Fuß sind beide dunkel, Ember trägt auf beiden.
 */
const SIZES = {
  /** Kopfleiste. */
  sm: {
    name: 'text-base',
    sub: 'text-[0.5rem]',
  },
  /** Fuß. */
  lg: {
    name: 'text-[clamp(1.5rem,3vw,2.375rem)]',
    sub: 'text-[0.5938rem]',
  },
} as const;

const LOCATION = 'Vienna';

export function Wordmark({ size = 'sm' }: { size?: keyof typeof SIZES }) {
  const s = SIZES[size];

  return (
    // `w-fit`: der Block ist genau so breit wie der Schriftzug. Er gibt damit
    // das Maß vor, auf das die Ortszeile darunter verteilt wird, und die
    // Lockup bindet trotzdem linksbündig.
    <span className="grid w-fit gap-[2px]">
      <span
        className={`${s.name} leading-none font-bold tracking-[-0.03em] uppercase`}
      >
        Fight<span className="text-ember">Lab</span>
      </span>

      {/* Jeder Buchstabe ein eigenes Feld, der Zwischenraum entsteht aus
          `justify-between`: So steht das V genau unter dem F und das A unter
          dem letzten Buchstaben — auf jede Breite, ohne eine Laufweite zu
          raten, die nur bei einer Schriftgröße aufgeht.
          `tracking-[0em]` hebt die Sperrung aus `.data` auf; sie setzt auch
          hinter den letzten Buchstaben noch Luft und schöbe die Zeile sonst
          über die rechte Kante hinaus. */}
      <span
        aria-hidden
        className={`data ${s.sub} flex justify-between tracking-[0em] leading-none text-chalk2`}
      >
        {LOCATION.split('').map((letter, index) => (
          <span key={`${letter}-${index}`}>{letter}</span>
        ))}
      </span>

      {/* Einmal am Stück für die Sprachausgabe — aus einzelnen Feldern liest
          ein Screenreader sonst „V I E N N A".
          `absolute` muss dazu: `sr-only` allein schrumpft das Feld nur auf
          einen Pixel, nimmt es aber nicht aus dem Fluss — es stünde als
          dritte Rasterzeile da und legte über den Zeilenabstand zwei Pixel
          unter die Lockup. */}
      <span className="sr-only absolute">{LOCATION}</span>
    </span>
  );
}
