# gulp-markdown-table-to-json 
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

Save the in your README.md file.
### Get Json
```javascript
var md2json = require('gulp-markdown-table-to-json');

gulp.task('md2json', function(){
  gulp.src('README.md')
    .pipe(md2json())
    .pipe(gulp.dest('.'));
});
```

Then you will get a json file named README.json with following content:
```json
{"boys":[{"name":"John","age":"11","grade":"3"},{"name":"Bob","age":"13","grade":"4"}],"girls":[{"name":"Petra","age":"15","grade":"8"},{"name":"Olivia","age":"14","grade":"7"}]}
```
If you want to beautify it, you can use the gulp plugin "gulp-beautify". And you will get the following content:
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
