import { getServerSession } from 'next-auth';
import User from '@/app/model/User';

export async function getAdminId() {
  const session = await getServerSession();
  if (!session?.user?.email) return null;
  const user = await User.findOne({ email: session.user.email });
  return user?._id?.toString() || null;
}
