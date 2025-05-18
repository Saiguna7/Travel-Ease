"use server"
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { SubscriptionEmail } from '@/email/subscription-confirmation';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }
    const { data, error } = await resend.emails.send({
      from: 'TravelEase <onboarding@resend.dev>',
      to: email,
      subject: 'Welcome to TravelEase Newsletters!',
      react: SubscriptionEmail({ userEmail: email }),
    });

    if (error) {
      console.error('Email sending failed:', error);
      return NextResponse.json(
        { error: 'Failed to send welcome email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Subscription successful!',
        id: data?.id 
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}