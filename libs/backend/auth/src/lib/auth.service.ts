import { Injectable } from '@nestjs/common';
import { UserService } from '@selune-backend/user';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signIn(username: string, password: string): Promise<boolean> {
    const user = await this.userService.findOneByUsername(username);

    if (user === null) return false;

    if (user.password !== password) return false;

    return true;
  }
}
