FROM node:12.13.0-alpine as build 
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
ARG API_URL
ENV REACT_APP_API_URL $API_URL
RUN yarn build

FROM nginx
EXPOSE 80
RUN rm -rf /etc/nginx/conf.d
COPY ./nginx/ /etc/nginx/conf.d
COPY --from=build /app/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]