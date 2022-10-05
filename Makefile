process: migrate
	@node -r dotenv/config lib/processor.js


build:
	@npm run build


serve:
	@npx squid-graphql-server


migrate:
	@npx squid-typeorm-migration apply


migration:
	@npx squid-typeorm-migration generate


codegen:
	@npx squid-typeorm-codegen


typegen:
	@npx squid-substrate-typegen typegen.json

archive-up:
	@docker-compose -f docker-compose.archive.yml up

squiddb-up:
	@docker-compose -f docker-compose.squiddb.yml up

up:
	@docker-compose -f docker-compose.archive.yml \
			-f docker-compose.squiddb.yml \
	up

down:
	@docker-compose -f docker-compose.archive.yml \
			-f docker-compose.squiddb.yml \
	down

.PHONY: build serve process migrate codegen typegen archive-up squiddb-up up down
