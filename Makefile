bundle:
	@echo "Files and directories are bundled..."
	touch bundle.tar.gz
	tar -czvf bundle.tar.gz \
	--exclude=./.git \
	--exclude=./.circleci \
	--exclude=./.vscode \
	--exclude=./build \
	--exclude=./client \
	--exclude=./coverage \
	--exclude=./server \
	--exclude=./src \
	--exclude=./.browserslistrc \
	--exclude=./.env.dist \
	--exclude=./.eslintignore \
	--exclude=./.eslintrc.js \
	--exclude=./.gitattributes \
	--exclude=./.gitignore \
	--exclude=./bundle.tar.gz \
	--exclude=./jest.config.js \
	--exclude=./jest.mockFile.js \
	--exclude=./jest.setupTests.js \
	--exclude=./LICENCE \
	--exclude=./Makefile \
	--exclude=./postcss.config.js \
	--exclude=./package.json \
	--exclude=./package-lock.json \
	--exclude=./prettier.config.js \
	--exclude=./README.md \
	--exclude=./stylelint.config.js \
	--exclude=./tsconfig.json \
	.
