import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Logo from "@/public/images/logo4.png";
import Image from "next/image";

export const BotAvatar = () => {
  return (
    <Avatar className="h-8 w-8">
      <Image className="p-1" src={Logo} alt="you"/>
    </Avatar>
  );
};