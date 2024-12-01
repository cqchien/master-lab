import { Inject, Injectable } from '@nestjs/common';
import type { PageMetaDto } from 'common/dto/page-meta.dto';

import type { UserPaginationOptionsDto } from '../delivery/dtos/request/users-pagination.dto';
import type { UserDomain } from '../domains/user.domain';
import { IUserRepository } from '../interfaces/user.repository.interface';
import type { IUserService } from '../interfaces/user.service.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject('IUserRepository') // Use token for dependency injection
    private userRepository: IUserRepository,
  ) {}

  async getUsersWithPagination(
    pageOptionsDto: UserPaginationOptionsDto,
  ): Promise<[UserDomain[], PageMetaDto]> {
    const [users, pageMetaDto] =
      await this.userRepository.getUsersWithPagination(pageOptionsDto);

    return [users, pageMetaDto];
  }

  async getUserById(id: Uuid): Promise<UserDomain | null> {
    return this.userRepository.getUserById(id);
  }

  async getUserByEmail(email: string): Promise<UserDomain | null> {
    return this.userRepository.getUserByEmail(email);
  }
}
