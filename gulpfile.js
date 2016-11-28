var express = require('express');
var gulp = require('gulp');
var webpack = require("webpack");

gulp.task('start-backend', function () {
    var app = express();
    app.use(express.static('data'));
    app.listen(4000);
});

gulp.task('default', ['start-backend']);
