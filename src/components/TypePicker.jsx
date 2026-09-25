import { TYPES, ICONS } from '../data/catalog.js';
import { PathIcon } from './Icons.jsx';

export default function TypePicker({ onPick }) {
  return (
    <main className="flex grow flex-col gap-5 overflow-y-auto px-4 py-5 md:gap-7 md:px-7 md:py-9 xl:gap-8 xl:px-14 xl:py-11">
      <div className="flex max-w-3xl flex-col gap-2">
        <span className="font-mono text-xs tracking-[0.12em] text-accent">ขั้นที่ 1 — เลือกประเภทงาน</span>
        <h1 className="font-display text-3xl leading-tight font-bold md:text-[38px] xl:text-[44px]">จะพิมพ์อะไรดี?</h1>
        <p className="text-[15px] text-pretty text-muted-strong md:text-base xl:text-[17px]">
          เลือกประเภทงาน แล้วระบบจะถามรายละเอียดทีละข้อ พร้อมแสดงตัวอย่าง 2D / 3D และคำนวณราคาให้ทันที
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2.5 md:grid-cols-4 md:gap-3 xl:grid-cols-7 xl:gap-3.5">
        {TYPES.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => onPick(t.id)}
            className="flex min-h-26 flex-col items-start justify-between gap-2.5 rounded-xl border border-line bg-surface p-3 text-left transition hover:-translate-y-0.5 hover:border-ink hover:shadow-[0_6px_0_-2px_var(--color-ink)] md:min-h-35 md:p-4 xl:min-h-37.5"
          >
            <span className="flex size-10 items-center justify-center rounded-[10px] bg-[#EAE5D8] md:size-12">
              <PathIcon d={ICONS[t.id]} size={24} />
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="font-display text-base font-semibold md:text-lg xl:text-[19px]">{t.name}</span>
              <span className="hidden text-[13px] leading-snug text-muted md:block">{t.hint}</span>
            </span>
          </button>
        ))}
      </div>
    </main>
  );
}
