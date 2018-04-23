FROM nginx:alpine

WORKDIR /var/www/html

COPY . .

RUN cp ./dockerfiles/nginx.conf /etc/nginx/nginx.conf && \
    cp ./dockerfiles/site.conf /etc/nginx/conf.d/site.conf && \
    rm /etc/nginx/conf.d/default.conf

RUN adduser -D -u 1000 codenetix

RUN chmod +x dockerfiles/entry.sh

RUN npm install
