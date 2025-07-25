import { connectDB } from '@/app/lib/db';
import Event from '@/app/model/Event';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import User from '@/app/model/User';

// GET /api/events?adminId=...  List events created by admin
export const GET = async (req) => {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const adminId = searchParams.get('adminId');
  let events;
  if (adminId) {
    events = await Event.find({ createdBy: adminId }).populate('createdBy', 'name email');
  } else {
    events = await Event.find({});
  }
  return NextResponse.json(events);
};

// POST /api/events  Create event
export const POST = async (req) => {
  await connectDB();
  const body = await req.json();
  const { title, description, date, createdBy, guests } = body;
  if (!title || !date || !createdBy || !Array.isArray(guests)) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  const event = await Event.create({ title, description, date, createdBy, guests });
  return NextResponse.json(event, { status: 201 });
};
