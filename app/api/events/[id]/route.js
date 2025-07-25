import { connectDB } from '@/app/lib/db';
import Event from '@/app/model/Event';
import { NextResponse } from 'next/server';

// PUT /api/events/[id]  Update event
export const PUT = async (req, ctx) => {
  await connectDB();
  const params = await ctx.params;
  const { id } = params;
  const body = await req.json();
  const event = await Event.findByIdAndUpdate(id, body, { new: true });
  if (!event) {
    return NextResponse.json({ error: 'Event not found' }, { status: 404 });
  }
  return NextResponse.json(event);
};

// DELETE /api/events/[id]  Delete event
export const DELETE = async (req, { params }) => {
  await connectDB();
  const { id } = params;
  const event = await Event.findByIdAndDelete(id);
  if (!event) {
    return NextResponse.json({ error: 'Event not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true });
};
