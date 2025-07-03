import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async signup(fullName: string, email: string, password: string) {
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('Email is already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.userService.createUser({
      fullName,
      email,
      password: hashedPassword,
    });

    const payload = { sub: newUser.id, email: newUser.email };
    const token = await this.jwtService.signAsync(payload);

    return {
      message: 'Signup successful',
      accessToken: token,
    };
  }

  async login(email: string, password: string) {
  const user = await this.userService.findByEmail(email);

  if (!user) {
    throw new BadRequestException('Invalid credentials');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new BadRequestException('Invalid credentials');
  }
  await this.prisma.loginActivity.create({
    data: {
      userId: user.id,
    },
  });

  const payload = { sub: user.id, email: user.email };
  const token = await this.jwtService.signAsync(payload);

  return {
    message: 'Login successful',
    accessToken: token,
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
    },
  }
}s
}
