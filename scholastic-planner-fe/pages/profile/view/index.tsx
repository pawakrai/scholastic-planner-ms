import Layout from "@/components/common/Layout/Layout";
import {
  getGraduationProfile,
  GraduationProfileResponse,
} from "@/pages/api/graduation";
import Link from "next/link";
import { Router } from "next/router";
import { useEffect, useState } from "react";
function Home() {
  const [isEmptyProfile, setIsEmptyProfile] = useState<boolean>();
  const [profile, setProfile] = useState<GraduationProfileResponse>();
  useEffect(() => {
    const getProfile = async () => {
      const profile = await getGraduationProfile();
      console.log("profile", profile);
      setProfile(profile);
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

  const onClickAddSubjects = () => {
    Router;
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
          {profile.academicRecords.map((academic) => (
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
                  <div>{"ยังไม่ได้ลงทะเบียนเรียน"}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>{/* TODO: ยังไม่ได้เลือก plan */}</div>
      )}
    </div>
  );
}

Home.Layout = Layout;
export default Home;
