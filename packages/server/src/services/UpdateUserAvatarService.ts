import { getRepository } from 'typeorm'
import User from '../models/User'
import uploadConfig from '../config/upload'
import path from 'path'
import * as fs from 'fs'
import AppError from '../errors/AppError'

interface Request {
  userId: string
  avatarFileName: string
}

export class UpdateUserAvatarService {
  public async execute({ userId, avatarFileName }: Request): Promise<User> {
    const userRepository = getRepository(User)

    const user = await userRepository.findOne(userId)

    if (!user) {
      throw new AppError('User not found')
    }

    if (user.avatar) {
      const oldAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
      const userAvatarFileExists = await fs.promises.stat(oldAvatarFilePath)
      if (userAvatarFileExists) {
        await fs.promises.unlink(oldAvatarFilePath)
      }
    }

    user.avatar = avatarFileName

    await userRepository.save(user)

    return user
  }
}
