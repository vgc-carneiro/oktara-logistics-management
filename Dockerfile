FROM node:18.12-alpine3.15 AS builder

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --production

COPY . .

RUN npm install -g @nestjs/cli

RUN npm run build

FROM node:18.12-alpine3.15

RUN apk add --no-cache curl

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --production

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3335

CMD [ "npm", "start:prod" ]
