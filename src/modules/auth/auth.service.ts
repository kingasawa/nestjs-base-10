import { Injectable } from '@nestjs/common';
import { UserService } from '@modules/user/user.service';
import { JwtService } from '@nestjs/jwt';

import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async validateUser(payload): Promise<any> {
    console.log('Step 2: validateUser', payload);
    const { username, password } = payload;
    const user = this.users.find(user => user.username === username);
    if (!user) {
      return null;
    }

    // const passwordMatch = await bcrypt.compare(password, user.password);
    const passwordMatch = password === user.password;
    if (passwordMatch) {
      console.log('Step 3: check passwordMatch', passwordMatch);
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    console.log('Step 5: login', user);
    if (!user) return null;
    const payload = { email: user.email };
    const signToken = this.jwtService.sign(payload);
    return {
      login: true,
      accessToken: signToken,
      refreshToken: signToken,
    };
  }
}
