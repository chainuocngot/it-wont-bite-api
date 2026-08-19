import { Injectable } from '@nestjs/common';
import { GetMeResType, GetUserByUsernameResType } from 'src/routes/user/user.model';
import { UserNotFoundException } from 'src/shared/error';
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
}
