import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const prismaService = app.get<PrismaService>(PrismaService);

  await prismaService.enableShutdownHooks(app);

  await app.listen(3000);
}

bootstrap();
