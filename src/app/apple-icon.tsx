import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

/**
 * Apple-Touch-Icon. Next unterstützt hier kein SVG, deshalb wird die
 * Bildmarke zur Bauzeit einmal nach PNG gerastert. Quelle ist dieselbe
 * Datei wie für Favicon und Druck — es gibt nur eine Zeichnung.
 */
export default function AppleIcon() {
  const badge = readFileSync(
    join(process.cwd(), 'public/brand/fightlab-icon.svg'),
    'base64',
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#201D1B',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/svg+xml;base64,${badge}`}
          width={180}
          height={180}
          alt=""
        />
      </div>
    ),
    size,
  );
}
