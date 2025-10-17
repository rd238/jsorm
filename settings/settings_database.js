
class SettingsDataBase {
    password = "";
    user = "";
    database = "";

    #set_data_base(name){
        this.database = name;
    }

    #set_user(user, password){
        this.user = user;
        this.password = password;

        process.env.PGPASSWORD = this.password;
    }

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
    }
}

module.exports = {
    SettingsDataBase
};