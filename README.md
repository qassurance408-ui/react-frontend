# fullstack-demo-frontend

Minimal Vite + React app that fetches `GET /api/hello` from the backend and
displays it. Served in production via a tiny Express static server
(`server.js`) so the deploy flow matches the backend's (Node app, `npm start`,
binds to `$PORT`).

## Local dev

```bash
npm install
npm run dev
```

## Production build (what AletCloud will run)

```bash
npm install   # triggers `postinstall` → `vite build` → outputs dist/
npm start     # node server.js, serves dist/ on $PORT
```

## Deploying on AletCloud

1. Push this repo to GitHub.
2. Deploy the backend first and grab its public URL.
3. In your AletCloud project → **New App** → connect this repo.
4. Set the env var `VITE_API_URL` to the backend's URL, e.g.
   `https://node-backend-xxxx.app.aletcloud.com`.
5. Deploy.

**Important:** Vite bakes `VITE_API_URL` into the JS bundle at *build* time,
not at container start/launch time. If the platform's build phase and
launch phase have separate environments (common with buildpack-based
platforms), an env var set in the UI might only reach the running
container and not the build step — worth checking after your first
deploy. If the fetched API URL in the UI still shows the placeholder
default, edit the fallback in `src/App.jsx` directly to your backend's
URL and push again as a quick workaround.
