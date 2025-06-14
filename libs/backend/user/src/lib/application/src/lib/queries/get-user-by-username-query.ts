import { Query } from '@nestjs/cqrs';
import { User } from '@selune-backend/entities';

export class GetUserByUsernameQuery extends Query<User | null> {
  constructor(public username: string) {
    super();
  }
}
