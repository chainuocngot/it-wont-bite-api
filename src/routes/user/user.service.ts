import { Injectable } from '@nestjs/common';
import {
  GetMeResType,
  GetUserByUsernameResType,
  UpdateMeBodyType,
  UpdateMeResType,
} from 'src/routes/user/user.model';
import { UsernameAlreadyInUsedException, UserNotFoundException } from 'src/shared/error';
import { UserType } from 'src/shared/models/user.model';
import { UserRepository } from 'src/shared/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getMe(userId: UserType['id']): Promise<GetMeResType> {
    const user = await this.userRepository.findUniqueProjectedUser({
      id: userId,
    });

    if (user === null) {
      throw UserNotFoundException;
    }

    return user;
  }

  async getUserByUsername(username: UserType['username']): Promise<GetUserByUsernameResType> {
    const user = await this.userRepository.findUniqueProjectedUser({
      username,
    });

    if (user === null) {
      throw UserNotFoundException;
    }

    return user;
  }

  async updateMe(userId: UserType['id'], body: UpdateMeBodyType): Promise<UpdateMeResType> {
    if (body.username) {
      const userWithSameUsername = await this.userRepository.findFirst({
        where: {
          username: body.username,
          id: {
            not: userId,
          },
        },
      });

      if (userWithSameUsername !== null) {
        throw UsernameAlreadyInUsedException;
      }
    }

    return this.userRepository.updateWithProjectedUserReturn({
      where: {
        id: userId,
      },
      data: body,
    });
  }
}
