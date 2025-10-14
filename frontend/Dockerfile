#Building of Image

FROM node:alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

#Running the build

FROM node:alpine
COPY --from=builder /app ./
EXPOSE 3000
CMD ["npm","start"]

