import sharp from 'sharp';

export default async function handler(req, res) {
  try {
    const src = req.query.src;
    if (!src) return res.status(400).end();

    const r = await fetch(src);
    if (!r.ok) return res.status(404).end();

    const input = Buffer.from(await r.arrayBuffer());

    const W = 1200;
    const H = 900;

    const output = await sharp(input)
      .resize(W, H, {
        fit: 'cover',
        position: 'centre',
      })
      .jpeg({
        quality: 88,
        mozjpeg: true,
        chromaSubsampling: '4:4:4',
      })
      .toBuffer();

    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.status(200).send(output);
  } catch {
    res.status(404).end();
  }
}
