FROM node:8.2.1-alpine

RUN apk add --no-cache bash git python make g++ bash yarn

# First install NPM dependencies
RUN mkdir -p /tmp/dependencies
ADD package-lock.json /tmp/dependencies/package-lock.json
ADD package.json /tmp/dependencies/package.json
ADD .babelrc /tmp/dependencies/.babelrc
RUN cd /tmp/dependencies; npm install --production && \
  mkdir -p /app && \
  mv /tmp/dependencies/node_modules /app/. && \
  rm -rf /tmp/dependencies

# Slim down container
RUN apk del bash git python make g++

# Now add code (changes affect cache here)
WORKDIR /app
ADD . /app
RUN npm run build

EXPOSE 1305

CMD ["npm", "run", "static"]
