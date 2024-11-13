import Layout from "@/components/common/Layout/Layout";
import { getAllSubject, SubjectResponse } from "@/pages/api/courses";
import { registerSubjectById } from "@/pages/api/graduation";
import { mapDate } from "@/utils/utils";
import { Button, Input } from "@material-tailwind/react";
import { useEffect, useState } from "react";
function Home() {
  const [filterSubject, setFilterSubject] = useState<string>("");
  const [subjects, setSubjects] = useState<SubjectResponse[]>();
  const filterSub =
    filterSubject.length >= 3
      ? subjects?.filter(
          (subject) =>
            subject.subjectId.toLocaleUpperCase().indexOf(filterSubject) > -1 ||
            subject.subjectName.toLocaleUpperCase().indexOf(filterSubject) > -1
        ) ?? []
      : subjects;
  const openSubjects = filterSub?.filter((subject) => subject.isOpen) ?? [];
  const notOpenSubjects = filterSub?.filter((subject) => !subject.isOpen) ?? [];

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

  return (
    <div>
      <div className="flex flex-row gap-5 items-center">
        ค้นหารายวิชา
        <div className="w-[200px]">
          <Input
            label="ค้นหาด้วยชื่อ หรือ รหัสวิชา"
            onChange={(e) =>
              setFilterSubject(e.target.value.toLocaleUpperCase())
            }
          />
        </div>
      </div>
      <div>
        {subjects?.length ?? 0 > 0 ? (
          <div>
            <div>
              <div className="font-bold my-4 text-2xl">วิชาที่เปิดสอน</div>
            </div>
            <div>
              {openSubjects.length > 0 ? (
                openSubjects.map((subject) => (
                  <div className="p-5 flex flex-col flex-1 bg-white rounded-xl shadow-lg mb-5">
                    <div className="flex flex-row flex-1 ">
                      <div className="font-bold flex flex-1">
                        {subject.subjectId} {subject.subjectName}
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
                            {mapDate(subject?.date)}
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
                            {mapDate(subject.date)}
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
