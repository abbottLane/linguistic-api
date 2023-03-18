import { Args, Query, Resolver } from '@nestjs/graphql';

import { User } from './models/user.model';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  user(@Args('id') id: number) {
    return this.userService.findByID(id);
  }

  @Query(() => [User])
  userDocuments(@Args('id') id: number) {
    return this.userService.getDocs(id);
  }
}
