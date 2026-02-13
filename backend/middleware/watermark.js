const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const watermarkMiddleware = async (req, res, next) => {
    if (!req.files || req.files.length === 0) return next();

    try {
        const processedFiles = [];

        for (const file of req.files) {
            const originalPath = file.path;
            const filename = file.filename;
            const outputPath = path.join('uploads', `wm-${filename}`);

            // Create a simple text overlay SVG if no logo image is available
            // In a real app, load a logo from fs
            const width = 800;
            const height = 600;

            const svgImage = `
            <svg width="${width}" height="${height}">
              <style>
              .title { fill: rgba(255, 255, 255, 0.5); font-size: 40px; font-weight: bold; transform: rotate(-45deg); transform-origin: center; }
              </style>
              <text x="50%" y="50%" text-anchor="middle" class="title">ZynoxBit Property</text>
            </svg>
            `;

            await sharp(originalPath)
                .resize(800, 600, { fit: 'inside' }) // Standardize size
                .composite([
                    {
                        input: Buffer.from(svgImage),
                        top: 0,
                        left: 0,
                    },
                ])
                .toFile(outputPath);

            // Optional: Delete original if you only want the watermarked one
            // fs.unlinkSync(originalPath);

            // Update file object to point to new file
            file.path = outputPath;
            file.filename = `wm-${filename}`;

            processedFiles.push(file);
        }

        req.files = processedFiles;
        next();
    } catch (error) {
        console.error("Watermarking error:", error);
        next(); // Proceed even if watermarking fails, or handle error
    }
};

module.exports = watermarkMiddleware;
