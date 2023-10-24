FROM node:18

WORKDIR /app

VOLUME [ "/uploads" ]

RUN mkdir /uploads
RUN mkdir /uploads/imgs
RUN mkdir /uploads/videos

COPY package*.json ./

RUN npm install

COPY . .


EXPOSE 3000

CMD npm run build && npm run start:dev