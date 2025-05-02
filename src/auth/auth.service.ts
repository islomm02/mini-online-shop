import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import {
  RegisterAuthDto,
  LoginAuthDto,
  SendOtpDto,
  VerifyOtpDto,
} from './dto/create-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from 'src/mailer/mailer.service';
import { totp } from 'otplib';

totp.options = {
  step: 90, 
  digits: 6,
};

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService,
    private jwt: JwtService,
    private mailer: MailerService
  ) {}


  async findUser(email: string) {
    return await this.prisma.user.findFirst({ where: { email } });
  }
  async register(data: RegisterAuthDto) {
    const user = await this.findUser(data.email);
    if (user) {
      throw new BadRequestException('User already exists');
    }
    let asd = await this.prisma.user.findFirst({ where: { phone: data.phone } })
    if (asd) {
      throw new BadRequestException('User with this phone already exists');
      
    }
    const hash = bcrypt.hashSync(data.password, 10);
    const newUser = await this.prisma.user.create({
      data: { ...data, password: hash }
    });
    return newUser;
  }

  async login(data: LoginAuthDto) {
    const user = await this.findUser(data.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    let match = bcrypt.compareSync(data.password,user.password)
    if (!match) {
      throw new BadRequestException("Invalid password")
    }
    if (user.status == "INACTIVE") {
      throw new BadRequestException("You should verify your accaunt before you login.")
    }

    return {accessToken: this.jwt.sign({user})}
  }

  async sendOtp(data: SendOtpDto) {
    await this.mailer.sendEmail(data.email, "Verify account", totp.generate(data.email))
    return `We sent verification code to your email.`;
  }

  async verifyOtp(data: VerifyOtpDto) {
    let user = await this.findUser(data.email)
    if (!user) {
      throw new NotFoundException("User not found")
    }
    let match = totp.check(data.otp, data.email)
    console.log(match);
    
    if (!match) {
      throw new BadRequestException("Invalid otp")
    }
    await this.prisma.user.update({
      where: { email: data.email },
      data: { status: "ACTIVE" }
    })
    return {message: `Your account has been verified succesfully`}
  }

  async me(user) {
    return await this.prisma.user.findFirst({where: {id: user.id}, include: {region: true}})
  }
}
