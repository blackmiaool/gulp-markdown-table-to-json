function mdTrim(str) {
    return str.replace(/(^\s+)|(\s+$)/g, "");
}

function assert(cond, msg) {
    if (!cond) {
        throw new Error(msg);
    }
}

function splitTableLine(line) {
    return line.split("|")
        .map(a => a.trim())
        .filter(a => a)
}

function handle(text, tableMarker) {
    //filter empty lines and space lines
    const lines = text.split("\n").filter(line => line && line !== '' && !/^ *$/.test(line));

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
        let cols = [];
        const rows = [];

        //find anchor
        while (line && !tableMarker.test(line)) {
            line = readLine();
        }

        if (!line) {
            break;
        }
        //find table name
        const tableName = line.split(tableMarker)[1].trim();

        line = readLine()
        assert(Boolean(line), "markdown expect table content");

        //find table header
        cols = splitTableLine(line);

        assert(cols.length > 0, "markdown expect column title");

        rows.push(cols)
        //pass |--|--|--| line
        line = readLine();
        assert(Boolean(line), "markdown expect table spliter");

        //find table content
        line = readLine();
        while (line !== undefined && line.indexOf("|") != -1) {
            rows.push(splitTableLine(line));
            line = readLine()
        }

        //write the table into root
        root[tableName] = rows.slice(1).map((row) =>
            row.reduce((data, cell, i) => {
                const columnName=rows[0][i];
                data[columnName] = cell;
                return data;
            }, {})
        );
    }
    return root;
}
module.exports = handle;
