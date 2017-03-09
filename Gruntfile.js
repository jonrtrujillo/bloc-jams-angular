module.exports = function(grunt) {
    grunt.registerTask('default', 'Testing out Grunt logging and task callbacks', function() {
        grunt.log.writeln('This is our first Grunt task!');
        });
    };