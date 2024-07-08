FROM node:20.10.0-alpine AS builder

USER node

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY --chown=node package.json ./
COPY --chown=node yarn.lock ./
COPY --chown=node prisma ./prisma/

RUN yarn

COPY --chown=node . .

RUN yarn build

FROM node:20.10.0-alpine AS deploy

USER node

ARG NODE_ENV=production
ARG APP_PORT

WORKDIR /home/node/app

COPY --from=builder --chown=node /home/node/app/build ./build
COPY --from=builder --chown=node /home/node/app/package.json ./
COPY --from=builder --chown=node /home/node/app/yarn.lock ./
COPY --from=builder --chown=node /home/node/app/prisma ./prisma

RUN yarn install --prod

EXPOSE $APP_PORT

CMD [ "node", "." ]