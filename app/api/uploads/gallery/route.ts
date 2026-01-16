import crypto from "crypto";
import fs from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "gallery");

function sanitizeBaseName(name: string) {
  const base = name.replace(/\.[^/.]+$/, "");
  return base
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

async function ensureUploadDir() {
  try {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
  } catch {}
}

export async function POST(request: Request) {
  try {
    await ensureUploadDir();
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Unsupported file type" },
        { status: 415 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    if (buffer.byteLength > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File too large" }, { status: 413 });
    }

    const originalName = file.name || "image";
    const base = sanitizeBaseName(originalName);
    const ext = (() => {
      if (file.type === "image/jpeg") return ".jpg";
      if (file.type === "image/png") return ".png";
      if (file.type === "image/webp") return ".webp";
      const guessed = path.extname(originalName);
      return guessed || ".jpg";
    })();

    const unique = crypto.randomUUID();
    const filename = `${Date.now()}-${unique}-${base}${ext}`;
    const filePath = path.join(UPLOAD_DIR, filename);

    await fs.writeFile(filePath, buffer);

    const url = `/uploads/gallery/${filename}`;
    return NextResponse.json({ success: true, url, filename });
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const urlObj = new URL(request.url);
    const filename = urlObj.searchParams.get("filename");
    const fileUrl = urlObj.searchParams.get("url");

    const targetName =
      filename || (fileUrl ? fileUrl.split("/").pop() ?? "" : "");

    if (!targetName) {
      return NextResponse.json(
        { error: "Filename is required" },
        { status: 400 }
      );
    }

    const filePath = path.join(UPLOAD_DIR, targetName);
    try {
      await fs.unlink(filePath);
    } catch {
      // Ignore if file does not exist
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
