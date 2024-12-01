import { TokenType } from 'constants/token-type';
import { UserDomain } from 'modules/user/domains/user.domain';

export interface IJwtStrategy {
  validate(args: { userId: Uuid; type: TokenType }): Promise<UserDomain>;
}
