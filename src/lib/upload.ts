import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

const ALLOWED_INVOICE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
]);

const ALLOWED_DAMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

const MAX_INVOICE_BYTES = 10 * 1024 * 1024;
const MAX_DAMAGE_BYTES = 8 * 1024 * 1024;
const MAX_DAMAGE_FILES = 8;

/**
 * Saves a file under /public/uploads (served as /uploads/...).
 * TODO: Replace with Cloudflare R2 upload — keep this interface.
 */
export async function uploadFile(
  file: File,
  subdirectory: "warranty/invoices" | "warranty/damage",
): Promise<string> {
  if (!file.size) {
    throw new Error("Empty file");
  }

  const isInvoice = subdirectory.includes("invoices");
  const allowed = isInvoice ? ALLOWED_INVOICE_TYPES : ALLOWED_DAMAGE_TYPES;
  const maxSize = isInvoice ? MAX_INVOICE_BYTES : MAX_DAMAGE_BYTES;

  if (!allowed.has(file.type)) {
    throw new Error(`Unsupported file type: ${file.type}`);
  }

  if (file.size > maxSize) {
    throw new Error("File exceeds maximum size");
  }

  const ext = path.extname(file.name) || (file.type === "application/pdf" ? ".pdf" : ".bin");
  const filename = `${randomUUID()}${ext}`;
  const relativeDir = path.join("uploads", subdirectory);
  const absoluteDir = path.join(process.cwd(), "public", relativeDir);

  await mkdir(absoluteDir, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(absoluteDir, filename), buffer);

  return `/${relativeDir.replace(/\\/g, "/")}/${filename}`;
}

export function validateDamageFiles(files: File[]): void {
  if (files.length === 0) {
    throw new Error("At least one damage photo is required");
  }

  if (files.length > MAX_DAMAGE_FILES) {
    throw new Error(`Maximum ${MAX_DAMAGE_FILES} damage photos allowed`);
  }
}
