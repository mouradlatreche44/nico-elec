// Génère les images via HF Router → fal-ai → FLUX.1-dev
// Usage: node scripts/gen-hf-flux.mjs
import fs from 'node:fs/promises';
import path from 'node:path';

const HF_TOKEN = process.env.HF_TOKEN;
if (!HF_TOKEN) { console.error('Set HF_TOKEN env var'); process.exit(1); }
const ENDPOINT = 'https://router.huggingface.co/fal-ai/fal-ai/flux/dev';

const NICO = 'Nico, a 40-year-old French artisan electrician, athletic build, short dark brown slightly tousled hair, neatly trimmed brown beard, light olive-tan skin, green-hazel eyes, wearing a solid navy blue polo shirt with absolutely no visible logo or text, dark grey work trousers, black leather tool belt, brown leather watch, friendly confident expression';

const JOBS = [
  {
    file: 'assets/img/hero-chantier.jpg',
    image_size: 'landscape_16_9',
    seed: 771420,
    prompt: `Editorial professional photograph. ${NICO}. He stands confidently in front of his open WHITE service van (completely UNBRANDED, absolutely no text or stickers or logos anywhere on the van, side door slid open showing organized metal shelves with coiled electrical cables and grey plastic tool cases). Parisian haussmannian limestone building street softly blurred in background. Warm late-afternoon golden hour light. One hand holds a yellow multimeter. Shallow depth of field, cinematic documentary photography, ultra-realistic skin texture with natural pores, subtle film grain, teal and amber ambient color tones. Shot on full-frame 50mm f/1.8. NO TEXT, NO LOGO, NO WATERMARK.`,
  },
  {
    file: 'assets/img/about-artisan.jpg',
    image_size: 'portrait_4_3',
    seed: 771420,
    prompt: `Editorial mid-body portrait. ${NICO}. He stands on a Parisian sidewalk next to his UNBRANDED WHITE service van (rear doors slightly open, fully plain white panels, absolutely NO text or branding or logos anywhere). Arms relaxed at his sides, slight genuine friendly smile looking toward the camera. Haussmannian limestone building facade with tall windows blurred in the background. Warm golden hour side-light. Shallow depth of field. Documentary editorial photography, ultra-realistic skin texture with natural pores, subtle film grain, teal and amber ambient tones. Shot on full-frame 85mm f/1.8. NO TEXT, NO LOGO, NO WATERMARK.`,
  },
];

async function gen({ file, image_size, seed, prompt }) {
  const outPath = path.resolve(process.cwd(), file);
  console.log(`\n→ ${file}  [${image_size}  seed=${seed}]`);
  const body = {
    prompt,
    image_size,
    num_inference_steps: 28,
    guidance_scale: 3.5,
    seed,
    enable_safety_checker: false,
  };
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${HF_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`${res.status} ${err.slice(0, 500)}`);
  }
  const data = await res.json();
  const url = data.images?.[0]?.url;
  const w = data.images?.[0]?.width;
  const h = data.images?.[0]?.height;
  if (!url) throw new Error('No image URL in response: ' + JSON.stringify(data).slice(0, 400));
  const img = await fetch(url);
  const buf = Buffer.from(await img.arrayBuffer());
  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await fs.writeFile(outPath, buf);
  console.log(`  ✓ ${w}×${h}  ${Math.round(buf.length / 1024)} Ko`);
}

for (const job of JOBS) {
  try {
    await gen(job);
  } catch (e) {
    console.error(`  ✗ ${job.file}: ${e.message}`);
  }
}
console.log('\nDone.');
