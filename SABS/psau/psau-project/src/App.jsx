import { useState, useEffect, useRef } from "react";

// ── PSAU Brand Tokens ──────────────────────────────────────────────────
const T = {
  teal:       "#008080",
  tealDark:   "#005f5f",
  tealLight:  "#e0f4f4",
  tealMid:    "#006e6e",
  green:      "#1a6b3c",
  greenLight: "#e6f4ed",
  greenPulse: "#22c55e",
  white:      "#ffffff",
  offWhite:   "#f7f9f9",
  gray50:     "#f4f6f6",
  gray100:    "#e8ecec",
  gray200:    "#c8d0d0",
  gray400:    "#8fa0a0",
  gray600:    "#4a5e5e",
  gray800:    "#1e3030",
  danger:     "#c0392b",
  dangerLight:"#fdecea",
  amber:      "#d97706",
  amberLight: "#fef3c7",
};

// ── Arch / Geometric SVG pattern (PSAU-inspired) ───────────────────────
const ArchPattern = ({ opacity = 0.06 }) => (
  <svg width="100%" height="100%" style={{ position:"absolute", inset:0, pointerEvents:"none" }}>
    <defs>
      <pattern id="arch" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
        <path d="M40 0 Q80 0 80 40 Q80 80 40 80 Q0 80 0 40 Q0 0 40 0Z" fill="none" stroke={T.white} strokeWidth="1"/>
        <path d="M40 15 Q65 15 65 40 Q65 65 40 65 Q15 65 15 40 Q15 15 40 15Z" fill="none" stroke={T.white} strokeWidth="0.5"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill={`url(#arch)`} opacity={opacity}/>
  </svg>
);

// ── PSAU Logo Mark ─────────────────────────────────────────────────────
const PSAULogo = ({ size = 56 }) => (
  <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
    <circle cx="28" cy="28" r="28" fill={T.white} opacity="0.15"/>
    <circle cx="28" cy="28" r="24" fill="none" stroke={T.white} strokeWidth="1.5"/>
    <path d="M28 8 Q44 8 44 24 Q44 38 28 46 Q12 38 12 24 Q12 8 28 8Z" fill="none" stroke={T.white} strokeWidth="1.5"/>
    <circle cx="28" cy="28" r="8" fill={T.white} opacity="0.9"/>
    <circle cx="28" cy="28" r="5" fill={T.teal}/>
    <line x1="28" y1="14" x2="28" y2="20" stroke={T.white} strokeWidth="2"/>
    <line x1="28" y1="36" x2="28" y2="42" stroke={T.white} strokeWidth="2"/>
    <line x1="14" y1="28" x2="20" y2="28" stroke={T.white} strokeWidth="2"/>
    <line x1="36" y1="28" x2="42" y2="28" stroke={T.white} strokeWidth="2"/>
  </svg>
);

// ── Inline styles helpers ──────────────────────────────────────────────
const card = (extra={}) => ({
  background: T.white,
  borderRadius: 16,
  border: `1px solid ${T.gray100}`,
  padding: "20px 24px",
  ...extra,
});

// ── Absence Line Chart ─────────────────────────────────────────────────
const AbsenceChart = () => {
  const data = [
    { week:"W1", val:0 },{ week:"W2", val:5 },{ week:"W3", val:5 },
    { week:"W4", val:10 },{ week:"W5", val:10 },{ week:"W6", val:15 },
    { week:"W7", val:12 },{ week:"W8", val:18 },{ week:"W9", val:18 },
    { week:"W10", val:22 },{ week:"W11", val:22 },{ week:"W12", val:25 },
  ];
  const W=560, H=160, padL=36, padR=12, padT=12, padB=28;
  const gW=W-padL-padR, gH=H-padT-padB;
  const xOf=i=>(padL + (i/(data.length-1))*gW);
  const yOf=v=>(padT + gH - (v/30)*gH);
  const pts=data.map((d,i)=>`${xOf(i)},${yOf(d.val)}`).join(" ");
  const area=`M${xOf(0)},${yOf(0)} `+data.map((d,i)=>`L${xOf(i)},${yOf(d.val)}`).join(" ")+` L${xOf(data.length-1)},${padT+gH} L${xOf(0)},${padT+gH} Z`;
  const yTicks=[0,10,20,30];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width:"100%", height:"auto" }}>
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={T.teal} stopOpacity="0.18"/>
          <stop offset="100%" stopColor={T.teal} stopOpacity="0"/>
        </linearGradient>
      </defs>
      {yTicks.map(t=>(
        <g key={t}>
          <line x1={padL} y1={yOf(t)} x2={W-padR} y2={yOf(t)} stroke={T.gray100} strokeWidth="1"/>
          <text x={padL-6} y={yOf(t)+4} textAnchor="end" fontSize="10" fill={T.gray400}>{t}%</text>
        </g>
      ))}
      <path d={area} fill="url(#areaGrad)"/>
      <polyline points={pts} fill="none" stroke={T.teal} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"/>
      {data.map((d,i)=>(
        <circle key={i} cx={xOf(i)} cy={yOf(d.val)} r="3.5" fill={T.white} stroke={T.teal} strokeWidth="2"/>
      ))}
      {data.map((d,i)=>(
        i%2===1 && <text key={i} x={xOf(i)} y={H-6} textAnchor="middle" fontSize="9" fill={T.gray400}>{d.week}</text>
      ))}
      <circle cx={xOf(11)} cy={yOf(25)} r="5" fill={T.danger} opacity="0.85"/>
      <line x1={xOf(11)} y1={yOf(25)-8} x2={xOf(11)} y2={padT+gH} stroke={T.danger} strokeWidth="1" strokeDasharray="3,2" opacity="0.5"/>
    </svg>
  );
};

// ── Campus Map (simplified SVG) ────────────────────────────────────────
const CampusMap = ({ onClose }) => {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setStep(s => s < 4 ? s+1 : s), 700);
    return () => clearInterval(t);
  }, []);
  const path = [[80,200],[130,200],[130,140],[200,140],[200,100],[280,100]];
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,30,30,0.72)", zIndex:100, display:"flex", alignItems:"center", justifyContent:"center" }} onClick={onClose}>
      <div style={{ ...card(), width:500, maxWidth:"92vw", position:"relative", overflow:"hidden" }} onClick={e=>e.stopPropagation()}>
        <ArchPattern opacity={0.04}/>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
          <div>
            <div style={{ fontSize:13, color:T.gray400, marginBottom:2 }}>Campus Navigation</div>
            <div style={{ fontSize:17, fontWeight:600, color:T.gray800 }}>Route to Hall B-12</div>
          </div>
          <button onClick={onClose} style={{ background:T.gray50, border:"none", borderRadius:8, width:32, height:32, cursor:"pointer", fontSize:16, color:T.gray600 }}>✕</button>
        </div>
        <svg viewBox="0 0 400 280" style={{ width:"100%", height:"auto", borderRadius:12, background:T.offWhite }}>
          {/* Buildings */}
          {[[30,60,80,100,T.tealLight,"Main Library"],[140,60,80,100,T.greenLight,"Science Bldg"],[260,50,100,80,T.tealLight,"Admin Tower"],[30,190,70,60,T.amberLight,"Cafeteria"],[140,190,60,70,T.tealLight,"CS Dept"],[250,170,80,80,"#e8f5ff","Hall B-12"]].map(([x,y,w,h,bg,label],i)=>(
            <g key={i}>
              <rect x={x} y={y} width={w} height={h} rx="6" fill={bg} stroke={T.gray200} strokeWidth="1"/>
              <text x={x+w/2} y={y+h/2-4} textAnchor="middle" fontSize="9" fill={T.gray600} fontWeight="500">{label.split(" ")[0]}</text>
              <text x={x+w/2} y={y+h/2+8} textAnchor="middle" fontSize="9" fill={T.gray600}>{label.split(" ").slice(1).join(" ")}</text>
            </g>
          ))}
          {/* Paths */}
          <polyline points={path.map(p=>p.join(",")).join(" ")} fill="none" stroke={T.gray200} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
          {path.slice(0,step+1).map((p,i)=>i>0&&(
            <line key={i} x1={path[i-1][0]} y1={path[i-1][1]} x2={p[0]} y2={p[1]} stroke={T.teal} strokeWidth="4" strokeLinecap="round"/>
          ))}
          {/* You are here */}
          <circle cx="80" cy="200" r="8" fill={T.teal}/>
          <circle cx="80" cy="200" r="14" fill={T.teal} opacity="0.2"/>
          <text x="80" y="224" textAnchor="middle" fontSize="9" fill={T.teal} fontWeight="600">You</text>
          {/* Destination */}
          <circle cx="290" cy="100" r="10" fill={T.danger}/>
          <text x="290" y="125" textAnchor="middle" fontSize="9" fill={T.danger} fontWeight="600">Hall B-12</text>
        </svg>
        <div style={{ display:"flex", gap:8, marginTop:14 }}>
          {["7 min walk","450m","Turn right at CS Dept"].map((s,i)=>(
            <div key={i} style={{ background:T.tealLight, borderRadius:8, padding:"6px 12px", fontSize:12, color:T.tealDark, fontWeight:500 }}>{s}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Excuse Portal ──────────────────────────────────────────────────────
const ExcusePortal = ({ onClose }) => {
  const [reason, setReason] = useState(null);
  const [sent, setSent] = useState(false);
  const reasons = ["Medical","Family Emergency","Transport Issue","Official Event","Other"];
  const email = reason ? `Dear Dr. Al-Rashidi,\n\nI hope this message finds you well. I am writing to formally notify you regarding my absence from the Web Programming lecture on ${new Date().toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}.\n\nReason: ${reason}\n\nI sincerely apologize for any inconvenience caused and assure you I will review the missed material and submit any pending assignments on time.\n\nThank you for your understanding.\n\nRespectfully,\nAhmed Al-Sayed\nStudent ID: 443201456\nData Science – Semester 6` : "";
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,30,30,0.72)", zIndex:100, display:"flex", alignItems:"center", justifyContent:"center" }} onClick={onClose}>
      <div style={{ ...card(), width:520, maxWidth:"92vw", position:"relative", maxHeight:"90vh", overflowY:"auto" }} onClick={e=>e.stopPropagation()}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
          <div>
            <div style={{ fontSize:13, color:T.gray400, marginBottom:2 }}>Auto-generated</div>
            <div style={{ fontSize:17, fontWeight:600, color:T.gray800 }}>Smart Excuse Portal</div>
          </div>
          <button onClick={onClose} style={{ background:T.gray50, border:"none", borderRadius:8, width:32, height:32, cursor:"pointer", fontSize:16, color:T.gray600 }}>✕</button>
        </div>
        {/* Pre-filled info */}
        <div style={{ background:T.gray50, borderRadius:10, padding:"12px 16px", marginBottom:16, fontSize:13 }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
            {[["Student","Ahmed Al-Sayed"],["ID","443201456"],["Course","Web Programming"],["Lecturer","Dr. Al-Rashidi"],["Date",new Date().toLocaleDateString()],["Session","Sunday 10:00 AM"]].map(([k,v])=>(
              <div key={k}><span style={{ color:T.gray400 }}>{k}: </span><span style={{ fontWeight:500, color:T.gray800 }}>{v}</span></div>
            ))}
          </div>
        </div>
        {/* Quick reasons */}
        <div style={{ marginBottom:16 }}>
          <div style={{ fontSize:12, color:T.gray400, marginBottom:8, textTransform:"uppercase", letterSpacing:"0.06em" }}>Select reason</div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
            {reasons.map(r=>(
              <button key={r} onClick={()=>setReason(r)} style={{ background:reason===r?T.teal:T.gray50, color:reason===r?T.white:T.gray600, border:`1.5px solid ${reason===r?T.teal:T.gray200}`, borderRadius:20, padding:"6px 16px", fontSize:13, cursor:"pointer", fontWeight:reason===r?600:400, transition:"all .2s" }}>{r}</button>
            ))}
          </div>
        </div>
        {/* Generated email */}
        {reason && (
          <div style={{ background:T.offWhite, borderRadius:10, padding:"14px 16px", fontSize:12.5, color:T.gray800, lineHeight:1.8, fontFamily:"monospace", marginBottom:16, whiteSpace:"pre-wrap", border:`1px solid ${T.gray100}` }}>
            {email}
          </div>
        )}
        {!sent ? (
          <button onClick={()=>reason&&setSent(true)} style={{ width:"100%", background:reason?T.teal:"#ccc", color:T.white, border:"none", borderRadius:10, padding:"12px 0", fontSize:15, fontWeight:600, cursor:reason?"pointer":"default", transition:"background .2s" }}>
            {reason?"Send to Professor →":"Select a reason first"}
          </button>
        ) : (
          <div style={{ background:T.greenLight, borderRadius:10, padding:"14px 16px", textAlign:"center", color:T.green, fontWeight:600, fontSize:15 }}>
            ✓ Excuse sent successfully to Dr. Al-Rashidi
          </div>
        )}
      </div>
    </div>
  );
};

// ── Live Sync Dashboard (Professor View) ──────────────────────────────
const LiveSyncView = ({ onClose }) => {
  const students = [
    { name:"Ahmed Al-Sayed",    id:"443201456", status:"present" },
    { name:"Sara Al-Mutairi",   id:"443201512", status:"present" },
    { name:"Khalid Al-Dosari",  id:"443201389", status:"absent" },
    { name:"Noura Al-Shehri",   id:"443201478", status:"syncing" },
    { name:"Omar Al-Qahtani",   id:"443201534", status:"present" },
    { name:"Fatima Al-Zahrani", id:"443201601", status:"absent" },
    { name:"Youssef Bin Nasser",id:"443201290", status:"syncing" },
    { name:"Lina Al-Harbi",     id:"443201455", status:"present" },
  ];
  const [live, setLive] = useState(students);
  useEffect(() => {
    const t = setInterval(() => {
      setLive(prev => prev.map(s => s.status==="syncing" && Math.random()>0.5 ? {...s,status:"present"} : s));
    }, 1400);
    return () => clearInterval(t);
  }, []);
  const counts = { present: live.filter(s=>s.status==="present").length, absent: live.filter(s=>s.status==="absent").length, syncing: live.filter(s=>s.status==="syncing").length };
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,30,30,0.82)", zIndex:100, display:"flex", alignItems:"center", justifyContent:"center" }} onClick={onClose}>
      <div style={{ ...card({ padding:0 }), width:580, maxWidth:"95vw", overflow:"hidden" }} onClick={e=>e.stopPropagation()}>
        {/* Header */}
        <div style={{ background:`linear-gradient(135deg,${T.tealDark},${T.green})`, padding:"18px 24px", position:"relative", overflow:"hidden" }}>
          <ArchPattern opacity={0.07}/>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div>
              <div style={{ color:"rgba(255,255,255,0.7)", fontSize:12, marginBottom:3 }}>Web Programming — Hall B-12 — Live</div>
              <div style={{ color:T.white, fontSize:17, fontWeight:700 }}>Professor's Live Sync</div>
            </div>
            <div style={{ display:"flex", gap:6, alignItems:"center" }}>
              <span style={{ width:8, height:8, borderRadius:"50%", background:T.greenPulse, display:"inline-block", animation:"pulse 1s infinite" }}/>
              <span style={{ color:T.white, fontSize:13 }}>BLE Active</span>
              <button onClick={onClose} style={{ background:"rgba(255,255,255,0.15)", border:"none", borderRadius:8, width:30, height:30, cursor:"pointer", fontSize:15, color:T.white, marginLeft:8 }}>✕</button>
            </div>
          </div>
          {/* Stats row */}
          <div style={{ display:"flex", gap:12, marginTop:14 }}>
            {[["Present",counts.present,T.greenPulse],["Absent",counts.absent,"#f87171"],["Syncing",counts.syncing,"#fbbf24"]].map(([l,v,c])=>(
              <div key={l} style={{ background:"rgba(255,255,255,0.12)", borderRadius:10, padding:"8px 16px", textAlign:"center" }}>
                <div style={{ color:c, fontSize:20, fontWeight:700 }}>{v}</div>
                <div style={{ color:"rgba(255,255,255,0.7)", fontSize:11 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Students */}
        <div style={{ padding:"16px 24px", maxHeight:340, overflowY:"auto" }}>
          {live.map((s,i)=>{
            const colors = { present:[T.greenLight,T.green,"✓ Present"], absent:[T.dangerLight,T.danger,"✗ Absent"], syncing:[T.amberLight,T.amber,"⟳ Syncing"] };
            const [bg,col,label] = colors[s.status];
            return (
              <div key={i} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 14px", borderRadius:10, marginBottom:6, background:s.status==="present"?T.greenLight:T.white, border:`1px solid ${s.status==="present"?T.green+"44":T.gray100}`, transition:"background 0.6s, border 0.6s" }}>
                <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ width:36, height:36, borderRadius:"50%", background:bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:600, color:col }}>
                    {s.name.split(" ").map(w=>w[0]).slice(0,2).join("")}
                  </div>
                  <div>
                    <div style={{ fontSize:14, fontWeight:500, color:T.gray800 }}>{s.name}</div>
                    <div style={{ fontSize:11, color:T.gray400 }}>{s.id}</div>
                  </div>
                </div>
                <div style={{ background:bg, color:col, borderRadius:20, padding:"4px 12px", fontSize:12, fontWeight:600 }}>{label}</div>
              </div>
            );
          })}
        </div>
      </div>
      <style>{`@keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.3} }`}</style>
    </div>
  );
};

// ── Main Dashboard ─────────────────────────────────────────────────────
export default function SABS() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showMap, setShowMap] = useState(false);
  const [showExcuse, setShowExcuse] = useState(false);
  const [showLive, setShowLive] = useState(false);
  const [notifRead, setNotifRead] = useState({});

  const courses = [
    { name:"Data Structures",      code:"CS301", abs:2, total:24, color:T.teal },
    { name:"Web Programming",      code:"CS315", abs:3, total:24, color:T.green },
    { name:"Computer Networks",    code:"CS320", abs:1, total:22, color:"#0e7490" },
    { name:"Software Engineering", code:"CS410", abs:4, total:26, color:"#065f46" },
  ];

  const notifications = [
    { id:1, type:"info",    icon:"🕐", title:"Class starting soon", body:"Web Programming — Hall B-12 — in 15 min", action:"View Map", actionFn:()=>setShowMap(true) },
    { id:2, type:"danger",  icon:"⚠️", title:"Absence recorded",    body:"Data Structures — 3 absences (12.5%)",    action:"Submit Excuse", actionFn:()=>setShowExcuse(true) },
    { id:3, type:"success", icon:"✓",  title:"Attendance confirmed", body:"Computer Networks — Today 9:00 AM",       action:null },
    { id:4, type:"warning", icon:"📋", title:"Warning threshold",    body:"Software Engineering — 4 absences (15%)", action:"Submit Excuse", actionFn:()=>setShowExcuse(true) },
  ];

  const nav = [
    { id:"dashboard", label:"Dashboard", icon:"⊞" },
    { id:"courses",   label:"My Courses", icon:"📚" },
    { id:"analytics", label:"Analytics",  icon:"📊" },
    { id:"live",      label:"Live Sync",  icon:"📡" },
  ];

  const SidebarLink = ({ item }) => (
    <button onClick={()=>item.id==="live"?setShowLive(true):setActiveTab(item.id)} style={{ display:"flex", alignItems:"center", gap:12, width:"100%", padding:"11px 16px", borderRadius:10, border:"none", background:activeTab===item.id?"rgba(255,255,255,0.18)":"transparent", color:T.white, fontSize:14, cursor:"pointer", transition:"background .2s", textAlign:"left", opacity:activeTab===item.id?1:0.8 }}>
      <span style={{ fontSize:16 }}>{item.icon}</span>
      {item.label}
      {item.id==="live" && <span style={{ marginLeft:"auto", background:T.greenPulse, borderRadius:20, padding:"2px 8px", fontSize:10, color:"#fff" }}>LIVE</span>}
    </button>
  );

  return (
    <div style={{ display:"flex", height:"100vh", minHeight:600, fontFamily:"'Segoe UI', system-ui, sans-serif", background:T.gray50, overflow:"hidden" }}>
      {/* ── Sidebar ── */}
      <div style={{ width:240, background:`linear-gradient(175deg, ${T.tealDark} 0%, ${T.teal} 55%, ${T.green} 100%)`, display:"flex", flexDirection:"column", padding:"24px 16px", position:"relative", overflow:"hidden", flexShrink:0 }}>
        <ArchPattern opacity={0.08}/>
        {/* Logo + Brand */}
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", marginBottom:32, position:"relative" }}>
          <PSAULogo size={64}/>
          <div style={{ color:T.white, fontWeight:700, fontSize:15, marginTop:10, textAlign:"center", lineHeight:1.3 }}>Prince Sattam bin<br/>Abdulaziz University</div>
          <div style={{ color:"rgba(255,255,255,0.6)", fontSize:11, marginTop:4, letterSpacing:"0.1em" }}>SMART ATTENDANCE BEACON</div>
        </div>
        {/* Nav */}
        <nav style={{ flex:1 }}>
          {nav.map(item=><SidebarLink key={item.id} item={item}/>)}
        </nav>
        {/* Student card */}
        <div style={{ background:"rgba(255,255,255,0.12)", borderRadius:12, padding:"12px 14px", marginTop:16, position:"relative" }}>
          <div style={{ color:T.white, fontWeight:600, fontSize:14 }}>Ahmed Al-Sayed</div>
          <div style={{ color:"rgba(255,255,255,0.65)", fontSize:11, marginTop:2 }}>Data Science — Level 6</div>
          <div style={{ display:"flex", gap:10, marginTop:10 }}>
            {[["18h","Registered"],["6","Courses"]].map(([v,l])=>(
              <div key={l} style={{ background:"rgba(255,255,255,0.15)", borderRadius:8, padding:"6px 10px", textAlign:"center" }}>
                <div style={{ color:T.white, fontWeight:700, fontSize:15 }}>{v}</div>
                <div style={{ color:"rgba(255,255,255,0.6)", fontSize:10 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div style={{ flex:1, overflowY:"auto", padding:"28px 28px 28px 24px" }}>
        {/* Top bar */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
          <div>
            <div style={{ fontSize:22, fontWeight:700, color:T.gray800 }}>
              {activeTab==="dashboard"&&"Overview"}
              {activeTab==="courses"&&"My Courses"}
              {activeTab==="analytics"&&"Attendance Analytics"}
            </div>
            <div style={{ fontSize:13, color:T.gray400, marginTop:2 }}>
              {new Date().toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}
            </div>
          </div>
          <div style={{ display:"flex", gap:10 }}>
            <button onClick={()=>setShowLive(true)} style={{ background:`linear-gradient(135deg,${T.teal},${T.green})`, color:T.white, border:"none", borderRadius:10, padding:"9px 18px", fontSize:13, fontWeight:600, cursor:"pointer", display:"flex", alignItems:"center", gap:6 }}>
              <span style={{ width:7, height:7, borderRadius:"50%", background:"#86efac", display:"inline-block" }}/>
              Live Sync
            </button>
          </div>
        </div>

        {/* ── Dashboard View ── */}
        {activeTab==="dashboard" && (
          <>
            {/* Stat cards */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:22 }}>
              {[
                { label:"Registered Hours",   val:"18",    sub:"This semester",  color:T.teal },
                { label:"Registered Courses",  val:"6",     sub:"Active",        color:T.green },
                { label:"Avg Attendance",      val:"88%",   sub:"All courses",   color:"#0e7490" },
                { label:"Warnings",            val:"2",     sub:"Action needed", color:T.danger },
              ].map(s=>(
                <div key={s.label} style={{ ...card({ padding:"16px 18px" }) }}>
                  <div style={{ width:8, height:8, borderRadius:"50%", background:s.color, marginBottom:10 }}/>
                  <div style={{ fontSize:26, fontWeight:700, color:T.gray800 }}>{s.val}</div>
                  <div style={{ fontSize:12, fontWeight:600, color:T.gray800, marginTop:2 }}>{s.label}</div>
                  <div style={{ fontSize:11, color:T.gray400, marginTop:2 }}>{s.sub}</div>
                </div>
              ))}
            </div>

            {/* Chart + notifications */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 340px", gap:16, marginBottom:18 }}>
              <div style={{ ...card() }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 }}>
                  <div>
                    <div style={{ fontSize:15, fontWeight:600, color:T.gray800 }}>Absence Percentage</div>
                    <div style={{ fontSize:12, color:T.gray400, marginTop:2 }}>Weekly trend — All courses</div>
                  </div>
                  <span style={{ background:T.dangerLight, color:T.danger, borderRadius:20, padding:"3px 10px", fontSize:12, fontWeight:600 }}>25% Now</span>
                </div>
                <AbsenceChart/>
              </div>
              {/* Notifications */}
              <div style={{ ...card({ padding:"18px 18px" }) }}>
                <div style={{ fontSize:15, fontWeight:600, color:T.gray800, marginBottom:14 }}>Notifications</div>
                <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                  {notifications.map(n=>{
                    const bg = { info:T.tealLight, danger:T.dangerLight, success:T.greenLight, warning:T.amberLight };
                    const col = { info:T.teal, danger:T.danger, success:T.green, warning:T.amber };
                    return (
                      <div key={n.id} style={{ background:bg[n.type], borderRadius:10, padding:"10px 12px", borderLeft:`3px solid ${col[n.type]}` }}>
                        <div style={{ fontSize:13, fontWeight:600, color:T.gray800 }}>{n.icon} {n.title}</div>
                        <div style={{ fontSize:11.5, color:T.gray600, marginTop:3 }}>{n.body}</div>
                        {n.action && (
                          <button onClick={n.actionFn} style={{ marginTop:7, background:col[n.type], color:T.white, border:"none", borderRadius:6, padding:"4px 12px", fontSize:11.5, fontWeight:600, cursor:"pointer" }}>
                            {n.action} →
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}

        {/* ── Courses View ── */}
        {activeTab==="courses" && (
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
            {courses.map(c=>{
              const pct = Math.round((c.abs/c.total)*100);
              const attended = c.total - c.abs;
              return (
                <div key={c.code} style={{ ...card() }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 }}>
                    <div>
                      <div style={{ fontSize:15, fontWeight:700, color:T.gray800 }}>{c.name}</div>
                      <div style={{ fontSize:12, color:T.gray400, marginTop:2 }}>{c.code}</div>
                    </div>
                    <span style={{ background:pct>=15?T.dangerLight:T.tealLight, color:pct>=15?T.danger:T.teal, borderRadius:20, padding:"3px 10px", fontSize:12, fontWeight:600 }}>{pct}% absent</span>
                  </div>
                  {/* Progress bar */}
                  <div style={{ background:T.gray100, borderRadius:6, height:8, marginBottom:12 }}>
                    <div style={{ background:c.color, borderRadius:6, height:8, width:`${(attended/c.total)*100}%`, transition:"width .6s" }}/>
                  </div>
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:12 }}>
                    <span style={{ color:T.gray600 }}>{attended}/{c.total} attended</span>
                    <span style={{ color:T.gray400 }}>{c.abs} absences</span>
                  </div>
                  {pct >= 15 && (
                    <div style={{ marginTop:12, background:T.dangerLight, borderRadius:8, padding:"8px 12px", fontSize:12, color:T.danger }}>
                      ⚠ Approaching 25% absence limit
                      <button onClick={()=>setShowExcuse(true)} style={{ marginLeft:8, background:T.danger, color:T.white, border:"none", borderRadius:6, padding:"3px 10px", fontSize:11, cursor:"pointer" }}>Submit Excuse</button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ── Analytics View ── */}
        {activeTab==="analytics" && (
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            <div style={{ ...card() }}>
              <div style={{ fontSize:15, fontWeight:600, color:T.gray800, marginBottom:4 }}>Absence Trend — All Courses</div>
              <div style={{ fontSize:12, color:T.gray400, marginBottom:16 }}>Weeks 1–12 of the current semester</div>
              <AbsenceChart/>
              <div style={{ display:"flex", gap:16, marginTop:16, paddingTop:14, borderTop:`1px solid ${T.gray100}` }}>
                {[["Current Rate","25%",T.danger],["Safe Zone","< 25%",T.teal],["At Risk","SW Engineering",T.amber]].map(([k,v,c])=>(
                  <div key={k} style={{ flex:1, background:T.gray50, borderRadius:10, padding:"10px 14px" }}>
                    <div style={{ fontSize:11, color:T.gray400 }}>{k}</div>
                    <div style={{ fontSize:18, fontWeight:700, color:c, marginTop:4 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12 }}>
              {courses.map(c=>{
                const pct = Math.round((c.abs/c.total)*100);
                const r = pct>=15?T.danger:pct>=10?T.amber:T.teal;
                return (
                  <div key={c.code} style={{ ...card({ padding:"16px" }) }}>
                    <div style={{ fontSize:12, fontWeight:600, color:T.gray800, marginBottom:10, lineHeight:1.3 }}>{c.name}</div>
                    <div style={{ position:"relative", width:64, height:64, margin:"0 auto" }}>
                      <svg viewBox="0 0 64 64">
                        <circle cx="32" cy="32" r="28" fill="none" stroke={T.gray100} strokeWidth="8"/>
                        <circle cx="32" cy="32" r="28" fill="none" stroke={r} strokeWidth="8" strokeDasharray={`${(pct/100)*175.9} 175.9`} strokeLinecap="round" transform="rotate(-90 32 32)"/>
                      </svg>
                      <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:700, color:r }}>{pct}%</div>
                    </div>
                    <div style={{ textAlign:"center", fontSize:11, color:T.gray400, marginTop:8 }}>{c.abs} of {c.total} absent</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ── Modals ── */}
      {showMap    && <CampusMap   onClose={()=>setShowMap(false)}/>}
      {showExcuse && <ExcusePortal onClose={()=>setShowExcuse(false)}/>}
      {showLive   && <LiveSyncView onClose={()=>setShowLive(false)}/>}
    </div>
  );
}