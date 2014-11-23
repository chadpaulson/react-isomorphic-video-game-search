rm public/js/behavior.js
rm -r -f react/build
jsx --extension jsx react/src react/build
browserify react/build/app.js -o public/js/behavior.js
