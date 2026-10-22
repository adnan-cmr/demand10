# RankB2B

B2B company-data site: a searchable company directory built from bulk Excel/CSV imports, plus curated Top-10 category lists.

| Part | Stack | Folder |
|------|-------|--------|
| API | Node (ESM), Express, Mongoose/MongoDB, Jest + mongodb-memory-server | [RankB2B-backend](./RankB2B-backend) |
| Website + admin | Next.js 15 (app router) | [RankB2B-frontend](./RankB2B-frontend) |

## Quick start

```bash
# API (http://localhost:4000)
cd RankB2B-backend && npm install && npm run dev

# Website (http://localhost:3000)
cd RankB2B-frontend && npm install && npm run dev
```

## Environment

**Backend (`RankB2B-backend/.env`)**

| Variable | Required | Notes |
|----------|----------|-------|
| `MONGO_URI`, `JWT_SECRET` (32+ chars) | always | |
| `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_APP_PASSWORD` | production only | Without them (dev) emails are logged, not sent |
| `FRONTEND_URL` | recommended | Added to the trusted-origin list; should be `https://` in production |
| `EXTRA_ORIGINS` | optional | Comma-separated extra trusted origins |
| `COOKIE_SAMESITE` | optional | `strict` (default in production), `lax`, `none` (needs HTTPS) |
| `COOKIE_DOMAIN` | production | e.g. `.rankb2b.com`, so the Next.js server can read the auth cookies for the admin page guard |

**Frontend (`RankB2B-frontend/.env.local`)**

| Variable | Notes |
|----------|-------|
| `NEXT_PUBLIC_API_URL` | e.g. `http://localhost:4000/api/v1` |
| `ADMIN_SERVER_GUARD` | set to `off` to disable the server-side `/admin/dashboard` check (client check still applies) |

## Architecture notes

- **Auth**: httpOnly cookies `accessToken` (15 min) and `refreshToken` (7 days, rotated). The frontend `apiClient` shares a single in-flight refresh across concurrent requests.
- **CSRF**: cookies are `SameSite=Strict` in production, and every non-GET request under `/api/v1` is rejected with 403 if its `Origin`/`Referer` is not a trusted origin.
- **Admin page**: `/admin/dashboard` is gated on the server (reads the cookies, calls `/auth/me`) before any admin UI is sent.
- **Data import**: Excel/CSV rows are upserted by LinkedIn company ID (`li:<id>`), so re-uploading updates existing companies instead of duplicating them. Imports run in the background; deleting a file removes companies that came only from it. "Delete all", per-file delete and new imports are refused with 409 while another import or delete is running.
- **Top-10 lists**: uploaded as Excel/CSV in the same format; each company also gets its own page, and lists appear in the navbar Categories menu and `/categories`.
- **SEO**: keywords from the data are used only in page metadata/JSON-LD, never rendered. `/data` renders its first page on the server.

## Scripts and tests

```bash
cd RankB2B-backend && npm test        # Jest
cd RankB2B-frontend && npx eslint src && npx next build
```

Maintenance scripts in `RankB2B-backend/src/scripts` are dry-run unless you pass `--confirm`:

```bash
node src/scripts/promote-user.js user@example.com admin --confirm
ALLOW_SUPERADMIN_PROMOTION=1 node src/scripts/promote-user.js user@example.com superadmin --confirm
PROMOTE_FIRST_ADMIN=1 node src/scripts/migrate-admins-to-users.js --confirm
```

## Deploying

1. Set the env vars above (HTTPS, `NODE_ENV=production`, `COOKIE_DOMAIN`).
2. Backend: `npm start` (single process recommended; import-job locking is based on job state in MongoDB).
3. Frontend: `npx next build && npx next start`.
