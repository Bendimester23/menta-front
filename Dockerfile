FROM node:16

WORKDIR /app
ADD . /app/

ENV MODE prod

RUN yarn
RUN yarn build

ENV HOST 0.0.0.0

CMD [ "yarn", "start" ]