const {
    komand_,
    gamer_,
    period_,
    gamer_stats_for_period_,
    game_,
} = require('./hokey_leage');
const { generateEnglishName, generateCompanyName } = require('./random');


function fill(){
    let len_komands = 20;
    let id_gamers = 0;

    let res = [
        gamer_stats_for_period_,
        period_,
        game_,
        gamer_,
        komand_,
    ];

    for(let a of res) {
        a.delete();
    }

    let gamer = [];
    for (let i=0; i < len_komands + 1; i++){
        komand_.create({id: i, name: generateCompanyName(), popularity: Math.floor(Math.random() * 100)});

        for (let j = 0; j < 11; j++) {
            gamer.push({id: id_gamers++, name: generateEnglishName(), id_komand: i});
        }
        gamer_.bulc_create(...gamer);
        gamer = [];
    }

    for (let i=0; i < len_komands / 2; i++){
        game_.create({
            id: i,
            id_guest_komand: i,
            id_master_komand: i + 1,
            count_bilets: Math.floor(Math.random() * 100),
            funds_spend: Math.floor(Math.random() * 100)

        });
    }

    let period = [];
    for (let i=0; i < len_komands / 2 * 3; i++){
        period.push({
            id: i,
            number: i % 3 + 1,
            id_game: i % 3 + i / 4
        });
    }
    period_.bulc_create(...period);

    let stats = [];
    for(let i=0; i < len_komands * 2; i++){
        stats.push({id: i, id_gamer: i % 20, id_period: i % 5, goals: i % 4 + 1});
    }
    gamer_stats_for_period_.bulc_create(...stats);

    for(let i of res){
        console.log(i.filter());
    }
}


module.exports = {
    fill,
};

