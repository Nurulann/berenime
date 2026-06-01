import { useState, useEffect, useRef, useCallback } from "react";

// ─── Helpers ────────────────────────────────────────────────────────────────

const normalizeText = (str) =>
  str
    .toLowerCase()
    .replace(/ı/g, "i")
    .replace(/İ/g, "i")
    .replace(/ğ/g, "g")
    .replace(/Ğ/g, "g")
    .replace(/ş/g, "s")
    .replace(/Ş/g, "s")
    .replace(/ç/g, "c")
    .replace(/Ç/g, "c")
    .replace(/ö/g, "o")
    .replace(/Ö/g, "o")
    .replace(/ü/g, "u")
    .replace(/Ü/g, "u")
    .trim();



// ─── Heart Rain Component ────────────────────────────────────────────────────

const HeartRain = ({ active }) => {
  const hearts = active ? Array.from({ length: 30 }, (_, i) => i) : [];
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999, overflow: "hidden" }}>
      {hearts.map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${Math.random() * 100}%`,
            bottom: "-10%",
            fontSize: `${14 + Math.random() * 22}px`,
            animation: `floatHeart ${1.5 + Math.random() * 2}s ease-in forwards`,
            animationDelay: `${Math.random() * 1.5}s`,
            opacity: 0,
          }}
        >
          {["💕", "💗", "💖", "💝", "❤️", "🩷"][Math.floor(Math.random() * 6)]}
        </div>
      ))}
    </div>
  );
};

// ─── YUA Floating Component ──────────────────────────────────────────────────

const YuaFloat = ({ active, onDone }) => {
  const [items] = useState(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: `${5 + Math.random() * 88}%`,
      size: `${40 + Math.random() * 60}px`,
      delay: `${Math.random() * 1.2}s`,
      dur: `${2.5 + Math.random() * 2}s`,
    }))
  );

  useEffect(() => {
    if (active) {
      const t = setTimeout(onDone, 3800);
      return () => clearTimeout(t);
    }
  }, [active, onDone]);

  if (!active) return null;
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9000, overflow: "hidden" }}>
      {items.map((item) => (
        <img
          key={item.id}
          src="/YUA.png"
          alt="YUA"
          style={{
            position: "absolute",
            left: item.left,
            bottom: "-100px",
            width: item.size,
            height: item.size,
            animation: `yuaFloat ${item.dur} ease-in forwards`,
            animationDelay: item.delay,
          }}
        />
      ))}
    </div>
  );
};

// ─── Countdown Modal ─────────────────────────────────────────────────────────

const CountdownModal = ({ onDone }) => {
  const [count, setCount] = useState(5);
  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => {
        if (c <= 1) { clearInterval(id); setTimeout(onDone, 400); return 0; }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [onDone]);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9990,
      background: "rgba(180,120,200,0.55)", backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{
        background: "linear-gradient(135deg,#fff0f8,#f5e6ff)",
        borderRadius: 28, padding: "36px 32px",
        textAlign: "center", maxWidth: 300, width: "88%",
        border: "2px solid #e8b4e8", boxShadow: "0 8px 40px rgba(180,100,200,0.3)",
      }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🤗</div>
        <p style={{ fontSize: 17, fontWeight: 700, color: "#8b3a8b", margin: "0 0 20px", lineHeight: 1.4 }}>
          Ozaman 5 saniye bekle simdi (nedeni yok) 
        </p>
        <div style={{
          width: 80, height: 80, borderRadius: "50%",
          background: "linear-gradient(135deg,#f0a0c0,#c070d0)",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto", fontSize: 38, fontWeight: 800, color: "#fff",
          boxShadow: "0 4px 20px rgba(180,80,200,0.4)",
          animation: "pulse 1s ease-in-out infinite",
        }}>
          {count}
        </div>
      </div>
    </div>
  );
};

// ─── Pop-up ──────────────────────────────────────────────────────────────────

const Popup = ({ text, onClose, duration = 2200 }) => {
  useEffect(() => {
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, [onClose, duration]);
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      display: "flex", alignItems: "center", justifyContent: "center",
      pointerEvents: "none",
    }}>
      <div style={{
        background: "linear-gradient(135deg,#fff0f8,#f0e6ff)",
        borderRadius: 20, padding: "22px 32px",
        fontSize: 22, fontWeight: 800, color: "#8b3a8b",
        border: "2px solid #e8a0d0", boxShadow: "0 8px 32px rgba(180,80,200,0.35)",
        animation: "popIn 0.3s cubic-bezier(.34,1.56,.64,1)",
        textAlign: "center", maxWidth: "80%",
      }}>
        {text}
      </div>
    </div>
  );
};

// ─── Button that runs away ────────────────────────────────────────────────────

const RunawayButton = ({ label, onEscape, style }) => {
  const btnRef = useRef(null);
  const [pos, setPos] = useState({ top: "auto", left: "auto", transform: "none" });
  const [escaped, setEscaped] = useState(false);

  const escape = useCallback(() => {
    const maxX = window.innerWidth - 160;
    const maxY = window.innerHeight - 80;
    const x = 20 + Math.random() * maxX;
    const y = 60 + Math.random() * maxY;
    setPos({ position: "fixed", top: y, left: x, zIndex: 8000, transform: "none" });
    setEscaped(true);
  }, []);

  return (
    <div
      ref={btnRef}
      onMouseEnter={escape}
      onTouchStart={escape}
      onClick={escape}
      style={{
        ...style,
        ...(escaped ? pos : {}),
        cursor: "pointer",
        transition: "top 0.18s ease, left 0.18s ease",
      }}
    >
      {label}
    </div>
  );
};

// ─── Confetti ────────────────────────────────────────────────────────────────

const Confetti = ({ active }) => {
  const pieces = active
    ? Array.from({ length: 60 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: ["#f9c5d1", "#c5a0f0", "#f0c5e0", "#ffd6e7", "#e8b4e8", "#ffe4f0"][
          Math.floor(Math.random() * 6)
        ],
        size: 6 + Math.random() * 10,
        delay: Math.random() * 1.2,
        dur: 1.5 + Math.random() * 2,
        rot: Math.random() * 360,
      }))
    : [];
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9998, overflow: "hidden" }}>
      {pieces.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: "-20px",
            width: p.size,
            height: p.size * 0.6,
            background: p.color,
            borderRadius: 2,
            transform: `rotate(${p.rot}deg)`,
            animation: `confettiFall ${p.dur}s ease-in forwards`,
            animationDelay: `${p.delay}s`,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
};

// ─── CSS Injection ────────────────────────────────────────────────────────────

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Fredoka+One&display=swap');
    
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    
    body {
      font-family: 'Nunito', sans-serif;
      background: #f8e8f8;
      min-height: 100vh;
      overflow-x: hidden;
    }

    .app-root {
      max-width: 430px;
      min-height: 100dvh;
      margin: 0 auto;
      background: linear-gradient(160deg, #fff0f8 0%, #f5e6ff 50%, #ffe4f0 100%);
      position: relative;
      overflow: hidden;
    }

    .screen {
      min-height: 100dvh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 28px 22px 40px;
      gap: 0;
    }

    .card {
      background: rgba(255,255,255,0.82);
      border-radius: 24px;
      padding: 28px 22px;
      width: 100%;
      border: 2px solid rgba(220,160,220,0.35);
      box-shadow: 0 4px 28px rgba(180,100,200,0.12);
      backdrop-filter: blur(10px);
    }

    .title {
      font-family: 'Fredoka One', cursive;
      font-size: 26px;
      color: #8b3a8b;
      text-align: center;
      line-height: 1.3;
      margin-bottom: 22px;
    }

    .subtitle {
      font-size: 15px;
      color: #a060a0;
      text-align: center;
      margin-bottom: 20px;
      line-height: 1.5;
    }

    .btn {
      width: 100%;
      padding: 17px 20px;
      border-radius: 18px;
      border: none;
      font-family: 'Nunito', sans-serif;
      font-size: 16px;
      font-weight: 800;
      cursor: pointer;
      transition: transform 0.15s, box-shadow 0.15s;
      line-height: 1.3;
      text-align: center;
      margin-bottom: 12px;
      min-height: 56px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .btn:last-child { margin-bottom: 0; }

    .btn:active { transform: scale(0.96); }

    .btn-primary {
      background: linear-gradient(135deg, #f080b0, #c060d0);
      color: #fff;
      box-shadow: 0 4px 18px rgba(200,80,180,0.35);
    }

    .btn-primary:hover { box-shadow: 0 6px 24px rgba(200,80,180,0.5); transform: translateY(-1px); }

    .btn-secondary {
      background: linear-gradient(135deg, #f5e6ff, #ffe4f0);
      color: #8b3a8b;
      border: 2px solid rgba(200,120,200,0.4);
      box-shadow: 0 2px 12px rgba(180,100,200,0.15);
    }

    .btn-secondary:hover { box-shadow: 0 4px 18px rgba(180,100,200,0.25); }

    .btn-runaway {
      background: linear-gradient(135deg, #ffe4f0, #f5e6ff);
      color: #9b4a9b;
      border: 2px solid rgba(200,120,200,0.4);
      padding: 17px 20px;
      border-radius: 18px;
      font-family: 'Nunito', sans-serif;
      font-size: 16px;
      font-weight: 800;
      width: 100%;
      min-height: 56px;
      user-select: none;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .input-field {
      width: 100%;
      padding: 15px 18px;
      border-radius: 16px;
      border: 2px solid rgba(200,120,200,0.4);
      font-family: 'Nunito', sans-serif;
      font-size: 16px;
      color: #5a2a5a;
      background: rgba(255,255,255,0.85);
      outline: none;
      margin-bottom: 16px;
      transition: border-color 0.2s;
    }

    .input-field:focus { border-color: #c060d0; }

    .shake {
      animation: shake 0.5s ease-in-out;
    }

    .slide-in {
      animation: slideIn 0.38s cubic-bezier(.34,1.56,.64,1);
    }

    .stage-badge {
      background: linear-gradient(135deg, #f080b0, #c060d0);
      color: #fff;
      font-size: 12px;
      font-weight: 800;
      padding: 6px 16px;
      border-radius: 50px;
      margin-bottom: 20px;
      letter-spacing: 1px;
      text-transform: uppercase;
      display: inline-block;
    }

    .emoji-big {
      font-size: 56px;
      text-align: center;
      margin-bottom: 16px;
      display: block;
    }

    .gift-code-box {
      background: linear-gradient(135deg, rgba(255,255,255,0.95), rgba(245,230,255,0.95));
      border-radius: 20px;
      border: 2px solid #d4a0d0;
      padding: 20px;
      text-align: center;
      margin: 16px 0;
    }

    .gift-code {
      font-family: 'Fredoka One', cursive;
      font-size: 26px;
      color: #6a1a6a;
      letter-spacing: 3px;
      margin: 8px 0;
    }

    .copy-row {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      margin-top: 12px;
    }

    .copy-btn {
      background: linear-gradient(135deg, #f080b0, #c060d0);
      color: #fff;
      border: none;
      border-radius: 50px;
      padding: 10px 22px;
      font-family: 'Nunito', sans-serif;
      font-size: 15px;
      font-weight: 800;
      cursor: pointer;
      transition: transform 0.15s;
    }

    .copy-btn:active { transform: scale(0.95); }

    .netflix-btn {
      width: 100%;
      padding: 18px;
      background: linear-gradient(135deg, #e50914, #b30710);
      color: #fff;
      border: none;
      border-radius: 18px;
      font-family: 'Nunito', sans-serif;
      font-size: 17px;
      font-weight: 800;
      text-decoration: none;
      text-align: center;
      display: block;
      margin-top: 14px;
      box-shadow: 0 4px 20px rgba(229,9,20,0.4);
      cursor: pointer;
      transition: transform 0.15s, box-shadow 0.15s;
    }

    .netflix-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 28px rgba(229,9,20,0.5); }
    .netflix-btn:active { transform: scale(0.97); }

    .final-bg-white {
      background-image: url('white.png');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }

    .final-bg-purple {
      background-image: url('purple.png');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }

    .teleport-btn {
      background: linear-gradient(135deg, #f080b0, #c060d0);
      color: #fff;
      border: none;
      border-radius: 18px;
      font-family: 'Nunito', sans-serif;
      font-size: 15px;
      font-weight: 800;
      padding: 17px 20px;
      min-height: 56px;
      cursor: pointer;
      position: absolute;
      transition: top 0.18s cubic-bezier(.34,1.56,.64,1), left 0.18s cubic-bezier(.34,1.56,.64,1);
      width: 200px;
      text-align: center;
      box-shadow: 0 4px 18px rgba(200,80,180,0.35);
    }

    .progress-dots {
      display: flex;
      gap: 8px;
      justify-content: center;
      margin-bottom: 20px;
    }

    .dot {
      width: 8px; height: 8px; border-radius: 50%;
      background: rgba(180,100,200,0.25);
    }

    .dot.active { background: #c060d0; transform: scale(1.3); }
    .dot.done { background: #e090d0; }

    @keyframes floatHeart {
      0%   { transform: translateY(0) scale(1); opacity: 1; }
      100% { transform: translateY(-110vh) scale(0.7) rotate(20deg); opacity: 0; }
    }

    @keyframes yuaFloat {
      0%   { transform: translateY(0) scale(0.8); opacity: 0.9; }
      40%  { opacity: 1; }
      100% { transform: translateY(-120vh) scale(1.1); opacity: 0; }
    }

    @keyframes confettiFall {
      0%   { transform: translateY(-20px) rotate(0deg); opacity: 1; }
      100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
    }

    @keyframes popIn {
      0%   { transform: scale(0.5); opacity: 0; }
      100% { transform: scale(1); opacity: 1; }
    }

    @keyframes slideIn {
      0%   { transform: translateX(60px); opacity: 0; }
      100% { transform: translateX(0); opacity: 1; }
    }

    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(-8px); }
      40% { transform: translateX(8px); }
      60% { transform: translateX(-6px); }
      80% { transform: translateX(6px); }
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.08); }
    }

    @keyframes giftBounce {
      0%, 100% { transform: scale(1) rotate(0deg); }
      25% { transform: scale(1.12) rotate(-4deg); }
      75% { transform: scale(1.08) rotate(4deg); }
    }

    @keyframes shimmer {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }

    .teleport-area {
      position: relative;
      width: 100%;
      height: 300px;
      margin-bottom: 12px;
    }

    .decor-stars {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      pointer-events: none;
      overflow: hidden;
    }

    .star {
      position: absolute;
      font-size: 18px;
      opacity: 0.25;
      animation: twinkle 2s ease-in-out infinite alternate;
    }

    @keyframes twinkle {
      from { opacity: 0.15; transform: scale(0.8); }
      to   { opacity: 0.45; transform: scale(1.2); }
    }
  `}</style>
);

// ─── Main App ─────────────────────────────────────────────────────────────────

const STEPS = {
  S1_ENTRY: "S1_ENTRY",
  S1_1_SONG: "S1_1_SONG",
  S1_2_DATE: "S1_2_DATE",
  S2_ROUTE: "S2_ROUTE",
  A1: "A1", A2: "A2", A3: "A3",
  B1: "B1", B2: "B2",
  C1: "C1", C2: "C2",
  S3_KASA: "S3_KASA",
  S4: "S4", S5: "S5", S6: "S6", S7: "S7",
  FINAL: "FINAL",
};

export default function App() {
  const [step, setStep] = useState(STEPS.S1_ENTRY);
  const [giftStyle, setGiftStyle] = useState(null);
  const [popup, setPopup] = useState(null);
  const [popupDuration, setPopupDuration] = useState(2200);
  const [showCountdown, setShowCountdown] = useState(false);
  const [afterCountdown, setAfterCountdown] = useState(null);
  const [showHearts, setShowHearts] = useState(false);
  const [showYua, setShowYua] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [copied, setCopied] = useState(false);
  const [songInput, setSongInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [shakeCard, setShakeCard] = useState(false);
  const [teleportPos, setTeleportPos] = useState({ top: 30, left: 60 });
  const [teleportLocked, setTeleportLocked] = useState(false);
  const [s5DontKnowClicks, setS5DontKnowClicks] = useState(0);
  const [giftBoxClicks, setGiftBoxClicks] = useState(0);
  const teleportAreaRef = useRef(null);
  const screenRef = useRef(null);
  const [key, setKey] = useState(0);

  const go = useCallback((nextStep, extra = {}) => {
    setStep(nextStep);
    if (extra.giftStyle !== undefined) setGiftStyle(extra.giftStyle);
    setKey((k) => k + 1);
  }, [giftStyle]);

  const triggerShake = () => {
    setShakeCard(true);
    setTimeout(() => setShakeCard(false), 600);
  };

  const showPopup = (msg, duration = 2200) => {
    setPopupDuration(duration);
    setPopup(msg);
  };

  const triggerCountdown = (nextStep) => {
    setAfterCountdown(nextStep);
    setShowCountdown(true);
  };

  const handleCountdownDone = () => {
    setShowCountdown(false);
    if (afterCountdown) go(afterCountdown);
    setAfterCountdown(null);
  };

  const handleSongSubmit = () => {
    const norm = normalizeText(songInput);
    if (norm === "anilar" || norm === "anilar") {
      go(STEPS.S1_2_DATE);
    } else {
      triggerShake();
      showPopup("YOX!!");
    }
  };

  const handleDateSubmit = () => {
    const d = new Date(dateInput);
    if (d.getFullYear() === 2025 && d.getMonth() === 7 && d.getDate() === 13) {
      go(STEPS.S5);
    } else {
      triggerShake();
      showPopup("😔");
    }
  };

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText("NAA3QPGQLKL4UCXU");
    } catch {
      const ta = document.createElement("textarea");
      ta.value = "NAA3QPGQLKL4UCXU";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const teleport = () => {
    if (teleportLocked) return;
    if (!teleportAreaRef.current) return;
    const rect = teleportAreaRef.current.getBoundingClientRect();
    const maxLeft = rect.width - 210;
    const maxTop = rect.height - 65;
    const newLeft = 8 + Math.random() * Math.max(maxLeft - 8, 0);
    const newTop = 10 + Math.random() * Math.max(maxTop - 10, 0);
    setTeleportPos({ top: newTop, left: newLeft });
  };

  const Stars = () => (
    <div className="decor-stars">
      {["✨","🌸","💫","⭐","🌺","💐"].map((e, i) => (
        <div key={i} className="star" style={{
          left: `${10 + i * 16}%`, top: `${5 + (i % 3) * 28}%`,
          animationDelay: `${i * 0.3}s`,
        }}>{e}</div>
      ))}
    </div>
  );

  const renderStep = () => {
    switch (step) {

      // ── S1: Entry ──────────────────────────────────────────────────────────
      case STEPS.S1_ENTRY:
        return (
          <div className="screen slide-in" key={key}>
            <Stars />
            <div className="stage-badge">🛡️ Aşama 1: Güvenlik Duvarı</div>
            <div className={`card ${shakeCard ? "shake" : ""}`}>
              <span className="emoji-big">🤖</span>
              <div className="title">SİSTEME GİRİŞ</div>
              <p className="subtitle">Lütfen bot olmadığınızı kanıtlayın.</p>
              <button className="btn btn-primary" onClick={() => go(STEPS.S1_1_SONG)}>
                 Ben bot değilim, dünyanın en uslu kızıyım.
              </button>
              <button className="btn btn-secondary" onClick={() => showPopup("Eşeklik etme 😤", 1000)}>
                🚦 Trafik lambalarını ve yaya geçitlerini seçmek istiyorum.
              </button>
            </div>
          </div>
        );

      // ── S1.1: Song ────────────────────────────────────────────────────────
      case STEPS.S1_1_SONG:
        return (
          <div className="screen slide-in" key={key}>
            <Stars />
            <div className={`card ${shakeCard ? "shake" : ""}`}>
              <span className="emoji-big">🎵</span>
              <div className="title">Bizim şarkımızın ilk kelimesi?</div>
              <input
                className="input-field"
                type="text"
                placeholder="Yaz bakalım..."
                value={songInput}
                onChange={(e) => setSongInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSongSubmit()}
                autoComplete="off"
                autoCapitalize="none"
              />
              <button className="btn btn-primary" onClick={handleSongSubmit}>
                Cevapla ✨
              </button>
            </div>
          </div>
        );

      // ── S1.2: Date ────────────────────────────────────────────────────────
      case STEPS.S1_2_DATE:
        return (
          <div className="screen slide-in" key={key}>
            <Stars />
            <div className={`card ${shakeCard ? "shake" : ""}`}>
              <span className="emoji-big">📅</span>
              <div className="title">Ilk tanışma tarihimiz 💕</div>
              <input
                className="input-field"
                type="date"
                value={dateInput}
                onChange={(e) => setDateInput(e.target.value)}
                style={{ textAlign: "center", fontSize: 17 }}
              />
              <button className="btn btn-primary" onClick={handleDateSubmit}>
                Bu kesin o tarih! 🥰
              </button>
            </div>
          </div>
        );

      // ── S2: Route ─────────────────────────────────────────────────────────
      case STEPS.S2_ROUTE:
        return (
          <div className="screen slide-in" key={key}>
            <Stars />
            <div className="stage-badge">🎭 3. Aşama: Karakter Seçimi</div>
            <div className="card">
              <span className="emoji-big">🤔</span>
              <div className="title">Bugün hangi Berensin bakalım?</div>
              <button className="btn btn-primary" onClick={() => go(STEPS.A1)}>
                😈 Sana Sürekli Trip Atan Beren
              </button>
              <button className="btn btn-secondary" onClick={() => go(STEPS.B1)}>
                🥺 Sımsıkı Sarılıp Bırakmak İstemeyen Beren
              </button>
              <button className="btn btn-secondary" style={{ background: "linear-gradient(135deg,#ffe0f5,#f0d8ff)", border: "2px solid rgba(200,100,180,0.4)" }} onClick={() => go(STEPS.C1)}>
                🎁 Bana Sadece Hediyeyi Ver Sabrım Yok
              </button>
            </div>
          </div>
        );

      // ── A1 ────────────────────────────────────────────────────────────────
      case STEPS.A1:
        return (
          <div className="screen slide-in" key={key}>
            <Stars />
            <div className="stage-badge">🧨 Rota A — Asi</div>
            <div className="card">
              <span className="emoji-big">😈</span>
              <div className="title">Madem trip atacaksın, sence şu an en çok kim eşek?</div>
              <button className="btn btn-primary" onClick={() => go(STEPS.A2)}>
                A) Tabikide BEN! 👑
              </button>
              <RunawayButton
                label="B) Sen !!"
                style={{
                  background: "linear-gradient(135deg,#f5e6ff,#ffe4f0)",
                  color: "#8b3a8b",
                  border: "2px solid rgba(200,120,200,0.4)",
                  padding: "17px 20px",
                  borderRadius: 18,
                  fontFamily: "'Nunito', sans-serif",
                  fontSize: 16,
                  fontWeight: 800,
                  width: "100%",
                  minHeight: 56,
                  userSelect: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 12px rgba(180,100,200,0.15)",
                }}
              />
            </div>
          </div>
        );

      // ── A2 ────────────────────────────────────────────────────────────────
      case STEPS.A2:
        return (
          <div className="screen slide-in" key={key}>
            <Stars />
            <div className="stage-badge">🧨 Rota A</div>
            <div className="card">
              <span className="emoji-big">😤</span>
              <div className="title">Uslu durmazsan hediye falan yok! Kabul ediyor musun?</div>
              <button className="btn btn-primary" onClick={() => triggerCountdown(STEPS.A3)}>
                A) Asla etmiyorum! 😤
              </button>
              <button className="btn btn-secondary" onClick={() => triggerCountdown(STEPS.A3)}>
                B) YOK!! 😡
              </button>
            </div>
          </div>
        );

      // ── A3 ────────────────────────────────────────────────────────────────
      case STEPS.A3:
        return (
          <div className="screen slide-in" key={key}>
            <Stars />
            <div className="stage-badge">🧨 Rota A</div>
            <div className="card">
              <span className="emoji-big">👑</span>
              <div className="title">Sence dünyanın en tatlı, en şımarık çocuğu kim?</div>
              <button className="btn btn-primary" onClick={() => go(STEPS.S3_KASA)}>
                A) Kesinlikle benim! ✨
              </button>
              <button className="btn btn-secondary" onClick={() => go(STEPS.S3_KASA)}>
                B) Tartışmasız benim! 💅
              </button>
            </div>
          </div>
        );

      // ── B1 ────────────────────────────────────────────────────────────────
      case STEPS.B1:
        return (
          <div className="screen slide-in" key={key}>
            <Stars />
            <div className="stage-badge">💕 Rota B — Duygusal</div>
            <div className="card">
              <span className="emoji-big">💕</span>
              <div className="title">Yan yana olmadığımızda bizi birbirimize bağlayan en güçlü şey ne?</div>
              <button className="btn btn-secondary" onClick={() => { triggerShake(); showPopup("Mantıklı ama yokkk"); }}>
                A) Güçlü Wi-Fi bağlantısı ve şarj aletleri.
              </button>
              <button className="btn btn-primary" onClick={() => setShowYua(true)}>
                B) Mesafeleri hiçe sayan o güzel kalbimiz 💕
              </button>
            </div>
            <YuaFloat active={showYua} onDone={() => { setShowYua(false); go(STEPS.B2); }} />
          </div>
        );

      // ── B2 ────────────────────────────────────────────────────────────────
      case STEPS.B2:
        return (
          <div className="screen slide-in" key={key}>
            <Stars />
            <div className="stage-badge">💕 Rota B</div>
            <div className={`card ${showHearts ? "shake" : ""}`}>
              <span className="emoji-big">🤗</span>
              <div className="title">Şu an yanında olsaydım ilk ne yapardın?</div>
              <button className="btn btn-primary" onClick={() => { setShowHearts(true); setTimeout(() => { setShowHearts(false); go(STEPS.S3_KASA); }, 2200); }}>
                A) Sımsıkı sarılırdım. 🤗
              </button>
              <button className="btn btn-secondary" onClick={() => { setShowHearts(true); setTimeout(() => { setShowHearts(false); go(STEPS.S3_KASA); }, 2200); }}>
                B) Hiç bırakmayacak gibi sarılırdım. 💗
              </button>
            </div>
            <HeartRain active={showHearts} />
          </div>
        );

      // ── C1 ────────────────────────────────────────────────────────────────
      case STEPS.C1:
        return (
          <div className="screen slide-in" key={key}>
            <Stars />
            <div className="stage-badge">🎁 Rota C — Sabırsız</div>
            <div className="card">
              <span className="emoji-big">😏</span>
              <div className="title">Hop, o kadar kolay değil! Hediyeye gitmek için bir bedel ödemelisin. Hazır mısın?</div>
              <button className="btn btn-secondary" onClick={() => go(STEPS.S2_ROUTE)}>
                A) Değilim, geri dönmek istiyorum. 🏃
              </button>
              <button className="btn btn-primary" onClick={() => go(STEPS.C2)}>
                B) Gönder gelsin, hallederiz! 💪
              </button>
            </div>
          </div>
        );

      // ── C2 ────────────────────────────────────────────────────────────────
      case STEPS.C2: {
        return (
          <div className="screen slide-in" key={key}>
            <Stars />
            <div className="stage-badge">🎁 Rota C — Kaçan Buton!</div>
            <div className="card">
              <span className="emoji-big">⏱️</span>
              <div className="title">"HEDİYEMİ İSTİYORUM" butonuna 5 saniye içinde bas!</div>
              <div
                ref={teleportAreaRef}
                className="teleport-area"
              >
                <button
                  className="teleport-btn"
                  style={{ top: teleportPos.top, left: teleportPos.left }}
                  onMouseEnter={teleport}
                  onTouchStart={teleport}
                  onClick={teleport}
                >
                  🎁 HEDİYEMİ İSTİYORUM
                </button>
              </div>
              <button className="btn btn-secondary" onClick={() => go(STEPS.S2_ROUTE)}>
                B) Tamam pes ediyorum, normal yoldan gidelim. 😅
              </button>
            </div>
          </div>
        );
      }

      // ── S3: Kasa ─────────────────────────────────────────────────────────
      case STEPS.S3_KASA:
        return (
          <div className="screen slide-in" key={key}>
            <Stars />
            <div className="stage-badge">🔐 4. Aşama: Kasa ve Final Kilidi</div>
            <div className="card" style={{ textAlign: "center" }}>
              <div style={{ fontSize: 72, margin: "8px 0 16px", animation: "giftBounce 2s ease-in-out infinite" }}>🔒</div>
              <div className="title">Kasanın önüne geldin, ama kilitli!</div>
              <p className="subtitle">Şifreyi kırmak için bir soruyu bilmen lazım. Hazır mısın?</p>
              <button className="btn btn-primary" onClick={() => go(STEPS.S4)}>
                NOOWAAAAYYY
              </button>
            </div>
          </div>
        );

      // ── S4 ────────────────────────────────────────────────────────────────
      case STEPS.S4:
        return (
          <div className="screen slide-in" key={key}>
            <Stars />
            <div className="stage-badge">🔐 4. Aşama: Kasa ve Final Kilidi</div>
            <div className="card" style={{ textAlign: "center" }}>
              <span className="emoji-big">💖</span>
              <div className="title">Benim için dünyanın en özel, en tatlı, en sevilesi çocuğu kim?</div>
              <button className="btn btn-primary" onClick={() => { showPopup("Tabikide sen 💖"); setTimeout(() => go(STEPS.S7), 2400); }}>
                BEN TABIKI 👑
              </button>
            </div>
          </div>
        );

      // ── S5 ────────────────────────────────────────────────────────────────
      case STEPS.S5:
        return (
          <div className="screen slide-in" key={key}>
            <Stars />
            <div className="stage-badge">🎈 2. Aşama: Günün Anlam ve Önemi</div>
            <div className="card">
              <span className="emoji-big">🎉</span>
              <div className="title">Bugün ne günü?</div>
              <button className="btn btn-secondary" onClick={() => {
                setS5DontKnowClicks(s5DontKnowClicks + 1);
                if (s5DontKnowClicks === 0) {
                  showPopup("Nasıl bilmezsin koca bebek! Tekrar düşün. 🤔", 2200);
                } else if (s5DontKnowClicks === 1) {
                  showPopup("İyi düşün eşek 😤", 2200);
                } else {
                  showPopup("İpucu veriyom ozaman, 2ci secenegi sec 🥰", 2200);
                }
              }}>
                A) Bilmiyorum ki 🤷
              </button>
              <button className="btn btn-primary" onClick={() => go(STEPS.S6)}>
                B) Çocuklar Günü! 🎈
              </button>
            </div>
          </div>
        );

      // ── S6 ────────────────────────────────────────────────────────────────
      case STEPS.S6:
        return (
          <div className="screen slide-in" key={key}>
            <Stars />
            <div className="stage-badge">🎈 2. Aşama: Günün Anlam ve Önemi</div>
            <div className="card">
              <span className="emoji-big">😇</span>
              <div className="title">Peki kutlama yapmayı hak edecek kadar uslu bir çocuk oldun mu?</div>
              <button className="btn btn-primary" onClick={() => { showPopup("Tabiikidee 🤗"); setTimeout(() => go(STEPS.S2_ROUTE), 2400); }}>
                A) Çoook usluydum 😇
              </button>
              <button className="btn btn-secondary" onClick={() => { showPopup("Yoo 🥰🥰"); setTimeout(() => go(STEPS.S2_ROUTE), 2400); }}>
                B) Ara sıra şebeklik etmişimdir. SAKINCASI MI VAR?!? 😤
              </button>
            </div>
          </div>
        );

      // ── S7 ────────────────────────────────────────────────────────────────
      case STEPS.S7:
        return (
          <div className="screen slide-in" key={key}>
            <Stars />
            <div className="stage-badge">🎁 5. Aşama: Hediye Özelleştirme</div>
            <div className="card">
              <span className="emoji-big">🎁</span>
              <div className="title">Hediyeyi nasıl istersin?</div>
              <button className="btn btn-primary" onClick={() => go(STEPS.FINAL, { giftStyle: "white" })}>
                A) Kocaman, şatafatlı, kırmızı kurdeleli 🎁
              </button>
              <button className="btn btn-secondary" style={{ background: "linear-gradient(135deg,#e8b0f0,#c890d8)", color: "#fff", border: "none" }} onClick={() => go(STEPS.FINAL, { giftStyle: "purple" })}>
                B) MOR PEMBELİ!!! 💜💗
              </button>
            </div>
          </div>
        );

      // ── FINAL ─────────────────────────────────────────────────────────────
      case STEPS.FINAL:
        return (
          <FinalScreen giftStyle={giftStyle} onConfetti={() => setShowConfetti(true)} onCopy={handleCopy} copied={copied} giftBoxClicks={giftBoxClicks} setGiftBoxClicks={setGiftBoxClicks} />
        );

      default:
        return null;
    }
  };

  return (
    <>
      <GlobalStyles />
      <div
        className={`app-root ${step === STEPS.FINAL ? (giftStyle === "purple" ? "final-bg-purple" : "final-bg-white") : ""}`}
        ref={screenRef}
      >
        {renderStep()}
        {popup && <Popup text={popup} onClose={() => setPopup(null)} duration={popupDuration} />}
        {showCountdown && <CountdownModal onDone={handleCountdownDone} />}
        {showConfetti && <Confetti active={showConfetti} />}
      </div>
    </>
  );
}

// ─── Final Screen ─────────────────────────────────────────────────────────────

function FinalScreen({ giftStyle, onConfetti, onCopy, copied, giftBoxClicks, setGiftBoxClicks }) {
  const [opened, setOpened] = useState(false);
  const [bouncing, setBouncing] = useState(true);

  const handleOpen = () => {
    const newClicks = giftBoxClicks + 1;
    setGiftBoxClicks(newClicks);
    if (newClicks >= 5) {
      setOpened(true);
      setBouncing(false);
      onConfetti();
    }
  };

  return (
    <div className="screen slide-in" style={{ paddingTop: 40 }}>
      <div style={{
        position: "absolute", inset: 0,
        background: !opened
          ? "#000000"
          : giftStyle === "purple"
          ? "linear-gradient(160deg, rgba(180,80,200,0.12) 0%, rgba(240,180,255,0.18) 100%)"
          : "linear-gradient(160deg, rgba(255,200,220,0.15) 0%, rgba(255,240,250,0.2) 100%)",
        zIndex: 0,
      }} />

      <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
        {!opened ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div
              style={{
                fontSize: 90,
                cursor: "pointer",
                animation: bouncing ? "giftBounce 1.5s ease-in-out infinite" : "popIn 0.3s ease",
                display: "inline-block",
                filter: "drop-shadow(0 8px 24px rgba(200,80,180,0.4))",
              }}
              onClick={handleOpen}
            >
              🎁
            </div>
            <p style={{
              fontFamily: "'Fredoka One', cursive",
              fontSize: 22, color: "#8b3a8b",
              marginTop: 20, marginBottom: 8,
            }}>Ozaman kutunu aç!</p>
            <p style={{ fontSize: 15, color: "#b060b0" }}>TIKLAAAA</p>
          </div>
        ) : (
          <div style={{ animation: "popIn 0.5s cubic-bezier(.34,1.56,.64,1)" }}>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ fontSize: 60 }}>🎊</div>
              <h1 style={{
                fontFamily: "'Fredoka One', cursive",
                fontSize: 28, color: "#ffffff",
                margin: "12px 0 6px",
                textShadow: "0 2px 12px rgba(180,80,200,0.2)",
              }}>ÇOCUXLAR GÜNÜN KUTLU OLSUN BEBİSİİİMMM!</h1>
              <p style={{ fontSize: 15, color: "#ffffff", lineHeight: 1.5 }}>
                SENİ ÇOK SEVİYORUM 💖
              </p>
            </div>

            <div className="gift-code-box">
              <p style={{ fontSize: 13, color: "#b060b0", marginBottom: 4 }}>
                🎬 Ufak bi hediye kodu
              </p>
              <div className="gift-code">NAA3QPGQLKL4UCXU</div>
              <div className="copy-row">
                <button className="copy-btn" onClick={onCopy}>
                  {copied ? "✅ Kopyalandı!" : "📋 Kopyala"}
                </button>
              </div>
            </div>

            <a
              className="netflix-btn"
              href="https://www.netflix.com/redeem"
              target="_blank"
              rel="noopener noreferrer"
            >
              🎬 Burdan Netflix'e geçiş yapcann
            </a>

            <p style={{
              textAlign: "center", fontSize: 13,
              color: "#c080c0", marginTop: 16, lineHeight: 1.5,
            }}>
              Seninle her an çok güzel 🥰💕
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
