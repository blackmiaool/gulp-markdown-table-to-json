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
    zipObj,
    splitWhen,
    head,
    fromPairs,
    forEach
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
const splitOn = curry(function (pred, list) {
    let idx = 0;
    const len = list.length;
    let lastArray = [];
    const ret = [];

    while (idx < len) {
        const value = list[idx++];
        if (pred(value)) {
            lastArray = [value];
            ret.push(lastArray);
        } else {
            lastArray.push(value);
        }
    }

    return ret;
});
const testSplitter=test(/\|/);
const splitOneTableLine = getContentSplitWith('|');

function handle(text, tableMarker) {
    //filter empty lines and space lines
    const lines = split('\n')(text);

    
    //get table blocks
    const blocks = splitOn(test(tableMarker), lines)
        .map(pipe(addIndex(splitWhen)((v, i) => {
            return and(i > 2 , complement(testSplitter)(v))
        }), head));
    
    forEach((block)=>{
        assert(testSplitter(block[1]))("markdown expect column names");
        assert(testSplitter(block[2]))("markdown expect table spliter(|---|---|)");
    })(blocks);

    const findTableName = pipe(match(tableMarker), nth(1), trim);

    const root = fromPairs(map((block) => {
        //find table header
        const columnNames = splitOneTableLine(block[1]);

        //find table content
        rows = block.slice(3).map(splitOneTableLine);

        //combine rows with columnNames
        return [pipe(head, findTableName)(block), map(zipObj(columnNames))(rows)];
    })(blocks));

    return root;
}
module.exports = handle;
