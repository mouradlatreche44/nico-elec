// Génère 2 images via Google Imagen 4 (Gemini API)
// Usage: node scripts/gen-imagen.mjs
import fs from 'node:fs/promises';
import path from 'node:path';

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) { console.error('Set GEMINI_API_KEY env var'); process.exit(1); }
const MODEL = 'gemini-2.5-flash-image';
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

const NICO = 'Nico, a 40-year-old French artisan electrician, athletic build, short dark brown slightly tousled hair, neatly trimmed brown beard, light olive-tan skin, green-hazel eyes, wearing a solid navy blue polo shirt with no visible logo, dark grey work trousers, black leather tool belt, brown leather watch, friendly confident expression';

const JOBS = [
  {
    file: 'assets/img/hero-chantier.jpg',
    aspectRatio: '16:9',
    prompt: `Editorial professional photograph of ${NICO}. He stands confidently in front of his open white service van (completely unbranded, no text of any kind, no stickers, side door slid open showing organized metal shelves with coiled electrical cables and grey plastic tool cases). Parisian haussmannian limestone building street in background, softly blurred. Warm late-afternoon golden hour light. One hand holds a yellow multimeter. Shallow depth of field, cinematic documentary photography, ultra-realistic skin texture with natural pores, subtle film grain, teal and amber ambient color tones. Shot on full-frame 50mm f/1.8. No text, no logo, no watermark.`,
  },
  {
    file: 'assets/img/about-artisan.jpg',
    aspectRatio: '4:3',
    prompt: `Editorial mid-body portrait of the EXACT SAME character: ${NICO}. He stands on a Parisian sidewalk next to his unbranded white service van (rear doors slightly open, fully plain white panels, absolutely no text or branding anywhere). Arms relaxed at his sides, slight genuine friendly smile looking toward the camera. Haussmannian limestone building facade with tall windows blurred in the background. Warm golden hour side-light. Shallow depth of field. Documentary editorial photography, ultra-realistic skin texture with natural pores, subtle film grain, teal and amber ambient tones. Shot on full-frame 85mm f/1.8. No text, no logo, no watermark.`,
  },
];

async function gen({ file, aspectRatio, prompt }) {
  const outPath = path.resolve(process.cwd(), file);
  console.log(`\n→ ${file}  [${aspectRatio}]`);
  // Ajoute l'indication d'aspect ratio dans le prompt car gemini-2.5-flash-image
  // ne prend pas de paramètre explicit; on oriente par texte.
  const fullPrompt = `${prompt}\n\nImage aspect ratio: ${aspectRatio} (widescreen/landscape).`;
  const body = {
    contents: [{ role: 'user', parts: [{ text: fullPrompt }] }],
    generationConfig: { responseModalities: ['IMAGE'] },
  };
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`${res.status} ${err.slice(0, 500)}`);
  }
  const data = await res.json();
  const parts = data.candidates?.[0]?.content?.parts || [];
  const imgPart = parts.find(p => p.inlineData?.data);
  if (!imgPart) throw new Error('No image in response: ' + JSON.stringify(data).slice(0, 500));
  const b64 = imgPart.inlineData.data;
  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await fs.writeFile(outPath, Buffer.from(b64, 'base64'));
  const stat = await fs.stat(outPath);
  console.log(`  ✓ ${Math.round(stat.size / 1024)} Ko  (${imgPart.inlineData.mimeType})`);
}

for (const job of JOBS) {
  try {
    await gen(job);
  } catch (e) {
    console.error(`  ✗ ${job.file}: ${e.message}`);
  }
}
console.log('\nDone.');
