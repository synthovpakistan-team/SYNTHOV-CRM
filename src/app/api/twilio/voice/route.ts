import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const to = formData.get('To')?.toString();
    const callerId = process.env.TWILIO_PHONE_NUMBER;

    // Initialize standard TwiML response
    const response = new twilio.twiml.VoiceResponse();
    const dial = response.dial({ callerId });

    if (to) {
      // Check if 'To' is a phone number
      // Basic E.164 phone number regex check (+1234567890)
      // or standard phone numbers (which usually have digits, dashes, spaces, or plus)
      const isPhoneNumber = /^[\d\+\-\(\) ]+$/.test(to);

      if (isPhoneNumber) {
        // Dial a real phone number
        dial.number(to);
      } else {
        // Dial another client (identity)
        dial.client(to);
      }
    } else {
      // Fallback if no destination is provided
      response.say('Thanks for calling. No destination was specified.');
    }

    return new NextResponse(response.toString(), {
      status: 200,
      headers: {
        'Content-Type': 'text/xml',
      },
    });
  } catch (error) {
    console.error('Error generating TwiML:', error);
    return new NextResponse('Error generating TwiML', { status: 500 });
  }
}
