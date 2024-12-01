import { IUserService } from 'modules/user/interfaces/user.service.interface';
import { IAuthService } from '../interfaces/auth.service.interface';
import { ApiConfigService } from 'shared/services/api-config.service';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenPayloadDto } from '../delivery/dtos/response/token-payload.dto';
import { UserDomain } from 'modules/user/domains/user.domain';
import { TokenType } from 'constants/token-type';
import { UserLoginDto } from '../delivery/dtos/response/user-login.dto';
import { validateHash } from 'common/utils';
import { ERROR_UNAUTHORIZED } from 'filters/constraint-errors';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private configService: ApiConfigService,
    private jwtService: JwtService,

    @Inject('IUserService')
    private userService: IUserService,
  ) {}

  async createAccessToken(data: { userId: Uuid }): Promise<TokenPayloadDto> {
    return new TokenPayloadDto({
      expiresIn: this.configService.authConfig.jwtExpirationTime,
      accessToken: await this.jwtService.signAsync({
        userId: data.userId,
        type: TokenType.ACCESS_TOKEN,
      }),
    });
  }

  async validateUser(userLoginDto: UserLoginDto): Promise<UserDomain> {
    const user = await this.userService.getUserByEmail(userLoginDto.email);

    const isPasswordValid = await validateHash(
      userLoginDto.password,
      user?.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException(
        ERROR_UNAUTHORIZED,
        'Email or Password is incorrect',
      );
    }

    return user!;
  }
}
