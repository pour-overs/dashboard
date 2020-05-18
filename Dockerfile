# This stage builds the sapper application.
# https://hub.docker.com/_/node
FROM node:12-slim AS build-app
WORKDIR /usr/src/app
COPY . .
RUN npm install --no-audit
RUN npm run build

# This stage installs the runtime dependencies.
FROM node:12-slim AS build-runtime
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --production

# This stage only needs the compiled Sapper application
# and the runtime dependencies.
FROM node:12-slim
WORKDIR /usr/src/app
COPY --from=build-app /usr/src/app/__sapper__ ./__sapper__
COPY --from=build-app /usr/src/app/static ./static
COPY --from=build-runtime /usr/src/app/node_modules ./node_modules

ENV PORT 8080
ENV HOST 0.0.0.0

# Note that we didn't copy the package.json so we can't use 'npm start' here
CMD ["node", "__sapper__/build"]
