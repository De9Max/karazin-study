FROM node:latest as build
WORKDIR /frontend
ENV PATH /frontend/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent

COPY . /frontend/

RUN npm run build

CMD [ "npm", "run", "preview" ]