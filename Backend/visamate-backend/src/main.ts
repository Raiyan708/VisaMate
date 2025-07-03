import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Explicitly allow your frontend origin
  app.enableCors({
    origin: 'http://localhost:3000', // adjust if using different frontend port
    credentials: true, // optional if using cookies/token
  });

  const PORT = process.env.PORT ?? 5050;
  await app.listen(PORT);
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
}
bootstrap();
