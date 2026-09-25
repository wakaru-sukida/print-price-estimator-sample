import Header from './components/Header.jsx';
import TypePicker from './components/TypePicker.jsx';
import PreviewStage from './components/PreviewStage.jsx';
import ChatPanel from './components/ChatPanel.jsx';
import { PriceCard, MobilePriceBar } from './components/PriceSummary.jsx';
import { useEstimator } from './hooks/useEstimator.js';

// เลย์เอาต์ตอบสนองตามหน้าจอ
//  มือถือ (<768px):   ตัวอย่างด้านบน / แชต / แถบราคาติดล่าง
//  แท็บเล็ต (md):     ตัวอย่าง + ราคา แถวบน / แชตเต็มความกว้างด้านล่าง
//  เดสก์ท็อป (xl):    แชต | ตัวอย่าง | ราคา
export default function App() {
  const est = useEstimator();

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <Header est={est} />

      {!est.type ? (
        <TypePicker onPick={est.selectType} />
      ) : (
        <main
          className="grid min-h-0 grow grid-cols-1 grid-rows-[248px_minmax(0,1fr)] gap-2.5 p-2.5 pb-[calc(86px+env(safe-area-inset-bottom))]
                     md:grid-cols-[minmax(0,1fr)_290px] md:grid-rows-[430px_minmax(0,1fr)] md:gap-3.5 md:p-3.5
                     xl:grid-cols-[420px_minmax(0,1fr)_330px] xl:grid-rows-1 xl:gap-4 xl:p-4"
        >
          <PreviewStage type={est.type} price={est.price} className="col-start-1 row-start-1 xl:col-start-2" />
          <ChatPanel
            key={est.type.id}
            est={est}
            className="col-start-1 row-start-2 md:col-span-2 xl:col-span-1 xl:col-start-1 xl:row-start-1"
          />
          <PriceCard est={est} className="hidden md:col-start-2 md:row-start-1 md:flex xl:col-start-3" />
        </main>
      )}

      {est.type && <MobilePriceBar est={est} />}
    </div>
  );
}
