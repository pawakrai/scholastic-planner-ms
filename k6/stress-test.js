import http from 'k6/http'
import { check, sleep } from 'k6'

export let options = {
  stages: [
   { duration: "2m", target: 100 },    // below normal load
   { duration: "5m", target: 100 },
   { duration: "2m", target: 200 },    // normal load
   { duration: "5m", target: 200 },
   { duration: "2m", target: 300 },    // around the breaking point
   { duration: "5m", target: 300 },
   { duration: "2m", target: 400 },    // beyond the breaking point
   { duration: "5m", target: 400 },
   { duration: "10m", target: 0 },     // scale down. Recovery stage.
  ],
 };
 
export default function () {
  // กำหนด header ที่ต้องการแนบไปในคำขอ
  const headers = {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxMjNAbWFpbC5jb20iLCJfaWQiOiI2NzFkMTZhNzAwNTY1ODUwMTdmN2ZiNjIiLCJzdHVkZW50SWQiOiI2NjcwMjkzODIxIiwiaWF0IjoxNzMwOTc5MzM4LCJleHAiOjE3MzEwNjU3Mzh9.MF4ioDb_FXdGaGujciADJjU-0v8IcpxHaYHIzEzqgnQ', // ใส่ token หรือข้อมูล Authentication
    'Content-Type': 'application/json', // ระบุ Content-Type ของข้อมูล
  }

  // ส่งคำขอค้นหารายวิชา โดยแนบ header
  const response = http.get('http://localhost:8000/graduation/profile', {
    headers: headers,
  })

  // ตรวจสอบว่า response ใช้เวลาน้อยกว่า 2 วินาที
  check(response, {
    'response time is below 2s': (r) => r.timings.duration < 2000,
  })

  sleep(1) // พัก 1 วินาทีระหว่างคำขอแต่ละครั้ง
}
