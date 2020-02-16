const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

if (process.argv.length !== 4) {
  console.log(`
    Invalid arguments length.
    Usage: node scale-atlas-json-file.js <path to file> <scale>
  `);
  process.exit(1);
}

const filePath = process.argv[2];
const scale = Number(process.argv[3]);

async function readJson(filePath) {
  const boundsFileRawData = await readFile(filePath);
  return JSON.parse(boundsFileRawData);
}

async function perform() {
  const json = await readJson(filePath);

  const newJson = Object.entries(json.frames).reduce((scaledJson, [key, data]) => {
    scaledJson.frames[key] = {
      "frame": {
        "x": data.frame.x * scale,
        "y": data.frame.y * scale,
        "w": data.frame.w * scale,
        "h": data.frame.h * scale
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": data.spriteSourceSize.x * scale,
        "y": data.spriteSourceSize.y * scale,
        "w": data.spriteSourceSize.w * scale,
        "h": data.spriteSourceSize.h * scale
      },
      "sourceSize": {
        "w": data.sourceSize.w * scale,
        "h": data.sourceSize.h * scale
      }
    };

    return scaledJson;
  }, { frames: {} });

  await writeFile(filePath, JSON.stringify(newJson, null, 2));
}

perform(filePath);



