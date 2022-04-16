import { Body, Controller, Logger, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  private logger = new Logger('AuthController', { timestamp: true })

  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
    this.logger.verbose(`User is creating an account with username: ${authCredentialsDTO.username}`)
    return this.authService.signUp(authCredentialsDTO)
  }

  @Post('signin')
  async signIn(@Body() authCredentialsDTO: AuthCredentialsDTO): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDTO)
  }
}
