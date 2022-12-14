FROM node:16-alpine AS node

FROM node AS node-with-gyp
RUN apk add g++ make python3

FROM node-with-gyp AS builder
WORKDIR /squid
ADD package.json .
ADD package-lock.json .
RUN npm ci
ADD tsconfig.json .
ADD src src
RUN npm run build

FROM node-with-gyp AS deps
WORKDIR /squid
ADD package.json .
ADD package-lock.json .
RUN npm ci --production

FROM node AS squid
WORKDIR /squid
COPY --from=deps /squid/package.json .
COPY --from=deps /squid/package-lock.json .
COPY --from=deps /squid/node_modules node_modules
COPY --from=builder /squid/lib lib
ADD db db
ADD schema.graphql .
ADD docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
# TODO: use shorter PROMETHEUS_PORT
ENV PROCESSOR_PROMETHEUS_PORT 3000
ENV INDEXER_ENV ""
EXPOSE 3000
EXPOSE 4000


FROM squid AS processor
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["npm", "run", "processor:start"]


FROM squid AS query-node
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["npm", "run", "query-node:start"]
