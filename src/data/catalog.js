// ข้อมูลประเภทงาน คำถาม และตัวเลือก — อัตราราคาทั้งหมดเป็นค่าตัวอย่าง ปรับให้ตรงกับโรงพิมพ์จริง
// sf = ตัวคูณขนาด, mf = ตัวคูณวัสดุ, cf = ตัวคูณสีพิมพ์, csf = ตัวคูณค่าเพลท, pf = ตัวคูณจำนวนหน้า
// f = ตัวคูณราคาต่อชิ้นทั่วไป, add = บวกต่อชิ้น (บาท), addS = บวกต่อชิ้นตามขนาด, setup = ค่าตั้งเครื่อง/แม่พิมพ์, days = วันผลิตเพิ่ม

export const ICONS = {
  box: 'M4 8l8-4 8 4v8l-8 4-8-4z M4 8l8 4 8-4 M12 12v8',
  bag: 'M5 8h14l-1 12H6z M9 8V6a3 3 0 0 1 6 0v2',
  sticker: 'M5 4h10l4 4v12H5z M15 4v4h4',
  label: 'M4 7h12l4 5-4 5H4z M8 12h.01',
  tag: 'M7 3h10v18H7z M11 7a1 1 0 1 0 2 0a1 1 0 1 0-2 0 M10 12h4 M10 15h4',
  namecard: 'M3 6h18v12H3z M6 10h6 M6 13h9',
  folder: 'M5 3h14v18H5z M5 14l14-3',
  card: 'M12 4v16 M4 5l8-1v16l-8 1z M12 4l8 1v14l-8 1',
  envelope: 'M3 6h18v12H3z M3 6l9 7 9-7',
  book: 'M5 5a2 2 0 0 1 2-2h12v15H7a2 2 0 0 0-2 2z M5 20a1 1 0 0 0 1 1h13',
  calendar: 'M4 6h16v14H4z M4 10h16 M8 3v5 M16 3v5',
  brochure: 'M3 6l6-2v14l-6 2z M9 4l6 2v14l-6-2z M15 6l6-2v14l-6 2z',
  catalog: 'M5 3h12l2 2v16H5z M8 8h8 M8 12h8 M8 16h5',
  other: 'M12 5v14 M5 12h14'
};
const WHITE = '#FFFFFF', KRAFT = '#C9A57B', CREAM = '#F5EBD3';
export function O(id, label, x) { const o = { id: id, label: label }; for (const k in (x || {})) o[k] = x[k]; return o; }
function dims(w, h, d) { return { w: w, h: h, d: d }; }
export const MAT = {
  board: [O('ivw', 'กล่องแป้งหลังขาว 350 แกรม', { mf: 1, tone: WHITE }), O('ivg', 'กล่องแป้งหลังเทา 350 แกรม', { mf: 0.9, tone: WHITE }), O('kr', 'คราฟท์ 350 แกรม', { mf: 1.1, tone: KRAFT }), O('ef', 'ลูกฟูก E-flute', { mf: 1.6, tone: KRAFT })],
  bag: [O('a210', 'อาร์ตการ์ด 210 แกรม', { mf: 1, tone: WHITE }), O('kb', 'คราฟท์น้ำตาล 150 แกรม', { mf: 0.85, tone: KRAFT }), O('kw', 'คราฟท์ขาว 150 แกรม', { mf: 0.9, tone: '#F6F3EC' }), O('a250', 'อาร์ตการ์ด 250 แกรม', { mf: 1.2, tone: WHITE })],
  sticker: [O('pap', 'กระดาษขาวมัน', { mf: 1, tone: WHITE }), O('ppw', 'PP ขาว (กันน้ำ)', { mf: 1.3, tone: WHITE }), O('ppc', 'PP ใส', { mf: 1.4, tone: 'rgba(255, 255, 255, 0.45)' }), O('holo', 'โฮโลแกรม', { mf: 1.9, tone: '#DADFE8' })],
  label: [O('pap', 'กระดาษขาวมัน', { mf: 1, tone: WHITE }), O('ppw', 'PP ขาว (กันน้ำ)', { mf: 1.3, tone: WHITE }), O('ppc', 'PP ใส', { mf: 1.4, tone: 'rgba(255, 255, 255, 0.45)' }), O('mf', 'ฟอยล์เงิน', { mf: 1.8, tone: '#CFD3D8' })],
  card: [O('a260', 'อาร์ตการ์ด 260 แกรม', { mf: 1, tone: WHITE }), O('a350', 'อาร์ตการ์ด 350 แกรม', { mf: 1.2, tone: WHITE }), O('kr', 'กระดาษคราฟท์', { mf: 1.1, tone: KRAFT }), O('tx', 'กระดาษ Texture', { mf: 1.45, tone: '#F2EEE3' })],
  namecard: [O('a300', 'อาร์ตการ์ด 300 แกรม', { mf: 1, tone: WHITE }), O('a350', 'อาร์ตการ์ด 350 แกรม', { mf: 1.15, tone: WHITE }), O('tx', 'กระดาษ Texture', { mf: 1.6, tone: '#F2EEE3' }), O('pvc', 'PVC ขาว', { mf: 3, tone: WHITE })],
  flat: [O('am128', 'อาร์ตมัน 128 แกรม', { mf: 0.8, tone: WHITE }), O('am160', 'อาร์ตมัน 160 แกรม', { mf: 0.95, tone: WHITE }), O('ad128', 'อาร์ตด้าน 128 แกรม', { mf: 0.85, tone: WHITE }), O('bond', 'ปอนด์ 100 แกรม', { mf: 0.75, tone: '#FBFAF4' })],
  inner: [O('b80', 'ปอนด์ 80 แกรม', { mf: 1, tone: WHITE }), O('gb70', 'ถนอมสายตา 70 แกรม', { mf: 1.05, tone: CREAM }), O('am105', 'อาร์ตมัน 105 แกรม', { mf: 1.3, tone: WHITE })],
  env: [O('b100', 'ปอนด์ขาว 100 แกรม', { mf: 1, tone: WHITE }), O('kr', 'คราฟท์น้ำตาล 125 แกรม', { mf: 1.05, tone: KRAFT }), O('a190', 'อาร์ตการ์ด 190 แกรม', { mf: 1.3, tone: WHITE })]
};
export const COLORS = [O('c1', '1 สี (ดำ)', { cf: 0.55, csf: 0.4, ink: 1 }), O('c2', '2 สี', { cf: 0.75, csf: 0.6, ink: 2 }), O('c4', '4 สี 1 หน้า', { cf: 1, csf: 1, ink: 4 }), O('c44', '4 สี 2 หน้า', { cf: 1.6, csf: 1.8, ink: 4, both: true })];
export const COAT = [O('none', 'ไม่เคลือบ', {}), O('mat', 'เคลือบ PVC ด้าน', { addS: 0.25 }), O('gloss', 'เคลือบ PVC เงา', { addS: 0.22 }), O('uv', 'เคลือบ UV เงา', { addS: 0.15 }), O('soft', 'Soft-touch', { addS: 0.45, days: 1 })];
export const EXTRAS = [O('none', 'ไม่มี', {}), O('foil', 'ปั๊มฟอยล์', { setup: 1500, addS: 0.2, days: 1 }), O('spot', 'Spot UV', { setup: 1200, addS: 0.25, days: 1 }), O('emb', 'ปั๊มนูน', { setup: 1800, addS: 0.2, days: 1 }), O('die', 'ไดคัทพิเศษ', { setup: 1200, addS: 0.1, days: 1 })];
function qtyOpts(list) { return list.map(function (n) { return O(String(n), n.toLocaleString('th-TH'), { qty: n }); }); }
const Q_STD = qtyOpts([100, 500, 1000, 3000, 5000, 10000]);
const Q_BOOK = qtyOpts([50, 100, 300, 500, 1000, 3000]);
const Q_SMALL = qtyOpts([500, 1000, 3000, 5000, 10000, 20000]);
const Q_CARD = qtyOpts([100, 200, 500, 1000, 2000, 5000]);
function S(id, label, sub, sf, d, x) { return O(id, label, Object.assign({ sub: sub, sf: sf, dims: d }, x || {})); }

export const TYPES = [
  { id: 'box', name: 'กล่อง', hint: 'กล่องสินค้า บรรจุภัณฑ์', unit: 'ใบ', base: 6.5, setup: 3500, days: 7, model: 'box', mat: 'board', qty: Q_STD,
    sizes: [S('s', 'เล็ก', '80×80×80 มม.', 0.6, dims(80, 80, 80)), S('m', 'กลาง', '150×100×60 มม.', 1, dims(150, 100, 60)), S('l', 'ใหญ่', '250×200×100 มม.', 1.9, dims(250, 200, 100)), S('xl', 'ใหญ่พิเศษ', '350×250×150 มม.', 3, dims(350, 250, 150))],
    extra: [{ id: 'style', short: 'รูปแบบ', text: 'ต้องการกล่องรูปแบบไหน?', options: [O('tuck', 'ฝาเสียบบน-ล่าง', { f: 1 }), O('lock', 'ก้นล็อก', { f: 1.15 }), O('lid', 'ฝาครอบ 2 ชิ้น', { f: 1.6, setup: 1500 }), O('drawer', 'กล่องลิ้นชัก', { f: 1.8, setup: 2000 })] }] },
  { id: 'bag', name: 'ถุง', hint: 'ถุงกระดาษ ถุงช้อปปิ้ง', unit: 'ใบ', base: 12, setup: 4500, days: 8, model: 'bag', mat: 'bag', qty: Q_STD,
    sizes: [S('s', 'เล็ก', '18×23×8 ซม.', 0.7, dims(180, 230, 80)), S('m', 'กลาง', '25×33×10 ซม.', 1, dims(250, 330, 100)), S('l', 'ใหญ่', '32×42×12 ซม.', 1.4, dims(320, 420, 120)), S('xl', 'ใหญ่พิเศษ', '40×50×15 ซม.', 1.9, dims(400, 500, 150))],
    extra: [{ id: 'handle', short: 'หูถุง', text: 'หูถุงแบบไหน?', options: [O('rope', 'เชือกเกลียว', { add: 1.5 }), O('ribbon', 'ริบบิ้นผ้า', { add: 2.5 }), O('twist', 'หูกระดาษบิด', { add: 1 }), O('cut', 'หูเจาะ (ไม่มีเชือก)', { setup: 800, nohandle: true })] }] },
  { id: 'sticker', name: 'สติ๊กเกอร์', hint: 'สติ๊กเกอร์โลโก้ ติดสินค้า', unit: 'ดวง', base: 0.8, setup: 1500, days: 4, model: 'flat', mat: 'sticker', qty: Q_SMALL,
    sizes: [S('s3', '3×3 ซม.', '30×30 มม.', 0.35, dims(30, 30, 0.3)), S('s5', '5×5 ซม.', '50×50 มม.', 0.6, dims(50, 50, 0.3)), S('s7', '7×10 ซม.', '70×100 มม.', 1, dims(70, 100, 0.3)), S('a4', 'แผ่น A4', '210×297 มม.', 3.5, dims(210, 297, 0.3))],
    extra: [{ id: 'shape', short: 'รูปทรง', text: 'สติ๊กเกอร์รูปทรงอะไร?', options: [O('rect', 'สี่เหลี่ยม', {}), O('circle', 'วงกลม', { round: true }), O('die', 'ไดคัทตามรูป', { setup: 1200, soft: true })] }] },
  { id: 'label', name: 'ฉลาก', hint: 'ฉลากสินค้า ขวด กระปุก', unit: 'ดวง', base: 0.6, setup: 1500, days: 4, model: 'flat', mat: 'label', qty: Q_SMALL,
    sizes: [S('s', '4×6 ซม.', '40×60 มม.', 0.5, dims(60, 40, 0.3)), S('m', '6×8 ซม.', '60×80 มม.', 0.8, dims(80, 60, 0.3)), S('l', '8×10 ซม.', '80×100 มม.', 1, dims(100, 80, 0.3)), S('xl', '10×15 ซม.', '100×150 มม.', 1.6, dims(150, 100, 0.3))],
    extra: [{ id: 'form', short: 'รูปแบบ', text: 'ต้องการฉลากแบบแผ่นหรือแบบม้วน?', hint: 'แบบม้วนเหมาะกับเครื่องติดฉลากอัตโนมัติ', options: [O('sheet', 'แบบแผ่น', {}), O('roll', 'แบบม้วน', { add: 0.03, setup: 500 })] }] },
  { id: 'tag', name: 'ป้ายห้อย', hint: 'ป้ายห้อยเสื้อผ้า สินค้า', unit: 'ชิ้น', base: 1.2, setup: 1200, days: 5, model: 'flat', mat: 'card', qty: Q_STD, hole: true,
    sizes: [S('s', '5×9 ซม.', '50×90 มม.', 0.8, dims(50, 90, 0.6)), S('m', '6×10 ซม.', '60×100 มม.', 1, dims(60, 100, 0.6)), S('l', '7×12 ซม.', '70×120 มม.', 1.3, dims(70, 120, 0.6))],
    extra: [{ id: 'hole', short: 'การเจาะ', text: 'เจาะรูแบบไหน?', options: [O('string', 'เจาะรู + เชือก', { add: 0.35 }), O('eyelet', 'เจาะรู + ตาไก่', { add: 0.5 }), O('nohole', 'ไม่เจาะรู', { nohole: true })] }] },
  { id: 'namecard', name: 'นามบัตร', hint: 'นามบัตรพนักงาน ร้านค้า', unit: 'ใบ', base: 0.9, setup: 500, days: 3, model: 'flat', mat: 'namecard', qty: Q_CARD,
    sizes: [S('std', 'มาตรฐาน', '90×55 มม.', 1, dims(90, 55, 0.4)), S('sq', 'สแควร์', '65×65 มม.', 1, dims(65, 65, 0.4)), S('mini', 'มินิ', '85×40 มม.', 0.8, dims(85, 40, 0.4))],
    extra: [{ id: 'corner', short: 'มุม', text: 'มุมนามบัตรแบบไหน?', options: [O('sharp', 'มุมฉาก', {}), O('round', 'มุมมน', { add: 0.05, soft: true })] }] },
  { id: 'folder', name: 'แฟ้ม', hint: 'แฟ้มเอกสาร แฟ้มสัมมนา', unit: 'ใบ', base: 9, setup: 3000, days: 7, model: 'folder', mat: 'card', qty: Q_STD,
    sizes: [S('a4', 'A4', '220×310 มม.', 1, dims(220, 310, 4)), S('a5', 'A5', '160×220 มม.', 0.65, dims(160, 220, 4)), S('a4x', 'A4 สันขยาย', '230×310×15 มม.', 1.3, dims(230, 310, 15))],
    extra: [{ id: 'pocket', short: 'กระเป๋า', text: 'ต้องการกระเป๋าด้านในไหม?', options: [O('none', 'ไม่มีกระเป๋า', {}), O('one', 'กระเป๋าด้านขวา', { f: 1.2 }), O('two', 'กระเป๋า 2 ข้าง', { f: 1.4 }), O('card', 'กระเป๋า + ช่องนามบัตร', { f: 1.3 })] }] },
  { id: 'card', name: 'การ์ด', hint: 'การ์ดเชิญ การ์ดอวยพร', unit: 'ใบ', base: 3.5, setup: 1500, days: 5, model: 'flat', mat: 'card', qty: Q_STD,
    sizes: [S('46', '4×6 นิ้ว', '102×152 มม.', 0.8, dims(102, 152, 0.5)), S('57', '5×7 นิ้ว', '127×178 มม.', 1, dims(127, 178, 0.5)), S('a5f', 'A5 พับครึ่ง', '148×210 มม.', 1.3, dims(148, 210, 1), { folds: 2 }), S('sq', 'สแควร์', '150×150 มม.', 1.1, dims(150, 150, 0.5))],
    extra: [{ id: 'env', short: 'ซอง', text: 'ต้องการซองคู่กับการ์ดไหม?', options: [O('none', 'ไม่รับซอง', {}), O('white', 'พร้อมซองขาว', { add: 2 }), O('kraft', 'พร้อมซองคราฟท์', { add: 2.5 })] }] },
  { id: 'envelope', name: 'ซอง', hint: 'ซองจดหมาย ซองเอกสาร', unit: 'ซอง', base: 2.5, setup: 1500, days: 5, model: 'envelope', mat: 'env', qty: Q_STD,
    sizes: [S('dl', 'DL', '220×110 มม.', 0.7, dims(220, 110, 1.5)), S('c5', 'C5', '229×162 มม.', 1, dims(229, 162, 1.5)), S('c4', 'C4', '324×229 มม.', 1.6, dims(324, 229, 2)), S('94', '9×4 นิ้ว', '229×102 มม.', 0.65, dims(229, 102, 1.5))],
    extra: [{ id: 'window', short: 'หน้าต่าง', text: 'ซองมีหน้าต่างใสไหม?', options: [O('none', 'ไม่มีหน้าต่าง', {}), O('win', 'มีหน้าต่างใส', { add: 0.4, setup: 800, win: true })] },
      { id: 'flap', short: 'ฝาซอง', text: 'ฝาซองแบบไหน?', options: [O('tri', 'ฝาสามเหลี่ยม', { tri: true }), O('str', 'ฝาตรง', {}), O('tape', 'ฝาตรง + เทปกาว', { add: 0.25 })] }] },
  { id: 'book', name: 'หนังสือ', hint: 'หนังสือ คู่มือ รายงาน', unit: 'เล่ม', base: 45, setup: 6000, days: 10, model: 'book', mat: 'inner', matText: 'กระดาษเนื้อในใช้แบบไหน?', matShort: 'เนื้อใน', qty: Q_BOOK,
    sizes: [S('a5', 'A5', '148×210 มม.', 0.7, dims(148, 210, 0)), S('b5', 'B5', '176×250 มม.', 0.85, dims(176, 250, 0)), S('a4', 'A4', '210×297 มม.', 1, dims(210, 297, 0))],
    extra: [{ id: 'pages', short: 'จำนวนหน้า', text: 'หนังสือมีกี่หน้า?', def: 1, options: [O('48', '48 หน้า', { pf: 0.5, pages: 48 }), O('96', '96 หน้า', { pf: 1, pages: 96 }), O('160', '160 หน้า', { pf: 1.6, pages: 160 }), O('240', '240 หน้า', { pf: 2.3, pages: 240 })] },
      { id: 'binding', short: 'เข้าเล่ม', text: 'เข้าเล่มแบบไหน?', def: 1, options: [O('saddle', 'เย็บมุงหลังคา', { sub: 'ไม่เกิน 96 หน้า' }), O('perfect', 'ไสกาว', { add: 4 }), O('sewn', 'เย็บกี่ไสกาว', { add: 8, days: 1 }), O('hard', 'ปกแข็ง', { add: 35, days: 3, hard: true })] }] },
  { id: 'calendar', name: 'ปฏิทิน', hint: 'ปฏิทินตั้งโต๊ะ แขวนผนัง', unit: 'ชุด', base: 60, setup: 5000, days: 10, model: 'calendar', mat: 'flat', qty: Q_BOOK,
    sizes: [S('desk', 'ตั้งโต๊ะ', '210×150 มม.', 1, dims(210, 150, 4), { desk: true }), S('a3', 'แขวน A3', '297×420 มม.', 1.4, dims(297, 420, 4)), S('a2', 'แขวน A2', '420×594 มม.', 2.2, dims(420, 594, 4))],
    extra: [{ id: 'sheets', short: 'จำนวนแผ่น', text: 'ปฏิทินกี่แผ่น?', options: [O('7', '7 แผ่น', { f: 0.7, sub: '2 เดือน/แผ่น' }), O('13', '13 แผ่น', { f: 1.2, sub: '1 เดือน/แผ่น' })] },
      { id: 'binding', short: 'เข้าเล่ม', text: 'เข้าเล่มแบบไหน?', options: [O('wire', 'ห่วงกระดูกงู', { add: 6 }), O('tin', 'รีดแถบโลหะ', { add: 5 })] }] },
  { id: 'brochure', name: 'โบรชัวร์', hint: 'แผ่นพับ ใบปลิว', unit: 'แผ่น', base: 3, setup: 2000, days: 4, model: 'flat', mat: 'flat', qty: Q_STD,
    sizes: [S('a4t', 'A4 พับ 3', 'กาง 297×210 มม.', 1, dims(297, 210, 0.3), { folds: 3 }), S('a4b', 'A4 พับ 2', 'กาง 297×210 มม.', 1, dims(297, 210, 0.3), { folds: 2 }), S('a5', 'A5 ใบเดียว', '148×210 มม.', 0.6, dims(148, 210, 0.3)), S('a4', 'A4 ใบเดียว', '210×297 มม.', 0.9, dims(210, 297, 0.3))],
    extra: [] },
  { id: 'catalog', name: 'แคตตาล็อก', hint: 'แคตตาล็อกสินค้า', unit: 'เล่ม', base: 35, setup: 5000, days: 8, model: 'book', mat: 'flat', matText: 'กระดาษเนื้อในใช้แบบไหน?', matShort: 'เนื้อใน', qty: Q_BOOK,
    sizes: [S('a4', 'A4', '210×297 มม.', 1, dims(210, 297, 0)), S('a5', 'A5', '148×210 มม.', 0.7, dims(148, 210, 0)), S('sq', 'สแควร์', '210×210 มม.', 0.9, dims(210, 210, 0))],
    extra: [{ id: 'pages', short: 'จำนวนหน้า', text: 'แคตตาล็อกมีกี่หน้า?', def: 1, options: [O('8', '8 หน้า', { pf: 0.35, pages: 8 }), O('16', '16 หน้า', { pf: 0.6, pages: 16 }), O('24', '24 หน้า', { pf: 0.85, pages: 24 }), O('40', '40 หน้า', { pf: 1.3, pages: 40 })] },
      { id: 'binding', short: 'เข้าเล่ม', text: 'เข้าเล่มแบบไหน?', options: [O('saddle', 'เย็บมุงหลังคา', {}), O('perfect', 'ไสกาว', { add: 4 }), O('wire', 'ห่วงกระดูกงู', { add: 6 })] }] },
  { id: 'other', name: 'อื่นๆ', hint: 'โปสเตอร์ ป้าย งานพิเศษ', unit: 'ชิ้น', base: 5, setup: 2000, days: 6, model: 'flat', mat: 'flat', qty: Q_STD,
    sizes: [S('a5', 'A5', '148×210 มม.', 0.6, dims(148, 210, 0.3)), S('a4', 'A4', '210×297 มม.', 1, dims(210, 297, 0.3)), S('a3', 'A3', '297×420 มม.', 1.8, dims(297, 420, 0.3)), S('a2', 'A2', '420×594 มม.', 3.2, dims(420, 594, 0.3))],
    extraFirst: true,
    extra: [{ id: 'form', short: 'ลักษณะงาน', text: 'งานของคุณมีลักษณะแบบไหน?', options: [O('flat', 'แผ่นเรียบ', { sub: 'โปสเตอร์ ใบปลิว' }), O('fold', 'ชิ้นงานพับ', { f: 1.2, folds: 2 }), O('3d', 'ชิ้นงาน 3 มิติ', { f: 2, setup: 2000, as3d: true })] }] }
];

export function questionsFor(t) {
  let qs = [];
  const size = { id: 'size', short: 'ขนาด', text: 'ขนาดชิ้นงานเท่าไร?', options: t.sizes };
  const mat = { id: 'material', short: t.matShort || 'วัสดุ', text: t.matText || 'ใช้วัสดุ/กระดาษแบบไหน?', options: MAT[t.mat] };
  const colors = { id: 'colors', short: 'สีพิมพ์', text: 'พิมพ์กี่สี?', hint: '4 สีคือการพิมพ์ภาพสี่สีเต็มรูปแบบ (CMYK)', def: 2, options: COLORS };
  const coat = { id: 'coating', short: 'เคลือบ', text: t.model === 'book' ? 'เคลือบปกแบบไหน?' : 'ต้องการเคลือบผิวแบบไหน?', options: COAT };
  const extras = { id: 'extras', short: 'งานเสริม', text: 'มีงานตกแต่งเพิ่มเติมไหม?', hint: 'เลือกได้หลายข้อ แล้วกดยืนยัน', multi: true, options: EXTRAS };
  const qty = { id: 'qty', short: 'จำนวน', text: 'ต้องการพิมพ์จำนวนเท่าไร?', hint: 'ยิ่งพิมพ์มาก ราคาต่อชิ้นยิ่งถูกลง', def: 2, options: t.qty, isQty: true };
  if (t.extraFirst) qs = qs.concat(t.extra);
  qs.push(size);
  if (!t.extraFirst) qs = qs.concat(t.extra);
  qs.push(mat, colors, coat, extras, qty);
  return qs;
}
