import { NavigatorProps } from "@/components/common/Layout/Layout";
import {
  BookOpenIcon,
  AcademicCapIcon,
  UserIcon,
} from "@heroicons/react/outline";

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
        slug: "/management",
        pathName: "management",
        name: "Courses management",
      },
      {
        slug: "/search",
        pathName: "search",
        name: "Search Courses",
      },
      {
        slug: "/remove",
        pathName: "remove",
        name: "Remove Courses",
      },
    ],
  },
  {
    icon: <AcademicCapIcon className="w-5" />,
    pathName: "graduation",
    slug: "/graduation",
    name: "Graduation",
    subMenu: [
      {
        slug: "/tracking",
        pathName: "tracking",
        name: "Graduation Tracking",
      },
    ],
  },
];
