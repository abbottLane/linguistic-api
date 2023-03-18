# The Linguistic Backend Challenge

This is my implementation of the document service, which mainly consists of a document service which defines API endpoints, and a document resolver which converts the exposed endpoints to graphql queries and mutations.
## Run the backend service and db in Docker 

The backend and db are set up to run in a docker container. I've wrapped the docker commands to build and run the docker image in a Makefile, so to run the app you simply have to invoke (from the project root):

`make run`

Docker generates the Prisma service as part of setup, and at runtime serves the backend service which points to the Prisma db. 

## Manually test the endpoints

You can test drive the endpoints by running the docker container which is configured to expose the graphql endpoint on the host machine. Point your browser to `localhost:3000/graphql`to access the Apollo API interface UI and issue queries such as:

```
query{
    
}
```

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