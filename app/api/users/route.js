import { connectDB } from '@/app/lib/db';
import User from "@/app/model/User";
import { NextResponse } from "next/server";

export const GET = async () => {
  await connectDB();
  const users = await User.find({}, 'name email');
  return NextResponse.json(users);
};
