# Rajas Ink — website

A static site (plain HTML/CSS/JS, no build step, no framework) for Rajas Ink Tattoo Studio, Ubud. Built to replace the Wix site and be hosted for free on Vercel.

```
index.html
css/style.css
js/main.js            → nav, gallery, lightbox, FAQ, reveal animations
js/reviews-data.js     → where to add real Google reviews later
assets/images/         → put your own photos here if you replace the current ones
```

## 1. What's using your real content already

- All text (studio intro, artist bios, FAQ) is copied from your current Wix site.
- WhatsApp and Instagram links for the studio and each artist are wired up exactly as you listed them.
- The Google Maps link and an embedded map are on the Location section.
- Photos: the storefront, artist, and gallery photos you uploaded are now saved locally in `assets/images/` and optimized for the web (resized and compressed, so the site loads fast). They ship with the site — no dependency on Wix or OneDrive.
  - **One exception:** the logo (used in the top nav, footer, and browser tab icon) is still linked from Wix's image CDN (`static.wixstatic.com`), because you haven't uploaded that file yet. Upload the logo image (ideally a transparent PNG) in the chat and I'll add it to `assets/images/` and switch those three references over.
  - Want to add more gallery photos later? Drop the file into `assets/images/`, then add its path to the `GALLERY_IMAGES` array at the top of `js/main.js`.
- Reviews: I did not invent testimonials — see `js/reviews-data.js` for how to add real ones, or leave it empty and the site will show a "Read our reviews on Google" card instead (linked to the URL you gave me).

## 2. Preview it locally (optional)

You don't need this to deploy, but if you want to look at it first:
- Open `index.html` directly in a browser, or
- Run a tiny local server from this folder, e.g. `python3 -m http.server 8000`, then visit `http://localhost:8000`.

## 3. Put it on GitHub

1. Go to [github.com](https://github.com) and sign in (or create a free account).
2. Click the **+** in the top-right → **New repository**.
3. Name it something like `rajas-ink-website`. Keep it **Public** (Vercel's free plan works with public or private repos, public is simplest). Don't add a README/gitignore here since you already have files. Click **Create repository**.
4. On the next page, GitHub shows a few options — use **"uploading an existing file"** (the simplest way, no command line needed):
   - Click **uploading an existing file**.
   - Drag the whole contents of this project folder into the browser window (the `index.html` file, the `css` folder, the `js` folder, and `README.md` — make sure `index.html` ends up at the **root** of the repo, not inside a subfolder).
   - Scroll down, add a commit message like "Initial site", click **Commit changes**.

   *(Alternative, if you're comfortable with Terminal: `git init`, `git add .`, `git commit -m "Initial site"`, then follow GitHub's "push an existing repository" instructions.)*

## 4. Deploy on Vercel (Hobby / free plan)

1. Go to [vercel.com](https://vercel.com) and sign up/sign in with your **GitHub** account (this makes step 2 automatic).
2. Click **Add New… → Project**.
3. Vercel will list your GitHub repos — find `rajas-ink-website` and click **Import**.
4. Framework preset: leave it on **Other** (it's a static site, no build step needed). You don't need to change any build/output settings.
5. Click **Deploy**. In under a minute you'll get a live URL like `rajas-ink-website.vercel.app`.

## 5. Connect your custom domain (still free on Hobby)

1. In the Vercel dashboard, open your project → **Settings → Domains**.
2. Type in your domain (e.g. `rajasinktattoo.com`) and click **Add**.
3. Vercel will show you either:
   - an **A record** (`76.76.21.21`) and/or **CNAME** to add, or
   - if it detects the domain is elsewhere, instructions to change nameservers.
4. Go to wherever you bought the domain (GoDaddy, Namecheap, Niagahoster, etc.), open its DNS settings, and add the record(s) Vercel showed you.
5. DNS changes can take a few minutes to a few hours to apply. Vercel will show a green checkmark next to the domain once it's verified — it also issues a free SSL certificate automatically, so `https://` will just work.

## 6. Making updates later

Any time you want to change text, swap a photo, or add reviews:
- Edit the file directly on GitHub (click the file → pencil icon → edit → commit), or
- Come back here and ask me to make the change, then re-upload the changed files to GitHub the same way as step 3.

Either way, Vercel automatically redeploys the site within seconds of a change landing on GitHub's `main` branch — no extra steps needed.
