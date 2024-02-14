ARG NODE_VERSION=21.6.1

################################################################################
# Create build stages.
FROM node:${NODE_VERSION}-alpine as build

WORKDIR /usr/src/app
COPY . .
RUN npm install && npm run build

################################################################################
# Create a new stage to run the application with minimal runtime dependencies
# where the necessary files are copied from the build stage.
FROM build as final

ENV NODE_ENV production
USER node
COPY --from=build /usr/src/app/dist ./dist
EXPOSE 3000
CMD ["node","dist/server.js"]
