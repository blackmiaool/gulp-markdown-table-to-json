function mdTrim(str) {
    return str.replace(/(^\s+)|(\s+$)/g, "");
}

function handle(text, anchor) {
    const lines = text.split("\n");
    let cur_line = 0;
    let line = ""
    let table_name = "";
    let col_num = 0;
    const cols = [];
    const rows = [];

    function read_line() {
        const ret = lines[cur_line++];
        if (ret === "" || ret && ret.match(/^ *$/)) {
            return read_line();
        }
        return ret;
    }
    const root = {};
    while (true) {
        let cols = [];
        const rows = [];
        while (line !== undefined && line.indexOf(anchor) == -1 && cur_line != lines.length) {
            line = read_line();
        }
        if (!line) {
            break;
        }
        if (cur_line === lines.length) {
            break;
        }
        table_name = line.split(anchor)[1].trim();

        line = read_line()

        if (line) {
            line = line.split("|")
            for (const j in line) {

                line[j] = mdTrim(line[j])
                if ((j == 0 || j == line.length - 1) && line[j] === "") {

                } else {
                    cols.push(line[j]);
                }
            }
            if (line.length) {
                cols = line;
                rows.push(cols)
            } else {
                console.error("markdown expect column title")
                break;
            }
        } else {
            console.error("markdown expect table content")
            break;
        }

        line = read_line();

        if (line) {

        } else {
            console.error("markdown expect table spliter")
            break;
        }
        line = read_line();
        while (line !== undefined && line.indexOf("|") != -1 && cur_line != lines.length + 1) {

            const line_this = line.split("|")
            const row = []
            for (const j in line_this) {
                line_this[j] = mdTrim(line_this[j])
                if ((j == 0 || j == line_this.length - 1) && line_this[j] === "") {

                } else {
                    row.push(line_this[j]);
                }

            }
            rows.push(row);
            line = read_line()
        }

        const data = [];
        for (const j in rows) {
            if (j != 0) {
                const ele = {};
                for (const k in rows[j]) {
                    ele[rows[0][k]] = rows[j][k];
                }
                data.push(ele);
            }
        }
        root[table_name] = data;
    }
    return root;
}
module.exports = handle;
