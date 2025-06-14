import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUsersQuery } from '../get-users.query';
import { Repository } from 'typeorm';
import { User } from '@selune-backend/entities';
import { UserDto } from '@selune-backend/dtos';
import { InjectRepository } from '@nestjs/typeorm';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async execute(): Promise<UserDto[]> {
    return this.userRepository.find();
  }
}
