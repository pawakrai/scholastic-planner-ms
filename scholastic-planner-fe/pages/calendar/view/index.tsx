import { Select, Option, Button } from "@material-tailwind/react";
import Layout from "@/components/common/Layout/Layout";
import { getToken } from "@/pages/api/httpClient";
import { getTimeTableById, TimeTableResponse } from "@/pages/api/timetable";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";

function Home() {
  const [semester, setSemester] = useState<string>();
  const [year, setYear] = useState<string>();
  const [timeTable, setTimeTable] = useState<TimeTableResponse>();
  const [isEmptyTimeTable, setIsEmptyTimeTable] = useState<boolean>();

  useEffect(() => {
    const getStudentId = () => {
      if (!!getToken()) {
        const profile: any = jwtDecode(getToken()!);
        return profile?.studentId;
      }
      return "";
    };
    const getTimeTable = async () => {
      const studentId = getStudentId();
      if (studentId && semester && year) {
        const table = await getTimeTableById(studentId, semester, year);
        if (table.subjects?.length > 0) {
          setTimeTable(table);
        } else {
          setIsEmptyTimeTable(true);
        }
      }
    };
    getTimeTable();
  }, [semester, year]);

  const TABLE_HEAD = [
    "วัน / เวลา",
    "7-8",
    "8-9",
    "9-10",
    "10-11",
    "11-12",
    "12-13",
    "13-14",
    "13-14",
    "14-15",
    "15-16",
  ];
  const TABLE_ROWS = [
    {
      day: "วันจันทร์",
      subjects: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    },
    {
      day: "วันอังคาร",
      subjects: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    },
    {
      day: "วันพุธ",
      subjects: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    },
    {
      day: "วันพฤหัสบดี",
      subjects: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    },
    {
      day: "วันศุกร์",
      subjects: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    },
    {
      day: "วันเสาร์",
      subjects: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    },
    {
      day: "วันอาทิตย์",
      subjects: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    },
  ];

  return (
    <div>
      <div>
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
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                      <div className="font-bold text-center">{head}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map((day, index) => {
                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";
                  return (
                    <tr key={day.day}>
                      <td className={classes}>
                        <div className="font-normal">{day.day}</div>
                      </td>
                      {day.subjects.map((subject) => (
                        <td className={classes}>
                          <div className="font-normal">{""}</div>
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="my-5 bg-gray-400 h-[1px] w-full" />
            <div className="flex justify-end gap-5">
              <Button variant="outlined">
                <div>เพิ่มวิชาเรียน</div>
              </Button>
              <Button>
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
