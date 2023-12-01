import { ProfileForm } from "@/components/profile-form";
import { getServerSession } from "next-auth";

export default async function ProfilePage() {
  const session = await getServerSession();

  if (!session || !session.user || !session.user.name) {
    return null;
  }

  return <ProfileForm nickname={session?.user?.name} />;
}
