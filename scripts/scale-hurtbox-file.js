const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

if (process.argv.length !== 4) {
  console.log(`
    Invalid arguments length.
    Usage: node scale-hurtbox-file.js <path to file> <scale>
  `);
  process.exit(1);
}

const filePath = process.argv[2];
const scale = process.argv[3];

async function readJson(filePath) {
  const hurtboxFileRawData = await readFile(filePath);
  return JSON.parse(hurtboxFileRawData);
}

async function perform() {
  const hurtboxJson = await readJson(filePath);

  hurtboxJson.frames.forEach(hurtboxJsonFrame => {
    hurtboxJsonFrame.hurtboxes.forEach(hurtbox => {
      hurtbox.x *= scale;
      hurtbox.y *= scale;
      hurtbox.width *= scale;
      hurtbox.height *= scale;
    });
  });

  await writeFile(filePath, JSON.stringify(hurtboxJson, null, 2));
}

perform(filePath);



