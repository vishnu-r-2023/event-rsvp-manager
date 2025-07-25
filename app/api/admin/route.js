import { connectDB } from '@/app/lib/db';
import Admin from "@/app/model/Admin";
import { NextResponse } from "next/server";

export const GET = async () => {
  await connectDB();
  const admin = await Admin.find({}, 'name email _id');
  return NextResponse.json(admin);
};
