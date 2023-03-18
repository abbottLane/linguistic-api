import { Field, ObjectType } from '@nestjs/graphql';

import type { User as UserModel } from '@prisma/client';

@ObjectType()
export class User implements UserModel {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

}
