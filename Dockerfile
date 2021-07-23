FROM node:14

WORKDIR /app

COPY ./package.json .
COPY ./yarn.lock .
COPY ./config.json .
COPY ./tsconfig.json .

RUN yarn install --production

COPY ./src ./src
COPY ./public ./public

EXPOSE 8080

CMD [ "yarn", "start" ]