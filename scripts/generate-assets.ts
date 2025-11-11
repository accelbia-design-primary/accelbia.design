import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Script to generate asset manifest for preloading
const generateAssetManifest = () => {
  const publicDir = path.join(__dirname, "..", "public");
  const outputPath = path.join(__dirname, "..", "src", "assets-manifest.json");

  // Extensions we want to preload
  const imageExtensions = [".png", ".jpg", ".jpeg", ".svg", ".webp", ".gif"];
  const fontExtensions = [".otf", ".ttf", ".woff", ".woff2"];
  const excludeFiles = ["CNAME", "robots.txt", ".DS_Store", "site.webmanifest"];

  const scanDirectory = (dir: string, baseDir: string = ""): any => {
    const assets = {
      images: [] as string[],
      fonts: [] as { family: string; src: string }[],
    };

    try {
      const files = fs.readdirSync(dir);

      for (const file of files) {
        if (excludeFiles.includes(file)) continue;

        const fullPath = path.join(dir, file);
        const relativePath = path.join(baseDir, file);
        const webPath = "/" + relativePath.replace(/\\/g, "/");

        if (fs.statSync(fullPath).isDirectory()) {
          // Recursively scan subdirectories
          const subAssets = scanDirectory(fullPath, relativePath);
          assets.images.push(...subAssets.images);
          assets.fonts.push(...subAssets.fonts);
        } else {
          const ext = path.extname(file).toLowerCase();

          if (imageExtensions.includes(ext)) {
            assets.images.push(webPath);
          } else if (fontExtensions.includes(ext)) {
            // Extract font family name from filename
            const fontName = path
              .basename(file, ext)
              .replace(/-/g, " ")
              .replace(/\b\w/g, (l) => l.toUpperCase());

            assets.fonts.push({
              family: fontName,
              src: webPath,
            });
          }
        }
      }
    } catch (error) {
      console.warn(`Could not scan directory ${dir}:`, error);
    }

    return assets;
  };

  const manifest = scanDirectory(publicDir);

  // Write manifest file
  fs.writeFileSync(outputPath, JSON.stringify(manifest, null, 2));
  console.log(
    `Generated asset manifest with ${manifest.images.length} images and ${manifest.fonts.length} fonts`
  );

  return manifest;
};

// Run the script
generateAssetManifest();
