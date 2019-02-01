const {
    pipe,
    map,
    filter,
    complement,
    trim,
    isEmpty,
    split,
    curry,
    test,
    and,
    isNil,
    either,
    both,
    match,
    nth,
    reduce,
    addIndex,
    zipObj
} = require('ramda');

const assert = curry(function (cond, msg) {
    if (!cond) {
        throw new Error(msg);
    }
});

const getContentItems = pipe(
    map(trim),
    filter()(complement(isEmpty)));


const getContentSplitWith = curry(function (splitter, text) {
    return pipe(
        split(splitter),
        getContentItems)(text);
});

const splitOneTableLine = getContentSplitWith('|');

const hasContent = complement(either(isEmpty, isNil));
const isReallyEmpty = either(isEmpty, isNil);

function handle(text, tableMarker) {
    //filter empty lines and space lines
    const lines = getContentSplitWith('\n')(text);

    let line = "";
    const readLine = (function () {
        let lineIndex = 0;
        return function () {
            return lines[lineIndex++];
        }
    })();

    const root = {};
    line = readLine();

    //each loop find one table
    while (true) {
        const rows = [];

        const hasTableMarket = test(tableMarker);
        //find anchor
        while (both(hasContent, complement(hasTableMarket))(line)) {
            line = readLine();
        }

        if (isReallyEmpty(line)) {
            break;
        }
        //find table name
        const tableName = pipe(match(tableMarker), nth(1), trim)(line);
        line = readLine()
        assert(Boolean(line))("markdown expect table content");

        //find table header
        const columnNames = splitOneTableLine(line);

        assert(hasContent(columnNames))("markdown expect column title");

        //pass |--|--|--| line
        line = readLine();
        assert(Boolean(line))("markdown expect table spliter");

        //find table content
        line = readLine();
        while (both(hasContent, test(/\|/))(line)) {
            rows.push(splitOneTableLine(line));
            line = readLine()
        }

        //write the table into root
        root[tableName] = map(zipObj(columnNames))(rows);
    }
    return root;
}
module.exports = handle;
