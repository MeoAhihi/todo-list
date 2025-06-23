import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findByEmail(email);
    console.log(user);
    if (user && user.password === password) {
      const payload = {
        // sub: user.id,
        email: user.email,
        username: user.username,
      };
      return { access_token: await this.jwtService.signAsync(payload) };
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async signup(registerDto: RegisterDto) {
    const duplicateUser = await this.usersService.findByEmail(
      registerDto.email,
    );
    if (duplicateUser) {
      throw new ConflictException('User already exists');
    }

    const newUser = await this.usersService.create(registerDto);
    const payload = {
      // sub: newUser.id,
      email: newUser.email,
      username: newUser.username,
    };
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
