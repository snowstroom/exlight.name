FROM node:10.13-alpine
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY client-stub/dist/client-stub/ /usr/src/app
RUN npm i http-server -g
EXPOSE 80
CMD http-server /usr/src/app -p $PORT -a 0.0.0.0