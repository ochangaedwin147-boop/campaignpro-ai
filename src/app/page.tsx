'use client';
import { useState, useEffect } from 'react';

const platforms = ["TikTok", "Instagram", "Pinterest", "X (Twitter)", "YouTube Shorts", "LinkedIn"];

const hookTemplates = [
  "Stop scrolling! Here's how {topic} will change everything",
  "3 secrets about {topic} nobody tells you",
  "The truth about {topic} they don't want you to know",
  "How {topic} can grow your business in 30 days",
  "Before starting {topic}, watch this",
  "I tried {topic} for 7 days and here's what happened",
  "Why most people fail at {topic} (and how to avoid it)",
  "The {topic} strategy that generated $10K",
  "Stop making these {topic} mistakes",
  "The #1 {topic} tip nobody talks about"
];

const ctaTemplates = [
  "Follow for more tips!",
  "Save this for later!",
  "Share with someone who needs this!",
  "Comment your thoughts below!",
  "Link in bio for more!"
];

const hashtagSets: Record<string, string[]> = {
  "TikTok": ["#fyp", "#viral", "#trending", "#foryou"],
  "Instagram": ["#instagram", "#instagood", "#instadaily", "#reels"],
  "Pinterest": ["#pinterest", "#pinspiration", "#viralpin"],
  "X (Twitter)": ["#trending", "#viral", "#twitter"],
  "YouTube Shorts": ["#shorts", "#youtube", "#viral"],
  "LinkedIn": ["#linkedin", "#business", "#entrepreneur"]
};

const validCodes = [
  'CAMPAIGNPRO123', 'CAMPAIGNPRO2024', 'CAMPAIGNPRO2025', 'CAMPAIGNPRO2026',
  'CPTESTAGENCY', 'CPLIFETIME001', 'CPAGENCY001', 'CPAGENCY002', 'CPAGENCY003'
];

export default function Home() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [niche, setNiche] = useState('');
  const [goal, setGoal] = useState('grow_followers');
  const [campaign, setCampaign] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'lifetime' | 'agency'>('lifetime');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('campaignpro_access');
    if (stored === 'granted') setIsUnlocked(true);
  }, []);

  const handleVerify = () => {
    if (validCodes.includes(accessCode.toUpperCase().trim())) {
      setIsUnlocked(true);
      localStorage.setItem('campaignpro_access', 'granted');
    } else {
      alert('Invalid access code');
    }
  };

  const generateCampaign = async () => {
    if (!niche.trim()) {
      alert('Please enter your niche');
      return;
    }
    setIsGenerating(true);
    const results = [];
    for (let i = 1; i <= 30; i++) {
      const platform = platforms[(i - 1) % platforms.length];
      const hook = hookTemplates[Math.floor(Math.random() * hookTemplates.length)].replace(/{topic}/g, niche);
      const caption = `Day ${i}: Master ${niche} with this powerful strategy! Focus on ${goal.replace(/_/g, ' ')} and watch your results grow. Consistency is key to success.`;
      const cta = ctaTemplates[Math.floor(Math.random() * ctaTemplates.length)];
      const hashtags = [...(hashtagSets[platform] || []), '#viral', '#trending'];
      results.push({ day: i, platform, hook, caption, cta, hashtags });
    }
    setCampaign(results);
    setIsGenerating(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const exportCampaign = () => {
    const content = campaign.map(d => `Day ${d.day} - ${d.platform}\nHook: ${d.hook}\nCaption: ${d.caption}\nCTA: ${d.cta}\nHashtags: ${d.hashtags.join(' ')}\n`).join('\n---\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `campaign-${niche}-30days.txt`;
    a.click();
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: 'white', fontFamily: 'system-ui, sans-serif' }}>
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, background: 'rgba(15,23,42,0.95)', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 50, backdropFilter: 'blur(8px)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: 40, height: 40, background: 'linear-gradient(135deg, #10b981, #06b6d4)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>⚡</div>
          <span style={{ fontSize: 20, fontWeight: 'bold', background: 'linear-gradient(90deg, #10b981, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>CampaignPro AI</span>
        </div>
      </nav>

      <main style={{ paddingTop: 100, maxWidth: 1200, margin: '0 auto', padding: '100px 20px 40px' }}>
        {!isUnlocked ? (
          <>
            <div style={{ textAlign: 'center', marginBottom: 60 }}>
              <h1 style={{ fontSize: 48, fontWeight: 'bold', marginBottom: 20, lineHeight: 1.2 }}>
                Turn One Idea Into{' '}
                <span style={{ background: 'linear-gradient(90deg, #10b981, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>30 Days of Content</span>
              </h1>
              <p style={{ fontSize: 18, color: '#94a3b8', maxWidth: 600, margin: '0 auto 30px' }}>
                Generate complete 30-day social media campaigns with AI-powered hooks, captions, CTAs, and hashtags for TikTok, Instagram, Pinterest, X, YouTube Shorts, and LinkedIn.
              </p>
              <button onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })} style={{ background: 'linear-gradient(90deg, #10b981, #06b6d4)', color: '#0f172a', padding: '16px 32px', borderRadius: 8, border: 'none', fontSize: 18, fontWeight: 'bold', cursor: 'pointer' }}>
                🚀 Start Creating Now
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 60 }}>
              {[
                { value: '10K+', label: 'Campaigns Created' },
                { value: '50+', label: 'Niche Categories' },
                { value: '6', label: 'Social Platforms' },
                { value: '30', label: 'Days of Content' },
              ].map((s, i) => (
                <div key={i} style={{ background: 'rgba(30,41,59,0.5)', padding: 24, borderRadius: 12, textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ fontSize: 32, fontWeight: 'bold', color: '#10b981' }}>{s.value}</div>
                  <div style={{ color: '#94a3b8' }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div id="pricing" style={{ marginBottom: 60 }}>
              <h2 style={{ fontSize: 32, textAlign: 'center', marginBottom: 30 }}>Simple, Transparent Pricing</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, maxWidth: 800, margin: '0 auto' }}>
                {[
                  { plan: 'lifetime', name: 'Lifetime Access', price: '$29', features: ['Unlimited campaigns', 'All 6 platforms', 'AI-enhanced content', 'Export campaigns', 'No recurring fees'] },
                  { plan: 'agency', name: 'Agency Plan', price: '$99', features: ['Everything in Lifetime', 'Priority AI', 'White-label exports', 'Commercial license', 'Priority support'], popular: true }
                ].map((p) => (
                  <div key={p.plan} onClick={() => setSelectedPlan(p.plan as any)} style={{ background: 'rgba(30,41,59,0.5)', padding: 24, borderRadius: 12, border: selectedPlan === p.plan ? '2px solid #10b981' : '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', position: 'relative' }}>
                    {p.popular && <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(90deg, #10b981, #06b6d4)', color: '#0f172a', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 'bold' }}>Most Popular</div>}
                    <h3 style={{ fontSize: 20, marginBottom: 8 }}>{p.name}</h3>
                    <div style={{ fontSize: 40, fontWeight: 'bold', marginBottom: 16 }}>{p.price}<span style={{ fontSize: 16, color: '#94a3b8' }}> one-time</span></div>
                    <ul style={{ listStyle: 'none', padding: 0, marginBottom: 20 }}>
                      {p.features.map((f, i) => <li key={i} style={{ marginBottom: 8 }}>✅ {f}</li>)}
                    </ul>
                    <button style={{ width: '100%', padding: 12, borderRadius: 8, border: 'none', background: selectedPlan === p.plan ? 'linear-gradient(90deg, #10b981, #06b6d4)' : '#334155', color: selectedPlan === p.plan ? '#0f172a' : 'white', fontWeight: 'bold', cursor: 'pointer' }}>Select Plan</button>
                  </div>
                ))}
              </div>

              <div style={{ background: 'rgba(30,41,59,0.5)', padding: 24, borderRadius: 12, maxWidth: 600, margin: '30px auto', border: '1px solid rgba(255,255,255,0.1)' }}>
                <h3 style={{ marginBottom: 16 }}>💳 Payment Methods</h3>
                <div style={{ marginBottom: 12 }}><strong>M-Pesa:</strong> +254741834315 <button onClick={() => { navigator.clipboard.writeText('+254741834315'); setCopied(true); }} style={{ marginLeft: 8, padding: '4px 8px', borderRadius: 4, border: '1px solid #475569', background: 'transparent', color: '#94a3b8', cursor: 'pointer' }}>Copy</button></div>
                <div style={{ marginBottom: 12 }}><strong>Equity Bank:</strong> 0630182883708 <button onClick={() => { navigator.clipboard.writeText('0630182883708'); setCopied(true); }} style={{ marginLeft: 8, padding: '4px 8px', borderRadius: 4, border: '1px solid #475569', background: 'transparent', color: '#94a3b8', cursor: 'pointer' }}>Copy</button></div>
                <div style={{ marginBottom: 12 }}><strong>PayPal:</strong> ochangaedwin147@gmail.com <button onClick={() => { navigator.clipboard.writeText('ochangaedwin147@gmail.com'); setCopied(true); }} style={{ marginLeft: 8, padding: '4px 8px', borderRadius: 4, border: '1px solid #475569', background: 'transparent', color: '#94a3b8', cursor: 'pointer' }}>Copy</button></div>
                <div><strong>Account Name:</strong> Edwin Ochanga Ogamba</div>
                <div style={{ marginTop: 16, padding: 12, background: 'rgba(16,185,129,0.1)', borderRadius: 8, color: '#10b981', fontSize: 14 }}>After payment, contact us with your transaction ID to receive your access code.</div>
              </div>

              <div style={{ maxWidth: 400, margin: '0 auto', textAlign: 'center' }}>
                <h4 style={{ marginBottom: 12 }}>Already Paid? Enter Access Code</h4>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input type="text" placeholder="Enter access code" value={accessCode} onChange={(e) => setAccessCode(e.target.value)} style={{ flex: 1, padding: 12, borderRadius: 8, border: '1px solid #475569', background: 'rgba(30,41,59,0.5)', color: 'white' }} />
                  <button onClick={handleVerify} style={{ padding: '12px 24px', borderRadius: 8, border: 'none', background: '#10b981', color: '#0f172a', fontWeight: 'bold', cursor: 'pointer' }}>Unlock</button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <h2 style={{ fontSize: 32, marginBottom: 8 }}>🎉 Campaign Generator Unlocked!</h2>
              <p style={{ color: '#94a3b8' }}>Enter your niche and generate your 30-day campaign</p>
            </div>

            <div style={{ background: 'rgba(30,41,59,0.5)', padding: 24, borderRadius: 12, maxWidth: 500, margin: '0 auto 40px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8' }}>Niche / Topic</label>
                <input type="text" placeholder="e.g., Digital Marketing, Fitness, Crypto" value={niche} onChange={(e) => setNiche(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #475569', background: 'rgba(15,23,42,0.5)', color: 'white', boxSizing: 'border-box' }} />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8' }}>Campaign Goal</label>
                <select value={goal} onChange={(e) => setGoal(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #475569', background: 'rgba(15,23,42,0.5)', color: 'white' }}>
                  <option value="grow_followers">Grow Followers</option>
                  <option value="sell_product">Sell Product</option>
                  <option value="promote_service">Promote Service</option>
                  <option value="build_brand">Build Brand Awareness</option>
                </select>
              </div>
              <button onClick={generateCampaign} disabled={isGenerating} style={{ width: '100%', padding: 16, borderRadius: 8, border: 'none', background: 'linear-gradient(90deg, #10b981, #06b6d4)', color: '#0f172a', fontSize: 16, fontWeight: 'bold', cursor: 'pointer', opacity: isGenerating ? 0.7 : 1 }}>
                {isGenerating ? '⏳ Generating...' : '✨ Generate 30-Day Campaign'}
              </button>
            </div>

            {campaign.length > 0 && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <h3 style={{ fontSize: 24 }}>Your 30-Day Campaign for "{niche}"</h3>
                  <button onClick={exportCampaign} style={{ padding: '10px 20px', borderRadius: 8, border: 'none', background: '#10b981', color: '#0f172a', fontWeight: 'bold', cursor: 'pointer' }}>📥 Export</button>
                </div>
                <div style={{ maxHeight: 500, overflow: 'auto' }}>
                  {campaign.map((day) => (
                    <div key={day.day} style={{ background: 'rgba(30,41,59,0.5)', padding: 20, borderRadius: 12, marginBottom: 16, border: '1px solid rgba(255,255,255,0.1)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <div>
                          <span style={{ background: 'rgba(16,185,129,0.2)', color: '#10b981', padding: '4px 12px', borderRadius: 20, marginRight: 8 }}>Day {day.day}</span>
                          <span style={{ background: 'rgba(100,116,139,0.3)', padding: '4px 12px', borderRadius: 20 }}>{day.platform}</span>
                        </div>
                        <button onClick={() => copyToClipboard(`Day ${day.day} - ${day.platform}\nHook: ${day.hook}\nCaption: ${day.caption}\nCTA: ${day.cta}\nHashtags: ${day.hashtags.join(' ')}`)} style={{ padding: 8, borderRadius: 4, border: '1px solid #475569', background: 'transparent', color: '#94a3b8', cursor: 'pointer' }}>📋</button>
                      </div>
                      <div style={{ marginBottom: 8 }}><strong style={{ color: '#94a3b8' }}>Hook:</strong> {day.hook}</div>
                      <div style={{ marginBottom: 8 }}><strong style={{ color: '#94a3b8' }}>Caption:</strong> {day.caption}</div>
                      <div style={{ marginBottom: 8 }}><strong style={{ color: '#94a3b8' }}>CTA:</strong> <span style={{ color: '#10b981' }}>{day.cta}</span></div>
                      <div><strong style={{ color: '#94a3b8' }}>Hashtags:</strong> {day.hashtags.map((h: string, i: number) => <span key={i} style={{ background: 'rgba(100,116,139,0.3)', padding: '2px 8px', borderRadius: 4, marginRight: 4, fontSize: 12 }}>{h}</span>)}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </main>

      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: 40, textAlign: 'center', color: '#64748b' }}>
        <p>© 2026 CampaignPro AI. Built by <strong style={{ color: 'white' }}>Edwin McCain</strong>. All rights reserved.</p>
      </footer>

      {copied && <div style={{ position: 'fixed', bottom: 20, right: 20, background: '#10b981', color: '#0f172a', padding: '12px 24px', borderRadius: 8, fontWeight: 'bold' }}>✅ Copied!</div>}
    </div>
  );
}
