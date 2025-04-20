FROM node:lts-buster

RUN apt-get update && \
    apt-get install -y \
    git \
    ffmpeg \
    imagemagick \
    webp && \
    apt install iputils-ping -y && \
    apt install zip -y && \
    apt-get upgrade -y && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY package.json .
RUN npm install 
RUN npm install pm2@latest -g

COPY . .

ENV PM2_PUBLIC_KEY zs2x51az526f5bw
ENV PM2_SECRET_KEY rt2vcgbta1s3vd9

CMD ["npm", "start"]
