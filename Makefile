install: install-deps
	
install-deps:
	yarn install

test:
	yarn test

lint:
	npx eslint .

publish:
	npm publish

test-coverage:
	yarn test -- --coverage --coverageProvider=v8

.PHONY: test
