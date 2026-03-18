import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'crypto';

const PERMANENT_CODES: Record<string, string> = {
  'CAMPAIGNPRO123': 'lifetime',
  'CAMPAIGNPRO2024': 'lifetime',
  'CAMPAIGNPRO2025': 'lifetime',
  'CAMPAIGNPRO2026': 'lifetime',
  'CPTESTAGENCY': 'agency',
  'CPLIFETIME001': 'lifetime',
  'CPAGENCY001': 'agency',
  'CPAGENCY002': 'agency',
  'CPAGENCY003': 'agency',
};

function generateAccessCode(): string {
  const prefix = 'CP';
  const random = randomBytes(4).toString('hex').toUpperCase();
  return `${prefix}${random}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { plan, adminKey } = body;
    
    const validAdminKey = process.env.ADMIN_KEY || 'campaignpro_admin_2026';
    
    if (adminKey !== validAdminKey) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    if (!plan || !['lifetime', 'agency'].includes(plan)) {
      return NextResponse.json(
        { error: 'Valid plan (lifetime or agency) is required' },
        { status: 400 }
      );
    }
    
    const code = generateAccessCode();
    
    return NextResponse.json({
      success: true,
      code,
      plan,
      createdAt: new Date().toISOString(),
      note: 'Save this code. Add to PERMANENT_CODES in source for persistence.'
    });
    
  } catch (error) {
    console.error('Create code error:', error);
    return NextResponse.json(
      { error: 'Failed to create access code' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const adminKey = searchParams.get('adminKey');
    
    const validAdminKey = process.env.ADMIN_KEY || 'campaignpro_admin_2026';
    
    if (adminKey !== validAdminKey) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const codes = Object.entries(PERMANENT_CODES).map(([code, plan]) => ({
      code,
      plan,
      type: 'permanent'
    }));
    
    return NextResponse.json({
      success: true,
      totalCodes: codes.length,
      codes
    });
    
  } catch (error) {
    console.error('List codes error:', error);
    return NextResponse.json(
      { error: 'Failed to list access codes' },
      { status: 500 }
    );
  }
  }
