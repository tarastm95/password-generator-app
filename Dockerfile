FROM node:18.19-alpine AS builder

WORKDIR /app

RUN npm install -g @angular/cli@latest

COPY package*.json ./
RUN npm install

COPY proxy.conf.json ./

COPY . .

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200", "--poll", "2000", "--proxy-config", "proxy.conf.json"]
