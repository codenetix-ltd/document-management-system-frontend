FROM nginx:alpine

WORKDIR /var/www/html

COPY dist ./dist
COPY dockerfiles ./dockerfiles

RUN cp ./dockerfiles/nginx.conf /etc/nginx/nginx.conf && \
    cp ./dockerfiles/site.conf /etc/nginx/conf.d/site.conf && \
    rm /etc/nginx/conf.d/default.conf && \
    rm -r ./dockerfiles/nginx.conf && \
    rm -r ./dockerfiles/site.conf

RUN adduser -D -u 1000 codenetix

RUN chmod +x dockerfiles/entry.sh

ENTRYPOINT ["./dockerfiles/entry.sh"]
