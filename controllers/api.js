exports.install = function() {
	// API
	ROUTE('GET     /api/users/        *User --> @query');
	ROUTE('POST    /api/users/        *User --> @insert');
	ROUTE('PUT     /api/users/        *User --> @update');
	ROUTE('DELETE  /api/users/{id}/   *User --> @remove');

	// Enables CORS
	CORS();
};