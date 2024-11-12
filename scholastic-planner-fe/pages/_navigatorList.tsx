import { NavigatorProps } from "@/components/common/Layout/Layout";
import { BookOpenIcon, AcademicCapIcon } from "@heroicons/react/outline";

export const navigatorList: NavigatorProps[] = [
  {
    icon: <BookOpenIcon className="w-5" />,
    pathName: "courses",
    slug: "/courses",
    name: "Courses management",
    subMenu: [
      {
        slug: "/",
        pathName: ["courses-list"],
        name: "Courses management",
      },
    ],
  },
  {
    icon: <AcademicCapIcon className="w-5" />,
    pathName: "graduation-tracking",
    slug: "/graduation-tracking",
    name: "Graduation Tracking",
    subMenu: [
      {
        slug: "/",
        pathName: ["graduation-tracking"],
        name: "Graduation Tracking",
      },
    ],
  },
];
