FROM node:20-alpine AS build

WORKDIR /usr/app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npm run build \
 && npm prune --omit=dev

FROM node:20-alpine AS run

WORKDIR /usr/app

COPY --from=build /usr/app/package*.json ./
COPY --from=build /usr/app/node_modules/ ./node_modules/
COPY --from=build /usr/app/dist/ ./dist/

CMD ["node", "dist/main.js"]
