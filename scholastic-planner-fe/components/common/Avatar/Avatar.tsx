import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import jwtDecode from "jwt-decode";
import { getToken } from "@/pages/api/httpClient";

const Avatar: FC = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<any>();

  useEffect(() => {
    const profile = getProfile();
    setProfile(profile);
  }, []);

  function getProfile() {
    if (!!getToken()) {
      // const profile: any = jwtDecode(getToken()!);
      return {
        username: "profile?.username",
      };
    }
    return {
      username: "profile?.username",
    };
  }

  return (
    <div className="flex justify-center items-center">
      <div className="text-sm mr-3 text-right text-[#747474]">
        Welcome,{" "}
        <span className="font-bold text-black">{profile?.username}</span> <br />
      </div>
      <div>
        <div className="flex justify-center items-center w-10 h-10 bg-[#E5E5E5] rounded-full ">
          <svg
            style={{ color: "#BABBBC" }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Avatar;
