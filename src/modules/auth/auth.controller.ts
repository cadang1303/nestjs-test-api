import {
  Body,
  Controller,
  Post,
  Get,
  HttpStatus,
  Res,
  UseGuards,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiOAuth2,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Request, Response } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';
import { GoogleAuthGuard } from './guards/google.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'A new user has been successfully registered.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Email already exists.',
  })
  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Login successfully.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid credentials.',
  })
  @Post('/login')
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
    @Res() res: Response,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto, res);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Login successfully.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid credentials.',
  })
  @Post('logout')
  signout(@Req() req: Request): Promise<any> {
    return this.authService.logout(req);
  }

  @ApiOAuth2(['profile', 'email'])
  @UseGuards(GoogleAuthGuard)
  @Get('/login/google')
  signInGoogle() {
    return { message: 'logged in using google' };
  }

  @ApiExcludeEndpoint()
  @UseGuards(GoogleAuthGuard)
  @Get('/google/redirect')
  googleCallback(@Req() req: Request, @Res() res: Response) {
    return this.authService.loginSocial(req, res);
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Reset password successfully.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Invalid credentials.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid credentials.',
  })
  @UseGuards(JwtAuthGuard)
  @Post('/reset')
  resetPassword(@Body() data: any) {
    return this.authService.resetPassword(data);
  }
}
