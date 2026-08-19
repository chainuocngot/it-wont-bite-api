import { Injectable } from '@nestjs/common';
import { GetMeResType } from 'src/routes/user/user.model';
import { UserNotFoundException } from 'src/shared/error';
import { UserType } from 'src/shared/models/user.model';
import { UserRepository } from 'src/shared/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getMe(userId: UserType['id']): Promise<GetMeResType> {
    const user = await this.userRepository.findUnique({
      where: {
        id: userId,
      },
      omit: {
        pwd: true,
        updatedAt: true,
      },
    });

    if (user === null) {
      throw UserNotFoundException;
    }

    return user;
  }
}
