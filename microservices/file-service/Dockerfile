FROM eoan
ENV NODE_ENV production
WORKDIR /home
COPY ./ usr/src/app
RUN sudo apt install nginx \
  # Install nodejs
  && sudo apt install nodejs \
  # Install npm
  && sudo apt install npm
EXPOSE 80 8080
CMD echo some string
