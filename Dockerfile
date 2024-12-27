# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1 AS base

# set working directory
WORKDIR /app

# copy the rest of the application
COPY . .

# install with --production (exclude devDependencies)
RUN bun install --production

ENV NODE_ENV=production

# Start the application
CMD bun start
