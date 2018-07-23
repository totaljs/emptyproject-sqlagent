// This script is for testing of this emptyproject
require('total.js');

var hostname = 'http://127.0.0.1:8000';
var tasks = [];
var userid;

tasks.push(function(next) {
	// INSERT USER
	RESTBuilder.make(function(builder) {
		builder.url(hostname + '/api/users/');
		builder.post({ name: 'Peter Sirka' });
		builder.exec(function(err, response) {
			console.log('INSERT:', response);
			console.log('------------------------------------------------------------');
			setTimeout(next, 1000);
		});
	});
});

tasks.push(function(next) {
	// LIST OF USERS
	RESTBuilder.make(function(builder) {
		builder.url(hostname + '/api/users/');
		builder.exec(function(err, response) {
			console.log('QUERY:', response);
			console.log('------------------------------------------------------------');
			userid = response.items[0].id;
			setTimeout(next, 1000);
		});
	});
});

tasks.push(function(next) {
	// UPDATE USER
	RESTBuilder.make(function(builder) {
		builder.url(hostname + '/api/users/');
		builder.put({ id: userid, name: 'Total Peter' });
		builder.exec(function(err, response) {
			console.log('UPDATE:', response);
			console.log('------------------------------------------------------------');
			setTimeout(next, 1000);
		});
	});
});

tasks.push(function(next) {
	// LIST OF USERS
	RESTBuilder.make(function(builder) {
		builder.url(hostname + '/api/users/');
		builder.exec(function(err, response) {
			console.log('QUERY:', response);
			console.log('------------------------------------------------------------');
			setTimeout(next, 1000);
		});
	});
});

tasks.push(function(next) {
	// REMOVE USER
	RESTBuilder.make(function(builder) {
		builder.url(hostname + '/api/users/{0}/'.format(userid));
		builder.delete();
		builder.exec(function(err, response) {
			console.log('REMOVE:', response);
			console.log('------------------------------------------------------------');
			setTimeout(next, 1000);
		});
	});
});

tasks.push(function(next) {
	// LIST OF USERS
	RESTBuilder.make(function(builder) {
		builder.url(hostname + '/api/users/');
		builder.exec(function(err, response) {
			console.log('QUERY:', response);
			console.log('------------------------------------------------------------');
			setTimeout(next, 1000);
		});
	});
});

console.log();
tasks.async(() => console.log('DONE'));