# Stage 1

FROM node:20

WORKDIR /src

COPY package.json ./

RUN npm cache clean -f 

RUN npm install -g

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm","run","start"]
