import connectDB from './db/db.js'
import grpcServer from './grpc/server.js'
import restApi from './api/restApi.js'
import { PORT } from './config/index.js'

// Connect to the database before starting the servers
connectDB()

// Start the gRPC server
grpcServer()

// Start the REST API server on a different port or same port if using different routes.
restApi.listen(PORT, () => {
  console.log(`REST API running at http://localhost:${PORT || 7003}`)
})
