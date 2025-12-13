import { Module } from '@nestjs/common';
import { SignatureService } from './signature.service';
import { SignatureController } from './signature.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    providers: [SignatureService, PrismaService],
    controllers: [SignatureController],
})
export class SignatureModule {}
