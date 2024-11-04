import grpc from '@grpc/grpc-js'
import protoLoader from '@grpc/proto-loader'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PROTO_PATH = path.join(__dirname, '../proto/graduationPlan.proto')

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
})

const graduationPlanService =
  grpc.loadPackageDefinition(packageDefinition).GraduationPlanService

const client = new graduationPlanService(
  'localhost:30043',
  grpc.credentials.createInsecure()
)

export default client
