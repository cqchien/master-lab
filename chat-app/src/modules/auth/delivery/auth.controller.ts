import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LoginPayloadDto } from './dtos/response/login-payload.dto';
import { IAuthService } from '../interfaces/auth.service.interface';
import { UserLoginDto } from './dtos/response/user-login.dto';
import { UserDto } from 'modules/user/delivery/dtos/response/user.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    @Inject('IAuthService')
    private authService: IAuthService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: LoginPayloadDto,
    description: 'User info with access token',
  })
  async userLogin(
    @Body() userLoginDto: UserLoginDto,
  ): Promise<LoginPayloadDto> {
    const user = await this.authService.validateUser(userLoginDto);

    const token = await this.authService.createAccessToken({
      userId: user.id,
    });

    return new LoginPayloadDto(new UserDto(user), token);
  }
}
