export default async function handler(req, res) {
  try {
    const src = req.query.src;
    if (!src) {
      res.status(400).end();
      return;
    }

    const r = await fetch(src);
    const buf = Buffer.from(await r.arrayBuffer());

    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.status(200).send(buf);
  } catch {
    res.status(404).end();
  }
}
