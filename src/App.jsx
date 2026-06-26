import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// 1. VERİ YAPISI
const mindMapData = {
  name: "Sistem Mimarisi",
  isRoot: true,
  children: [
    {
      name: "💻 Yazılım Geliştirme",
      children: [
        { name: "🎨 Frontend", children: [{ name: "⚡ JavaScript" }, { name: "📄 HTML" }, { name: "💠 CSS" }, { name: "⚛️ React" }] },
        { name: "⚙️ Backend", children: [{ name: "🐍 Python" }, { name: "☕ Java" }, { name: "🔷 C#" }] },
        { name: "📐 Yaklaşım", children: [{ name: "🧊 OOP (Nesneye Yönelik)" }] }
      ]
    },
    {
      name: "🏗️ Altyapı & Akıllı Sistemler",
      children: [
        { name: "🌐 Bilgisayar Ağları" },
        { name: "🧠 Yapay Zeka" },
        { name: "📊 Makine Öğrenmesi" },
        { name: "📈 Veri Analizi" },
        { name: "🛡️ Siber Güvenlik" }
      ]
    },
    {
      name: "📜 Temel Protokoller",
      children: [
        { name: "🔍 Algoritma & Veri Yapıları" },
        { name: "🧮 Matematik" },
        { name: "💡 Felsefe & Mantık" },
        { name: "🌌 Astroloji & Sembolizm" }
      ]
    },
    {
      name: "🎮 Hobiler & Kişisel Modlar",
      children: [
        { name: "🌲 Doğa & Aktivite", children: [{ name: "⛺ Kamp" }, { name: "🚶 Yürüyüş" }, { name: "🏊 Yüzme" }, { name: "⛸️ Paten" }, { name: "🚗 Araba Sürmek" }] },
        { name: "🎨 Yaratıcılık & Tasarım", children: [{ name: "🧱 Lego Yapmak" }, { name: "🖌️ Boyama Yapmak" }] },
        { name: "🎭 Kültür & Eğlence", children: [{ name: "📚 Kitap Okumak" }, { name: "🔬 Araştırma" }, { name: "🎬 Dizi/Film" }, { name: "🕹️ Oyun" }] }
      ]
    }
  ]
};

// 2. DİNAMİK DÜĞÜM BİLEŞENİ
function MindMapNode({ node }) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = node.children && node.children.length > 0;
  return (
    <div className="mind-map-row-container">
      <div onClick={() => hasChildren && setIsOpen(!isOpen)} className={`mind-map-node ${hasChildren ? 'clickable-branch' : 'leaf-node'} ${isOpen ? 'active-node' : ''}`}>
        {hasChildren && <span className="toggle-icon">{isOpen ? '▼ ' : '▶ '}</span>}
        <span className="node-text">{node.name}</span>
      </div>
      {hasChildren && isOpen && (
        <div className="mind-map-children-column">
          {node.children.map((child, index) => <MindMapNode key={index} node={child} />)}
        </div>
      )}
    </div>
  );
}

// 3. MAIN APP BİLEŞENİ
function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [bootText, setBootText] = useState('');
  const [activeTab, setActiveTab] = useState('genel-bakis');
  const [contentBg, setContentBg] = useState("transparent");

  useEffect(() => {
    const lines = ['İnsan Birimi Başlatılıyor...', 'Kişilik Modülü Yükleniyor...', 'Sistem Hazır.'];
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < lines.length) { setBootText(prev => prev + lines[currentLine] + '\n'); currentLine++; }
      else { clearInterval(interval); setTimeout(() => setIsBooting(false), 800); }
    }, 400);
    return () => clearInterval(interval);
  }, []);

  const handleScroll = (e) => {
  if (activeTab === 'calisma-sartlari') {
    const st = e.target.scrollTop;
    let color = "#1e3a8a";
    if (st < 300) color = "#1e3a8a";
    else if (st < 800) color = "#1e293b";
    else color = "#0f172a";
    
    e.target.style.transition = 'background-color 1.5s ease';
    e.target.style.setProperty('background-color', color, 'important');
  } else {
    // Diğer sekmelerde stili temizle
    e.target.style.removeProperty('background-color');
    e.target.style.removeProperty('transition');
  }
};

  if (isBooting) return <div className="boot-container"><pre className="boot-text">{bootText}</pre><div className="cursor">_</div></div>;

  return (
    <div className="app-container">
      <header className="app-header">
        <div>🤖 KULLANIM KILAVUZU: BEYZA V1.0</div>
        <div className="header-status">Durum: <span className="status-online">● Çevrimiçi</span></div>
      </header>
      <div className="main-layout">
        <aside className="sidebar">
          <nav className="menu-list">
            {['genel-bakis', 'teknik-ozellikler', 'calisma-sartlari', 'guncel-durum', 'sorun-giderme', 'terminal'].map(tab => (
              <button
                key={tab}
                className={activeTab === tab ? 'active' : ''}
                onClick={() => {
                  setActiveTab(tab);
                  const mainEl = document.querySelector('.content-area');
                  if(mainEl) {
                    mainEl.style.removeProperty('background-color');
                  }
                }}
            >
              {tab.replace('-', ' ').toUpperCase()}
            </button>
           ))}
          </nav>
        </aside>
        <main className="content-area" onScroll={handleScroll} >
          {activeTab === 'genel-bakis' && <GenelBakis />}
          {activeTab === 'teknik-ozellikler' && <div className="tab-content fade-in"><h2>⚙️ Teknik Özellikler/Donanım Mimarisi</h2><div className="mind-map-container">{mindMapData.children.map((c, i) => <MindMapNode key={i} node={c} />)}</div></div>}
          {activeTab === 'calisma-sartlari' && <CalismaSartlari />}
          {activeTab === 'guncel-durum' && <GuncelDurum />}
          {activeTab === 'sorun-giderme' && <SorunGiderme />}
          {activeTab === 'terminal' && <Terminal />}
        </main>
      </div>
    </div>
  );
}

function CalismaSartlari() {
  const logAkisi = [
    { time: "11.00", event: "Booting Sequence", detail: "Filtre kahve girişi tamamlandı. Sistem ana modülleri yüklendi. (Caffeine = 100%)" },
    { time: "11.30", event: "Network Handshake", detail: "Günün ilk bildirimleri kontrol edildi. Gereksiz paketler çöp kutusuna gönderildi." },
    { time: "12.00", event: "Deep Work (Odaklanma)", detail: "Zihinsel işlemci %99 kapasiteye çıktı. Algoritmalar işleniyor." },
    { time: "13.30", event: "Cache Optimization", detail: "Zihinsel önbellek dolmaya başladı. Müzik akışı ile buffer temizleniyor." },
    { time: "15.00", event: "System Refresh (Mola)", detail: "Donanım soğutuldu. Müzik eşliğinde açık hava yürüyüşü ile çevre sensörleri güncellendi." },
    { time: "16.00", event: "Data Ingestion", detail: "Çikolata + Kahve girişi yapıldı. Glukoz ve kafein seviyesi optimize edildi, Turbo Mode aktif." },
    { time: "16.30", event: "Bug Hunting", detail: "Kod blokları arasında 'hayalet bug' avı başlatıldı." },
    { time: "17.30", event: "Syntax Correction", detail: "Kod yapısı tekrar tarandı, ufak syntax hataları giderilerek sistemin kod kalitesi 'Premium' seviyeye yükseltildi." },
    { time: "18.00", event: "Rendering (Yaratıcılık)", detail: "Pikseller hizalandı, tasarım estetiği moduna geçildi." },
    { time: "19.30", event: "User Relaxation", detail: "Bir şeyler izleme seansı ile görsel işlemci birimi dinlendiriliyor." },
    { time: "21.30", event: "Final Commit", detail: "Günün tüm değişiklikleri başarıyla 'commit' edildi." },
    { time: "22.00", event: "Hibernation (Bakım)", detail: "Garbage Collection aktif. Sistem önbelleği temizleniyor. (Sabah 11.00'e kadar servis dışı)." }
  ];

  return (
    <div className="tab-content fade-in" style={{ paddingBottom: "100px" }}>
      <div style={{
          border: "2px solid #ef4444",
          backgroundColor: "rgba(127, 29, 29, 0.3)",
          padding: "30px",
          borderRadius: "15px",
          marginBottom: "80px",
          boxShadow: "0 0 15px rgba(239, 68, 68, 0.2)",
          textAlign: "center"
      }}>
  <h2 style={{ color: "#fecaca", fontSize: "24px", marginBottom: "15px", fontWeight: "bold" }}>
    ⚠️ KRİTİK SİSTEM UYARISI
  </h2>
  <p style={{ color: "#fca5a5", fontSize: "18px", lineHeight: "1.6", borderTop: "1px solid rgba(239, 68, 68, 0.4)", paddingTop: "15px" }}>
    Sistem, 11:00 öncesi zorla başlatma (force restart) komutlarına karşı "Huysuzluk Modu" ile yanıt verir. 
    Bu moddayken yaratıcılık parametreleri devre dışı kalır. Lütfen sistem stabil hale gelmeden veri girişi yapmayın.
  </p>
</div>
      <div className="relative border-l-2 border-gray-600 ml-6 space-y-32">
        {logAkisi.map((item, index) => (
          <div key={index} className="ml-8 relative py-6">
            <div className="absolute -left-12 mt-2 w-6 h-6 bg-blue-500 rounded-full border-4 border-gray-900 shadow-[0_0_15px_rgba(0,168,255,0.8)]"></div>
            <h3 className="font-bold text-2xl text-blue-300">{item.time} | {item.event}</h3>
            <p className="text-gray-200 mt-4 text-lg leading-relaxed">{item.detail}</p>
          </div>
        ))}
      </div>

      {/* 3. Bakım Paneli */}
      <div style={{
        marginTop: "60px",
        padding: "40px",
        backgroundColor: "rgba(30, 41, 59, 0.5)",
        border: "1px solid #334155",
        borderRadius: "12px",
        color: "#e2e8f0"
      }}>
        <h2 style={{ 
        fontSize: "28px", 
        marginBottom: "25px", 
        display: "flex", 
        alignItems: "center", 
        gap: "10px",
        color: "#cbd5e1"
        }}>
          🛠️ <span style={{ borderBottom: "2px solid #3b82f6" }}>Sistem Bakım Protokolü</span>
        </h2>
  
        <ul style={{ listStyle: "none", padding: 0 }}>
          {[
            { title: "Garanti Kapsamı", desc: "Sistem; kesintisiz internet ve düzenli kahve ile 'Ömür Boyu Güncel'dir." },
            { title: "Servis Dışı Durumlar", desc: "Acil iş yüklemeleri ve biyolojik saate aykırı istekler 'Huysuzluk' protokolünü tetikler." },
            { title: "Dijital Detoks", desc: "İşlemci ısısını dengelemek için günde en az 30 dakika 'Offline Mod' zorunludur." }
          ].map((item, idx) => (
            <li key={idx} style={{ marginBottom: "20px", paddingLeft: "20px", borderLeft: "3px solid #3b82f6" }}>
              <strong style={{ display: "block", color: "#60a5fa", marginBottom: "5px" }}>{item.title}</strong>
              <span style={{ fontSize: "16px", lineHeight: "1.5" }}>{item.desc}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
function GenelBakis() {
  return (
    <div className="tab-content fade-in p-6 text-gray-200 flex flex-col items-center justify-start h-full">
      <h1 className="text-2xl font-bold text-blue-400 mb-8 text-center tracking-wider">
        BEYZA V1.0 - SİSTEM ANALİZİ
      </h1>

      <div className="flex flex-row items-center justify-center gap-8 w-full max-w-4xl min-w-[700px]">
        <div className="w-[320px] h-[320px] flex-shrink-0 overflow-hidden rounded-full border-2 border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.4)]">
          <img src="/avatar.png" alt="Beyza" className="w-full h-full object-cover avatar-resim" />
        </div>

        <div className="grid grid-cols-2 gap-4 w-full">
          {[
            { title: "OPTİK", desc: "2x Sınırsız Göz" },
            { title: "ÜNİTE", desc: "Creative V1.0" },
            { title: "DEPO", desc: "Sınırsız Hayal Gücü" },
            { title: "YAKIT", desc: "Kafein & Çikolata" }
          ].map((item, idx) => (
            <div key={idx} className="p-3 bg-gray-900/60 rounded-md hud-kutu text-center cursor-pointer">
              <h4 className="text-blue-400 font-bold text-[9px] uppercase tracking-widest">{item.title}</h4>
              <p className="text-[11px] text-gray-300 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 w-full max-w-2xl p-6 border-t border-blue-500/20 text-center">
        <h4 className="text-blue-400 font-bold text-sm mb-4 tracking-widest">⚡ Hızlı Başlatma (Setup)</h4>
        <div className="text-gray-300 text-sm space-y-2 font-mono">
          <p>1. Göz teması ile protokolü başlatın.</p>
          <p>2. "Merhaba" paketi ile bağlantıyı kurun.</p>
          <p>3. Hata kodlarında çikolata ile cache temizleyin.</p>
        </div>
      </div>
    </div>
  );
}
function GuncelDurum() {
  const [activeKart, setActiveKart] = useState(null);
  const lastUpdated = new Date().toLocaleDateString('tr-TR');

  const kartlar = [
    { id: 1, baslik: "📚 Şu an okuyorum", içerik: "Gece Yarısı Kütüphanesi - Matt Haig", icon: "📖", image: "/gece-yarisi-kutuphanesi.jpg" },
    { id: 2, baslik: "💻 Odağım", içerik: "Yapay Zeka", icon: "🚀", image: "/ai.jpg" },
    { id: 3, baslik: "🧠 Şu an öğreniyorum", içerik: "Veri Bilimi ve Makine Öğrenmesi", icon: "💡", image: "/veri.jpg" },
    { id: 4, baslik: "🎯 Bu ay odağım", içerik: "Veri Bilimi İçin Matematik ve İstatistik", icon: "🎯", image: "/mat.jpg" },
    { id: 5, baslik: "🎧 Şu an dinliyorum", içerik: "spotify_embed", icon: "🎵" }
  ];

  return (
    <div className="tab-content fade-in p-8 text-gray-200">
      <h1 className="text-3xl font-bold text-blue-400 mb-8">📊 GÜNCEL DURUM</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
        {kartlar.map((kart) => (
          <div 
            key={kart.id} 
            onClick={() => kart.içerik !== "spotify_embed" && setActiveKart(activeKart === kart.id ? null : kart.id)}
            className={`kart-stili ${activeKart === kart.id ? 'kart-aktif' : ''} ${kart.içerik === "spotify_embed" ? 'cursor-default' : ''}`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{kart.icon}</span>
                <h3 className="text-lg font-bold">{kart.baslik}</h3>
              </div>
              {kart.içerik !== "spotify_embed" && (
                <span className={`text-gray-500 transition-transform duration-300 ${activeKart === kart.id ? 'rotate-180' : ''}`}>▼</span>
              )}
            </div>

            {kart.içerik === "spotify_embed" ? (
              <div className="spotify-konteyner mt-4">
                <iframe 
                  src="https://open.spotify.com/embed/playlist/2d25U4CREkVUYTXeSO2CBe?utm_source=generator&theme=0" 
                  width="100%" height="152" frameBorder="0" allow="encrypted-media"
                ></iframe>
              </div>
            ) : (
              activeKart === kart.id && (
                <div className="mt-4 pt-4 border-t border-gray-600 animate-in fade-in flex items-center gap-4">
                  <img src={kart.image} alt={kart.baslik} className="kart-image" />
                  <p className="text-sm text-blue-300 font-medium">{kart.içerik}</p>
                </div>
              )
            )}
          </div>
        ))}
      </div>

      <div className="fixed bottom-6 right-8 text-[10px] text-gray-600 uppercase tracking-widest font-mono">
        Son Güncelleme: {lastUpdated}
      </div>
    </div>
  );
}

function SorunGiderme() {
  return (
    <div className="tab-content fade-in p-6 text-gray-200 flex flex-col items-center justify-start h-full">
      <h1 className="text-2xl font-bold text-blue-400 mb-8 text-center tracking-wider">
        SORUN GİDERME PROTOKOLÜ
      </h1>

      <div className="w-full max-w-2xl flex flex-col border border-blue-500/30 rounded-lg overflow-hidden">
        {[
          { title: "BAĞLANTI HATASI", desc: "Sistemi yeniden başlatın ve göz temasını tazeleyin." },
          { title: "ÖNBELLEK DOLU", desc: "Önerilen dozda çikolata ile cache'i temizleyin." },
          { title: "KAYNAK YETERSİZ", desc: "Kafein girişini optimize edin ve tekrar deneyin." },
          { title: "SİSTEM DONMASI", desc: "Beyza'ya gülümseyerek manuel reset atın." }
        ].map((item, idx) => (
          <div 
            key={idx} 
            className="p-4 border-b border-blue-500/30 last:border-0 hud-kutu text-center cursor-pointer bg-gray-900/40"
          >
            <h4 className="text-blue-400 font-bold text-[10px] uppercase tracking-widest">{item.title}</h4>
            <p className="text-[13px] text-gray-300 mt-1">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* KRİTİK SİSTEM UYARISI*/}
      <div 
        className="mt-8 w-full max-w-2xl p-6 border-2 border-red-500 rounded-lg text-center shadow-[0_0_20px_rgba(239,68,68,0.3)]"
        style={{ 
          backgroundColor: "#450a0a", 
          borderColor: "#ef4444"
        }}
      >
        <h4 className="text-red-400 font-bold text-sm mb-4 tracking-[0.2em] uppercase flex items-center justify-center gap-2">
          <span className="text-lg">⚠️</span> Acil Durum (Emergency Protocol)
        </h4>
        <p className="text-gray-200 text-sm font-mono leading-relaxed">
          Kritik hatalarda doğrudan <span className="text-red-400 font-bold">"BEYZA_RESET"</span> komutunu kullanın. 
          Sistem kendini yeniden kalibre edecektir.
        </p>
      </div>
    </div>
  );
}

function Terminal() {
  const [input, setInput] = useState('');
  const [loglar, setLoglar] = useState([
    'Beyza V1.0 Terminali Başlatıldı...', 
    'Sistem durumu kontrol ediliyor...', 
    'Yardım için "help" yazın.'
  ]);
  const terminalEndRef = useRef(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [loglar]);

  const komutCalistir = (e) => {
    if (e.key === 'Enter' && input.trim() !== '') {
      const cmd = input.trim().toLowerCase();
      const yeniLoglar = [...loglar, `root@beyza-system:~$ ${input}`];
      
      switch(cmd) {
        case 'help': 
          yeniLoglar.push('Mevcut Komutlar: status, whoami, skills, date, clear, sudo reset'); 
          break;
        case 'date': 
          yeniLoglar.push(`Sistem Zamanı: ${new Date().toLocaleString('tr-TR')}`); 
          break;
        case 'status': 
          yeniLoglar.push('Sistem: Stabil | Kafein: %100 | Mod: Kreatif | CPU: %5'); 
          break;
        case 'whoami': 
          yeniLoglar.push('Kullanıcı: Beyza | Rol: Full-Stack Developer & AI Enthusiast'); 
          break;
        case 'skills': 
          yeniLoglar.push('Teknolojiler: React, JavaScript, Python, UI/UX Tasarımı'); 
          break;
        case 'clear': 
          setLoglar([]); 
          return;
        case 'sudo reset': 
          yeniLoglar.push('!!! KRİTİK SİSTEM YENİDEN BAŞLATILIYOR...');
          setTimeout(() => window.location.reload(), 1500);
          break;
        default: 
          yeniLoglar.push(`Hata: '${cmd}' komutu tanımlı değil. 'help' yazarak komut listesine ulaşabilirsiniz.`);
      }
      
      setLoglar(yeniLoglar);
      setInput('');
    }
  };

  return (
    <div className="tab-content fade-in p-6 h-full flex flex-col font-mono text-sm max-w-2xl">
      <h2 className="text-blue-400 mb-4 border-b border-blue-500/30 pb-2">root@beyza-system:~$</h2>
      
      <div className="flex-1 bg-black/80 p-4 border border-blue-500/20 rounded-lg overflow-y-auto mb-4 font-mono text-green-400 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
        {loglar.map((log, i) => (
          <div key={i} className="mb-1 leading-relaxed">
            {log}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      <div className="flex items-center gap-2 bg-gray-900/50 p-2 rounded border border-blue-500/20">
        <span className="text-blue-400">$</span>
        <input 
          className="flex-1 bg-transparent text-white outline-none font-mono"
          placeholder="Komut girin..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={komutCalistir}
          autoFocus
        />
      </div>
    </div>
  );
}
export default App;