import { useMemo, useState } from 'react';
import { TYPES, questionsFor } from '../data/catalog.js';
import { computePrice, nextUnanswered } from '../lib/pricing.js';

// สถานะทั้งหมดของการประเมินราคา: ประเภทงาน คำตอบ ขั้นตอนปัจจุบัน
export function useEstimator() {
  const [typeId, setTypeId] = useState(null);
  const [answers, setAnswers] = useState({});
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState(null); // คำตอบชั่วคราวของคำถามแบบเลือกได้หลายข้อ
  const [quoted, setQuoted] = useState(false);

  const type = useMemo(() => TYPES.find((t) => t.id === typeId) || null, [typeId]);
  const questions = useMemo(() => (type ? questionsFor(type) : []), [type]);
  const price = useMemo(() => (type ? computePrice(type, questions, answers) : null), [type, questions, answers]);

  const done = !!type && step >= questions.length;
  const answeredCount = questions.filter((q) => answers[q.id] !== undefined).length;

  const commit = (id, value) => {
    const next = { ...answers, [id]: value };
    setAnswers(next);
    setStep(nextUnanswered(questions, next));
    setDraft(null);
  };

  return {
    type, questions, answers, step, draft, done, price, answeredCount, quoted,

    selectType(id) {
      setTypeId(id);
      setAnswers({});
      setStep(0);
      setDraft(null);
      setQuoted(false);
    },
    goHome() {
      setTypeId(null);
    },
    choose(q, optionId) {
      if (!q.multi) return commit(q.id, optionId);
      let d = [...(draft || answers[q.id] || [])];
      if (optionId === 'none') d = ['none'];
      else {
        d = d.filter((x) => x !== 'none');
        d = d.includes(optionId) ? d.filter((x) => x !== optionId) : [...d, optionId];
      }
      setDraft(d);
    },
    confirmMulti(q) {
      commit(q.id, draft?.length ? draft : answers[q.id] || ['none']);
    },
    setCustomQty(n) {
      if (n > 0) commit('qty', `c:${n}`);
    },
    edit(index) {
      const q = questions[index];
      setStep(index);
      setDraft(q.multi ? [...(answers[q.id] || ['none'])] : null);
      setQuoted(false);
    },
    restart() {
      setAnswers({});
      setStep(0);
      setDraft(null);
      setQuoted(false);
    },
    requestQuote() {
      setQuoted(true);
    },
  };
}
