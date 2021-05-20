const table_names = require("./tables_info/table_names");
const db = require('./db_model')
const tables = require('./tables_info/tables')

class UserController {

    async getAvailableTables(req, res) {
        try {
            res.json({ available_tables: table_names });
        } catch (error) {
            res.json({
                type: 'error',
                text: `Возникла ошибка. Подробнее:\n${error}`,
                duration: Infinity,
            });
        }
    }

    async getTableData(req, res) {
        try {
            const {table_name} = req.query;
            console.log({table_name});
            const table_data = await db.query(`select * from ${table_name}`);
            const table_description = tables[table_name] || {};
            const keys = table_description["key"] || [];
            const formatted_data = table_data["rows"].map((row) => {
                let new_row = {};
                Object.keys(row).forEach((key) => {
                    new_row = {
                        ...new_row,
                        [key]: row[key]
                    };
                });
                let keyObj = {};
                keys.forEach((key_name) => {
                    keyObj = {
                        ...keyObj,
                        [key_name]: row[key_name],
                    }
                });
                new_row = {
                    ...new_row,
                    key: keyObj,
                }
                return new_row;
            });
            //console.log(formatted_data);
            res.json({
                table_data: {
                    ...table_description,
                    data: formatted_data
                }
            });
        } catch (error) {
            res.json({
                type: 'error',
                text: `Возникла ошибка. Подробнее:\n${error}`,
                duration: Infinity,
            });
        }
    }

    async removeRows(req, res) {
        try {
            const {table_name, keys} = req.body;
            console.log({table_name, keys});
            const queries = keys.map((key) => {
                let queryFilter = " where ";
                const keyKeys = Object.keys(key);
                for (let i = 0; i < keyKeys.length; i++) {
                    const keyName = keyKeys[i];
                    queryFilter = queryFilter + `${keyName}=${key[keyName]}${
                      i + 1 < keyKeys.length ? " and " : ""
                    }`;
                }
                return `delete from ${table_name}` + queryFilter;
            });
            console.log({queries});

            for (let i = 0; i < queries.length; i++) {
                await db.query(queries[i]);
            }
            res.json({
                type: 'success',
                text: "Данные успешно удалены"
            });
        } catch (error) {
            res.json({
                type: 'error',
                text: `Возникла ошибка. Подробнее:\n${error}`,
                duration: Infinity,
            });
        }
    }

    async addRow(req, res) {
        try {
            const {table_name, row_data} = req.body;
            console.log({table_name, row_data});
            let baseQuery = `insert into ${table_name} (`,
              queryFilter = ") values (";
            Object.keys(row_data).forEach((key) => {
                if (row_data[key]) {
                    baseQuery += `${key},`;
                    const value = row_data[key];
                    switch (typeof value) {
                        case "object":
                            let arr = [];
                            Object.keys(value).forEach((value_key) => {
                                arr.push(value[value_key]);
                            });
                            queryFilter += `'{${arr.toString()}}',`;
                            break;
                        default:
                            queryFilter += `'${value}',`;
                            break;
                    }
                }
            });
            baseQuery = baseQuery.slice(0, baseQuery.length - 1);
            queryFilter = queryFilter.slice(0, queryFilter.length - 1);
            const finalQuery = baseQuery + queryFilter + ')';
            console.log(finalQuery);
            await db.query(finalQuery);
            res.json({
                type: 'success',
                text: "Запись успешно добавлена",
            });
        } catch (error) {
            res.json({
                type: 'error',
                text: `Возникла ошибка. Подробнее:\n${error}`,
                duration: Infinity,
            });
        }
    }

    async getRow(req, res) {
        try {
            const {table_name, key} = req.body;
            const table_description = tables[table_name] || {};
            console.log({table_name, key});
            let queryFilter = " where ";
            const keyKeys = Object.keys(key);
            for (let i = 0; i < keyKeys.length; i++) {
                const keyName = keyKeys[i];
                queryFilter = queryFilter + `${keyName}=${key[keyName]}${
                  i + 1 < keyKeys.length ? " and " : ""
                }`;
            }
            const getARowQuery = `select * from ${table_name}` + queryFilter;
            console.log(getARowQuery);
            const table_data = await db.query(getARowQuery);
            res.json({
                type: 'success',
                data: {
                    ...table_description,
                    data: table_data["rows"][0]
                }
            });
        } catch (error) {
            res.json({
                type: 'error',
                data: `Возникла ошибка. Подробнее:\n${error}`,
            });
        }
    }
}

module.exports = new UserController();