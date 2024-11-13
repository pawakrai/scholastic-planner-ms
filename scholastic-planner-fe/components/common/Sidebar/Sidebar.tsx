import { FC } from "react";
import Link from "next/link";

import { useUser } from "@/contexts/auth/user-context";
import { NavigatorProps } from "@/components/common/Layout/Layout";

interface SidebarProps {
  currentPage: string;
  navigatorList: NavigatorProps[];
  asPath: string;
}

const Sidebar: FC<SidebarProps> = (props: SidebarProps) => {
  const { navigatorList, currentPage } = props;
  const { signOut } = useUser();
  return (
    <div className="fixed z-40 flex flex-col justify-between items-center py-5 w-[76px] h-full min-h-screen bg-[#100426]">
      <div>{/* <Logo /> */}</div>
      <div className="grid grid-row-5 gap-7 w-full text-white">
        {navigatorList.map((item) => {
          return (
            <Link href={item.slug} key={item.pathName}>
              <div
                className="flex w-full justify-center items-center relative h-6 text-white cursor-pointer"
                key={item.pathName}
              >
                {item.pathName === currentPage && (
                  <div className="absolute h-full w-1 bg-[#b085ff] rounded-navbar left-0" />
                )}
                <div
                  className={`${
                    item.pathName === currentPage ? "text-[#b085ff]" : ""
                  }`}
                >
                  {item.icon}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="flex w-full justify-center relative h-6 text-white cursor-pointer">
        <div onClick={signOut}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
