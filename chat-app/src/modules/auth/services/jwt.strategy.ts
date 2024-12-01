import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { TokenType } from 'constants/token-type';
import { ApiConfigService } from 'shared/services/api-config.service';
import { IUserService } from 'modules/user/interfaces/user.service.interface';
import { UserDomain } from 'modules/user/domains/user.domain';
import { ERROR_UNAUTHORIZED } from 'filters/constraint-errors';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ApiConfigService,

    @Inject('IUserService')
    private userService: IUserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.authConfig.privateKey,
    });
  }

  async validate(args: { userId: Uuid; type: TokenType }): Promise<UserDomain> {
    if (args.type !== TokenType.ACCESS_TOKEN) {
      throw new UnauthorizedException(ERROR_UNAUTHORIZED, 'Token is invalid');
    }

    const user = await this.userService.getUserById(args.userId);

    if (!user) {
      throw new UnauthorizedException(ERROR_UNAUTHORIZED, 'Token is invalid');
    }

    return user;
  }
}
