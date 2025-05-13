FROM node:20-alpine

WORKDIR /app

RUN npm install -g serve

COPY package*.json ./

RUN npm install --frozen-lockfile

COPY . .

RUN npm run build

EXPOSE 3000

CMD npm run preview