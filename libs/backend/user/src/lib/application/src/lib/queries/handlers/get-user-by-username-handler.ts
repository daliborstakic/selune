import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserByUsernameQuery } from '../get-user-by-username-query';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@selune-backend/entities';
import { Repository } from 'typeorm';

@QueryHandler(GetUserByUsernameQuery)
export class GetuserByUsernameQueryHandler
  implements IQueryHandler<GetUserByUsernameQuery>
{
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  execute(query: GetUserByUsernameQuery): Promise<User | null> {
    return this.userRepository.findOne({
      where: { username: query.username },
    });
  }
}
