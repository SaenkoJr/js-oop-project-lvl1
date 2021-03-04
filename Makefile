install: install-deps
	
install-deps:
	yarn install

test:
	yarn test

lint:
	npx eslint .

publish:
	npm publish

.PHONY: test
