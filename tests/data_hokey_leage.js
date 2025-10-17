const {
    komand_,
    gamer_,
    couple_of_komand_,
    tree_periods_,
    period_,
    link_komand_to_couple_,
    link_period_to_tree_periods_,
    gamer_stats_for_period_,
    game_,
} = require('./hokey_leage');



function generateCompanyName() {
    const prefixes = ['Tech', 'Mega', 'Super', 'Global', 'Pro', 'Eco', 'Bio', 'Quantum', 'Digital', 'Smart'];
    const roots = ['Service', 'Trade', 'Group', 'Lab', 'Systems', 'Soft', 'House', 'Center', 'Market', 'Logistics'];
    const suffixes = ['Ltd', 'Inc', 'Corp', 'Group', 'Holding', '', 'Company'];

    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const root = roots[Math.floor(Math.random() * roots.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];

    return `${prefix}${root}${suffix ? ' ' + suffix : ''}`;
}


function generateEnglishName() {
    const maleNames = ['James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas', 'Charles'];
    const femaleNames = ['Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia', 'Rodriguez', 'Wilson'];

    const isMale = Math.random() > 0.5;

    const firstName = isMale ?
        maleNames[Math.floor(Math.random() * maleNames.length)] :
        femaleNames[Math.floor(Math.random() * femaleNames.length)];

    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

    return `${firstName} ${lastName}`;
}




function fill(){
    let len_komands = 20;
    let id_gamers = 0;

    let res = [
        game_,
        gamer_stats_for_period_,
        link_period_to_tree_periods_,
        link_komand_to_couple_,
        period_,
        tree_periods_,
        couple_of_komand_,
        gamer_,
        komand_,
    ];

    for(let a of res) {
        a.delete();
    }

    let gamer = [];
    for (let i=0; i < len_komands; i++){
        komand_.create({id: i, name: generateCompanyName(), popularity: Math.floor(Math.random() * 100)});

        for (let j = 0; j < 10; j++) {
            gamer.push({id: id_gamers++, name: generateEnglishName(), id_komand: i});
        }
        gamer_.bulc_create(...gamer);
        gamer = [];
    }

    let couple_of_komand = [];
    let link_komand_to_couple = [];
    for (let i=0; i < len_komands / 2; i++){
        couple_of_komand.push({id: i});
        link_komand_to_couple.push({id: i, id_komand: i, id_couple_of_komand: i});
        link_komand_to_couple.push({id: i + len_komands / 2, id_komand: i + len_komands / 2, id_couple_of_komand: i});
    }
    couple_of_komand_.bulc_create(...couple_of_komand);
    link_komand_to_couple_.bulc_create(...link_komand_to_couple);

    let period = [];
    for (let i=0; i < len_komands / 2 * 3; i++){
        period.push({id: i, number: i % 3 + 1});
    }
    period_.bulc_create(...period);

    let tree_periods = [];
    let link_period_to_tree_periods = [];
    for (let i=0; i < (len_komands / 2) * 3; i++){
        tree_periods.push({id: i});
        link_period_to_tree_periods.push({id: i, id_period: i, id_tree_periods: i});
        link_period_to_tree_periods.push({id: i + (len_komands / 2) * 3, id_period: i, id_tree_periods: i});
    }
    tree_periods_.bulc_create(...tree_periods);
    link_period_to_tree_periods_.bulc_create(...link_period_to_tree_periods);

    for (let i=0; i < len_komands / 2; i++){
        game_.create({id: i, id_couple_of_komand: i, id_tree_periods: i, count_bilets: Math.floor(Math.random() * 100), funds_spend: Math.floor(Math.random() * 100)});
    }

    for(let i of res){
        console.log(i.filter());
    }
}


module.exports = {
    fill,
};

