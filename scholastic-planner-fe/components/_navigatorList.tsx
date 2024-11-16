import { NavigatorProps } from "@/components/common/Layout/Layout";
import { BookOpenIcon, CalendarIcon, UserIcon } from "@heroicons/react/outline";

export const navigatorList: NavigatorProps[] = [
  {
    icon: <UserIcon className="w-5" />,
    pathName: "profile",
    slug: "/profile",
    name: "Profile",
    subMenu: [
      {
        slug: "/view",
        pathName: "view",
        name: "View Profile",
      },
    ],
  },
  {
    icon: <BookOpenIcon className="w-5" />,
    pathName: "courses",
    slug: "/courses",
    name: "Courses management",
    subMenu: [
      {
        slug: "/search",
        pathName: "search",
        name: "Search Courses",
      },
    ],
  },
  {
    icon: <CalendarIcon className="w-5" />,
    pathName: "calendar",
    slug: "/calendar",
    name: "Calendar",
    subMenu: [
      {
        slug: "/view",
        pathName: "view",
        name: "Calendar View",
      },
    ],
  },
];
