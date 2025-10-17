
class SettingsDataBase {
    password = "";
    user = "";
    database = "";
    command = "";

    constructor(
        {
            subd= "postgres" ,
            database= "data_bases",
            user = "postgres",
            password = "2352",
        }
    ) {

        this.#set_data_base(database);
        this.#set_user(user, password);
        this.#set_command(subd);
    }






    #set_data_base(name){
        this.database = name;
    }


    #set_user(user, password){
        this.user = user;
        this.password = password;

        process.env.PGPASSWORD = this.password;
    }


    #set_command(subd) {
        if (subd === "postgres"){
            this.command = `psql -U ${this.user} -d ${this.database} -c `;
        }
    }
}


module.exports = {
    SettingsDataBase,
};