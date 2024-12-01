import { PageOptionsDto } from '../../../../../common/dto/page-options.dto';
import { StringFieldOptional } from '../../../../../decorators';

export class UserPaginationOptionsDto extends PageOptionsDto {
  @StringFieldOptional({
    swagger: true,
    nullable: true,
  })
  readonly q?: string;
}
