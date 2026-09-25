import { useState } from 'react';
import { answerLabel, baht, baht2 } from '../lib/pricing.js';

function Breakdown({ est }) {
  const { price, questions, answers, answeredCount } = est;
  const rows = [
    ['ค่าเพลท / ตั้งเครื่อง', price.plate],
    ['ค่ากระดาษ / วัสดุ', price.paper],
    ['ค่าพิมพ์', price.print],
    ['ค่าตกแต่ง / เข้าเล่ม', price.finish],
    ['VAT 7%', price.vat],
  ];
  const specs = questions.filter((q) => answers[q.id] !== undefined);

  return (
    <>
      {answeredCount < questions.length && (
        <span className="text-xs text-warn">ยังตอบไม่ครบ — ข้อที่เหลือใช้ค่าเริ่มต้นชั่วคราว</span>
      )}
      <dl className="flex flex-col gap-2 border-t border-ink-line pt-3">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-3 text-sm">
            <dt className="text-on-ink">{k}</dt>
            <dd className="font-mono">{baht(v)}</dd>
          </div>
        ))}
      </dl>
      <div className="flex justify-between rounded-lg bg-ink-soft px-3 py-2.5 text-sm">
        <span className="text-on-ink">ระยะเวลาผลิต</span>
        <span className="font-mono">~{price.days} วันทำการ</span>
      </div>
      {specs.length > 0 && (
        <div className="flex flex-col gap-1.5 border-t border-ink-line pt-3">
          <span className="font-mono text-[11px] tracking-[0.12em] text-on-ink-muted">สเปกงาน</span>
          <dl className="flex flex-col gap-1.5">
            {specs.map((q) => (
              <div key={q.id} className="flex justify-between gap-3 text-[13px] leading-snug">
                <dt className="shrink-0 text-on-ink-muted">{q.short}</dt>
                <dd className="text-right">{answerLabel(q, answers)}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </>
  );
}

// แท็บเล็ต/เดสก์ท็อป: การ์ดสรุปราคาด้านข้าง
export function PriceCard({ est, className = '' }) {
  const { price, type } = est;
  return (
    <aside aria-label="สรุปราคา" className={`min-h-0 flex-col gap-3.5 overflow-y-auto rounded-[14px] bg-ink p-[18px] text-paper ${className}`}>
      <div className="flex flex-col gap-0.5">
        <span className="font-mono text-[11px] tracking-[0.12em] text-on-ink-muted">ราคาประเมิน (รวม VAT 7%)</span>
        <span className="font-display text-[32px] leading-tight font-bold xl:text-[38px]">฿{baht(price.total)}</span>
        <span className="text-[13px] text-on-ink">
          ฿{baht2(price.perUnit)} / {type.unit} · {price.qty.toLocaleString('th-TH')} {type.unit}
        </span>
      </div>
      <Breakdown est={est} />
      <div className="grow" />
      <button type="button" onClick={est.requestQuote} className="min-h-12 rounded-[10px] bg-paper text-[15px] font-semibold text-ink">
        ขอใบเสนอราคา
      </button>
      <span className="text-xs leading-normal text-on-ink-muted">ราคาประเมินเบื้องต้น ยังไม่รวมค่าออกแบบและค่าจัดส่ง</span>
    </aside>
  );
}

// มือถือ: แถบราคาด้านล่าง + แผ่นรายละเอียดที่เลื่อนขึ้นมา
export function MobilePriceBar({ est }) {
  const [open, setOpen] = useState(false);
  const { price, type } = est;
  return (
    <div className="md:hidden">
      {open && (
        <div id="price-sheet" className="fixed inset-x-0 bottom-[calc(76px+env(safe-area-inset-bottom))] z-20 flex max-h-[62dvh] flex-col gap-2.5 overflow-y-auto rounded-t-[18px] bg-ink px-4 py-[18px] text-paper shadow-[0_-12px_32px_rgba(23,24,28,0.25)]">
          <Breakdown est={est} />
          <span className="text-xs text-on-ink-muted">ราคาประเมินเบื้องต้น ยังไม่รวมค่าออกแบบและค่าจัดส่ง</span>
        </div>
      )}
      <div className="fixed inset-x-0 bottom-0 z-30 flex h-[calc(76px+env(safe-area-inset-bottom))] items-center gap-3 bg-ink px-4 pb-[env(safe-area-inset-bottom)] text-paper">
        <div className="flex min-w-0 grow flex-col">
          <span className="text-[11px] text-on-ink-muted">ราคาประเมิน รวม VAT</span>
          <span className="font-display text-[22px] leading-tight font-bold">฿{baht(price.total)}</span>
          <span className="truncate text-xs text-on-ink">
            ฿{baht2(price.perUnit)} / {type.unit} · {price.qty.toLocaleString('th-TH')} {type.unit}
          </span>
        </div>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="price-sheet"
          onClick={() => setOpen((v) => !v)}
          className="min-h-11 rounded-[10px] border-[1.5px] border-paper px-4 text-sm font-semibold"
        >
          {open ? 'ซ่อน' : 'รายละเอียด'}
        </button>
      </div>
    </div>
  );
}
