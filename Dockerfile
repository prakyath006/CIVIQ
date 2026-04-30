FROM node:20-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --production=false
COPY . .
# VITE_GEMINI_API_KEY is set via --set-build-env-vars at deploy time
RUN npm run build

FROM node:20-slim
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/server.js ./
COPY --from=build /app/package.json ./
EXPOSE 8080
ENV PORT=8080
CMD ["node", "server.js"]
