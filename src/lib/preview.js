// สร้างข้อมูลสำหรับตัวอย่าง 3D (หน้าของกล่อง/ชิ้นงาน) และ 2D (แบบกาง) จากคำตอบที่เลือก
// หน่วยของชิ้นงานเป็น มม. แล้วสเกลให้พอดีกับพื้นที่แสดงผล (stageW × stageH px)

export const defaultRotation = (type) => ({
  rx: -18,
  ry: type.model === 'book' ? 30 : type.model === 'flat' ? -28 : -32,
});

export function buildPreview(type, sel, stageW, stageH) {
  const size = sel.size[0];
  const matTone = sel.material[0].tone;
  const color = sel.colors[0];
  let { w, h, d } = size.dims;
  let model = type.model;
  const folds = size.folds || sel.form?.[0].folds || 0;

  if (sel.form?.[0].as3d) {
    model = 'box';
    d = Math.round(Math.min(w, h) * 0.35);
  }
  if (model === 'book') {
    const pages = sel.pages?.[0].pages || 96;
    d = Math.max(2, pages * 0.055 + (sel.binding?.[0].hard ? 5 : 0.6));
  }
  if (model === 'calendar' && size.desk) d = 70;

  // การ์ดพับ: ขนาดที่ระบุคือขนาดหลังพับ / โบรชัวร์: ขนาดที่ระบุคือขนาดกาง
  const w3 = folds && type.id !== 'card' ? w / folds : w;
  const flatW = type.id === 'card' && folds ? w * folds : w;
  const d3 = Math.max(d, 0.8);

  const art =
    color.ink === 1
      ? { c1: '#17181C', c2: '#17181C', c3: '#17181C', c4: '#6B6659' }
      : color.ink === 2
        ? { c1: '#C2185B', c2: '#17181C', c3: '#17181C', c4: '#C2185B' }
        : { c1: '#0A6E8F', c2: '#C2185B', c3: '#17181C', c4: '#E0A800' };
  art.back = color.both ? '#0A6E8F' : 'rgba(23, 24, 28, 0.18)';

  const round = !!sel.shape?.[0].round;
  const soft = !!(sel.shape?.[0].soft || sel.corner?.[0].soft);
  const hasHole = !!type.hole && !sel.hole?.[0].nohole;
  const hasHandle = model === 'bag' && !sel.handle?.[0].nohandle;
  const envTri = !!sel.flap?.[0].tri;
  const envWin = !!sel.window?.[0].win;

  // ---------- 3D ----------
  let s3 = Math.min((stageW * 0.62) / Math.hypot(w3, d3), (stageH * 0.66) / Math.hypot(h, d3));
  if (model === 'bag') s3 *= 0.85;
  const W = w3 * s3, H = h * s3, T = Math.max(d3 * s3, 2);
  const edge = 'rgba(23, 24, 28, 0.35)';
  const radius = round ? '50%' : soft ? `${Math.min(W, H) * 0.08}px` : '0px';
  const fontSize = Math.max(7, Math.min(W, H) * 0.075);
  const holeSize = Math.max(6, W * 0.1);

  const faces = [];
  const face = (o) =>
    faces.push({ left: 0, top: 0, w: W, h: H, bg: matTone, borderColor: edge, borderWidth: '1px', radius: '0px', filter: 'none', ...o });

  face({ key: 'front', transform: `translateZ(${T / 2}px)`, radius, art: model === 'envelope' ? null : 'front', hole: hasHole, window: model === 'envelope' && envWin });
  face({
    key: 'back', transform: `rotateY(180deg) translateZ(${T / 2}px)`, radius,
    art: model === 'envelope' ? null : 'back', hole: hasHole,
    flap: model === 'envelope' ? (envTri ? 'polygon(0 0, 100% 0, 50% 100%)' : 'polygon(0 0, 100% 0, 100% 55%, 0 55%)') : null,
  });
  if (!round) {
    const pageBg = (deg) => `repeating-linear-gradient(${deg}deg, #FBFAF6 0 1px, #E7E2D6 1px 3px)`;
    face({ key: 'left', left: (W - T) / 2, w: T, transform: `rotateY(-90deg) translateZ(${W / 2}px)`, bg: model === 'book' ? art.c1 : matTone, filter: 'brightness(0.86)' });
    face({ key: 'right', left: (W - T) / 2, w: T, transform: `rotateY(90deg) translateZ(${W / 2}px)`, bg: model === 'book' ? pageBg(90) : matTone, filter: 'brightness(0.9)' });
    face({ key: 'top', top: (H - T) / 2, h: T, transform: `rotateX(90deg) translateZ(${H / 2}px)`, bg: model === 'bag' ? 'rgba(60, 50, 40, 0.55)' : model === 'book' ? pageBg(0) : matTone, filter: 'brightness(1.04)' });
    face({ key: 'bottom', top: (H - T) / 2, h: T, transform: `rotateX(-90deg) translateZ(${H / 2}px)`, filter: 'brightness(0.8)' });
  }
  if (hasHandle) {
    const hw = W * 0.42, hh = H * 0.24;
    const hc = sel.handle[0].id === 'ribbon' ? '#C2185B' : '#3A3B40';
    [1, -1].forEach((sgn) =>
      face({ key: `handle${sgn}`, left: (W - hw) / 2, top: -hh + 2, w: hw, h: hh, bg: 'transparent', borderColor: hc, borderWidth: '4px 4px 0 4px', radius: `${hw / 2}px ${hw / 2}px 0 0`, transform: `translateZ(${sgn * (T / 2 - 2)}px)` }),
    );
  }
  if (model === 'calendar') {
    face({ key: 'rings', top: -4, h: 8, bg: 'repeating-linear-gradient(90deg, #3A3B40 0 3px, transparent 3px 9px)', borderColor: 'transparent', borderWidth: '0px', transform: `translateZ(${T / 2 + 1}px)` });
  }

  // ---------- 2D (แบบกาง) ----------
  const parts = [];
  let NW = 0, NH = 0;
  const part = (x, y, pw, ph, o = {}) => {
    parts.push({ x, y, w: pw, h: ph, dashed: false, label: '', front: false, clip: 'none', radius: '0px', bg: matTone, ...o });
    NW = Math.max(NW, x + pw);
    NH = Math.max(NH, y + ph);
  };
  const glue = { bg: 'rgba(107, 102, 89, 0.15)', label: 'กาว' };

  if (model === 'box') {
    const g = 12;
    part(0, d, g, h, glue);
    part(g, d, d, h, { dashed: true, label: 'ข้าง' });
    part(g + d, d, w, h, { dashed: true, front: true });
    part(g + d + w, d, d, h, { dashed: true, label: 'ข้าง' });
    part(g + 2 * d + w, d, w, h, { dashed: true, label: 'ด้านหลัง' });
    part(g + d, 0, w, d, { label: 'ฝาบน' });
    part(g + d, d + h, w, d, { label: 'ฝาล่าง' });
  } else if (model === 'bag') {
    const top = 30, bottom = d * 0.7, full = 2 * w + 2 * d + 15;
    part(0, top, w, h, { dashed: true, front: true });
    part(w, top, d, h, { dashed: true, label: 'ข้าง' });
    part(w + d, top, w, h, { dashed: true, label: 'ด้านหลัง' });
    part(2 * w + d, top, d, h, { dashed: true, label: 'ข้าง' });
    part(2 * w + 2 * d, top, 15, h, glue);
    part(0, 0, full, top, { label: 'พับขอบปาก' });
    part(0, top + h, full, bottom, { label: 'ก้นถุง' });
  } else if (model === 'book') {
    const spine = Math.max(d, 3);
    part(0, 0, w, h, { dashed: true, label: 'ปกหลัง' });
    part(w, 0, spine, h, { dashed: true, bg: art.c1 });
    part(w + spine, 0, w, h, { dashed: true, front: true });
  } else if (model === 'folder') {
    part(0, 0, w, h, { dashed: true, label: 'ปกหลัง' });
    part(w, 0, d, h, { dashed: true });
    part(w + d, 0, w, h, { dashed: true, front: true });
    const pocket = sel.pocket[0].id;
    if (pocket !== 'none') part(w + d, h, w, h * 0.3, { label: 'กระเป๋า' });
    if (pocket === 'two') part(0, h, w, h * 0.3, { label: 'กระเป๋า' });
  } else if (model === 'envelope') {
    part(0, 0, w, h * 0.5, { dashed: true, label: 'ฝา', clip: envTri ? 'polygon(0 100%, 50% 0, 100% 100%)' : 'none' });
    part(0, h * 0.5, w, h, { label: 'ตัวซอง' });
    part(0, h * 1.5, w, h * 0.45, { dashed: true, label: 'ฝาล่าง' });
  } else if (folds) {
    const pw = flatW / folds;
    for (let i = 0; i < folds; i++) {
      const last = i === folds - 1;
      part(i * pw, 0, pw, h, { dashed: !last, front: last, label: last ? '' : 'ด้านใน/พับ' });
    }
  } else {
    const gap = Math.max(w * 0.18, 8);
    const r = round ? '50%' : '0px';
    part(0, 0, w, h, { front: true, radius: r });
    part(w + gap, 0, w, h, { label: color.both ? 'ด้านหลัง' : 'หลัง (ไม่พิมพ์)', radius: r });
  }

  const s2 = Math.min((stageW * 0.9) / NW, (stageH * 0.78) / NH);
  const panels = parts.map((p, i) => ({
    key: i,
    x: p.x * s2, y: p.y * s2, w: p.w * s2, h: p.h * s2,
    bg: p.bg, dashed: p.dashed, clip: p.clip, front: p.front,
    radius: p.radius === '0px' && soft ? `${Math.min(p.w, p.h) * s2 * 0.08}px` : p.radius,
    label: p.label && p.w * s2 > 34 && p.h * s2 > 16 ? p.label : '',
    fontSize: Math.max(7, Math.min(p.w, p.h) * s2 * 0.075),
  }));

  const dimsText = `${Math.round(w)} × ${Math.round(h)}${d >= 2 ? ` × ${Math.round(d)}` : ''} มม.`;

  return {
    art, dimsText,
    scene: { w: W, h: H, faces, fontSize, holeSize },
    net: { w: NW * s2, h: NH * s2, panels },
  };
}
