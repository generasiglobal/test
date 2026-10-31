-- Runs automatically the first time the Postgres container starts.
CREATE TABLE IF NOT EXISTS waitlist (
  id          BIGSERIAL PRIMARY KEY,
  email       TEXT NOT NULL UNIQUE,
  country     TEXT,
  sells       TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
