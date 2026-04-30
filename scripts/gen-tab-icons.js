const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

const SIZE = 81;
const OUT_DIR = path.join(__dirname, '..', 'src', 'static', 'tabs');

// PNG helpers
function crc32(buf) {
  let c, table = [];
  for (let n = 0; n < 256; n++) {
    c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c;
  }
  c = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) c = table[(c ^ buf[i]) & 0xFF] ^ (c >>> 8);
  return (c ^ 0xFFFFFFFF) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const typeB = Buffer.from(type);
  const crcData = Buffer.concat([typeB, data]);
  const crcB = Buffer.alloc(4);
  crcB.writeUInt32BE(crc32(crcData));
  return Buffer.concat([len, typeB, data, crcB]);
}

function createPNG(width, height, pixels) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // RGBA
  ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;

  // Raw pixel data with filter byte
  const raw = Buffer.alloc(height * (1 + width * 4));
  for (let y = 0; y < height; y++) {
    raw[y * (1 + width * 4)] = 0; // filter: none
    for (let x = 0; x < width; x++) {
      const si = (y * width + x) * 4;
      const di = y * (1 + width * 4) + 1 + x * 4;
      raw[di] = pixels[si];
      raw[di + 1] = pixels[si + 1];
      raw[di + 2] = pixels[si + 2];
      raw[di + 3] = pixels[si + 3];
    }
  }

  const compressed = zlib.deflateSync(raw, { level: 9 });
  return Buffer.concat([
    sig,
    chunk('IHDR', ihdr),
    chunk('IDAT', compressed),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

function setPixel(pixels, x, y, r, g, b, a = 255) {
  if (x < 0 || x >= SIZE || y < 0 || y >= SIZE) return;
  const i = (y * SIZE + x) * 4;
  pixels[i] = r; pixels[i + 1] = g; pixels[i + 2] = b; pixels[i + 3] = a;
}

function fillRect(pixels, x1, y1, x2, y2, r, g, b, a = 255) {
  for (let y = y1; y <= y2; y++)
    for (let x = x1; x <= x2; x++)
      setPixel(pixels, x, y, r, g, b, a);
}

function fillCircle(pixels, cx, cy, radius, r, g, b, a = 255) {
  for (let y = cy - radius; y <= cy + radius; y++)
    for (let x = cx - radius; x <= cx + radius; x++)
      if ((x - cx) ** 2 + (y - cy) ** 2 <= radius ** 2)
        setPixel(pixels, x, y, r, g, b, a);
}

// Icon: Home (house shape)
function drawHome(pixels, r, g, b) {
  // Roof triangle
  for (let y = 20; y <= 40; y++) {
    const halfW = y - 16;
    for (let x = 40 - halfW; x <= 40 + halfW; x++)
      setPixel(pixels, x, y, r, g, b);
  }
  // Body rectangle
  fillRect(pixels, 24, 40, 56, 62, r, g, b);
  // Door
  fillRect(pixels, 35, 48, 45, 62, 0, 0, 0, 0);
  // Chimney
  fillRect(pixels, 48, 22, 54, 34, r, g, b);
}

// Icon: Category (4 squares grid)
function drawCategory(pixels, r, g, b) {
  const s = 18, gap = 5, startX = 18, startY = 18;
  for (let row = 0; row < 2; row++)
    for (let col = 0; col < 2; col++) {
      const x = startX + col * (s + gap);
      const y = startY + row * (s + gap);
      fillRect(pixels, x, y, x + s, y + s, r, g, b);
    }
}

// Icon: Record (clipboard)
function drawRecord(pixels, r, g, b) {
  // Clip at top
  fillRect(pixels, 28, 14, 52, 22, r, g, b);
  fillRect(pixels, 34, 10, 46, 18, r, g, b);
  // Body
  fillRect(pixels, 22, 22, 58, 68, r, g, b);
  // Lines (transparent cutouts)
  fillRect(pixels, 28, 30, 52, 33, 0, 0, 0, 0);
  fillRect(pixels, 28, 38, 52, 41, 0, 0, 0, 0);
  fillRect(pixels, 28, 46, 52, 49, 0, 0, 0, 0);
  fillRect(pixels, 28, 54, 44, 57, 0, 0, 0, 0);
}

// Icon: User (person silhouette)
function drawUser(pixels, r, g, b) {
  // Head
  fillCircle(pixels, 40, 26, 13, r, g, b);
  // Body
  for (let y = 44; y <= 66; y++) {
    const halfW = Math.min(20, (y - 42) * 1.2);
    for (let x = Math.round(40 - halfW); x <= Math.round(40 + halfW); x++)
      setPixel(pixels, x, y, r, g, b);
  }
  // Smooth shoulders
  fillCircle(pixels, 40, 44, 16, r, g, b);
  fillRect(pixels, 24, 44, 56, 66, r, g, b);
}

// Generate all icons
const icons = [
  { file: 'home_default', draw: drawHome, color: [200, 200, 200] },
  { file: 'home_selected', draw: drawHome, color: [201, 169, 110] },
  { file: 'category_default', draw: drawCategory, color: [200, 200, 200] },
  { file: 'category_selected', draw: drawCategory, color: [201, 169, 110] },
  { file: 'work_record', draw: drawRecord, color: [200, 200, 200] },
  { file: 'work_record_selected', draw: drawRecord, color: [201, 169, 110] },
  { file: 'user_default', draw: drawUser, color: [200, 200, 200] },
  { file: 'user_selected', draw: drawUser, color: [201, 169, 110] },
];

for (const icon of icons) {
  const pixels = new Uint8Array(SIZE * SIZE * 4);
  icon.draw(pixels, ...icon.color);
  const png = createPNG(SIZE, SIZE, pixels);
  const outPath = path.join(OUT_DIR, `${icon.file}.png`);
  fs.writeFileSync(outPath, png);
  console.log(`Generated: ${outPath}`);
}

console.log('Done!');
