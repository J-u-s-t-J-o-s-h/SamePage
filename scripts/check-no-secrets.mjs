#!/usr/bin/env node
/**
 * Fail if likely secrets are tracked in git.
 * Phase 0 automated check: "No secrets are committed."
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const tracked = execSync("git ls-files -z", { encoding: "buffer" })
  .toString("utf8")
  .split("\0")
  .filter(Boolean);

const blockedNames = [
  /^\.env$/,
  /^\.env\.(local|development|production|test)$/,
  /\.pem$/i,
  /\.p12$/i,
  /\.pfx$/i,
  /id_rsa$/i,
  /id_ed25519$/i,
  /credentials\.json$/i,
  /service-account.*\.json$/i,
];

const blockedContentPatterns = [
  {
    name: "AWS access key",
    regex: /AKIA[0-9A-Z]{16}/,
  },
  {
    name: "Private key block",
    regex: /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  },
  {
    name: "Generic API key assignment",
    regex:
      /(?:api[_-]?key|secret[_-]?key|access[_-]?token)\s*[:=]\s*['\"][A-Za-z0-9_\-]{20,}['\"]/i,
  },
];

const failures = [];

for (const file of tracked) {
  const base = path.basename(file);
  if (
    blockedNames.some((pattern) => pattern.test(base) || pattern.test(file))
  ) {
    failures.push(`Blocked secret-like path tracked: ${file}`);
    continue;
  }

  // Skip large/binary and lockfiles for content scan
  if (
    file.endsWith("pnpm-lock.yaml") ||
    file.endsWith(".png") ||
    file.endsWith(".ico") ||
    file.endsWith(".jpg") ||
    file.endsWith(".jpeg") ||
    file.endsWith(".webp") ||
    file.endsWith(".pdf")
  ) {
    continue;
  }

  const absolute = path.join(root, file);
  if (!fs.existsSync(absolute) || fs.statSync(absolute).isDirectory()) {
    continue;
  }

  const content = fs.readFileSync(absolute, "utf8");
  for (const pattern of blockedContentPatterns) {
    if (pattern.regex.test(content)) {
      failures.push(`Possible ${pattern.name} in tracked file: ${file}`);
    }
  }
}

if (!tracked.includes(".env.example")) {
  failures.push("Expected .env.example to be tracked.");
}

if (failures.length > 0) {
  console.error("Secrets check failed:");
  for (const failure of failures) {
    console.error(` - ${failure}`);
  }
  process.exit(1);
}

console.log("Secrets check passed.");
