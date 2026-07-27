#!/usr/bin/env node
/**
 * Lightweight guard against committing secrets.
 *
 * This is a fast, dependency-free heuristic scan over git-tracked files. It is
 * NOT a replacement for a full secret scanner, but it catches the common
 * mistakes: a committed `.env`, private keys, and obvious credential patterns.
 *
 * Exit code 0 = clean, 1 = potential secret found (fails CI).
 */
import { execSync } from 'node:child_process';
import { readFileSync, statSync } from 'node:fs';

/** Files that must never be tracked at all. */
const FORBIDDEN_PATHS = [/(^|\/)\.env$/, /(^|\/)\.env\.(?!example$)[^/]+$/];

/** Content patterns that look like real secrets. */
const SECRET_PATTERNS = [
  { name: 'Private key block', re: /-----BEGIN (?:RSA |EC |OPENSSH |DSA |PGP )?PRIVATE KEY-----/ },
  { name: 'AWS access key id', re: /\bAKIA[0-9A-Z]{16}\b/ },
  {
    name: 'Generic API/secret assignment',
    re: /\b(?:api[_-]?key|secret|token|password|passwd)\b\s*[:=]\s*['"][^'"\s]{16,}['"]/i,
  },
  { name: 'Slack token', re: /\bxox[baprs]-[0-9A-Za-z-]{10,}\b/ },
  { name: 'GitHub token', re: /\bgh[pousr]_[0-9A-Za-z]{30,}\b/ },
];

/** Files/dirs to skip for CONTENT scanning (still checked for forbidden paths). */
const SKIP_CONTENT = [
  /(^|\/)pnpm-lock\.yaml$/,
  /(^|\/)\.env\.example$/,
  /(^|\/)scripts\/check-secrets\.mjs$/,
  /\.(png|jpg|jpeg|gif|webp|ico|pdf|woff2?|ttf|zip|gz)$/i,
];

function trackedFiles() {
  const out = execSync('git ls-files -z', { encoding: 'utf8' });
  return out.split('\0').filter(Boolean);
}

let problems = 0;
const files = trackedFiles();

for (const file of files) {
  if (FORBIDDEN_PATHS.some((re) => re.test(file))) {
    console.error(`✖ Forbidden tracked file (looks like an env/secrets file): ${file}`);
    problems++;
    continue;
  }
  if (SKIP_CONTENT.some((re) => re.test(file))) continue;

  let size;
  try {
    size = statSync(file).size;
  } catch {
    continue;
  }
  if (size > 2_000_000) continue; // skip very large/binary blobs

  let content;
  try {
    content = readFileSync(file, 'utf8');
  } catch {
    continue; // unreadable / binary
  }

  for (const { name, re } of SECRET_PATTERNS) {
    const match = re.exec(content);
    if (match) {
      const line = content.slice(0, match.index).split('\n').length;
      console.error(`✖ Possible secret (${name}) in ${file}:${line}`);
      problems++;
    }
  }
}

if (problems > 0) {
  console.error(`\nSecret scan failed: ${problems} potential issue(s) found.`);
  process.exit(1);
}
console.log(`✓ Secret scan clean (${files.length} tracked files checked).`);
