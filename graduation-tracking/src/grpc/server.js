import grpc from '@grpc/grpc-js'
import protoLoader from '@grpc/proto-loader'
import GraduationPlanService from '../services/graduationPlanService.js'
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

const graduationPlanProto = grpc.loadPackageDefinition(packageDefinition)

const server = new grpc.Server()

server.addService(graduationPlanProto.GraduationPlanService.service, {
  // Get a graduation plan by student ID
  getProfile: async (call, callback) => {
    try {
      // console.log('studentId call.request', call.request)
      const plan = await GraduationPlanService.getProfile(call.request)
      if (plan) {
        callback(null, plan)
      } else {
        callback({
          code: grpc.status.NOT_FOUND,
          details: 'Graduation plan not found',
        })
      }
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        details: 'Error fetching graduation plan',
      })
    }
  },

  // Create a new graduation plan
  createProfile: async (call, callback) => {
    try {
      const plan = await GraduationPlanService.createProfile(call.request)
      callback(null, plan)
    } catch (error) {
      // console.log('errorXXX', error)
      if (error.code !== undefined) {
        // If it's already a gRPC error, pass it directly
        callback(error)
      } else {
        // For other errors, use INTERNAL status
        callback(
          {
            code: grpc.status.INTERNAL,
            details: error.message,
          },
          null
        )
      }
    }
  },

  // Register a subject for a student
  registerSubject: async (call, callback) => {
    try {
      const updatedPlan = await GraduationPlanService.registerSubject(
        call.request
      )
      if (updatedPlan) {
        callback(null, updatedPlan)
      } else {
        callback({
          code: grpc.status.NOT_FOUND,
          details: 'Graduation plan not found for subject registration',
        })
      }
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        details: 'Error registering subject',
      })
    }
  },

  // Update the status of a registered subject
  updateSubjectStatus: async (call, callback) => {
    try {
      const updatedPlan = await GraduationPlanService.updateSubjectStatus(
        call.request
      )
      if (updatedPlan) {
        callback(null, updatedPlan)
      } else {
        callback({
          code: grpc.status.NOT_FOUND,
          details: 'Graduation plan not found for updating subject status',
        })
      }
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        details: 'Error updating subject status',
      })
    }
  },

  // Delete a graduation plan by ID
  deleteProfile: async (call, callback) => {
    try {
      const deleted = await GraduationPlanService.deleteProfile(
        call.request.studentId
      )
      if (deleted) {
        callback(null, deleted)
      } else {
        callback({
          code: grpc.status.NOT_FOUND,
          details: 'Graduation plan not found',
        })
      }
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        details: 'Error deleting graduation plan',
      })
    }
  },
})

// Function to start the gRPC server
const startGrpcServer = () => {
  server.bindAsync(
    '127.0.0.1:30043',
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
      if (error) {
        console.error(`Server binding failed: ${error.message}`)
        return
      }
      console.log(`gRPC server running at http://127.0.0.1:${port}`)
      // No need to call server.start() anymore
    }
  )
}

export default startGrpcServer
