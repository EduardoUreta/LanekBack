FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN apk add --no-cache make gcc g++ python3
RUN npm install
COPY . .

# ARG DATABASE_URL
# ENV DATABASE_URL=${DATABASE_URL}

# RUN npx prisma generate
# RUN npx prisma migrate deploy
# RUN npm run build

EXPOSE 5090
CMD ["npm", "run", "start:prod"]