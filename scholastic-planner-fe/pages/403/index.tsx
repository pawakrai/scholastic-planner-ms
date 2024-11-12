import { useUser } from "@/contexts/auth/user-context";
import NotAuth from "@/public/assets/image/403.png";
import Image from "next/image";

export default function NotAuthPage() {
  const { signOut } = useUser();
  return (
    <div className="flex min-h-screen max-w-full">
      <div className="bg-token-navy w-full text-white p-[30px]">
        <div className="min-h-[50rem] max-h-screen flex flex-col justify-center items-center">
          <Image src={NotAuth} objectFit="contain" height={250} />
          <div className="mt-10">
            <button
              className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
              onClick={signOut}
            >
              Re login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
