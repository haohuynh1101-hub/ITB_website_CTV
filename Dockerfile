FROM node:14.15.5

# Install yarrn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

WORKDIR /usr/src/app

# install package
COPY yarn.lock .
COPY package.json .
RUN yarn install

COPY . .
RUN yarn build

EXPOSE 5555
CMD [ "yarn", "start" ]
