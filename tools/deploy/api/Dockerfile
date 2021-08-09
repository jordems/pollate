FROM node:16-alpine

RUN set -x && apt-get update && apt-get install yarn

RUN mkdir /app
WORKDIR /app
COPY ./dist/apps/api/package.json ./package.json

ENV PORT=8080

RUN yarn install --prod
COPY ./dist/apps/api ./dist/apps/api


EXPOSE 8080
CMD ["node", "./dist/apps/api/main.js"]