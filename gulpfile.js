const { watch, series, dest, src } = require('gulp');

//css y sass
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');

//imagenes
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');


function execute(done) {
    src('./src/scss/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('./build/css'))
    done();
}
function imagenes() {
    return src('./src/img/**/*')
        .pipe(imagemin({ optimizationLevel: 3 }))
        .pipe(dest('./build/img'));
}
function imgWebp(done) {
    const opciones = {
        quality: 50,
    };
    src('./src/img/**/*.{png,jpg}')
        .pipe(webp(opciones))
        .pipe(dest('./build/img'));

    done();
}
function imgAvif(done) {
    const opciones = {
        quality: 50,
    };
    src('./src/img/**/*.{png,jpg}')
        .pipe(avif(opciones))
        .pipe(dest('./build/img'));

    done();
}
function dev() {
    watch('./src/scss/**/*.scss', execute);
    watch('./src/img/**/*', imagenes);
}


exports.execute = execute;
exports.dev = dev;
exports.imagenes = imagenes;
exports.imgWebp = imgWebp;
exports.imgAvif = imgAvif;
exports.default = series(imagenes, imgWebp, imgAvif, execute, dev);

