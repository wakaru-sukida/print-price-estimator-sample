import { useEffect, useRef, useState } from 'react';
import { answerLabel, baht, baht2 } from '../lib/pricing.js';
import { RegMark, PathIcon, ICON_PATHS } from './Icons.jsx';

function Avatar({ active = false, done = false }) {
  return (
    <div className={`flex size-[30px] shrink-0 items-center justify-center rounded-full ${active || done ? 'bg-accent' : 'bg-ink'}`}>
      {done ? <PathIcon d={ICON_PATHS.check} size={16} strokeWidth={2.4} className="text-white" /> : <RegMark size={18} color={active ? '#FFFFFF' : '#F3F0E8'} />}
    </div>
  );
}

const botBubble = 'rounded-[4px_14px_14px_14px] border bg-white px-3.5 py-2.5 text-[15px] leading-relaxed';

export default function ChatPanel({ est, className = '' }) {
  const { type, questions, answers, step, draft, done, price, quoted } = est;
  const scrollRef = useRef(null);
  const [customQty, setCustomQty] = useState('');

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [step, quoted, type]);

  const cur = done ? null : questions[step];
  const chosen = cur ? (cur.multi ? draft || answers[cur.id] || [] : [answers[cur.id]]) : [];

  return (
    <section aria-label="ถาม-ตอบรายละเอียดงาน" className={`flex min-h-0 flex-col overflow-hidden rounded-[14px] border border-line bg-surface ${className}`}>
      <div ref={scrollRef} className="flex min-h-0 grow flex-col gap-3.5 overflow-y-auto p-3 md:p-[18px]" aria-live="polite">
        <div className="flex items-start gap-2.5">
          <Avatar />
          <div className={`${botBubble} border-[#E3DED1] text-pretty`}>
            เริ่มประเมินราคางาน{type.name} ตอบคำถามทีละข้อ ราคาและตัวอย่างจะอัปเดตทันที กด “แก้ไข” เพื่อเปลี่ยนคำตอบได้ทุกเมื่อ
          </div>
        </div>

        {questions.map((q, i) =>
          i === step || answers[q.id] === undefined ? null : (
            <div key={q.id} className="flex flex-col gap-2">
              <div className="flex items-start gap-2.5">
                <Avatar />
                <div className={`${botBubble} border-[#E3DED1]`}>{q.text}</div>
              </div>
              <div className="flex items-center justify-end gap-2">
                <button type="button" onClick={() => est.edit(i)} className="min-h-11 px-2.5 text-[13px] font-semibold text-accent underline">
                  แก้ไข
                </button>
                <div className="max-w-[78%] rounded-[14px_4px_14px_14px] bg-ink px-3.5 py-2.5 text-[15px] leading-relaxed text-paper">
                  {answerLabel(q, answers)}
                  {q.isQty ? ` ${type.unit}` : ''}
                </div>
              </div>
            </div>
          ),
        )}

        {cur && (
          <div className="flex flex-col gap-2.5">
            <div className="flex items-start gap-2.5">
              <Avatar active />
              <div className={`${botBubble} flex flex-col gap-1 border-[1.5px] border-accent`}>
                <span className="font-mono text-[11px] tracking-[0.08em] text-accent">
                  คำถามที่ {step + 1} / {questions.length}
                </span>
                <span className="text-base leading-snug font-semibold">{cur.text}</span>
                {cur.hint && <span className="text-[13px] text-muted">{cur.hint}</span>}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pl-10">
              {cur.options.map((o) => {
                const on = chosen.includes(o.id);
                return (
                  <button
                    key={o.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => est.choose(cur, o.id)}
                    className={`flex min-h-11 flex-col items-start gap-px rounded-[10px] border-[1.5px] px-3.5 py-2 text-left transition ${
                      on ? 'border-ink bg-ink text-paper' : 'border-line-strong bg-white hover:border-ink'
                    }`}
                  >
                    <span className="text-[15px] font-semibold">{o.label}</span>
                    {o.sub && <span className="font-mono text-xs opacity-80">{o.sub}</span>}
                  </button>
                );
              })}
            </div>

            {cur.isQty && (
              <form
                className="flex flex-wrap items-end gap-2 pl-10"
                onSubmit={(e) => {
                  e.preventDefault();
                  est.setCustomQty(parseInt(customQty, 10));
                }}
              >
                <div className="flex flex-col gap-1">
                  <label htmlFor="custom-qty" className="text-[13px] text-muted-strong">
                    หรือระบุจำนวนเอง ({type.unit})
                  </label>
                  <input
                    id="custom-qty"
                    type="number"
                    min="1"
                    inputMode="numeric"
                    placeholder="เช่น 2500"
                    value={customQty}
                    onChange={(e) => setCustomQty(e.target.value)}
                    className="min-h-11 w-[150px] rounded-[10px] border-[1.5px] border-line-strong bg-white px-3 font-mono text-[15px]"
                  />
                </div>
                <button type="submit" className="min-h-11 rounded-[10px] border-[1.5px] border-ink bg-surface px-4 font-semibold">
                  ใช้จำนวนนี้
                </button>
              </form>
            )}

            {cur.multi && (
              <div className="pl-10">
                <button type="button" onClick={() => est.confirmMulti(cur)} className="min-h-11 rounded-[10px] bg-accent px-5 font-semibold text-white hover:bg-accent-dark">
                  ยืนยันตัวเลือก
                </button>
              </div>
            )}
          </div>
        )}

        {done && (
          <div className="flex items-start gap-2.5">
            <Avatar done />
            <div className={`${botBubble} flex flex-col gap-2.5 border-[1.5px] border-accent`}>
              <span>
                ครบทุกข้อแล้ว ราคาประเมินงาน{type.name} {price.qty.toLocaleString('th-TH')} {type.unit} อยู่ที่
              </span>
              <span className="font-display text-[28px] font-bold">฿{baht(price.total)}</span>
              <span className="text-[13px] text-muted-strong">
                เฉลี่ย ฿{baht2(price.perUnit)} / {type.unit} · รวม VAT 7% · ผลิตประมาณ {price.days} วันทำการ
              </span>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={est.requestQuote} className="min-h-11 rounded-[10px] bg-ink px-[18px] font-semibold text-paper">
                  ขอใบเสนอราคา
                </button>
                <button type="button" onClick={est.restart} className="min-h-11 rounded-[10px] border-[1.5px] border-ink px-4 font-semibold">
                  เริ่มใหม่
                </button>
              </div>
            </div>
          </div>
        )}

        {quoted && (
          <div className="flex justify-end">
            <div className="max-w-[82%] rounded-[14px] bg-accent-soft px-3.5 py-2.5 text-sm leading-relaxed text-accent-dark">
              ส่งคำขอใบเสนอราคาพร้อมสเปกงานแล้ว ฝ่ายขายจะติดต่อกลับทาง [ช่องทางติดต่อของร้าน]
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
