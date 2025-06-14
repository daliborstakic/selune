import { UserDto } from '@selune-backend/dtos';
import { Query } from '@nestjs/cqrs';

export class GetUsersQuery extends Query<UserDto[]> {
  constructor() {
    super();
  }
}
