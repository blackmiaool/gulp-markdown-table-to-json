# gulp-markdown-table-to-json
[![NPM version][npm-image]][npm-url]
> A github-style-markdown table parse plugin for gulp 3/4  

Special thanks to [noraj](https://github.com/noraj)

## Usage

First, install `gulp-markdown-table-to-json` as a development dependency:

```shell
npm install --save-dev gulp-markdown-table-to-json
```

Then, add it to your `gulpfile.js`:

### Write Some Tables in Markdown File

### Boys Table
<!-- table2json:boys -->
name | age| grade 
-----|----|-----
John|11|3
Bob|13|4

### Girls Table
<!-- table2json:girls -->
name | age| grade | 
-----|----|-----
Petra|15|8
Olivia|14|7

#### source code

```markdown
### Boys Table
<!-- table2json:boys -->
name | age| grade 
-----|----|-----
John|11|3
Bob|13|4

### Girls Table
<!-- table2json:girls -->
name | age| grade | 
-----|----|-----
Petra|15|8
Olivia|14|7
```

### Get Json

Gulp 3:

```javascript
const md2json = require('gulp-markdown-table-to-json');

gulp.task('md2json', function(){
  gulp.src('README.md')
    .pipe(md2json())
    .pipe(gulp.dest('.'));
});
```

Gulp 4:

```javascript
const { src, dest, task} = require('gulp');
const md2json = require('gulp-markdown-table-to-json');

task(m2j);
m2j.description = 'Markdown table to JSON';
function m2j() {
  return src('index.md')
    .pipe(md2json())
    .pipe(dest('.'));
};
```

Then you will get a json file named README.json with the following content:

```json
{"boys":[{"name":"John","age":"11","grade":"3"},{"name":"Bob","age":"13","grade":"4"}],"girls":[{"name":"Petra","age":"15","grade":"8"},{"name":"Olivia","age":"14","grade":"7"}]}
```

You can also use "gulp-beautify" to beautify it:

```json
{
    "boys": [{
        "name": "John",
        "age": "11",
        "grade": "3"
    }, {
        "name": "Bob",
        "age": "13",
        "grade": "4"
    }],
    "girls": [{
        "name": "Petra",
        "age": "15",
        "grade": "8"
    }, {
        "name": "Olivia",
        "age": "14",
        "grade": "7"
    }]
}
```

## API

### md2json(tableMarker)

#### tableMarker

Type: `RegExp`

The RegExp to search for table title. Default is `/<!-- *table2json:([^ -]+) *-->/`.

[npm-url]: https://npmjs.org/package/gulp-markdown-table-to-json
[npm-image]: http://img.shields.io/npm/v/gulp-markdown-table-to-json.svg
