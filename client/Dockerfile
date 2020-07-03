FROM node:slim

RUN yarn global add nodemon@1.11.0 serve
RUN mkdir -p /usr/src/app
ADD .yarn_cache /usr/local/share/.cache/yarn/v1/
ADD ./package.json ./yarn.* /tmp/
RUN cd /tmp && yarn
RUN cd /usr/src/app && ln -s /tmp/node_modules 
ADD . /usr/src/app/

EXPOSE 80/tcp
WORKDIR /usr/src/app

RUN ["yarn", "build"]

CMD ["serve", "-s","build"]