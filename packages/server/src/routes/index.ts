import express from 'express'
import appointmentsRouter from './appointments.routes'
import usersRouter from './users.routes'
import sessionsRouter from './sessions.route'

const routes = express.Router()

routes.use('/appointments', appointmentsRouter)
routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)

export default routes
