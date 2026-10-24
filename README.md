# Un mes con Effie

Sitio hecho con **Vite** (HTML, CSS y JavaScript, sin frameworks). Vite lo empaqueta y lo minimiza para que cargue rápido.

## Carpetas

```
un-mes-effie/
├── index.html          ← estructura de la página
├── src/contenido.js    ← TODO el texto editable (fecha, canciones, estrellas, libros, bitácora, momentos, herbario, amor, firma)
├── src/estilos.css     ← diseño y animaciones
├── src/main.js         ← interacciones (no hace falta tocarlo)
├── public/fotos/       ← fotos de Effie optimizadas (.webp)
├── package.json
└── README.md
```

## Subirla a Vercel

### Opción A · GitHub + Vercel (recomendada)

1. En github.com: **+ → New repository** → nombre `un-mes-effie` → **Private** → **Create repository**.
2. Toca **uploading an existing file**.
3. Descomprime el .zip y arrastra **el contenido** de la carpeta `un-mes-effie` (index.html, src, public, package.json, README.md, .gitignore). No subas `node_modules` ni `dist` si llegaras a tenerlas.
4. **Commit changes**.
5. En vercel.com: **Add New… → Project** → elige `un-mes-effie` → **Import**.
6. Vercel detecta **Vite** solo. Revisa que diga:
   - Build Command: `npm run build`
   - Output Directory: `dist`
7. **Deploy**. Al terminar te da el enlace `algo.vercel.app`.

Para cambiar algo después: en GitHub abre el archivo (casi siempre `src/contenido.js`), toca el lápiz ✏️, edita y **Commit changes**. Vercel publica la nueva versión solo en uno o dos minutos.

### Opción B · Desde tu computadora

1. Instala Node.js 18 o más nuevo (nodejs.org).
2. En la terminal, dentro de la carpeta: `npm install`
3. Para verla en tu computadora mientras editas: `npm run dev` y abre la dirección que aparece (por ejemplo `http://localhost:5173`).
4. Para publicar: `npx vercel` (la primera vez te pide iniciar sesión) y después `npx vercel --prod`.

> Importante: ya no se abre con doble clic en `index.html`. Usa `npm run dev` o el enlace de Vercel.

### Cambiar el nombre del enlace

Vercel → tu proyecto → **Settings → Domains** → edita el dominio `.vercel.app`.

## Qué puedes editar en `src/contenido.js`

| Qué | Dónde |
|---|---|
| Día en que dijo que sí | `inicio` |
| Tu firma | `firma` |
| Canciones (la tuya y la suya) y tus mensajes | `canciones.mia`, `canciones.suya` |
| Las 11 razones de las estrellas | `estrellas[].razon` |
| Libros y tus reseñas | `libros` |
| La bitácora del teléfono (capítulos) | `bitacora` |
| Momentos compartidos | `momentos` |
| Herbario | `herbario` |
| Qué es el amor para los dos | `amor` |

Para agregar un capítulo nuevo a la bitácora, copia un bloque `{ titulo: "...", texto: ["párrafo 1", "párrafo 2"] }` y pégalo al final de la lista `bitacora`.

## Fotos

- Las fotos de Effie están en `public/fotos/` en formato `.webp` (más livianas).
- Para poner una foto en un momento compartido: copia la imagen a `public/fotos/` (nombre sin espacios ni tildes, por ejemplo `overcooked.jpg`) y en `contenido.js` escribe `foto: "/fotos/overcooked.jpg"`.
- Si la foto pesa mucho, conviértela a .webp en squoosh.app antes de subirla.

## Notas

- Las canciones suenan con el reproductor oficial de Spotify. Con sesión iniciada en Spotify en el navegador se escuchan completas; sin sesión, Spotify solo deja 30 segundos.
- El reproductor de Spotify se carga recién cuando ella llega a esa sala, para que la página abra rápido.
- Las estrellas encontradas se guardan en el navegador de quien abre la página.
- Fotos de referencia: Unsplash (licencia libre). Créditos al pie de la página.
