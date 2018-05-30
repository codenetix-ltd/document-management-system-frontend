build:
	docker-compose -f docker-compose.yml build

push:
	docker-compose -f docker-compose.yml push

up:
	docker-compose -f docker-compose.yml up -d