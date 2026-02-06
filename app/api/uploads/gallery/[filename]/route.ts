import fs from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

const STORAGE_DIR = path.join(process.cwd(), "storage", "uploads", "gallery");

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ filename: string }> },
) {
  try {
    const { filename } = await context.params;

    // Security: prevent directory traversal
    if (
      filename.includes("..") ||
      filename.includes("/") ||
      filename.includes("\\")
    ) {
      return new NextResponse("Invalid filename", { status: 400 });
    }

    const filePath = path.join(STORAGE_DIR, filename);

    // Check if file exists
    try {
      await fs.access(filePath);
    } catch {
      return new NextResponse("File not found", { status: 404 });
    }

    // Read the file
    const fileBuffer = await fs.readFile(filePath);

    // Determine content type based on extension
    const ext = path.extname(filename).toLowerCase();
    const contentType =
      ext === ".jpg" || ext === ".jpeg"
        ? "image/jpeg"
        : ext === ".png"
          ? "image/png"
          : ext === ".webp"
            ? "image/webp"
            : "application/octet-stream";

    // Return the image with proper headers
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error serving image:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
