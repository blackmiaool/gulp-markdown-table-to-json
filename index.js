var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

// Consts
const PLUGIN_NAME = 'gulp-markdown-table-to-json';

function prefixStream(prefixText) {
    var stream = through();
    stream.write(prefixText);
    return stream;
}
function md_trim(str) {
    return str.replace(/(^\s+)|(\s+$)/g, "");
}
function handle(text) {
    var lines = text.split("\n");
    var cur_line = 0;
    var line = ""
    var table_name = "";
    var col_num = 0;
    var cols = [];
    var rows = [];
    //    console.log("md handle")

    function read_line() {
        return lines[cur_line++];
    }
    var root={};
    while (true) {
        var cols = [];
        var rows = [];
        //        console.log("cur_line", cur_line)
        while (line.indexOf("######") == -1 && cur_line != lines.length) {
            line = read_line();
        }
        if (cur_line == lines.length) {
            break;
        }
        table_name = line.split("######")[1];
        table_name = md_trim(table_name)
            //        console.log(line)
            //        console.log(table_name)

        line = read_line()

        if (line) {
            line = line.split("|")
            for (var j in line) {

                line[j] = md_trim(line[j])
                if ((j == 0 || j == line.length - 1) && line[j] === "") {

                } else {
                    cols.push(line[j]);
                }
                //  console.log(line[j])
            }
            if (line.length) {
                cols = line;
                rows.push(cols)
                    //                console.log(rows);
            } else {
                console.error("markdown expect column title")
                break;
            }
        } else {
            console.error("markdown expect table content")
            break;
        }

        line = read_line()

        if (line) {

        } else {
            console.error("markdown expect table spliter")
            break;
        }
        line = read_line()
        while (line.indexOf("|") != -1 && cur_line != lines.length) {

            var line_this = line.split("|")
            var row = []
            for (var j in line_this) {
                line_this[j] = md_trim(line_this[j])
                if ((j == 0 || j == line_this.length - 1) && line_this[j] === "") {

                } else {
                    row.push(line_this[j]);
                    //                     console.log(line_this[j])
                }

            }
            rows.push(row);
            line = read_line()
        }
        //        console.log(rows)
        eval(table_name + "=" + "[]");
        var data;
        eval("data=" + table_name + ";");

        for (var j in rows) {
            if (j != 0) {
                var ele = {};
                //                console.log(rows[j])
                for (var k in rows[j]) {
                    ele[rows[0][k]] = rows[j][k];
                }
                // console.log(ele);
                data.push(ele);
            }

        }
        root[table_name]=data;
    }
    console.log(JSON.stringify(root))
    return JSON.stringify(root);
}
// Plugin level function(dealing with files)
function gulpPrefixer(prefixText) {

    if (!prefixText) {
        throw new PluginError(PLUGIN_NAME, 'Missing prefix text!');
    }
    prefixText = new Buffer(prefixText); // allocate ahead of time

    // Creating a stream through which each file will pass
    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            // return empty file
            return cb(null, file);
        }
        if (file.isBuffer()) {
            console.log("buffer")
//            console.dir(file.contents.toString());
            
            file.contents = new Buffer(handle(file.contents.toString()))
        }
        if (file.isStream()) {
            console.log("steam")
            file.contents = file.contents.pipe(prefixStream(prefixText));
        }

        cb(null, file);

    });

}

// Exporting the plugin main function
module.exports = gulpPrefixer;