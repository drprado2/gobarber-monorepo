import { response, Router } from 'express'
import { CreateUserService } from '../services/CreateUserService'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import uploadConfig from '../config/upload'
import multer from 'multer'
import { UpdateUserAvatarService } from '../services/UpdateUserAvatarService'

const usersRouter = Router()
const upload = multer(uploadConfig)

usersRouter.post('/', async (req, res) => {
  const { email, name, password } = req.body
  const createUserSerivce = new CreateUserService()

  const user = await createUserSerivce.Execute({ email, password, name })

  delete user.password

  return res.json(user)
})

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (req, res) => {
    const updateService = new UpdateUserAvatarService()
    const user = await updateService.execute({
      userId: req.user.id,
      avatarFileName: req.file.filename
    })
    delete user.password
    return res.json(user)
  }
)

export default usersRouter
