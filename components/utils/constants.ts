import { Code, ImageIcon, LayoutDashboard, MessageSquare, Music, Settings, VideoIcon } from "lucide-react";


    export const sidebarTools = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      color: "text-sky-500",
      bgColor: "bg-sky-500/10",
    },
    {
      label: "Conversation",
      icon: MessageSquare,
      href: "/conversation",
      color: "text-pink-700",
      bgColor: "bg-pink-700/10",
    },
    {
      label: "Image",
      icon: ImageIcon,
      href: "/image",
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      label: "Video",
      icon: VideoIcon,
      href: "/video",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      label: "Audio",
      icon: Music,
      href: "/audio",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      label: "Code Generation",
      icon: Code,
      href: "/code",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/settings",
    },
  ];
