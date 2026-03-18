import { NextRequest, NextResponse } from 'next/server';

interface CampaignDay {
  day: number;
  platform: string;
  hook: string;
  caption: string;
  cta: string;
  hashtags: string[];
  imagePrompt?: string;
}

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
  "The #1 {topic} tip nobody talks about",
  "How I turned {topic} into a full-time income",
  "Why {topic} is trending right now",
  "The dark side of {topic} nobody mentions",
  "Beginner's guide to {topic} in 2026",
  "Expert reveals {topic} secrets",
  "This {topic} hack changed my life",
  "What I wish I knew before starting {topic}",
  "The future of {topic} will shock you",
  "How to master {topic} in just 10 minutes",
  "Why {topic} is the best opportunity right now"
];

const ctaTemplates = [
  "Follow for more {topic} tips!",
  "Save this for later!",
  "Share with someone who needs this!",
  "Comment your thoughts below!",
  "Link in bio for more!",
  "DM me for personalized advice!",
  "Try this today and thank me later!",
  "Tag a friend who needs to see this!",
  "Turn on notifications for more!",
  "Check out my profile for the full guide!"
];

const hashtagSets: Record<string, string[]> = {
  "TikTok": ["#fyp", "#viral", "#trending", "#foryou", "#tiktokviral"],
  "Instagram": ["#instagram", "#instagood", "#instadaily", "#instalike", "#picoftheday"],
  "Pinterest": ["#pinterest", "#pinspiration", "#pinterestideas", "#pinoftheday", "#pinterestlover"],
  "X (Twitter)": ["#trending", "#viral", "#fyp", "#twitter", "#x"],
  "YouTube Shorts": ["#shorts", "#youtube", "#viral", "#trending", "#youtubeshorts"],
  "LinkedIn": ["#linkedin", "#business", "#entrepreneur", "#success", "#networking"]
};

const nicheHashtags: Record<string, string[]> = {
  "marketing": ["#marketing", "#digitalmarketing", "#socialmediamarketing", "#contentmarketing", "#marketingtips"],
  "fitness": ["#fitness", "#gym", "#workout", "#fitnessmotivation", "#health"],
  "business": ["#business", "#entrepreneur", "#smallbusiness", "#businesstips", "#success"],
  "money": ["#money", "#investing", "#personalfinance", "#wealth", "#financialfreedom"],
  "tech": ["#tech", "#technology", "#innovation", "#coding", "#software"],
  "lifestyle": ["#lifestyle", "#life", "#dailylife", "#lifestyleblogger", "#living"],
  "food": ["#food", "#foodie", "#cooking", "#recipe", "#foodlover"],
  "travel": ["#travel", "#wanderlust", "#travelgram", "#adventure", "#explore"],
  "fashion": ["#fashion", "#style", "#outfit", "#fashionblogger", "#ootd"],
  "default": ["#viral", "#trending", "#growth", "#success", "#motivation"]
};

function getNicheHashtags(niche: string): string[] {
  const lowerNiche = niche.toLowerCase();
  for (const key of Object.keys(nicheHashtags)) {
    if (lowerNiche.includes(key)) {
      return nicheHashtags[key];
    }
  }
  return nicheHashtags.default;
}

function generateCampaign(niche: string, goal: string): CampaignDay[] {
  const campaign: CampaignDay[] = [];
  
  for (let i = 1; i <= 30; i++) {
    const platform = platforms[(i - 1) % platforms.length];
    const hookTemplate = hookTemplates[Math.floor(Math.random() * hookTemplates.length)];
    const hook = hookTemplate.replace(/{topic}/g, niche);
    
    const caption = `Day ${i} of your ${niche} journey!\n\nToday we're focusing on ${goal.replace(/_/g, ' ')}. This is your chance to take action and see real results.\n\nThe key to success in ${niche} is consistency. Every day you show up, you're building momentum that will compound over time.\n\nRemember: Small daily improvements lead to stunning results over time.`;
    
    const cta = ctaTemplates[Math.floor(Math.random() * ctaTemplates.length)].replace(/{topic}/g, niche);
    
    const platformHashtags = hashtagSets[platform] || hashtagSets["TikTok"];
    const nicheSpecificHashtags = getNicheHashtags(niche);
    const hashtags = [...platformHashtags.slice(0, 3), ...nicheSpecificHashtags.slice(0, 5)];
    
    const imagePrompt = `Professional, eye-catching image for ${niche} content on ${platform}, modern design, vibrant colors, social media optimized`;
    
    campaign.push({
      day: i,
      platform,
      hook,
      caption,
      cta,
      hashtags,
      imagePrompt
    });
  }
  
  return campaign;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { niche, goal } = body;
    
    if (!niche || !goal) {
      return NextResponse.json(
        { error: 'Niche and goal are required' },
        { status: 400 }
      );
    }
    
    const campaign = generateCampaign(niche, goal);
    
    return NextResponse.json({
      success: true,
      campaign,
      niche,
      goal
    });
    
  } catch (error) {
    console.error('Campaign generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate campaign' },
      { status: 500 }
    );
  }
}
