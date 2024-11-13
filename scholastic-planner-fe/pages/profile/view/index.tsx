import Layout from "@/components/common/Layout/Layout";
import { CoursesResponse, getAllCourses } from "@/pages/api/courses";
import {
  getGraduationProfile,
  GraduationProfileResponse,
  registerCourseById,
} from "@/pages/api/graduation";
import { Button } from "@material-tailwind/react";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
function Home() {
  const [profile, setProfile] = useState<GraduationProfileResponse>();
  const [coursesList, setCoursesList] = useState<CoursesResponse[]>();
  const router = useRouter();

  useEffect(() => {
    const getProfile = async () => {
      const profile = await getGraduationProfile();
      if (profile.courseName) {
        console.log("profile", profile);
        setProfile(profile);
      } else {
        const courses = await getAllCourses();
        setCoursesList(courses);
      }
    };
    getProfile();
  }, []);

  const gradeToText = (grade: number) => {
    switch (grade) {
      case 0:
        return "F";
      case 1:
        return "D";
      case 1.5:
        return "D+";
      case 2:
        return "C";
      case 2.5:
        return "C+";
      case 3:
        return "B";
      case 3.5:
        return "B+";
      case 4:
        return "A";
      default:
        return "-";
    }
  };

  const onRegistorCourse = async (id: string) => {
    await registerCourseById(id);
    router.reload();
  };

  return (
    <div>
      {profile ? (
        <div>
          <div className="flex flex-rows gap-5">
            <div className="flex justify-center items-center w-[100px] h-[100px] bg-[#E5E5E5] rounded-full ">
              <svg
                style={{ color: "#BABBBC" }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-12"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="p-5 divide-y divide-gray-400 flex flex-col flex-1 bg-white rounded-xl shadow-lg">
              <div className="py-5 pt-0">
                <p>
                  รหัสนักศึกษา{" "}
                  <p className="font-bold inline-block">{profile.studentId}</p>
                </p>
                <p>
                  หลักสูตร{" "}
                  <p className="font-bold inline-block">{profile.courseName}</p>
                </p>
                <p>
                  คำอธิบายหลักสูตร{" "}
                  <p className="font-bold inline-block">
                    {profile.courseDescription}
                  </p>
                </p>
              </div>
              <div className="py-5">
                <p>สถานะการศึกษา</p>
                <p>
                  เกรดเฉลี่ยรวม:{" "}
                  <p className="font-bold inline-block">{profile.gpax}</p>
                </p>
                <p>
                  หน่วยกิตสะสม:{" "}
                  <p className="font-bold inline-block">
                    {profile.currentCredits}
                  </p>{" "}
                  หน่วยกิต
                </p>
              </div>
              <div className="py-5">
                <p>เงื่อนไขการจบหลักสูตร</p>
                <p>
                  หน่วยกิตขั้นต่ำ:{" "}
                  <p className="font-bold inline-block">
                    {profile.requirements.minCredits}
                  </p>{" "}
                  หน่วยกิต
                </p>
                <p>
                  เกรดเฉลี่ยขั้นต่ำ:{" "}
                  <p className="font-bold inline-block">
                    {profile.requirements.minGPA}
                  </p>
                </p>
                <p>
                  ระยะเวลา:{" "}
                  <p className="font-bold inline-block">
                    {profile.requirements.maxDuration} ปี
                  </p>
                </p>
              </div>
            </div>
          </div>
          <div className="my-10 bg-gray-400	h-[1px] w-full" />
          {profile.academicRecords.length > 0 ? (
            profile.academicRecords.map((academic) => (
              <div className="p-5 flex flex-col flex-1 bg-white rounded-xl shadow-lg">
                <div className="flex mb-5 justify-between">
                  <div>
                    ปีการศึกษา {academic.year}/{academic.semester}
                  </div>
                  <Link href={"/courses/search"}>
                    <div className="cursor-pointer font-bold">
                      ลงทะเบียนเรียน {">"}
                    </div>
                  </Link>
                </div>
                <div className="flex flex-row gap-5 overflow-x-auto">
                  {academic.subjects.length > 0 ? (
                    academic.subjects.map((subject) => (
                      <div className="flex items-center flex-col p-5 bg-gray-100 rounded-xl">
                        <div className="mb-5 w-[100px] h-[100px] bg-[#E5E5E5] rounded-full"></div>
                        <div>
                          <p className="font-bold">{subject.name}</p>
                          <p>
                            หน่วยกิต{" "}
                            <p className="font-bold inline-block">
                              {subject.credits}
                            </p>{" "}
                            หน่วยกิต
                          </p>
                          <p>
                            ผลการศึกษา{" "}
                            <p className="font-bold inline-block">
                              {gradeToText(subject.grade)}
                            </p>{" "}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div>{"ไม่พบรายวิชา"}</div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-5 items-center flex flex-row flex-1 bg-white rounded-xl shadow-lg">
              <div className="font-bold flex flex-1">
                {"ยังไม่ได้ลงทะเบียนเรียน"}
              </div>
              <div>
                <Button
                  onClick={() => router.push("/courses/search")}
                  nonce={undefined}
                  onResize={undefined}
                  onResizeCapture={undefined}
                >
                  <div>ค้นหารายวิชา</div>
                </Button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className="mb-5">กรุณาเลือกหลักสุตร</div>
          <div className="flex flex-col gap-5">
            {coursesList?.map((course) => (
              <div className="p-5 divide-y divide-gray-400 flex flex-col flex-1 bg-white rounded-xl shadow-lg">
                <div className="py-5 pt-0 flex flex-row">
                  <div className="flex flex-1 flex-col">
                    <div className="font-bold">{course.courseName}</div>
                    <div className="">{course.courseDescription}</div>
                  </div>
                  <div>
                    <Button
                      onClick={() => onRegistorCourse(course._id)}
                      nonce={undefined}
                      onResize={undefined}
                      onResizeCapture={undefined}
                    >
                      <div>ลงทะเบียนหลักสูตร</div>
                    </Button>
                  </div>
                </div>
                <div className="py-5 pb-0">
                  <div className="font-bold">เงื่อนไขการจบหลักสูตร</div>
                  <div>
                    หน่วยกิตขั้นต่ำ{" "}
                    <div className="inline-block font-bold">
                      {course.graduationRequirements.minimumCredits}
                    </div>
                  </div>
                  <div>
                    เกรดเฉลี่ยขั้นต่ำ{" "}
                    <div className="inline-block font-bold">
                      {course.graduationRequirements.minimumGPA}
                    </div>
                  </div>
                  <div>
                    ระยะเวลา{" "}
                    <div className="inline-block font-bold">
                      {course.graduationRequirements.maximumDuration}
                    </div>{" "}
                    ปี
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

Home.Layout = Layout;
export default Home;
