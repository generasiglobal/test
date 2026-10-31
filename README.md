# OrderChat (working name)

A micro-SaaS that gives small shops a simple order page. Customers pick items, and a
neat, complete order arrives in the shop's chat app.

**Stage 1 (now):** landing page + waitlist, to test demand before building the product.

Stack: Next.js · PostgreSQL · Docker. It runs on your laptop now and moves to the
Indonesian server later with the same files.

---

## Run it on your laptop

### 1. Install once
- **Docker Desktop**: https://www.docker.com/products/docker-desktop/ (Windows: enable WSL 2 when asked)
- **Node.js 22 LTS**: https://nodejs.org/
- **Git**: https://git-scm.com/

### 2. Get the code
```bash
git clone https://github.com/generasiglobal/test.git orderchat
cd orderchat
git checkout claude/server-access-australia-whiywy
npm install
```

### 3. Configure
```bash
cp .env.example .env        # Windows PowerShell: copy .env.example .env
```
Open `.env` and set:
- `POSTGRES_PASSWORD`: a long random password. Use letters and numbers only, and put
  the same one inside `DATABASE_URL`.
- `ADMIN_TOKEN`: a secret used to download your waitlist.
- `NEXT_PUBLIC_BRAND`: your product name.

### 4. Start
**Development mode** (edits show up instantly):
```bash
npm run db:up     # starts Postgres in Docker
npm run dev       # starts the app
```
Open http://localhost:3000

**Production-like mode** (everything in Docker, the same way it will run on the server):
```bash
docker compose up -d --build
```
(Stop the dev server first. Both use port 3000.)

### 5. See who signed up
Open `http://localhost:3000/api/waitlist/export?token=YOUR_ADMIN_TOKEN` to download a CSV.

### Stop
```bash
docker compose down        # data is kept in a Docker volume
```

---

## Files
| Path | What it is |
|------|------------|
| `app/page.tsx` | Landing page text. Edit this to change the pitch |
| `app/WaitlistForm.tsx` | Sign-up form |
| `app/api/waitlist/route.ts` | Saves sign-ups (validation, duplicate emails ignored, bot honeypot) |
| `app/api/waitlist/export/route.ts` | CSV download, protected by `ADMIN_TOKEN` |
| `db/init.sql` | Database table (created automatically on first start) |
| `docker-compose.yml` | Postgres + app, ports bound to localhost only |
| `Dockerfile` | Small production image that runs as a non-root user |

## Showing it to people before the server arrives
To share the laptop version temporarily, install `cloudflared` and run a free quick tunnel:
```bash
cloudflared tunnel --url http://localhost:3000
```
It prints a public `https://….trycloudflare.com` link. It only works while your laptop
is on, so it's fine for testing, not for real launch.

## Roadmap
- [x] Landing page + waitlist
- [ ] Move to the Indonesian server (Docker + Cloudflare Tunnel + backups)
- [ ] Shop accounts + login
- [ ] Product catalogue editor
- [ ] Public shop page + cart, with the order sent as a chat message
- [ ] Payments (Lemon Squeezy) with regional pricing
