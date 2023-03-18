import { Field, ObjectType } from '@nestjs/graphql';

import type { Document as DocumentModel } from '@prisma/client';

@ObjectType()
export class Document implements DocumentModel {
    @Field()
    title: string;
    @Field()
    id: number;
    @Field()
    text: string;
    @Field()
    authorId: number;
    @Field()
    createdAt: Date;
    @Field()
    updatedAt: Date;
}
