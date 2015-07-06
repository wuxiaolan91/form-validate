var path = {
	dev:{
		html:"/*.html",
		js:"js/*.js",
		css:"css/*.css"
	},dest:{
		html:"./build/",
		js:"build/js",
		css:"build/css"
	}
}
var gulp = require('gulp'),
	watch = require("gulp-watch"),
	htmlmin = require("gulp-minify-html"),
	uglify = require('gulp-uglify'),
	assetRev = require("gulp-asset-rev"),
	rev = require("gulp-rev"),
	concat = require('gulp-concat'),
	md5 = require("gulp-md5-assets"),
	clean = require("gulp-clean"),
	csso = require("gulp-csso"),
	revCollector = require("gulp-rev-collector"),
	jshint = require('gulp-jshint');

gulp.task("clean",function(){
	return gulp.src(["build","rev"],{read:false})
		.pipe(clean());
})
//监视
gulp.task("watch",function(){
	watch("js/*.js",function(){
		console.log("变化啦")
	})
})

gulp.task("concat",function(){
	return gulp.src(["js/zepto.js","js/validateForm.js"])
		.pipe(concat())
		.pipe( gulp.dest("build/js/all.js"))

})
gulp.task('minify', function() {
  return gulp.src(path.dev.html)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(path.dest.html)
});

gulp.task("css",["clean"],function(){
	gulp.src("css/*.css")
	// .pipe(csso())
	.pipe(rev())
	.pipe(gulp.dest(path.dest.css))
	.pipe( rev.manifest() )
	.pipe( gulp.dest( "rev/css" ) );
})

gulp.task("js",function(){
	return gulp.src(path.dev.js)
	.pipe();
})
gulp.task('lint', function() {
  return gulp.src(path.dev.js)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('jsmin', function() {
  return gulp.src(path.dev.js)
    .pipe(uglify())
    .pipe( gulp.dest( path.dest.js) );
});

gulp.task('scripts',["clean"],function () {
    return gulp.src(path.dev.js)
        .pipe( rev() )
        .pipe( gulp.dest(path.dest.js) )
        .pipe( rev.manifest() )
        .pipe( gulp.dest( 'rev/js' ) );
});



gulp.task('rev',function() {
  
    /*gulp.src(path.dev.html)
    	.pipe(assetRev())
    	.pipe(gulp.dest("build/js"));*/
    return gulp.src(["rev/**/*.json","./*.html"])
	    .pipe(revCollector({
	    	replaceReved:true
	    }))
    	.pipe( gulp.dest("build/") );
    
});

gulp.task('srev',["clean","css","scripts"],function() {
  	gulp.src("./*.html")
	.pipe(assetRev({
		hashLen:10
	}))
	.pipe(gulp.dest(path.dest.html));
});

gulp.task('concat',["clean"],function () {
    gulp.src(path.dev.js)
        .pipe(concat('all.js'))//合并后的文件名
        .pipe(gulp.dest(path.dest.js));
});


gulp.task("md5",function(){
	gulp.src("js/*")
	.pipe(md5(10,"./*.html"))
	.pipe(gulp.dest("./build"));
})

gulp.task("default",["clean"]);
gulp.task("build",["clean","css","clean","scripts","srev"]);