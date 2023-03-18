import { Args, Query, Mutation, Resolver } from '@nestjs/graphql';

import { Document } from './models/document.model';
import { DocumentService } from './document.service';

@Resolver(() => Document)
export class DocumentResolver {
  constructor(private readonly documentService: DocumentService) {}

    @Query(() => Document, { nullable: true })
    document(@Args('id') id: number): Promise<Document | null> {
        return this.documentService.document(id);
    }

    @Query(() => [Document], { nullable: true })
    documents(@Args('userId') userId: number): Promise<Document[]> {
        return this.documentService.documents(userId);
    }

    @Mutation(() => Document)
    saveDocument(
        @Args('title') title: string,
        @Args('text') text: string,
        @Args('authorId') authorId: number,
    ): Promise<Document> {
        return this.documentService.saveDocument(title, text, authorId);
    }

}
