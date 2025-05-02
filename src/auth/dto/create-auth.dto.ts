import { ApiProperty } from '@nestjs/swagger';
import { UserRole, UserStatus } from '@prisma/client';
import { IsEmail, IsString, IsUrl, Max, Min, MinLength } from 'class-validator';

export class RegisterAuthDto {
  @MinLength(3)
  @IsString()
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  @Min(1900)
  @Max(new Date().getFullYear())
  year: number;
  @ApiProperty()
  email: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  password: string;
  role: UserRole;
  @ApiProperty()
  image?: string;
  @ApiProperty()
  regionId: string;
}

export class CreateAuthDto {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  year: string;
  password: string;
  regionId: string;
  role: UserRole;
  status: UserStatus;
  image?: string;
}

export class LoginAuthDto {
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  password: string;
}

export class SendOtpDto {
  @ApiProperty()
  @IsEmail()
  email: string;
}

export class VerifyOtpDto {
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  otp: string;
}

