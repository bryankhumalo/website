# Website repo

Static site hosted via git + GitHub Pages.

## Deploy

1. Create an empty repo on GitHub (do not initialize with README).
2. Add the remote:

   ```bash
   git remote add origin https://github.com/<your-user>/<repo>.git
   git branch -M main
   git push -u origin main
   ```

3. In GitHub, go to **Settings → Pages**.
4. Set **Build and deployment → Source** to **Deploy from a branch**.
5. Branch: `main`, folder: `/ (root)`.
6. Click **Save**.

Your site publishes at `https://<your-user>.github.io/<repo>/`.

## Local structure

- `index.html` — entry page
- `css/style.css` — styles (white / teal / coral / gold theme)
- `js/app.js` — application script

## Colors

- Teal `#0f766e` — primary
- Coral `#ff5a3c` — accent
- Gold `#ffd700` — highlight
