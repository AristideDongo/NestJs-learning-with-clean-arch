import { Module } from '@nestjs/common';
import { PrismaService } from './infrastructure/database/prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class UsersModule {}
