import Layout from "@/components/common/Layout/Layout";
import { getAllSubject, SubjectResponse } from "@/pages/api/courses";
import { registerSubjectById } from "@/pages/api/graduation";
import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
function Home() {
  const [subjects, setSubjects] = useState<SubjectResponse[]>();
  const openSubjects = subjects?.filter((subject) => subject.isOpen) ?? [];
  const notOpenSubjects = subjects?.filter((subject) => !subject.isOpen) ?? [];

  useEffect(() => {
    const getCourse = async () => {
      const subjectsResponse = await getAllSubject();
      setSubjects(subjectsResponse);
    };
    getCourse();
  }, []);

  const registerSubject = async (id: string) => {
    const result = await registerSubjectById(id);
    window.alert("ลงทะเบียนเรียนสำเร็จ");
  };

  const mapDate = (date: string) => {
    switch (date) {
      case "Mon":
        return "จันทร์";
      case "Tue":
        return "อังคาร";
      case "Wed":
        return "พุธ";
      case "Thu":
        return "พฤหัสบดี";
      case "Fri":
        return "ศุกร์";
      default:
        return date;
    }
  };

  return (
    <div>
      ค้นหารายวิชา
      <div>
        {subjects?.length ?? 0 > 0 ? (
          <div>
            <div className="font-bold my-4 text-2xl">วิชาที่เปิดสอน</div>
            <div>
              {openSubjects.length > 0 ? (
                openSubjects.map((subject) => (
                  <div className="p-5 flex flex-col flex-1 bg-white rounded-xl shadow-lg mb-5">
                    <div className="flex flex-row flex-1 ">
                      <div className="font-bold flex flex-1">
                        {subject.subjectName}
                      </div>
                    </div>
                    <div>{subject.subjectDescription}</div>
                    <div className="my-5 bg-gray-400	h-[1px] w-full" />
                    <div className="">
                      <div>
                        หน่วยกิต{" "}
                        <div className="font-bold inline-block">
                          {subject.credits}
                        </div>{" "}
                        หน่วยกิต
                      </div>
                      <div className="flex flex-col">
                        <div>
                          วัน{" "}
                          <div className="font-bold inline-block">
                            {subject.date.map((date) => `${mapDate(date)} `)}
                          </div>
                        </div>
                        <div>
                          เวลา{" "}
                          <div className="font-bold inline-block">
                            {subject.startTime} - {subject.endTime}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="my-5 bg-gray-400	h-[1px] w-full" />
                    <div className="flex items-center flex-row flex-1 ">
                      <div className="flex flex-1"></div>
                      <Button
                        onClick={() => registerSubject(subject._id)}
                        nonce={undefined}
                        onResize={undefined}
                        onResizeCapture={undefined}
                      >
                        <div>ลงทะเบียนเรียน</div>
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="font-bold flex-1 text-center mx-10 text-gray-500">
                  ไม่มีรายวิชา
                </div>
              )}
            </div>
            <div className="my-5 bg-gray-400	h-[1px] w-full" />
            <div className="font-bold my-4 text-2xl">วิชาที่ไม่เปิดสอน</div>
            <div>
              {notOpenSubjects.length > 0 ? (
                notOpenSubjects.map((subject) => (
                  <div className="p-5 flex flex-col flex-1 bg-white rounded-xl shadow-lg mb-5">
                    <div className="flex flex-row flex-1 ">
                      <div className="font-bold flex flex-1">
                        {subject.subjectName}
                      </div>
                    </div>
                    <div>{subject.subjectDescription}</div>
                    <div className="my-5 bg-gray-400	h-[1px] w-full" />
                    <div className="">
                      <div>
                        หน่วยกิต{" "}
                        <div className="font-bold inline-block">
                          {subject.credits}
                        </div>{" "}
                        หน่วยกิต
                      </div>
                      <div className="flex flex-col">
                        <div>
                          วัน{" "}
                          <div className="font-bold inline-block">
                            {subject.date.map((date) => `${mapDate(date)} `)}
                          </div>
                        </div>
                        <div>
                          เวลา{" "}
                          <div className="font-bold inline-block">
                            {subject.startTime} - {subject.endTime}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="font-bold flex-1 text-center mx-10 text-gray-500">
                  ไม่มีรายวิชา
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="font-bold flex-1 text-center mx-10 text-gray-500">
            ไม่มีรายวิชา
          </div>
        )}
      </div>
    </div>
  );
}

Home.Layout = Layout;
export default Home;
