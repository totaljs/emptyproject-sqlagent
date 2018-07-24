NEWSCHEMA('User', function(schema) {

	schema.define('id', 'UID');
	schema.define('name', 'String(50)', true);

	// "id" must be required when the operation is update
	schema.required('id', (model, op) => op.update);

	schema.setQuery(function($) {

		var sql = $.DB();

		sql.listing('users', 'tbl_user').make(function(builder) {
			builder.page($.query.page || 1, 20);
			builder.where('removed', false);
		});

		sql.exec(function(err, response) {
			// Error handling is performed automatically
			$.callback(response.users);
		});

	});

	schema.setInsert(function($) {
		var sql = $.DB();
		var model = $.clean();
		model.id = UID();
		model.created = NOW;
		sql.insert('tbl_user').set(model);
		sql.exec($.done());
	});

	schema.setUpdate(function($) {
		var sql = $.DB();
		var model = $.clean();

		sql.update('update', 'tbl_user').make(function(builder) {
			model.updated = NOW;
			builder.set(model);
			builder.where('id', model.id);
			builder.where('removed', false);
		});

		sql.exec($.done(true), 'update');
	});

	schema.setRemove(function($) {

		var sql = $.DB();

		sql.update('update', 'tbl_user').make(function(builder) {
			builder.set('removed', true);
			builder.set('updated', NOW);
			builder.where('id', $.id || $.options.id);
			builder.where('removed', false);
		});

		sql.exec($.done(true), 'update');
	});

});