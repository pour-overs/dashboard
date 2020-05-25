import * as fs from "fs";
import * as path from "path";


// extensions aren't currently used, but they could be
// for determining if a file is an asset at runtime
const extensions = [".css", ".js", ".mjs", ".json", ".png", ".jpg"];
const hasAssetExtension = (path) => extensions.filter(ext => path.endsWith(ext)).length > 0;


// at build time we build a list of all files
export const assets = new Set();

/**
 * Recursively analyzes a directory for all files
 * @param {string} dir A filepath to a directory
 */
export const analyzeDirectory = (dir) => {

  const items = fs.readdirSync(dir)

  items.forEach( filename => {
    const filePath = path.join(dir, filename);
    if (fs.statSync(filePath).isDirectory()) {
      analyzeDirectory(filePath);
    }
    else {
      const finalPath = filePath.replace("static/", "/");
      assets.add(finalPath);
    }
  });
};


/**
 *
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * @param {Function} next
 */
export const isAsset = (dir) =>  {
  analyzeDirectory(dir);
  const assetsList = Array.from(assets.values()).join("\n\t");
  console.log("analyzed static files:\n\t", assetsList)

  return (req, res, next) => {

    req.isAsset = assets.has(req.path);
    console.log("is asset:", req.path, req.isAsset);
    next();
  };
};