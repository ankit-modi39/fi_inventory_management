FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# # Second stage - just copy the build output
# FROM alpine:latest
# WORKDIR /app
# COPY --from=builder /app/build ./static

# # Just sleep to keep container alive for volume mounting
# CMD ["sleep", "infinity"]