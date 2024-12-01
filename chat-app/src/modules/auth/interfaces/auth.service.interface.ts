import { UserDomain } from 'modules/user/domains/user.domain';
import { TokenPayloadDto } from '../delivery/dtos/response/token-payload.dto';
import { UserLoginDto } from '../delivery/dtos/response/user-login.dto';

export interface IAuthService {
  createAccessToken(data: { userId: Uuid }): Promise<TokenPayloadDto>;
  validateUser(userLoginDto: UserLoginDto): Promise<UserDomain>;
}
