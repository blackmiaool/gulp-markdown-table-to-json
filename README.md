# gulp-markdown-table-to-json 

[![NPM version][npm-image]][npm-url]

> A github-style-markdown table parse plugin for gulp 3

## Usage

First, install `gulp-markdown-table-to-json` as a development dependency:

```shell
npm install --save-dev gulp-markdown-table-to-json
```

Then, add it to your `gulpfile.js`:

### Write Some Tables in Markdown File

###### boys

name | age| grade 
-----|----|-----
John|11|3
Bob|13|4

###### girls

name | age| grade | 
-----|----|-----
Petra|15|8
Olivia|14|7

#### source code

```markdown
###### boys

name | age| grade 
-----|----|-----
John|11|3
Bob|13|4

###### girls

name | age| grade | 
-----|----|-----
Petra|15|8
Olivia|14|7
```

### Get Json

```javascript
const md2json = require('gulp-markdown-table-to-json');

gulp.task('md2json', function(){
  gulp.src('README.md')
    .pipe(md2json())
    .pipe(gulp.dest('.'));
});
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

### md2json(anchor)

#### anchor

Type: `String`

The string to search for table title. Default is "######".

[npm-url]: https://npmjs.org/package/gulp-markdown-table-to-json
[npm-image]: http://img.shields.io/npm/v/gulp-markdown-table-to-json.svg
