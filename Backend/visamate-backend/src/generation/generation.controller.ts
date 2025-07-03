// generation.controller.ts
import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { GenerationService } from './generation.service';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { RequestWithUser } from '../types/RequestWithUser';

@Controller('generations')
export class GenerationController {
  constructor(private readonly generationService: GenerationService) {}

//   @UseGuards(JwtAuthGuard)
  @Post()
async save(
  @Body()
  body: {
    type: 'sop' | 'lor';
    prompt: string;
    output: string;
    response: string;
  },
) {
  // 🧪 Temporarily assign a dummy user ID for testing
  const userId = 999;

  return this.generationService.saveGeneration({ userId, ...body });
}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getByUser(@Req() req: RequestWithUser) {
    return this.generationService.getGenerationsForUser(req.user.id);
  }
}
