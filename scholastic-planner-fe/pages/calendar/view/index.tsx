import Layout from "@/components/common/Layout/Layout";
function Home() {
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
        <div className={"font-bold my-4 text-2xl"}>ตารางเรียน</div>
        <div className="my-5 bg-gray-400	h-[1px] w-full" />
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
      </div>
    </div>
  );
}

Home.Layout = Layout;
export default Home;
