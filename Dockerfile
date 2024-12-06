FROM node:lts-alpine

WORKDIR /app

RUN apk add --no-cache python3 make g++ dumb-init

COPY package.json package-lock.json ./

RUN npm i --omit=dev

RUN chown -R node:node /app

USER node
COPY --chown=node:node ./dist ./dist

EXPOSE 3000

CMD [ "dumb-init", "node", "./dist/src/main.js"]
