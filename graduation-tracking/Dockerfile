FROM node

WORKDIR /app/graduation-tracking

COPY package.json .

RUN npm install

COPY . .

EXPOSE 7003

CMD ["npm", "start"]