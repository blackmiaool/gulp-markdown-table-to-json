const through = require('through2');
const gutil = require('gulp-util');
const PluginError = gutil.PluginError;
const handle = require("./handle");
// Consts
const PLUGIN_NAME = 'gulp-markdown-table-to-json';




// Plugin level function(dealing with files)
function gulpMarkdownTableToJson(anchorText) {

    if (!anchorText) {
        anchorText = "######";
    }
    // Creating a stream through which each file will pass
    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            // return empty file
            return cb(null, file);
        }
        if (file.isBuffer()) {
            file.contents = new Buffer(JSON.stringify(handle(file.contents.toString(), anchorText)));
            file.path = gutil.replaceExtension(file.path, '.json');
        }
        if (file.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
            return cb();
        }

        cb(null, file);

    });

}

// Exporting the plugin main function
module.exports = gulpMarkdownTableToJson;
