const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

if (process.argv.length !== 4) {
  console.log(`
    Invalid arguments length.
    Usage: node scale-bounds-file.js <path to file> <scale>
  `);
  process.exit(1);
}

const filePath = process.argv[2];
const scale = process.argv[3];

async function readJson(filePath) {
  const boundsFileRawData = await readFile(filePath);
  return JSON.parse(boundsFileRawData);
}

async function perform() {
  const boundsJson = await readJson(filePath);

  boundsJson.forEach(boundsFrame => {
    boundsFrame.bounds.offset.x *= scale;
    boundsFrame.bounds.offset.y *= scale;
    boundsFrame.bounds.size.width *= scale;
    boundsFrame.bounds.size.height *= scale;
  })

  await writeFile(filePath, JSON.stringify(boundsJson, null, 2));
}

perform(filePath);



