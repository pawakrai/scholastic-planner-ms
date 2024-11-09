FROM node

WORKDIR /app/notification

COPY package.json .

RUN npm install

COPY . .

EXPOSE 7004

CMD ["npm", "start"]