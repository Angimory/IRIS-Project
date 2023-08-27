FROM node:alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8001
CMD [ "npm","start" ]
#To build: docker build -t react-app .
#Run the docker image: docker run -p 8001:8001 react-app
