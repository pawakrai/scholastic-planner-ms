import {
  Select,
  Option,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import Layout from "@/components/common/Layout/Layout";
import { getToken } from "@/pages/api/httpClient";
import {
  createTimeTable,
  getTimeTableById,
  updateTimeTable,
} from "@/pages/api/timetable";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { getAllSubject, SubjectResponse } from "@/pages/api/courses";
import { mapDate } from "@/utils/utils";
import { XIcon } from "@heroicons/react/outline";

import dayjs from "dayjs";
var customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

function Home() {
  const [open, setOpen] = useState(false);
  const [semester, setSemester] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [subjects, setSubjects] = useState<SubjectResponse[]>([]);
  const [timeTableSubjects, setTimeTableSubjects] = useState<SubjectResponse[]>(
    []
  );
  const [isEmptyTimeTable, setIsEmptyTimeTable] = useState<boolean>();
  const getStudentId = () => {
    if (!!getToken()) {
      const profile: any = jwtDecode(getToken()!);
      return profile?.studentId;
    }
    return "";
  };

  useEffect(() => {
    const getTimeTable = async () => {
      const studentId = getStudentId();
      if (studentId && semester && year) {
        const table = await getTimeTableById(studentId, semester, year);
        if (table.subjects?.length > 0) {
          setTimeTableSubjects(table.subjects);
        } else {
          setIsEmptyTimeTable(true);
        }
      }
    };
    const getSubjects = async () => {
      const subjectsResponse = await getAllSubject();
      setSubjects(subjectsResponse);
    };
    if (semester && year) {
      getSubjects();
      getTimeTable();
    }
  }, [semester, year]);

  const getTimeRowByDay = (day: string): Record<string, any>[] => {
    const mapIndex = (
      sub: SubjectResponse
    ): { index: number; diff: number } => {
      const start = dayjs(sub.startTime, "HH:mm");
      const end = dayjs(sub.endTime, "HH:mm");
      return { index: start.get("hour") - 7, diff: end.diff(start, "hour") };
    };
    const mainArray: Record<string, any>[] = Array(9).fill({});
    const timeArray = timeTableSubjects
      .filter((sub) => sub.date === day)
      .sort((a, b) => b.startTime.localeCompare(a.startTime))
      .map((sub) => ({
        subject: sub,
        time: mapIndex(sub),
      }));

    return timeArray.reduce((acc, t) => {
      const { index, diff } = t.time;
      const before = acc.slice(0, index);
      const after = acc.slice(index + diff);
      return [...before, t, ...after];
    }, mainArray);
  };

  const TABLE_HEAD = [
    "วัน / เวลา",
    "7-8",
    "8-9",
    "9-10",
    "10-11",
    "11-12",
    "12-13",
    "13-14",
    "14-15",
    "15-16",
  ];

  const TABLE_ROWS = [
    {
      day: "วันจันทร์",
      subjects: getTimeRowByDay("Mon"),
    },
    {
      day: "วันอังคาร",
      subjects: getTimeRowByDay("Tue"),
    },
    {
      day: "วันพุธ",
      subjects: getTimeRowByDay("Wed"),
    },
    {
      day: "วันพฤหัสบดี",
      subjects: getTimeRowByDay("Thu"),
    },
    {
      day: "วันศุกร์",
      subjects: getTimeRowByDay("Fri"),
    },
    {
      day: "วันเสาร์",
      subjects: getTimeRowByDay("Sat"),
    },
    {
      day: "วันอาทิตย์",
      subjects: getTimeRowByDay("Sun"),
    },
  ];

  const onSelectSubject = (subject: SubjectResponse) => {
    setTimeTableSubjects([...timeTableSubjects, subject]);
    handleOpen();
  };

  const handleRemove = (subject: SubjectResponse) => {
    const updateTime = timeTableSubjects.filter(
      (time) => time._id !== subject._id
    );
    setTimeTableSubjects([...updateTime]);
  };

  const handleSave = async () => {
    if (isEmptyTimeTable) {
      await createTimeTable(getStudentId(), semester, year, timeTableSubjects);
    } else {
      await updateTimeTable(getStudentId(), semester, year, timeTableSubjects);
    }
  };

  const handleOpen = () => setOpen(!open);

  const SubjectDialog = () => {
    return (
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>
          <div>
            เลือกรายวิชาปีการศึกษา {year} เทอม {semester}
          </div>
        </DialogHeader>
        {/* <DialogBody> */}
        <div className="overflow-auto h-[400px] px-2 text-black">
          {subjects && subjects.length > 0 ? (
            subjects.map((subject) => (
              <div className="p-5 flex flex-col flex-1 bg-white rounded-xl border border-gray-400	 mb-5">
                <div className="flex flex-row flex-1 ">
                  <div className="font-bold flex flex-1">
                    {subject.subjectName}
                  </div>
                </div>
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
                  <Button onClick={() => onSelectSubject(subject)}>
                    <div>เพิ่มวิชาเรียนลงตารางเรียน</div>
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
        {/* </DialogBody> */}
        <DialogFooter>
          <Button onClick={handleOpen}>
            <div>ยกเลิก</div>
          </Button>
        </DialogFooter>
      </Dialog>
    );
  };

  return (
    <div>
      <div>
        <SubjectDialog />
        <div className={"font-bold my-4 text-2xl"}>จำลองตารางเรียน</div>
        <div className="flex flex-row gap-5">
          <div className={"w-[200px]"}>
            <Select label="เลือกปีการศึกษา" onChange={setYear}>
              <Option value="2024">ปีการศึกษา 2024</Option>
              <Option value="2025">ปีการศึกษา 2025</Option>
              <Option value="2026">ปีการศึกษา 2026</Option>
              <Option value="2027">ปีการศึกษา 2027</Option>
              <Option value="2028">ปีการศึกษา 2028</Option>
            </Select>
          </div>
          <div className={"w-[200px]"}>
            <Select label="เลือกเทอมการศึกษา" onChange={setSemester}>
              <Option value="1">เทอม 1</Option>
              <Option value="2">เทอม 2</Option>
            </Select>
          </div>
        </div>
        <div className="my-5 bg-gray-400 h-[1px] w-full" />
        {!(semester && year) ? (
          <div className="flex rounded-xl w-full h-[500px] justify-center items-center bg-gray-300">
            <div className="text-gray-600 text-lg	">
              กรุณาระบุปีและเทอมการศึกษา
            </div>
          </div>
        ) : (
          <div>
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border border-blue-gray-200 bg-blue-gray-50 p-4"
                    >
                      <div className="font-bold text-center">{head}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map((day, index) => {
                  const classes = "p-5 border border-blue-gray-200";
                  return (
                    <tr key={`${day.day}-${index}`}>
                      <td className={classes}>
                        <div className="font-normal">{day.day}</div>
                      </td>
                      {day.subjects.map((subject) => (
                        <td
                          className={`${classes} ${
                            subject.subject && "bg-blue-100"
                          }`}
                          colSpan={subject?.time?.diff}
                        >
                          <div className="flex flex-row items-center gap-5">
                            {subject.subject && (
                              <>
                                <div className="flex-1">
                                  <div className="font-normal text-center ">
                                    {subject.subject.subjectName}
                                  </div>
                                  <div className="font-normal text-center ">
                                    {subject.subject.startTime}-
                                    {subject.subject.endTime}
                                  </div>
                                </div>
                                <div
                                  className="cursor-pointer"
                                  onClick={() => handleRemove(subject.subject)}
                                >
                                  <XIcon className="w-5" />
                                </div>
                              </>
                            )}
                          </div>
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="my-5 bg-gray-400 h-[1px] w-full" />
            <div className="flex justify-end gap-5">
              <Button variant="outlined" onClick={handleOpen}>
                <div>เพิ่มวิชาเรียน</div>
              </Button>
              <Button onClick={handleSave}>
                <div>บันทึก</div>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

Home.Layout = Layout;
export default Home;
