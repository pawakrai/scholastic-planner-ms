import React, { FC, useEffect, useState } from "react";
import { throttle } from "lodash";
import cn from "classnames";
import Link from "next/link";
import { NavigatorProps } from "@/components/common/Layout/Layout";
import Avatar from "../Avatar";

interface TopbarProps {
  navigatorList?: NavigatorProps;
  currentSubMenu: string;
}

interface TopbarLinkProps {
  onClick: () => void;
  href: string;
  item: any;
  currentSubMenu: string;
  pathName: string[];
}

const TopbarLinkComponent = React.forwardRef((props: TopbarLinkProps, ref) => {
  const { onClick, href, item, currentSubMenu, pathName } = props;
  return (
    <div>
      <a onClick={onClick} href={href}>
        <div
          className={`flex items-center justify-center h-full relative px-1 hover:font-bold ${
            pathName.includes(currentSubMenu) ? "font-bold" : ""
          }`}
        >
          {item.name}
          {(!currentSubMenu || pathName.includes(currentSubMenu)) && (
            <div className="w-full h-[4px] bg-black absolute bottom-0 rounded-topbar"></div>
          )}
        </div>
      </a>
    </div>
  );
});

export const Topbar: FC<TopbarProps> = (props: TopbarProps) => {
  const { navigatorList, currentSubMenu } = props;
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const offset = 0;
      const { scrollTop } = document.documentElement;
      const scrolled = scrollTop > offset;

      if (hasScrolled !== scrolled) {
        setHasScrolled(scrolled);
      }
    }, 200);

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [hasScrolled]);

  return (
    <div
      className={cn(
        `h-[80px]	grid grid-cols-3 items-center pl-sidebar h-heightOfTopbar sticky top-0 bg-grey-1 z-30 transition-all duration-150 bg-[#EEEEEE] `,
        { "shadow-magical": hasScrolled }
      )}
    >
      <div className="col-start-2 flex w-full h-full justify-center">
        <div
          className={`grid grid-cols-${navigatorList?.subMenu?.length} gap-5 justify-center text-sm justify-items-center h-full`}
        >
          {navigatorList?.subMenu?.map((item, index) => {
            const pathName = Array.isArray(item.pathName)
              ? item.pathName
              : [item.pathName];

            return (
              <Link
                key={index}
                href={{
                  pathname: `${navigatorList.slug}${item.slug}`,
                }}
                passHref
                legacyBehavior
              >
                <TopbarLinkComponent
                  item={item}
                  currentSubMenu={currentSubMenu}
                  pathName={pathName}
                  onClick={function (): void {
                    console.log(`${navigatorList.slug}${item.slug}`);
                  }}
                  href={""}
                />
              </Link>
            );
          })}
        </div>
      </div>
      <div className="flex justify-end mr-12">
        <Avatar />
      </div>
    </div>
  );
};
