import { Controller, Post, Body } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('sop')
  async generateSOP(@Body('prompt') prompt: string) {
    console.log('💬 Prompt received:', prompt);
    const result = await this.aiService.generateSOP(prompt);
     console.log('🧠 AI output:', result);
    return { output: result };
  }

  @Post('lor')
  async generateLOR(@Body('prompt') prompt: string) {
    const result = await this.aiService.generateLOR(prompt);
    return { output: result };
  }
}
