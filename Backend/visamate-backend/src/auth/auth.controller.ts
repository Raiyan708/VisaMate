import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
async login(@Body() body: { email: string; password: string }) {
  const { email, password } = body;
  return this.authService.login(email, password);
}

  @Post('signup')
  async signup(
    @Body() body: { fullName: string; email: string; password: string }
  ) {
    const { fullName, email, password } = body;
    return this.authService.signup(fullName, email, password); // ✅ Should work
  }
}
