# Create a docker file to run the prisma server

FROM node:lts


COPY ./package.json .
COPY ./package-lock.json .

RUN npm install

COPY . .

RUN npx prisma db push
RUN npx prisma db seed
RUN npx prisma generate

CMD ["npm", "run", "start"]
