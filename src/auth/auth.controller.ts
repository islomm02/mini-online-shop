import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto, LoginAuthDto, SendOtpDto, VerifyOtpDto, MeDto } from './dto/create-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, 
    private prisma: PrismaService
  ) {}


  @Post('register')
  async register(@Body() data: RegisterAuthDto) {
  
    return this.authService.register(data);
  }

  @Post('login')
  login(@Body() data: LoginAuthDto) {
    return this.authService.login(data);
  }

  @Post('send-otp')
  sendOtp(@Body() data: SendOtpDto) {
    return this.authService.sendOtp(data);
  }
  
  @Post('verify-otp')
  verifyOtp(@Body() data: VerifyOtpDto) {
    return this.authService.verifyOtp(data);
  }

  @Post("me")
  me(@Body() data: MeDto) {
    return this.authService.me(data)
  }
}
