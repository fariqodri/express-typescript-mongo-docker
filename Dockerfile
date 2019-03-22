FROM node:10 

WORKDIR /app

COPY package.json package.json

RUN npm install

COPY . .

EXPOSE 7000

CMD [ "npm", "run", "dev" ]
