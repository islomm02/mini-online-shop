import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto, LoginAuthDto, SendOtpDto, VerifyOtpDto } from './dto/create-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { TokenGuard } from 'src/guards/token.guard';
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

  @Post('promote-to-admin')
  promoteToAdmin(@Body() data: {userId: string}) {
    return this.authService.promoteAdmin(data);
  }
  
  @Post('verify-otp')
  verifyOtp(@Body() data: VerifyOtpDto) {
    return this.authService.verifyOtp(data);
  }

  @UseGuards(TokenGuard)
  @Post("me")
  me( @Request() req) {
    return this.authService.me( req.user)
  }
}
