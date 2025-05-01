import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { MailerService } from 'src/mailer/mailer.service';

@Module({
  imports: [JwtModule.register({
    global: true,
    secret: "secret",
    signOptions: {expiresIn: "1h"}
  })],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, MailerService],
})
export class AuthModule {}
