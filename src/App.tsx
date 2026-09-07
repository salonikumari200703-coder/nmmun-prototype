import React, { useState, useEffect } from 'react';

export default function App() {
  // Navigation & Authentication States
  const [screen, setScreen] = useState<'login' | 'app'>('login');
  const [userRole, setUserRole] = useState<'delegate' | 'chair' | 'press'>('delegate');
  const [userName, setUserName] = useState('');
  const [sapId, setSapId] = useState('');
  const [selectedCommittee, setSelectedCommittee] = useState('UNEP');
  const [selectedCountry, setSelectedCountry] = useState('Brazil');
  const [activeTab, setActiveTab] = useState<'floor' | 'hud' | 'resolution' | 'press' | 'voting'>('floor');

  // Interactive Floor & Seat Map State (Climate & Sustainability Matrix)
  const [seats] = useState([
    { id: 'BR', country: 'Brazil', flag: '🇧🇷', status: 'Speaking', delegate: 'Active' },
    { id: 'DE', country: 'Germany', flag: '🇩🇪', status: 'Present', delegate: 'Active' },
    { id: 'IN', country: 'India', flag: '🇮🇳', status: 'YOU', delegate: 'Active' },
    { id: 'KE', country: 'Kenya', flag: '🇰🇪', status: 'Hand Raised', delegate: 'Active' },
    { id: 'NO', country: 'Norway', flag: '🇳🇴', status: 'Present', delegate: 'Active' },
    { id: 'US', country: 'United States', flag: '🇺🇸', status: 'Present', delegate: 'Active' },
    { id: 'ZA', country: 'South Africa', flag: '🇿🇦', status: 'Present', delegate: 'Active' },
    { id: 'SGP', country: 'Singapore', flag: '🇸🇬', status: 'Present', delegate: 'Active' },
  ]);

  // Direct Cable Drawer State
  const [activeRecipient, setActiveRecipient] = useState<string | null>(null);
  const [cableInput, setCableInput] = useState('');
  const [cables, setCables] = useState<Array<{ sender: string; target: string; text: string; time: string }>>([
    { sender: 'Executive Chair', target: 'India', text: 'Please verify if Operative Clause 3 complies with Paris Agreement Article 6 principles.', time: '10:14 AM' },
    { sender: 'Germany', target: 'India', text: 'Would you be open to co-sponsoring our Green Technology Transfer framework?', time: '10:18 AM' }
  ]);

  // AI Climate Attaché & Resolution State
  const [resolutionText, setResolutionText] = useState(
    'Urges all signatory nations to allocate 1.5% of annual GDP toward transboundary renewable energy grids and regional water-sharing accountability measures.'
  );
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Timers & Voting
  const [timer, setTimer] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [vote, setVote] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // Theme-Specific Crisis System
  const [crisisActive, setCrisisActive] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    } else if (timer === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) {
      alert('Please enter your full name');
      return;
    }
    setScreen('app');
    showToast(`Authenticated as ${userName} (${selectedCountry}) in ${selectedCommittee}`);
  };

  const sendCable = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cableInput.trim() || !activeRecipient) return;
    setCables([...cables, { sender: `${selectedCountry} (YOU)`, target: activeRecipient, text: cableInput, time: 'Just now' }]);
    showToast(`Encrypted diplomatic cable sent to ${activeRecipient}`);
    setCableInput('');
  };

  const analyzeResolutionWithAI = () => {
    setIsAnalyzing(true);
    setAiFeedback(null);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAiFeedback('🌿 SDG Compliance Score: 96% | Paris Climate Agreement Alignment: High. Recommendation: Specify climate finance mechanisms under UN Framework Convention guidelines.');
    }, 1200);
  };

  const triggerCrisis = () => {
    setCrisisActive(true);
    showToast('🚨 BREAKING CLIMATE CRISIS FLASH BROADCASTED TO ALL DELEGATES');
  };

  // SCREEN 1: ONBOARDING GATE (CLIMATE THEME)
  if (screen === 'login') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 font-sans">
        <div className="w-full max-w-md bg-slate-900 border border-emerald-900/40 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600"></div>
          
          <div className="text-center mb-8">
            <div className="inline-block p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/30 text-emerald-400 mb-3 text-3xl">
              🌱
            </div>
            <h1 className="text-2xl font-black text-slate-100 tracking-tight">NMMUN '26 PORTAL</h1>
            <p className="text-xs text-emerald-400 font-semibold mt-1">Theme: Climate Resilience & SDG Governance</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">Full Name</label>
              <input 
                type="text" 
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="e.g. Saloni Kumari"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">SAP ID / Delegate Registration No.</label>
              <input 
                type="text" 
                value={sapId}
                onChange={(e) => setSapId(e.target.value)}
                placeholder="e.g. 70011024001"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">Role Persona</label>
                <select 
                  value={userRole}
                  onChange={(e: any) => setUserRole(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500">
                  <option value="delegate">Delegate</option>
                  <option value="chair">Executive Board (Chair)</option>
                  <option value="press">Eco-Press Corps</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">Committee</label>
                <select 
                  value={selectedCommittee}
                  onChange={(e) => setSelectedCommittee(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500">
                  <option value="UNEP">UNEP (Environment)</option>
                  <option value="COP-Assembly">COP29 Climate Assembly</option>
                  <option value="UNHRC">UNHRC (Climate Refugees)</option>
                </select>
              </div>
            </div>

            {userRole === 'delegate' && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">Country Matrix Allocation</label>
                <select 
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500">
                  <option value="Brazil">🇧🇷 Brazil (Amazon Basin Sovereign)</option>
                  <option value="India">🇮🇳 India</option>
                  <option value="Germany">🇩🇪 Germany</option>
                  <option value="Kenya">🇰🇪 Kenya</option>
                  <option value="Norway">🇳🇴 Norway</option>
                </select>
              </div>
            )}

            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold py-3 rounded-xl transition-all shadow-lg shadow-emerald-500/20 text-sm mt-4">
              Enter Eco-Assembly Hall ➔
            </button>
          </form>
        </div>
      </div>
    );
  }

  // SCREEN 2: MAIN DIPLOMATIC ASSEMBLY DASHBOARD
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-500 text-slate-950 px-4 py-2.5 rounded-xl font-bold text-xs shadow-2xl flex items-center gap-2 animate-bounce">
          <span>🌿</span> {toast}
        </div>
      )}

      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setScreen('login')}
            className="bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 px-2.5 py-1.5 rounded-lg border border-slate-700">
            ← Switch Role
          </button>
          <div className="flex items-center gap-2 font-black text-emerald-400 tracking-wider text-sm">
            🌱 NMMUN '26 (UNEP)
          </div>
          <div className="hidden md:flex flex-col border-l border-slate-800 pl-4">
            <span className="text-xs text-slate-300 font-bold">{selectedCommittee} Executive Floor</span>
            <span className="text-[11px] text-emerald-400/80">Agenda: Transboundary Water Security & Sustainable Energy Sovereignty</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {userRole === 'chair' && (
            <button 
              onClick={triggerCrisis}
              className="bg-red-500/10 border border-red-500/40 text-red-400 hover:bg-red-500/20 text-xs px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5">
              <span>🚨</span> Trigger Climate Crisis Flash
            </button>
          )}

          <div className="flex items-center space-x-3 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl">
            <span className="text-lg">
              {selectedCountry === 'Brazil' ? '🇧🇷' : selectedCountry === 'India' ? '🇮🇳' : '🇩🇪'}
            </span>
            <div className="text-left">
              <p className="text-xs font-bold text-slate-200">{userName || 'Delegate'}</p>
              <p className="text-[10px] text-emerald-400 uppercase font-mono">{userRole}: {selectedCountry}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Theme Crisis Banner */}
      {crisisActive && (
        <div className="bg-red-600 text-white px-6 py-2 text-xs font-bold flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-2">
            <span className="bg-white text-red-600 px-2 py-0.5 rounded font-black text-[10px]">CRISIS FLASH</span>
            <span>UNEP EMERGENCY: Severe drought in Amazon Basin halts hydroelectric output; transboundary energy emergency declared!</span>
          </div>
          <button onClick={() => setCrisisActive(false)} className="text-white hover:text-slate-200 text-sm">✕</button>
        </div>
      )}

      {/* Main Container */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Navigation Sidebar */}
        <aside className="w-full lg:w-64 bg-slate-900/60 border-r border-slate-800 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('floor')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'floor' ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20' : 'text-slate-400 hover:bg-slate-800'
            }`}>
            <span>🗺️</span>
            <span>Spatial Hall Map</span>
          </button>

          <button 
            onClick={() => setActiveTab('hud')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'hud' ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20' : 'text-slate-400 hover:bg-slate-800'
            }`}>
            <span>📻</span>
            <span>Live Caucus HUD</span>
          </button>

          <button 
            onClick={() => setActiveTab('resolution')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'resolution' ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20' : 'text-slate-400 hover:bg-slate-800'
            }`}>
            <span>🤖</span>
            <span>AI Eco-Policy Check</span>
          </button>

          <button 
            onClick={() => setActiveTab('press')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'press' ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20' : 'text-slate-400 hover:bg-slate-800'
            }`}>
            <span>📰</span>
            <span>Climate Wire Press Feed</span>
          </button>

          <button 
            onClick={() => setActiveTab('voting')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'voting' ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20' : 'text-slate-400 hover:bg-slate-800'
            }`}>
            <span>🗳️</span>
            <span>Resolution Chamber</span>
          </button>
        </aside>

        {/* Content Viewport */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* TAB 1: SPATIAL MAP */}
          {activeTab === 'floor' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-slate-100">UNEP Spatial Assembly Layout</h2>
                  <p className="text-xs text-slate-400">Click any country desk to exchange diplomatic notes or review committee presence.</p>
                </div>
                <span className="text-xs font-mono bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-emerald-400">
                  🟢 8 Delegations Connected
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                {seats.map((seat) => (
                  <div 
                    key={seat.id}
                    onClick={() => {
                      setActiveRecipient(seat.country);
                      showToast(`Opened cable drawer for ${seat.country}`);
                    }}
                    className={`cursor-pointer p-4 rounded-2xl border transition-all hover:scale-105 ${
                      activeRecipient === seat.country
                        ? 'bg-emerald-500/20 border-emerald-500 text-slate-100 shadow-xl'
                        : seat.status === 'Speaking'
                        ? 'bg-emerald-500/10 border-emerald-500/40 text-slate-200'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-3xl">{seat.flag}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        seat.status === 'Speaking' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {seat.status}
                      </span>
                    </div>
                    <p className="font-bold text-sm text-slate-100">{seat.country}</p>
                    <p className="text-[11px] text-slate-500 mt-1">Desk #{seat.id}-UNEP</p>
                  </div>
                ))}
              </div>

              {/* Note Drawer */}
              {activeRecipient && (
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                      💬 Diplomatic Cable to: {activeRecipient}
                    </span>
                    <button onClick={() => setActiveRecipient(null)} className="text-xs text-slate-500 hover:text-slate-300">Close</button>
                  </div>

                  <div className="space-y-2 max-h-32 overflow-y-auto pr-2">
                    {cables
                      .filter((c) => c.target === activeRecipient || c.sender.includes(activeRecipient))
                      .map((c, i) => (
                        <div key={i} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-xs">
                          <span className="font-bold text-emerald-400">{c.sender}: </span>
                          <span className="text-slate-300">{c.text}</span>
                        </div>
                      ))}
                  </div>

                  <form onSubmit={sendCable} className="flex gap-2">
                    <input 
                      type="text"
                      value={cableInput}
                      onChange={(e) => setCableInput(e.target.value)}
                      placeholder={`Draft cable for ${activeRecipient}...`}
                      className="flex-1 bg-slate-950 border border-slate-800 text-xs text-slate-200 px-3 py-2 rounded-xl focus:outline-none focus:border-emerald-500"
                    />
                    <button type="submit" className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold px-4 py-2 rounded-xl">
                      Send Cable
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: LIVE HUD */}
          {activeTab === 'hud' && (
            <div className="space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-xs font-bold uppercase text-emerald-400">Current GSL Speaker</span>
                    <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                      <span>🇧🇷</span> Delegate of Brazil
                    </h2>
                  </div>
                  <div className="bg-slate-950 border border-slate-800 px-6 py-3 rounded-2xl text-right">
                    <span className="text-[10px] text-slate-400 uppercase block">Speech Clock</span>
                    <span className="text-3xl font-mono font-bold text-emerald-400">00:{timer < 10 ? `0${timer}` : timer}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold px-4 py-2 rounded-xl">
                    {isTimerRunning ? 'Pause Clock' : 'Start Speaker Clock'}
                  </button>
                  <button 
                    onClick={() => setTimer(60)}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-4 py-2 rounded-xl border border-slate-700">
                    Reset Timer
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: AI RESOLUTION CHECK */}
          {activeTab === 'resolution' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-100">AI Eco-Policy & SDG Compliance Check</h2>
                <p className="text-xs text-slate-400">Draft draft resolution clauses and evaluate alignment with UN SDG frameworks.</p>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                <label className="block text-xs font-bold text-slate-300 uppercase">Operative Clause Draft</label>
                <textarea 
                  rows={4}
                  value={resolutionText}
                  onChange={(e) => setResolutionText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-serif text-slate-200 leading-relaxed focus:outline-none focus:border-emerald-500"
                />

                <button 
                  onClick={analyzeResolutionWithAI}
                  disabled={isAnalyzing}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20">
                  {isAnalyzing ? 'Auditing against SDG 13 precedents...' : '🤖 Run AI Climate Compliance Audit'}
                </button>

                {aiFeedback && (
                  <div className="bg-slate-950 border border-emerald-500/40 p-4 rounded-xl text-xs text-emerald-300">
                    {aiFeedback}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: PRESS */}
          {activeTab === 'press' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-100">International Eco-Press Wire</h2>
              <div className="space-y-3">
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-emerald-400">UN Climate Bulletin</span>
                    <span className="text-slate-500">3 mins ago</span>
                  </div>
                  <p className="text-xs text-slate-200 font-semibold">"Delegation of Brazil introduces landmark draft on transboundary hydroelectric protection."</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: VOTING */}
          {activeTab === 'voting' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-xl mx-auto text-center space-y-6">
              <div className="text-4xl">🗳️</div>
              <div>
                <h2 className="text-xl font-bold text-slate-100">UNEP Roll Call Vote: Draft Resolution 1.1</h2>
                <p className="text-xs text-slate-400 mt-1">Agenda: Climate-Induced Resource Scarcity</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {['Yea', 'Nay', 'Abstain', 'Present & Voting'].map((option) => (
                  <button 
                    key={option}
                    onClick={() => {
                      setVote(option);
                      showToast(`Vote recorded: ${option}`);
                    }}
                    className={`p-4 rounded-xl border font-bold text-xs transition-all ${
                      vote === option ? 'bg-emerald-500 text-slate-950 border-emerald-400' : 'bg-slate-950 border-slate-800 text-slate-200'
                    }`}>
                    {vote === option && '✅ '} {option}
                  </button>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}