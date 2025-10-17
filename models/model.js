const fs = require('fs');
const {execSync} = require('child_process');
const path = require('path');
const {SettingsDataBase} = require('../settings/settings_database');

function field(
    {
        name = "",
        type = "",
        _null = true,
        unique = false,
        primary_key = false,
        foreign_key = "",
    }
) {

    let is_null = _null && !primary_key ? "NULL" : primary_key ? "NOT NULL" : "NOT NULL";
    let _unique = unique ? "UNIQUE" : "";
    let _primary_key = primary_key ? "PRIMARY KEY" : "";

    if (foreign_key) {
        return `${name} ${type} ${is_null} ${_unique} ${_primary_key}, ` +
            `FOREIGN KEY (${name}) REFERENCES ${foreign_key}(id)`;
    }
    return `${name} ${type} ${is_null} ${_unique} ${_primary_key}`;
}


class Model {
    name_table = this.constructor.name.toLowerCase();

    #command = "";

    #compound_request = "";

    constructor(...args) {
        let settings = new SettingsDataBase({});

        this.#command = settings.command;

        this.#create_model(...args);
    }

    #create_model(...args) {
        let request = `CREATE TABLE IF NOT EXISTS ${this.name_table} ` +
            `(${args.join(',')});`;

        return execSync(this.#command + `"${request}"`, {encoding: 'utf8'});
    }

    #where_to_get(args) {
        let keys = Object.keys(args);

        return keys.map((val) => {
                return `${val} = ` + (
                    typeof args[val] === 'string'
                        ?
                        `'${args[val]}'`
                        :
                        `${args[val]}`
                )
            }
        ).join(' AND ');
    }

    get(args, name_table = "") {
        let where = this.#where_to_get(args);

        let request = `SELECT * ` +
            `FROM ${name_table ? name_table : this.name_table} ` +
            `WHERE ${where};`;

        return this.parse_table_to_objects(
            execSync(this.#command + `"${request}"`, {encoding: 'utf8'})
        );
    }

    create(args) {
        let keys = Object.keys(args);

        let request = `INSERT INTO ${this.name_table} (${keys.join(',')}) ` +
            `VALUES (${keys.map(
                key =>
                    typeof args[key] == 'string'
                        ?
                        `'${args[key]}'` : `${args[key]}`
            ).join(',')});`;

        return execSync(this.#command + `"${request}"`, {encoding: 'utf8'});
    }

    bulc_create(...objs) {
        let request = "";
        for (let obj of objs) {
            let keys = Object.keys(obj);
            request += `INSERT INTO ${this.name_table} (${keys.join(',')}) ` +
                `VALUES (${keys.map(
                    key =>
                        typeof obj[key] == 'string'
                            ?
                            `'${obj[key]}'` : `${obj[key]}`).join(',')});`;
        }

        return execSync(this.#command + `"${request}"`, {encoding: 'utf8'});
    }

    get_or_create(args) {
        try {
            return this.parse_table_to_objects(this.get(args));
        } catch (err) {
            this.create(args);

            return this.parse_table_to_objects(this.get(args));
        }
    }

    delete(args) {
        let request = `DELETE ` +
            `FROM ${this.name_table}`;
        if (args) {
            let where = this.#where_to_get(args);
            request += ` WHERE ${where};`;
        }

        return execSync(this.#command + `"${request}"`, {encoding: 'utf8'});
    }

    filter(args, name_table = "") {
        let request = `SELECT * ` +
            `FROM ${name_table ? name_table : this.name_table}`;
        if (args) {
            let where = this.#where_to_get(args);

            request += ` WHERE ${where};`;
        }

        return this.parse_table_to_objects(execSync(this.#command + `"${request}"`, {encoding: 'utf8'}));
    }

    parse_table_to_objects(table) {
        if (typeof table !== 'string') {
            return table;
        }

        let res = table.split('\r\n');

        res.splice(1, 1);
        res.splice(-3, 3);

        if (res.length === 0) {
            return [];
        }

        let objects = {
            name_table: this.name_table,
            result: []
        };
        let columns = res[0].split(" | ").map(val => val.trim());

        for (let i = 1; i < res.length; i++) {
            let obj = {};
            let vals = res[i].split(" | ").map(val => val.trim());

            for (let j = 0; j < columns.length; j++) {
                obj[columns[j]] = vals[j];
            }

            objects.result.push(obj);
        }

        return objects;
    }

    upgrade_get(args) {
        let res = this.get(args);

        for (let i = 0; i < res.length; i++) {
            Object.keys(res[i]).map(
                value =>
                    value.includes("id_")
                        ?
                        res[i][value] = this.get({id: res[i][value]}, value.substring(3))
                        :
                        value
            );
        }

        return res;
    }

    upgrade_filter(args) {
        let res = this.filter(args);

        for (let i = 0; i < res.length; i++) {
            Object.keys(res[i]).map(
                value =>
                    value.includes("id_")
                        ?
                        res[i][value] = this.filter({id: res[i][value]}, value.substring(3))
                        :
                        value
            );
        }

        return res;
    }

    select(fields, name_table = "", as = "") {
        this.#compound_request = `SELECT ${fields ? fields.join(', ') : "*"} ` +
            `FROM ${name_table ? name_table : this.name_table} `;

        return this;
    }

    where(ysl1, operation, ysl2) {
        this.#compound_request += `WHERE ${ysl1} ${operation} ${ysl2} `;

        return this;
    }

    and_where(ysl1, operation, ysl2) {
        this.#compound_request += ` AND ${ysl1} ${operation} ${ysl2} `;

        return this;
    }

    or_where(ysl1, operation, ysl2) {
        this.#compound_request += ` OR ${ysl1} ${operation} ${ysl2} `;

        return this;
    }

    end_request() {
        this.#compound_request += ";";

        let result = this.parse_table_to_objects(
            execSync(
                this.#command + `"${this.#compound_request}"`,
                {encoding: 'utf8'}
            )
        );

        this.#compound_request = "";

        return result;
    }
}

module.exports = {
    Model,
    field,
};
