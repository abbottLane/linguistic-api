# The Linguistic Backend Challenge

This is my implementation of the document service, which mainly consists of a document service which defines API endpoints, and a document resolver which converts the exposed endpoints to graphql queries and mutations.

It may be relevant to call out that have never used any of these frameworks before: nestjs, Prisma, GraphQL and Apollo. So I had to consult all the relevent documentation and seek examples as I went along.

Day 1 (3/16): I took a couple hours to get my node environment working. There were some blocking dependency issues with the default Ubuntu node version 12.22.9, as well as with the most recent stable version 18.15. I ended up testing out a few versions in docker environments and settling Nodejs 19.1.

Day 2 (3/17): I deep dived (dove?) on the various frameworks and the existing design patterns for the User table. I wrote the bulk of the code for the Document model, resolver, service, and wired it all together. I tested the db with the Prisma interface and the API with Apollo, making sure I had all the required functionality.

Day 3 (3/18): I wrapped the service in a docker config and then wrapped the docker commands in a makefile. I do this sometimes to make setup and running services a "one-click" thing, and also to have a place that documents the sometimes complex sequence of bash commands needed to start a service.  

## Prereqs

This implementation requires that you have docker installed and the daemon running on your system. There is a Makefile which encapsulates the Docker build and run commands, but the syntax was written for Linux, so if you are on a Mac you may have to run docker with other arguments in order to access the service it is running in the container.

## Run the backend service and db in Docker 

The backend and db are set up to run in a docker container. I've wrapped the docker commands to build and run the docker image in a Makefile, so to run the app you simply have to invoke (from the project root):

`make run`

Docker generates the Prisma service as part of setup, and at runtime serves the backend service which points to the Prisma db. 

## Implementation of the required endpoints

For the implementation of the DocumentAPI, I followed the design patterns laid out by the User model, module, resolver, and service pretty closely. This meant implementing my service using the builtin query and mutation functionality exposed through the Prisma framework: `create`, `findMany`, `findUnique`. 

You can test drive the endpoints by running the docker container which is configured to expose the graphql endpoint on the host machine. Point your browser to `localhost:3000/graphql`to access the Apollo API interface UI and issue queries such as:

Mutation to save a new document under a particular userId
```
mutation{
  saveDocument(title: "new doc", text: "a documents text is like its fingers", authorId: 3) {
    id
    authorId
  }
```

Query to retrieve all documents created by a user under their userID
```
query{
   documents(userId:8){
     id
     authorId
     createdAt
     text
     title
   }
 }
```

Query to retrieve a list of document IDs from the User table given a userID
"""
query{
   userDocuments(id:2){
     id
   }
 }
"""

## The Prisma Document schema

Defining the schema (`prisma/schema.prismas) for a document is mostly boilerplate with simple attributes and types. 

One of the more interesting features here is the `author` field is of type `User`, and we define a relation which connects the `authorId` field to an entry in the `User` table. This connection allows us to query documents associated with a user directly from the `User` table.

The `@default(now())`decorator automatically set the `createdAt` field to the current timestamp at creation time.

The `@updatedAt` decorator automatically updates the `updatedAt` field when a record is modified.

The `@id`decorator marks a field as being the unique identifier of a record in this table. `@default(autoincrement())`automatically assigns a unique integer id and increments with each successive insertion into the table.

Finally `@@map("documents")` maps `Document` objects to the `documents` table in the db.
```
model Document {
  id        Int      @id @default(autoincrement())
  title     String
  text      String
  authorId  Int
  author    User     @relation(fields: [authorId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("documents")
  ```