import crypto from "crypto";

// Internal salt used for password hashing
const HASH_SALT = process.env.AUTH_SECRET || "startup_graveyard_salt_2026_due_diligence";

export function hashPassword(password: string): string {
  if (!password) return "";
  return crypto
    .pbkdf2Sync(password, HASH_SALT, 1000, 64, "sha512")
    .toString("hex");
}

export function verifyPassword(password: string, hash: string): boolean {
  if (!password || !hash) return false;
  const computedHash = hashPassword(password);
  
  // Timing safe comparison to prevent timing attacks
  try {
    const a = Buffer.from(computedHash, "hex");
    const b = Buffer.from(hash, "hex");
    if (a.length !== b.length) return false;
    return crypto.timingSafeEqual(a, b);
  } catch (e) {
    return computedHash === hash;
  }
}
