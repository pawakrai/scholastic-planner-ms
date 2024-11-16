import Layout from "@/components/common/Layout/Layout";
import { CoursesResponse, getAllCourses } from "@/pages/api/courses";
import {
  AcademicRecord,
  getGraduationProfile,
  GraduationProfileResponse,
  registerCourseById,
  Subject,
  updateSubjectById,
} from "@/pages/api/graduation";
import { Button, Option, Select } from "@material-tailwind/react";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PencilIcon, CheckIcon } from "@heroicons/react/outline";
function Home() {
  const [profile, setProfile] = useState<GraduationProfileResponse>();
  const [coursesList, setCoursesList] = useState<CoursesResponse[]>();
  const router = useRouter();

  useEffect(() => {
    const getProfile = async () => {
      const profile = await getGraduationProfile();
      if (profile.courseName) {
        setProfile(profile);
      } else {
        const courses = await getAllCourses();
        setCoursesList(courses);
      }
    };
    getProfile();
  }, []);

  const gradeToText = (grade: string) => {
    switch (grade) {
      case "0":
        return "F";
      case "1":
        return "D";
      case "1.5":
        return "D+";
      case "2":
        return "C";
      case "2.5":
        return "C+";
      case "3":
        return "B";
      case "3.5":
        return "B+";
      case "4":
        return "A";
      default:
        return "-";
    }
  };

  const onRegistorCourse = async (id: string) => {
    await registerCourseById(id);
    router.reload();
  };

  const SubjectsComponent = (props: { subject: Subject }) => {
    const subject = props.subject;
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [grade, setGrade] = useState<string>(`${subject.grade}`);

    const onSubmitGradeSubject = async () => {
      setIsEdit(false);
      const _profile = await updateSubjectById(subject.id, Number(grade));
      setProfile({ ...profile, ..._profile });
    };

    return (
      <div className="flex items-center flex-col p-5 bg-gray-100 rounded-xl">
        <div className="mb-5 w-[100px] h-[100px] bg-[#E5E5E5] rounded-full"></div>
        <div>
          <p className="font-bold">{subject.name}</p>
          <p>
            หน่วยกิต <p className="font-bold inline-block">{subject.credits}</p>{" "}
            หน่วยกิต
          </p>
          <div className="flex flex-row gap-2 items-center">
            ผลการศึกษา
            {!isEdit ? (
              <p className="font-bold inline-block">{gradeToText(grade)}</p>
            ) : (
              <div className={"w-[80px]"}>
                <div className="relative">
                  <select
                    onChange={(e) => setGrade(e.target.value)}
                    value={grade}
                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
                  >
                    <option value="4">A</option>
                    <option value="3.5">B+</option>
                    <option value="3">B</option>
                    <option value="2.5">C</option>
                    <option value="2">C</option>
                    <option value="1.5">D+</option>
                    <option value="1">D</option>
                    <option value="-1">-</option>
                  </select>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.2"
                    stroke="currentColor"
                    className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </div>
              </div>
            )}
            {!isEdit ? (
              <div
                className="py-x cursor-pointer"
                onClick={() => setIsEdit(true)}
              >
                <PencilIcon className="w-4 text-gray-400" />
              </div>
            ) : (
              <div
                className="py-x cursor-pointer"
                onClick={onSubmitGradeSubject}
              >
                <CheckIcon className="w-4 text-gray-600" />
              </div>
            )}
          </div>
        </div>
      </div>
    );
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
                      <SubjectsComponent subject={subject} />
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
