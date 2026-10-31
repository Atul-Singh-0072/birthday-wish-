# Happy Birthday, Saumya Verma 💗

A one-page birthday surprise for **Saumya Verma** (1 November 2026), wished by **Naaz Khan**.

**Live:** https://saumya-verma-birthday.pages.dev

## What's inside

- **Intro:** a particle heart that bursts and writes her name, then "Open your surprise"
- **Hero:** spinning 3D heart, bunting and balloons, and a live countdown that turns into a celebration on the day
- **Letter:** a short handwritten-style note
- **Why You're So Special:** six cards that flip on tap
- **Memory Lane:** a balanced masonry photo gallery with a full-screen viewer
- **Make a Wish:** a cake with candles to blow out
- **Music player:** the song fades in on the first tap, with seek and volume
- **Credit:** "Wished by Naaz Khan" with a profile picture at the very end

It's a single `index.html` with plain HTML, CSS and JavaScript, so there's no build step and no dependencies.

## Photos and music aren't in this repo

Personal photos, the song and the link-preview image are kept out of git on purpose (see `.gitignore`). To run the site with them, add these files next to `index.html`:

| Path | What |
|---|---|
| `photos/memory-1.jpg` … `photos/memory-10.jpg` | Gallery photos (update `width`/`height` in `index.html` if you swap them) |
| `photos/naaz-khan.jpg` | Square profile picture for the credit; the initials "NK" show if it's missing |
| `music/our-song.mp3` | Background song |
| `og-image.jpg` | 1200 × 630 link-preview card (WhatsApp, Instagram…) |

Without them the page still works: the gallery shows "Add a photo here" placeholders and the player offers a "Choose song" button.

## Run locally

Any static file server works, for example:

```sh
python -m http.server 8000
```

Then open http://127.0.0.1:8000/.

## Deploy (Cloudflare Pages)

The site is a Cloudflare Pages project named `saumya-verma-birthday`. Upload only the site files, and run the command from this folder so the `functions/` directory is included:

```sh
# stage index.html, _headers, og-image.jpg, photos/ and music/ into a clean folder first
npx wrangler pages deploy <staged-folder> --project-name=saumya-verma-birthday --branch=main
```

- `_headers` keeps the site out of search engines and caches the media.
- `functions/music/[[path]].js` adds HTTP Range support for the song. Cloudflare Pages' static files don't support ranges, and without them the seek bar breaks and iPhone Safari won't play the audio.
