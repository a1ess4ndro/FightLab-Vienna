/**
 * Abschnittskopf: nur die Überschrift, wie im Entwurf v2. Die Nummerierung
 * trägt die Rail im Kopf, nicht der Abschnitt selbst.
 */
export function SectionHead({
  id,
  title,
  titleWidth = "max-w-[20ch]",
}: {
  id: string;
  title: string;
  titleWidth?: string;
}) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(18rem,100%),1fr))] items-end gap-s3 gap-x-s4">
      <h2
        id={id}
        className={`m-0 text-[clamp(1.5rem,3.6vw,2.875rem)] leading-[1.02] font-bold tracking-[-0.03em] ${titleWidth}`}
      >
        {title}
      </h2>
    </div>
  );
}
