// Cloudflare Pages Function for /music/*: adds HTTP Range support (206 Partial Content).
// Pages' static assets always answer 200 with the whole file, which breaks seeking in the
// player and stops iPhone Safari (which requires ranges for audio) from playing the song.
export async function onRequestGet({ request, env }) {
  const asset = await env.ASSETS.fetch(new Request(request.url));   // the plain file, no Range
  // only real audio files; unknown paths get Pages' normal fallback untouched
  if (!asset.ok || !(asset.headers.get('Content-Type') || '').startsWith('audio/')) return asset;

  const headers = new Headers(asset.headers);
  headers.set('Accept-Ranges', 'bytes');
  headers.set('Cache-Control', 'public, max-age=86400');

  const m = /^bytes=(\d*)-(\d*)$/.exec((request.headers.get('Range') || '').trim());
  if (!m || (m[1] === '' && m[2] === '')) return new Response(asset.body, { status: 200, headers });

  const buf = await asset.arrayBuffer();
  const size = buf.byteLength;
  let start, end;
  if (m[1] === '') {                     // "bytes=-500": the last 500 bytes
    start = Math.max(0, size - Number(m[2]));
    end = size - 1;
  } else {
    start = Number(m[1]);
    end = m[2] ? Math.min(Number(m[2]), size - 1) : size - 1;
  }
  if (start >= size || start > end) {
    headers.delete('Content-Length');
    headers.set('Content-Range', `bytes */${size}`);
    return new Response(null, { status: 416, headers });
  }
  headers.set('Content-Range', `bytes ${start}-${end}/${size}`);
  headers.set('Content-Length', String(end - start + 1));
  return new Response(new Uint8Array(buf, start, end - start + 1), { status: 206, headers });
}
