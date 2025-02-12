import { UserAuth } from '../entities/user.entity';

export abstract class UserRepository {
  abstract create(user: UserAuth): Promise<UserAuth>;
  abstract findByEmail(email: string): Promise<UserAuth | null>;
  abstract findById(id: string): Promise<UserAuth | null>;
}
