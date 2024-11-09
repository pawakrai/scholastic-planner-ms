import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = {
  vus: 10, // จำนวน concurrent users
  duration: '1m', // ระยะเวลาทดสอบ
  thresholds: {
    http_req_duration: ['p(95)<2000'], // กำหนด threshold ที่ 95% ของคำขอต้องน้อยกว่า 2 วินาที (2000ms)
  },
}

export default function () {
  // กำหนด header ที่ต้องการแนบไปในคำขอ
  const headers = {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxMjNAbWFpbC5jb20iLCJfaWQiOiI2NzFkMTZhNzAwNTY1ODUwMTdmN2ZiNjIiLCJzdHVkZW50SWQiOiI2NjcwMjkzODIxIiwiaWF0IjoxNzMxMDcxODE4LCJleHAiOjE3MzExNTgyMTh9.foc2T1ryU5j6TEV3dmE4YIVqfwcUEBifnj6W-oDv4M8', // ใส่ token หรือข้อมูล Authentication
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
