import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GenerationService {
  constructor(private prisma: PrismaService) {}

  async saveGeneration(data: {
    userId: number;
    type: 'sop' | 'lor';
    prompt: string;
    output: string;
    response: string; // ✅ Add this
  }) {
    return this.prisma.generation.create({
      data,
    });
  }

  async getGenerationsForUser(userId: number) {
    return this.prisma.generation.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
