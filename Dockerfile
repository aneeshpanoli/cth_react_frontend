# Build
FROM node:13.12.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY . ./
COPY package.json /opt/app/package.json
COPY yarn.lock /opt/app/yarn.lock
RUN apk add git rsync --no-cache \
  && yarn build \
  && rm -rf ./node_modules \
  && yarn install --production

# Release
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]