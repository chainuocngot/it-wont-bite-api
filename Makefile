gen:
ifndef name
	$(error You must provide the `name` parameter)
endif
	npx nest g mo routes/$(name)
	npx nest g co routes/$(name) --no-spec
	npx nest g s routes/$(name) --no-spec
	touch src/routes/$(name)/$(name).model.ts
	touch src/routes/$(name)/$(name).dto.ts
	touch src/routes/$(name)/$(name).error.ts