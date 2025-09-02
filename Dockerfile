# ===== Builder =====
FROM node:20-alpine AS builder
WORKDIR /app

# 1) Ставим зависимости
COPY package*.json ./
RUN npm ci

# 2) Копируем исходники
COPY . .

# 3) На всякий случай чиним права .bin (фиксирует "Permission denied")
RUN find node_modules/.bin -type f -exec chmod +x {} \;

# 4) Сборка
RUN npm run build

# ===== Runtime (статическая выдача) =====
FROM nginx:1.27-alpine AS runner
# Если у вас Vite SPA, собранный фронт лежит в dist
COPY --from=builder /app/dist /usr/share/nginx/html

# По желанию: свой nginx.conf
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
