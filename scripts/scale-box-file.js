const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

if (process.argv.length !== 5) {
  console.log(`
    Invalid arguments length.
    Usage: node scale-box-file.js <path to file> <scale> <boxType=(hurtboxes|hitboxes)>
  `);
  process.exit(1);
}

const filePath = process.argv[2];
const scale = process.argv[3];
const boxType = process.argv[4];

async function readJson(filePath) {
  const boxFileRawData = await readFile(filePath);
  return JSON.parse(boxFileRawData);
}

async function perform() {
  const boxJson = await readJson(filePath);

  boxJson.frames.forEach(boxJsonFrame => {
    console.log(boxJsonFrame, boxType)
    boxJsonFrame[boxType].forEach(box => {
      box.x *= scale;
      box.y *= scale;
      box.width *= scale;
      box.height *= scale;
    });
  });

  await writeFile(filePath, JSON.stringify(boxJson, null, 2));
}

perform(filePath);



