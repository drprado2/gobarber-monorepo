import { getRepository } from 'typeorm'
import User from '../models/User'
import { hash } from 'bcryptjs'
import AppError from '../errors/AppError'
import has = Reflect.has

interface Request {
  name: string
  email: string
  password: string
}

export class CreateUserService {
  async Execute({ email, name, password }: Request): Promise<User> {
    const userRepository = getRepository(User)

    const checkUserExists = await userRepository.findOne({
      where: { email }
    })

    if (checkUserExists) {
      throw new AppError('This user already exists')
    }

    const hashadPassword = await hash(password, 8)

    const user = userRepository.create({
      email,
      name,
      password: hashadPassword
    })

    await userRepository.save(user)

    return user
  }
}
