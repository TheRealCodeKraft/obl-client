FROM ubuntu:14.04

RUN apt-get update && apt-get install -y \
  curl \
  git

RUN curl -sSo /usr/local/bin/n https://raw.githubusercontent.com/visionmedia/n/master/bin/n
RUN chmod +x /usr/local/bin/n
RUN n stable

RUN mkdir -p /app
WORKDIR /app

COPY package.json ./
RUN npm install

RUN mkdir -p /codekraft/lib
WORKDIR /codekraft/lib
ADD https://raw.githubusercontent.com/TheRealCodeKraft/codekraft-react-frontend/master/package.json ./
RUN npm link

WORKDIR /app
RUN npm link codekraft-react-frontend
CMD ["npm", "start"]
