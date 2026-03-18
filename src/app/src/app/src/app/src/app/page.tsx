'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Zap, 
  Crown, 
  Check, 
  Star, 
  Rocket, 
  Target, 
  TrendingUp, 
  Users, 
  Globe, 
  Shield, 
  Clock,
  CreditCard,
  Smartphone,
  Building2,
  Copy,
  Download,
  Sparkles,
  ChevronRight,
  Play,
  Menu,
  X
} from 'lucide-react';

interface CampaignDay {
  day: number;
  platform: string;
  hook: string;
  caption: string;
  cta: string;
  hashtags: string[];
  imagePrompt?: string;
}

export default function CampaignProApp() {
  const [activeSection, setActiveSection] = useState('home');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<'lifetime' | 'agency'>('lifetime');
  const [niche, setNiche] = useState('');
  const [goal, setGoal] = useState('grow_followers');
  const [campaign, setCampaign] = useState<CampaignDay[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const storedAccess = localStorage.getItem('campaignpro_access');
    if (storedAccess === 'granted') {
      setIsUnlocked(true);
      setActiveSection('generator');
    }
  }, []);

  const handleVerifyCode = async () => {
    setError('');
    setSuccess('');
    
    if (!accessCode.trim()) {
      setError('Please enter an access code');
      return;
    }
    
    try {
      const response = await fetch('/api/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: accessCode.trim() }),
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        setIsUnlocked(true);
        localStorage.setItem('campaignpro_access', 'granted');
        setSuccess('Access granted! Welcome to CampaignPro AI');
        setActiveSection('generator');
      } else {
        setError(data.error || 'Invalid access code');
      }
    } catch {
      setError('Failed to verify access code. Please try again.');
    }
  };

  const handleGenerateCampaign = async () => {
    if (!niche.trim()) {
      setError('Please enter your niche or topic');
      return;
    }
    
    setIsGenerating(true);
    setError('');
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ niche, goal, useAI: true }),
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        setCampaign(data.campaign);
        setSuccess('Campaign generated successfully!');
      } else {
        setError(data.error || 'Failed to generate campaign');
      }
    } catch {
      setError('Failed to generate campaign. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setSuccess('Copied to clipboard!');
    setTimeout(() => setSuccess(''), 2000);
  };

  const exportCampaign = () => {
    const content = campaign.map(day => 
      `Day ${day.day} - ${day.platform}\n` +
      `Hook: ${day.hook}\n` +
      `Caption: ${day.caption}\n` +
      `CTA: ${day.cta}\n` +
      `Hashtags: ${day.hashtags.join(' ')}\n\n`
    ).join('---\n\n');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `campaign-${niche.replace(/\s+/g, '-')}-30days.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-slate-900" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                CampaignPro AI
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <button onClick={() => scrollToSection('home')} className="text-slate-300 hover:text-white transition-colors">Home</button>
              <button onClick={() => scrollToSection('features')} className="text-slate-300 hover:text-white transition-colors">Features</button>
              <button onClick={() => scrollToSection('pricing')} className="text-slate-300 hover:text-white transition-colors">Pricing</button>
              <Button onClick={() => scrollToSection('pricing')} className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-slate-900 font-semibold">Get Started</Button>
            </div>
            
            <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-800 border-b border-slate-700">
            <div className="px-4 py-4 space-y-3">
              <button onClick={() => scrollToSection('home')} className="block w-full text-left text-slate-300 hover:text-white py-2">Home</button>
              <button onClick={() => scrollToSection('features')} className="block w-full text-left text-slate-300 hover:text-white py-2">Features</button>
              <button onClick={() => scrollToSection('pricing')} className="block w-full text-left text-slate-300 hover:text-white py-2">Pricing</button>
              <Button onClick={() => scrollToSection('pricing')} className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-900 font-semibold">Get Started</Button>
            </div>
          </div>
        )}
      </nav>

      <section id="home" className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-16 sm:py-24">
            <Badge className="mb-6 bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-1">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Campaign Generator
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Turn One Idea Into{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                30 Days of Content
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto mb-8">
              CampaignPro AI generates complete 30-day social media campaigns with hooks, captions, CTAs, and hashtags for TikTok, Instagram, Pinterest, X, YouTube Shorts, and LinkedIn.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => scrollToSection('pricing')} className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-slate-900 font-semibold text-lg px-8 py-6">
                <Rocket className="w-5 h-5 mr-2" />
                Start Creating Now
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection('features')} className="border-slate-600 text-white hover:bg-slate-800 text-lg px-8 py-6">
                <Play className="w-5 h-5 mr-2" />
                See How It Works
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto">
              {[
                { value: '10K+', label: 'Campaigns Created' },
                { value: '50+', label: 'Niche Categories' },
                { value: '6', label: 'Social Platforms' },
                { value: '30', label: 'Days of Content' },
              ].map((stat, i) => (
                <div key={i} className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                  <div className="text-2xl sm:text-3xl font-bold text-emerald-400">{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything You Need to{' '}
              <span className="text-emerald-400">Dominate Social Media</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Stop struggling with content ideas. Let AI create your entire campaign in seconds.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Target, title: 'Instant Campaign Generation', description: 'Enter your niche and get a complete 30-day campaign with viral hooks, engaging captions, and powerful CTAs tailored to your audience.' },
              { icon: Globe, title: 'Multi-Platform Support', description: 'Get optimized content for TikTok, Instagram, Pinterest, X (Twitter), YouTube Shorts, and LinkedIn. Each post is crafted for maximum engagement on its platform.' },
              { icon: Sparkles, title: 'AI-Enhanced Content', description: 'Our AI analyzes trending patterns and generates hooks designed to capture attention in the first 3 seconds - the key to viral content.' },
              { icon: TrendingUp, title: 'Trending Hashtags', description: 'Get platform-specific and niche-relevant hashtags that increase discoverability and help your content reach the right audience.' },
              { icon: Clock, title: 'Save 100+ Hours', description: 'What normally takes weeks of planning and content creation is done in seconds. Focus on execution while we handle the strategy.' },
              { icon: Users, title: 'Perfect for Creators & Agencies', description: 'Whether you\'re a solo creator or managing multiple clients, CampaignPro AI scales with your needs and delivers consistent quality.' },
            ].map((feature, i) => (
              <Card key={i} className="bg-slate-800/50 border-slate-700/50 hover:border-emerald-500/50 transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <CardTitle className="text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-400 text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              How It <span className="text-emerald-400">Works</span>
            </h2>
            <p className="text-slate-400">Three simple steps to your complete social media campaign</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Choose Your Plan', description: 'Select Lifetime access for personal use or Agency plan for unlimited campaigns.' },
              { step: '02', title: 'Enter Your Niche', description: 'Tell us about your business, product, or topic. Set your goal - grow followers, sell products, or promote services.' },
              { step: '03', title: 'Get Your Campaign', description: 'Instantly receive 30 days of ready-to-post content for all major platforms.' },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="text-6xl font-bold text-slate-700/50 mb-4">{item.step}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-slate-400">{item.description}</p>
                {i < 2 && <ChevronRight className="hidden md:block absolute top-1/2 -right-6 w-6 h-6 text-emerald-500" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Simple, <span className="text-emerald-400">Transparent</span> Pricing
            </h2>
            <p className="text-slate-400">Choose the plan that fits your needs</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className={`relative bg-slate-800/50 border-slate-700/50 ${selectedPlan === 'lifetime' ? 'ring-2 ring-emerald-500' : ''}`}>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Zap className="w-6 h-6 text-emerald-400" />
                  Lifetime Access
                </CardTitle>
                <div className="mt-4">
                  <span className="text-5xl font-bold">$29</span>
                  <span className="text-slate-400 ml-2">one-time</span>
                </div>
                <CardDescription className="text-slate-400 mt-2">Perfect for creators and small businesses</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {['Unlimited campaign generations', 'All 6 social platforms', 'AI-enhanced content', 'Export campaigns', 'Lifetime access', 'No recurring fees'].map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-300">
                      <Check className="w-5 h-5 text-emerald-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-slate-900 font-semibold" onClick={() => setSelectedPlan('lifetime')}>Select Plan</Button>
              </CardContent>
            </Card>
            
            <Card className={`relative bg-slate-800/50 border-slate-700/50 ${selectedPlan === 'agency' ? 'ring-2 ring-emerald-500' : ''}`}>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-900">
                  <Star className="w-3 h-3 mr-1" />
                  Most Popular
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Crown className="w-6 h-6 text-yellow-400" />
                  Agency Plan
                </CardTitle>
                <div className="mt-4">
                  <span className="text-5xl font-bold">$99</span>
                  <span className="text-slate-400 ml-2">one-time</span>
                </div>
                <CardDescription className="text-slate-400 mt-2">For agencies and marketing professionals</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {['Everything in Lifetime', 'Priority AI processing', 'White-label exports', 'Multiple client campaigns', 'Commercial license', 'Priority support'].map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-300">
                      <Check className="w-5 h-5 text-emerald-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-slate-900 font-semibold" onClick={() => setSelectedPlan('agency')}>Select Plan</Button>
              </CardContent>
            </Card>
          </div>

          <div className="max-w-2xl mx-auto mt-12">
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Shield className="w-5 h-5 text-emerald-400" />
                  Payment Methods
                </CardTitle>
                <CardDescription>Choose your preferred payment method. All payments are verified manually.</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="mpesa" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 bg-slate-700/50">
                    <TabsTrigger value="mpesa" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-slate-900"><Smartphone className="w-4 h-4 mr-1" />M-Pesa</TabsTrigger>
                    <TabsTrigger value="bank" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-slate-900"><Building2 className="w-4 h-4 mr-1" />Bank</TabsTrigger>
                    <TabsTrigger value="paypal" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-slate-900"><CreditCard className="w-4 h-4 mr-1" />PayPal</TabsTrigger>
                    <TabsTrigger value="card" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-slate-900"><CreditCard className="w-4 h-4 mr-1" />Card</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="mpesa" className="mt-4">
                    <div className="bg-slate-700/30 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Amount:</span>
                        <span className="text-xl font-bold text-emerald-400">{selectedPlan === 'lifetime' ?
