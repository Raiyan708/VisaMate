import * as bcrypt from 'bcryptjs';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    try {
      const users = await this.prisma.user.findMany();
      console.log('📦 Fetched users:', users);
      return users;
    } catch (error) {
      console.error('🔥 Error fetching users:', error);
      throw new HttpException('Failed to fetch users', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createUser(data: { fullName: string; email: string; password: string }) {
    try {
      // 1. Check if user already exists
      const existingUser = await this.prisma.user.findUnique({
        where: { email: data.email },
      });

      if (existingUser) {
        throw new HttpException('User with this email already exists', HttpStatus.CONFLICT);
      }

      // 2. Hash the password
      const hashedPassword = await bcrypt.hash(data.password, 10);

      // 3. Save user
      const newUser = await this.prisma.user.create({
        data: {
          fullName: data.fullName,
          email: data.email,
          password: hashedPassword,
        },
      });

      console.log(`✅ User created: ${newUser.email}`);
      return newUser; // ✅ Only return user object (fixes TS issue in auth.service)

    } catch (error) {
      console.error('❌ Error during user creation:', error);
      throw new HttpException('Failed to create user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findByEmail(email: string) {
    try {
      return await this.prisma.user.findUnique({
        where: { email },
      });
    } catch (error) {
      console.error('❌ Error finding user by email:', error);
      throw new HttpException('Failed to find user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
