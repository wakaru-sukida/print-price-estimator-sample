import { RegMark, PathIcon, ICON_PATHS } from './Icons.jsx';

export default function Header({ est }) {
  const { type, questions, answeredCount, goHome } = est;
  const pct = questions.length ? Math.round((answeredCount / questions.length) * 100) : 0;

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-line bg-surface px-3.5 md:h-16 md:px-6">
      <RegMark />
      <div className="flex flex-col leading-tight">
        <span className="font-display text-[17px] font-bold md:text-[19px]">ประเมินราคางานพิมพ์</span>
        <span className="hidden text-xs text-muted md:block">ถาม–ตอบทีละข้อ คำนวณราคาทันที</span>
      </div>
      <div className="grow" />
      {type && (
        <div className="flex items-center gap-2.5">
          <div className="hidden flex-col items-end gap-1 md:flex">
            <span className="font-mono text-xs text-muted">
              ตอบแล้ว {answeredCount} / {questions.length}
            </span>
            <div className="h-1 w-36 overflow-hidden rounded-full bg-[#E3DED1]" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="ความคืบหน้า">
              <div className="h-1 bg-accent transition-all" style={{ width: `${pct}%` }} />
            </div>
          </div>
          <button type="button" onClick={goHome} className="flex min-h-11 items-center gap-1.5 rounded-[10px] border-[1.5px] border-ink px-3.5 text-sm font-semibold" aria-label={`เปลี่ยนประเภทงาน (ตอนนี้: ${type.name})`}>
            <PathIcon d={ICON_PATHS.back} size={16} strokeWidth={2} />
            <span>{type.name}</span>
          </button>
        </div>
      )}
    </header>
  );
}
