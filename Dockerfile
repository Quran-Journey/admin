FROM node:12.19.0

ENV BACKEND_PORT=3002

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

CMD ["node", "index.js"]