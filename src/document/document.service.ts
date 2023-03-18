import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma';

@Injectable()
export class DocumentService {
  constructor(private readonly prismaService: PrismaService) {}
    // Retreive a document by id
    async document(id: number) {
        return await this.prismaService.document.findUnique({ where: { id } });
    }
    // Retreive all documents for a given user
    async documents(userId: number) {
        return await this.prismaService.document.findMany({ where: { authorId: userId } });
    }
    // Create a new document. Because the documents table has a foreign key to the users table, passing in the authorId makes the document retreivable in the user table under "documents"
    async saveDocument(title: string, text: string, authorId: number) {
        return await this.prismaService.document.create({ data: { title, text, authorId } });
    }
}
