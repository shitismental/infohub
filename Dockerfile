FROM alpine AS builder

WORKDIR /app

COPY . .

RUN apk --no-cache add npm nodejs

RUN npm install; npm run vercel-build

FROM nginx:alpine

# COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/web-build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
