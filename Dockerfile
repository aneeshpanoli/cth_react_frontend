# Build

FROM node:13.12.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
# We set a build arg that can set the backend api base
ARG API_URL
ENV BACKEND_URL=$API_URL
COPY . ./
COPY package.json /opt/app/package.json
COPY yarn.lock /opt/app/yarn.lock
RUN yarn build \
  && rm -rf ./node_modules \
  && yarn install --production

# Release
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]