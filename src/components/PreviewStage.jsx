import { useEffect, useMemo, useRef, useState } from 'react';
import { buildPreview, defaultRotation } from '../lib/preview.js';
import { useElementSize } from '../hooks/useElementSize.js';
import { PathIcon, ICON_PATHS } from './Icons.jsx';

// ลายตัวอย่างบนหน้าชิ้นงาน (สเกลตามเปอร์เซ็นต์ ใช้ได้ทุกขนาด)
function Artwork({ art, fontSize }) {
  return (
    <div className="absolute inset-0 flex flex-col gap-[6%] p-[11%]">
      <div className="h-[14%] rounded-xs" style={{ background: art.c1 }} />
      <div className="flex grow items-center justify-center">
        <div
          className="flex aspect-square w-[40%] items-center justify-center rounded-full border-2 font-display font-bold"
          style={{ borderColor: art.c2, color: art.c2, fontSize }}
        >
          โลโก้
        </div>
      </div>
      <div className="h-[5%] w-[72%] opacity-75" style={{ background: art.c3 }} />
      <div className="h-[5%] w-[44%]" style={{ background: art.c4 }} />
    </div>
  );
}

function BackArt({ art }) {
  return (
    <div className="absolute inset-0 flex flex-col justify-end gap-[5%] p-[12%]">
      <div className="h-[4%] w-[60%]" style={{ background: art.back }} />
      <div className="h-[4%] w-[40%]" style={{ background: art.back }} />
    </div>
  );
}

function Scene3D({ preview, rot, dragging }) {
  const { scene, art } = preview;
  return (
    <div style={{ perspective: 1400, width: scene.w, height: scene.h }}>
      <div
        className="relative"
        style={{
          width: scene.w,
          height: scene.h,
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rot.rx}deg) rotateY(${rot.ry}deg)`,
          transition: dragging ? 'none' : 'transform 0.5s ease',
        }}
      >
        {scene.faces.map((f) => (
          <div
            key={f.key}
            className="absolute box-border overflow-hidden border-solid"
            style={{
              left: f.left, top: f.top, width: f.w, height: f.h,
              transform: f.transform, background: f.bg,
              borderColor: f.borderColor, borderWidth: f.borderWidth,
              borderRadius: f.radius, filter: f.filter,
            }}
          >
            {f.art === 'front' && <Artwork art={art} fontSize={scene.fontSize} />}
            {f.art === 'back' && <BackArt art={art} />}
            {f.hole && (
              <div
                className="absolute top-[7%] left-1/2 box-border -translate-x-1/2 rounded-full border border-[#8A8476] bg-stage"
                style={{ width: scene.holeSize, height: scene.holeSize }}
              />
            )}
            {f.flap && <div className="absolute inset-x-0 top-0 h-[58%] bg-black/7" style={{ clipPath: f.flap }} />}
            {f.window && (
              <div className="absolute bottom-[16%] left-[9%] h-[30%] w-[42%] rounded-[3px] border border-[#8A8476] bg-[rgba(210,225,232,0.7)]" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Net2D({ preview }) {
  const { net, art } = preview;
  return (
    <div className="relative" style={{ width: net.w, height: net.h }}>
      {net.panels.map((p) => (
        <div
          key={p.key}
          className="absolute box-border overflow-hidden border border-[#6B6659]"
          style={{
            left: p.x, top: p.y, width: p.w, height: p.h,
            background: p.bg, borderStyle: p.dashed ? 'dashed' : 'solid',
            borderRadius: p.radius, clipPath: p.clip,
          }}
        >
          {p.front && <Artwork art={art} fontSize={p.fontSize} />}
          {p.label && (
            <span className="absolute top-1/2 left-1/2 -translate-1/2 rounded-[3px] bg-surface/85 px-1 py-px font-mono text-[11px] whitespace-nowrap text-muted-strong">
              {p.label}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

const iconBtn = 'flex size-11 items-center justify-center rounded-[10px] border border-line-strong bg-surface';

export default function PreviewStage({ type, price, className = '' }) {
  const [view, setView] = useState('3d');
  const [rot, setRot] = useState(() => defaultRotation(type));
  const [dragging, setDragging] = useState(false);
  const drag = useRef(null);
  const [stageRef, stage] = useElementSize();

  useEffect(() => setRot(defaultRotation(type)), [type]);

  const preview = useMemo(
    () => (stage.width > 0 ? buildPreview(type, price.sel, stage.width - 24, stage.height - 40) : null),
    [type, price.sel, stage.width, stage.height],
  );

  const is3D = view === '3d';

  const onPointerDown = (e) => {
    if (!is3D) return;
    drag.current = { x: e.clientX, y: e.clientY, ...rot };
    e.currentTarget.setPointerCapture?.(e.pointerId);
    setDragging(true);
  };
  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d) return;
    setRot({
      ry: d.ry + (e.clientX - d.x) * 0.5,
      rx: Math.max(-70, Math.min(70, d.rx - (e.clientY - d.y) * 0.4)),
    });
  };
  const endDrag = () => {
    drag.current = null;
    setDragging(false);
  };

  const seg = (on) =>
    `min-h-[38px] min-w-14 rounded-lg font-display text-[15px] font-bold transition ${on ? 'bg-ink text-paper' : 'text-muted-strong'}`;

  return (
    <section aria-label="ตัวอย่างชิ้นงาน" className={`flex min-h-0 flex-col overflow-hidden rounded-[14px] border border-line bg-stage ${className}`}>
      <div className="flex shrink-0 items-center gap-2 p-2">
        <div role="group" aria-label="มุมมองตัวอย่าง" className="flex gap-[3px] rounded-[10px] bg-line p-[3px]">
          <button type="button" className={seg(!is3D)} aria-pressed={!is3D} onClick={() => setView('2d')}>2D</button>
          <button type="button" className={seg(is3D)} aria-pressed={is3D} onClick={() => setView('3d')}>3D</button>
        </div>
        <span className="hidden text-[13px] text-muted-strong md:inline">
          {is3D ? 'ลากเพื่อหมุนชิ้นงาน' : 'แบบกางพร้อมเส้นตัด/พับ'}
        </span>
        <div className="grow" />
        {is3D && (
          <div className="flex gap-1">
            <button type="button" className={iconBtn} aria-label="หมุนซ้าย" onClick={() => setRot((r) => ({ ...r, ry: r.ry - 45 }))}>
              <PathIcon d={ICON_PATHS.rotL} size={18} strokeWidth={2} />
            </button>
            <button type="button" className={iconBtn} aria-label="หมุนขวา" onClick={() => setRot((r) => ({ ...r, ry: r.ry + 45 }))}>
              <PathIcon d={ICON_PATHS.rotR} size={18} strokeWidth={2} />
            </button>
            <button type="button" className={iconBtn} aria-label="รีเซ็ตมุมมอง" onClick={() => setRot(defaultRotation(type))}>
              <PathIcon d={ICON_PATHS.reset} size={18} strokeWidth={2} />
            </button>
          </div>
        )}
      </div>

      <div
        ref={stageRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className={`relative flex min-h-0 grow touch-none items-center justify-center overflow-hidden select-none ${is3D ? (dragging ? 'cursor-grabbing' : 'cursor-grab') : ''}`}
      >
        {/* crop marks + แถบสี CMYK */}
        <span className="absolute top-3.5 left-3.5 size-[18px] border-t border-l border-[#8A8476]" />
        <span className="absolute top-3.5 right-3.5 size-[18px] border-t border-r border-[#8A8476]" />
        <span className="absolute bottom-3.5 left-3.5 size-[18px] border-b border-l border-[#8A8476]" />
        <span className="absolute right-3.5 bottom-3.5 size-[18px] border-r border-b border-[#8A8476]" />
        <span aria-hidden="true" className="absolute bottom-4 left-10 flex gap-[3px]">
          <span className="size-3 bg-[#0093C9]" />
          <span className="size-3 bg-[#D6246E]" />
          <span className="size-3 bg-[#F2C500]" />
          <span className="size-3 bg-ink" />
        </span>

        {preview && (is3D ? <Scene3D preview={preview} rot={rot} dragging={dragging} /> : <Net2D preview={preview} />)}

        {preview && <span className="absolute right-10 bottom-3 font-mono text-xs text-muted-strong">{preview.dimsText}</span>}
      </div>

      {!is3D && (
        <div className="flex shrink-0 gap-4 px-3.5 pb-2.5 text-xs text-muted-strong">
          <span className="flex items-center gap-1.5"><span className="w-[18px] border-t border-[#6B6659]" />เส้นตัด</span>
          <span className="flex items-center gap-1.5"><span className="w-[18px] border-t border-dashed border-[#6B6659]" />เส้นพับ</span>
        </div>
      )}
    </section>
  );
}
