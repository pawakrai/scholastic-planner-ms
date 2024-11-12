import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Topbar } from "@/components/common/Topbar/Topbar";
import Sidebar from "@/components/common/Sidebar/Sidebar";
import AuthenticationCheck from "@/hoc/AuthenticationCheck";
import { Permission } from "@/utils/permissions";
import { usePermission } from "@/contexts/auth/permission-context";
import { UserIcon } from "@heroicons/react/outline";

interface Props {
  children: JSX.Element;
  pageProps: {
    mainPage: boolean;
    permission: Permission[];
  };
}

export interface NavigatorProps {
  icon: any;
  pathName: string;
  name: string;
  slug: string;
  subMenu: SubNavigatorProps[];
}

export interface SubNavigatorProps {
  slug: string;
  pathName: string | string[];
  name: string;
  // permission: Permission[];
}

const navigatorList: NavigatorProps[] = [
  {
    icon: <UserIcon className="w-5" />,
    pathName: "investor-management",
    slug: "/investor-management",
    name: "Investor management",
    subMenu: [
      {
        slug: "/investor-list",
        pathName: ["investor-list", "update-investor"],
        name: "Investor management",
      },
      {
        slug: "/draft-investor-list",
        pathName: ["draft-investor-list", "create"],
        name: "Draft investor management",
      },
    ],
  },
];

const Layout: FC<Props> = ({ children, pageProps }: Props) => {
  const { hasPermission } = usePermission();
  const router = useRouter();
  const [mainNavigate, SetMainNavigate] = useState<NavigatorProps[]>([]);
  const [subNavigator, setSubNavigator] = useState<NavigatorProps>();
  const splitPathUrl = router.pathname.split("/");
  useEffect(() => {
    SetMainNavigate(
      navigatorList
        .map((main) => {
          const subMenu = main.subMenu;
          return {
            ...main,
            subMenu,
            slug: `${main.slug}${subMenu[0]?.slug}`,
          };
        })
        .filter((main) => main.subMenu.length > 0)
    );
  }, []);

  useEffect(() => {
    const navigator = mainNavigate
      .filter((item: { pathName: string }) => item.pathName === splitPathUrl[1])
      .map((item: any) => {
        return { ...item, slug: item.slug.split("/").slice(0, -1).join("/") };
      });

    setSubNavigator(navigator[0]);

    if (pageProps.mainPage && navigator[0]) {
      router.push(`${navigator[0]?.slug}${navigator[0]?.subMenu[0].slug}`);
    }

    if (!pageProps.mainPage && !hasPermission(...pageProps.permission)) {
      router.push("/");
    }
  }, [router, mainNavigate]);

  return (
    <>
      <Sidebar
        currentPage={splitPathUrl[1]}
        navigatorList={mainNavigate}
        asPath={router.asPath}
      />
      <Topbar navigatorList={subNavigator} currentSubMenu={splitPathUrl[2]} />
      <main className="ml">
        <main className="ml-[60px] mr-10 mt-8 pb-8 bg-[#f3f4f6]">
          {children}
        </main>
      </main>
    </>
  );
};

export default AuthenticationCheck(Layout);
