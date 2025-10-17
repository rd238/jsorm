
class SettingsDataBase {
    password = "";
    user = "";
    database = "";
    command = "";
    parse_function = undefined;

    constructor(
        {
            subd= "mysql" ,
            database= "data_bases",
            user = "postgres",
            password = "2352",
        }
    ) {

        this.#set_data_base(database);
        this.#set_user(user, password);
        this.#set_command(subd);
        this.#set_parse_function(subd);
    }






    #set_data_base(name){
        this.database = name;
    }


    #set_user(user, password){
        this.user = user;
        this.password = password;
        process.env.MYSQL_PWD = this.password;
        process.env.PGPASSWORD = this.password;
    }


    #set_command(subd) {
        if (subd === "postgres"){
            this.command = `psql -U ${this.user} -d ${this.database} -c `;
        } else if (subd === "mysql"){
            this.command = `mysql -u ${this.user} -D ${this.database} -e `;
        }
    }

    #set_parse_function(subd){
        if (subd === "postgres"){
            this.parse_function = this.#parse_postgres;
        } else if (subd === "mysql"){
            this.parse_function = this.#parse_mysql;
        }
    }

    #parse_postgres(table) {
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

    #parse_mysql(table){
        if (typeof table !== 'string') {
            return table;
        }

        let res = table.split('\r\n');
        res = res.map((val) => {return val.split("\t")})

        let objects = {
            name_table: this.name_table,
            result: []
        };
        let columns = res[0];
        for (let i = 1; i < res.length; i++) {
            let obj = {};
            for (let j = 0; j < columns.length; j++) {
                obj[columns[j]] = res[i][j];
            }

            objects.result.push(obj);
        }

        objects.result.pop();
        return objects;
    }
}


module.exports = {
    SettingsDataBase,
};