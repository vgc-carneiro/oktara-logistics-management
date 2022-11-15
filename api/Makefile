setup:
	docker volume create api-logistics-manager-nodemodules
install:
	docker-compose -f docker-compose.builder.yml run --rm install
dev:
	docker-compose -f docker-compose.dev.yml up
tests:
	docker-compose -f docker-compose.test.yml up
cover:
	docker-compose -f docker-compose.test.cov.yml up