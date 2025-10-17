const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');


function field({
        name = "name",
        type = "str",
        _null = true,
        unique = false,
        primary_key = false,
        foreign_key = "",
    }){

    let is_null = _null && !primary_key ? "NULL" : primary_key ? "NOT NULL" : "NOT NULL";
    let _unique = unique ? "UNIQUE" : "";
    let _primary_key = primary_key ? "PRIMARY KEY" : "";

    if (foreign_key) {
        return `${name} ${type} ${is_null} ${_unique} ${_primary_key},
            FOREIGN KEY (${name}) REFERENCES ${foreign_key}(id)`;
    }
    return `${name} ${type} ${is_null} ${_unique} ${_primary_key}`;
}


class Model {
    #name_table = this.constructor.name.toLowerCase();
    #password = "";
    #user = "";
    #database = "";

    #path = path.join(__dirname, 'request.sql');
    #comand = "";

    #set_data_base(name){
        this.#database = name;
    }

    #set_user(user, password){
        this.#user = user;
        this.#password = password;

        process.env.PGPASSWORD = this.#password;
    }

    #create_model(...args) {
        let request = `CREATE TABLE IF NOT EXISTS ${this.#name_table} (\n${args.join(',')}\n);`;

        fs.writeFileSync(this.#path, request);

        return execSync(this.#comand, {encoding: 'utf8'});
    }

    constructor({
                    user = "postgres",
                    password = "2352",
                    database = "data_bases",
                },
                ...args) {

        this.#set_data_base(database);
        this.#set_user(user, password);

        this.#comand = `psql -U ${this.#user} -d ${this.#database} -f "${this.#path}"`;

        this.#create_model(...args);
    }

    #where_to_get(obj) {
        let keys = Object.keys(obj);

        for (let key of keys) {
            if (obj[key] instanceof Object) {
                return `id = (SELECT id_${this.#name_table} FROM ${key} WHERE ${this.#where_to_get(obj[key])})`;
            }
        }

        return keys.map((val) => {
            return `${val} = ` + (
                typeof obj[val] === 'string'
                    ?
                    `'${obj[val]}'` : `${obj[val]}`)
        }).join(' AND ');
    }

    #get(obj, name_table="") {
        let where = this.#where_to_get(obj);

        let request = `SELECT * FROM ${name_table ? name_table : this.#name_table} WHERE ${where};`;

        fs.writeFileSync(this.#path, request);

        return this.parse_table_to_objects(execSync(this.#comand, {encoding: 'utf8'}));
    }

    get(args) {
        return this.#get(args);
    }

    create(obj) {
        let keys = Object.keys(obj);

        let request = `INSERT INTO ${this.#name_table} (${keys.join(',')})
        VALUES (${keys.map(key => typeof obj[key] == 'string' ?`'${obj[key]}'` : `${obj[key]}`).join(',')});`;

        fs.writeFileSync(this.#path, request);

        return execSync(this.#comand, {encoding: 'utf8'});
    }

    bulc_create(...objs) {
        let request = "";
        for (let obj of objs) {
            let keys = Object.keys(obj);
            request += `INSERT INTO ${this.#name_table} (${keys.join(',')})
            VALUES (${keys.map(key => typeof obj[key] == 'string' ?`'${obj[key]}'` : `${obj[key]}`).join(',')});\n`;

            fs.writeFileSync(this.#path, request);
        }

        return execSync(this.#comand, {encoding: 'utf8'});
    }

    get_or_create(args) {
        try {
            return this.parse_table_to_objects(this.get(args));
        } catch(err) {
            this.create(args);

            return this.parse_table_to_objects(this.get(args));
        }
    }

    delete(args) {
        let request = `DELETE FROM ${this.#name_table}`;
        if (args) {
            let where = this.#where_to_get(args);
            request += ` WHERE ${where};`;
        }

        fs.writeFileSync(this.#path, request);

        return execSync(this.#comand, {encoding: 'utf8'});
    }

    #filter(obj, name_table="") {
        let request = `SELECT * FROM ${name_table ? name_table : this.#name_table}`;
        if (obj) {
            let where = this.#where_to_get(obj);

            request += ` WHERE ${where};`;
        }

        fs.writeFileSync(this.#path, request);

        return this.parse_table_to_objects(execSync(this.#comand, {encoding: 'utf8'}));
    }

    filter(args) {
        return this.#filter(args);
    }

    parse_table_to_objects(str) {
        if (typeof str !== 'string') {
            return str;
        }

        let res = str.split('\r\n');

        res.splice(1, 1);
        res.splice(-3, 3);

        if (res.length === 0) {
            return [];
        }
        let objects = [];
        let columns = res[0].split(" | ").map(val => val.trim());
        for (let i = 1; i < res.length; i++) {
            let obj = {};
            let vals = res[i].split(" | ").map(val => val.trim());
            for (let j = 0; j < columns.length; j++) {
                obj[columns[j]] = vals[j];
            }
            objects.push(obj);
        }

        return objects
    }

    upgrade_get(args) {
        let res = this.#get(args);

        for (let i = 0; i < res.length; i++) {
            Object.keys(res[i]).map(
                value =>
                    value.includes("id_")
                        ?
                        res[i][value] = this.#get({id: res[i][value]}, value.substring(3)) : value);
        }

        return res;
    }

    upgrade_filter(args) {
        let res = this.#filter(args);

        for (let i = 0; i < res.length; i++) {
            Object.keys(res[i]).map(
                value =>
                    value.includes("id_")
                        ?
                        res[i][value] = this.#filter({id: res[i][value]}, value.substring(3)) : value);
        }

        return res;
    }
}

module.exports = {
    Model,
    field,
};
