import { NextRequest, NextResponse } from 'next/server';

const VALID_CODES: Record<string, { plan: string; used: boolean }> = {
  'CAMPAIGNPRO123': { plan: 'lifetime', used: false },
  'CAMPAIGNPRO2024': { plan: 'lifetime', used: false },
  'CAMPAIGNPRO2025': { plan: 'lifetime', used: false },
  'CAMPAIGNPRO2026': { plan: 'lifetime', used: false },
  'CPTESTAGENCY': { plan: 'agency', used: false },
  'CPLIFETIME001': { plan: 'lifetime', used: false },
  'CPAGENCY001': { plan: 'agency', used: false },
  'CPAGENCY002': { plan: 'agency', used: false },
  'CPAGENCY003': { plan: 'agency', used: false },
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code } = body;
    
    if (!code) {
      return NextResponse.json(
        { error: 'Access code is required' },
        { status: 400 }
      );
    }
    
    const codeKey = code.toUpperCase().trim();
    const accessCode = VALID_CODES[codeKey];
    
    if (!accessCode) {
      return NextResponse.json(
        { error: 'Invalid access code' },
        { status: 400 }
      );
    }
    
    if (accessCode.used) {
      return NextResponse.json(
        { error: 'This access code has already been used' },
        { status: 400 }
      );
    }
    
    return NextResponse.json({
      success: true,
      plan: accessCode.plan,
      message: 'Access code verified successfully'
    });
    
  } catch (error) {
    console.error('Code verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify access code' },
      { status: 500 }
    );
  }
}
