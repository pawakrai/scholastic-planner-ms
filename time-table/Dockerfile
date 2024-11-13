FROM node

WORKDIR /app/time-table

COPY package.json .

RUN npm install

COPY . .

EXPOSE 7005

CMD ["npm", "start"]