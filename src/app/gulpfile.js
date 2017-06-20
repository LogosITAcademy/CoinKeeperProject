
var gulp = require('gulp'),
	less = require('gulp-less');
	
gulp.task('less', function(){
    return gulp.src('public/style/less/**/*.less') 
        .pipe(less())
        .pipe(gulp.dest('public/style/css'))
});

gulp.task('watch', function() {
    gulp.watch('public/style/less/**/*.less', ['less']); 
});


