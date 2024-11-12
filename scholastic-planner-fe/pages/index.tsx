import Layout from "@/components/common/Layout/Layout";
import Welcome from "@/public/assets/image/welcome.png";
import Image from "next/image";
export async function getStaticProps() {
  return {
    props: {
      mainPage: true,
    },
  };
}
function Home() {
  return (
    <div className={`flex justify-center pt-32`}>
      <div>
        <Image src={Welcome} objectFit="contain" height={250} />
        <div className="mt-6 text-center text-[#4d4d4d]">Welcome</div>
      </div>
    </div>
  );
}

Home.Layout = Layout;
export default Home;
