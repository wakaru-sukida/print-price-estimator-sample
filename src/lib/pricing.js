import { O } from '../data/catalog.js';

// คืนตัวเลือกที่เลือกไว้ของคำถาม (ถ้ายังไม่ตอบ ใช้ค่าเริ่มต้น q.def)
export function pickOpts(q, answers) {
  const v = answers[q.id];
  if (q.multi) {
    const ids = v || ['none'];
    return q.options.filter((o) => ids.includes(o.id));
  }
  if (q.isQty && typeof v === 'string' && v.startsWith('c:')) {
    const n = parseInt(v.slice(2), 10);
    return [O(v, n.toLocaleString('th-TH'), { qty: n })];
  }
  const found = v !== undefined ? q.options.find((x) => x.id === v) : null;
  return [found || q.options[q.def || 0]];
}

export function answerLabel(q, answers) {
  return pickOpts(q, answers)
    .map((o) => o.label + (q.id === 'size' && o.sub ? ` (${o.sub})` : ''))
    .join(', ');
}

export function nextUnanswered(qs, answers) {
  const i = qs.findIndex((q) => answers[q.id] === undefined);
  return i === -1 ? qs.length : i;
}

// สูตรคำนวณราคา — ปรับอัตราใน data/catalog.js
export function computePrice(type, qs, answers) {
  let sf = 1, mf = 1, cf = 1, csf = 1, pf = 1, f = 1;
  let add = 0, addS = 0, setup = type.setup, days = type.days, qty = 1000;
  const sel = {};

  for (const q of qs) {
    const os = pickOpts(q, answers);
    sel[q.id] = os;
    for (const o of os) {
      if (o.sf) sf = o.sf;
      if (o.mf) mf = o.mf;
      if (o.cf) cf = o.cf;
      if (o.csf) csf = o.csf;
      if (o.pf) pf = o.pf;
      if (o.f) f *= o.f;
      if (o.qty) qty = o.qty;
      add += o.add || 0;
      addS += o.addS || 0;
      setup += o.setup || 0;
      days += o.days || 0;
    }
  }

  const qtyAdj = Math.pow(1000 / qty, 0.18); // พิมพ์มาก ราคาต่อชิ้นลดลง
  const paper = type.base * sf * mf * f * pf * 0.5 * qtyAdj * qty;
  const print = type.base * sf * cf * pf * 0.5 * qtyAdj * qty;
  const finish = (addS * Math.sqrt(sf) + add) * qty;
  const plate = setup * csf;
  if (qty > 5000) days += 2;

  const subtotal = paper + print + finish + plate;
  const vat = subtotal * 0.07;
  const total = subtotal + vat;

  return { sel, qty, paper, print, finish, plate, subtotal, vat, total, perUnit: total / qty, days };
}

export const baht = (n) => Math.round(n).toLocaleString('th-TH');
export const baht2 = (n) =>
  n.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
