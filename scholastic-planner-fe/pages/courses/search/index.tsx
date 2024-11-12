import Layout from "@/components/common/Layout/Layout";
import { getCourses } from "@/pages/api/courses";
function Home() {
  const getCourse = async () => {
    await getCourses();
  };
  return <div className={``}>Search Courses page</div>;
}

Home.Layout = Layout;
export default Home;
