import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // ✅ Import this
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ContentModule } from './content/content.module';
import { AiModule } from './ai/ai.module';
import { GenerationModule } from './generation/generation.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // ✅ Add this line
    AuthModule,
    UserModule,
    PrismaModule,
    ContentModule,
    AiModule,
    GenerationModule,
  ],
})
export class AppModule {}
