import { response, Router } from 'express'
import { getCustomRepository } from 'typeorm'
import { parseISO } from 'date-fns'
import AppointmentsRepository from '../repositories/AppointmentsRepository'
import Appointment from '../models/Appointment'
import CreateAppointmentService from '../services/CreateAppointmentService'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const appointmentsRouter = Router()

appointmentsRouter.use(ensureAuthenticated)

appointmentsRouter.get('/', async (req, res) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository)
  const appointments = await appointmentsRepository.find()

  return res.json(appointments)
})

appointmentsRouter.post('/', async (req, res) => {
  const { providerId, date } = req.body

  const parsedDate = parseISO(date)

  const createAppointment = new CreateAppointmentService()

  const appointment = await createAppointment.execute({
    date: parsedDate,
    providerId
  })

  return res.json(appointment)
})

export default appointmentsRouter