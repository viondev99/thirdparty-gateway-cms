# Stage 1: Building the code
FROM node:16-alpine as builder

ENV PORT=80
WORKDIR /app

COPY package.json ./

RUN npm install -f


COPY . .
RUN npm run build

EXPOSE 80
CMD ["npm", "run", "start"]