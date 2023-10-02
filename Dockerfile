FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# RUN npm run prisma:generate
# RUN npm run prisma:migrate

EXPOSE 3000

CMD npm run build && npm run start:dev