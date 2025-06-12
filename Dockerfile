
# Multi-stage Dockerfile for the full ticketing system

# Frontend (Next.js) build stage
FROM node:18-alpine as frontend-builder
WORKDIR /app/frontend

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy source code and build
COPY . .
RUN npm run build

# Backend (Go) build stage
FROM golang:1.21-alpine as backend-builder
WORKDIR /app/backend

# Install dependencies
RUN apk add --no-cache git

# Copy go mod files (will be created later)
COPY backend/go.mod backend/go.sum ./
RUN go mod download

# Copy source code and build
COPY backend/ .
RUN CGO_ENABLED=0 GOOS=linux go build -o ticketing-api ./cmd/api

# Production stage
FROM alpine:latest
RUN apk --no-cache add ca-certificates tzdata
WORKDIR /root/

# Copy backend binary
COPY --from=backend-builder /app/backend/ticketing-api .

# Copy frontend build (will serve as static files)
COPY --from=frontend-builder /app/frontend/dist ./public

# Create directories for tickets and logs
RUN mkdir -p /var/lib/ticketing/{tickets,logs}

# Expose ports
EXPOSE 8080 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/health || exit 1

# Start both services (in production you'd use docker-compose)
CMD ["./ticketing-api"]
