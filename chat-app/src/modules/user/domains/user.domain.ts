import { AbstractDomain } from '../../../common/abstract.domain';
import { UserEntity } from '../infras/entities/user.entity';

export class UserDomain extends AbstractDomain {
  avatar!: string | null;

  email!: string;

  password!: string;

  createdBy?: UserDomain | null;

  updatedBy?: UserDomain | null;

  deletedBy?: UserDomain | null;

  deletedAt?: Date | null;

  constructor(entity: UserEntity) {
    super(entity);

    this.avatar = entity.avatar;
    this.email = entity.email;
    this.password = entity.password;
    this.createdBy = entity.createdBy ? entity.createdBy.toDomain() : null;
    this.updatedBy = entity.updatedBy ? entity.updatedBy.toDomain() : null;
    this.deletedBy = entity.deletedBy ? entity.deletedBy.toDomain() : null;
    this.deletedAt = entity.deletedAt;
  }

  toEntity(): UserEntity {
    const entity = new UserEntity();
    entity.avatar = this.avatar;
    entity.email = this.email;
    entity.password = this.password;
    entity.createdBy = this.createdBy ? this.createdBy.toEntity() : null;
    entity.updatedBy = this.updatedBy ? this.updatedBy.toEntity() : null;
    entity.deletedBy = this.deletedBy ? this.deletedBy.toEntity() : null;
    entity.deletedAt = this.deletedAt;
    return entity;
  }
}
