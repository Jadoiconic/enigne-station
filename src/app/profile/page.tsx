import { Metadata } from "next";
import ProfileComponent from "@/components/profile/ProfileComponent";

export const metadata: Metadata = {
  title: "Profile | Engine Station",
  description:
    "This is Engine Station Profile page",
};

const Profile = () => {
  return (
    <ProfileComponent />
  );
};

export default Profile;
