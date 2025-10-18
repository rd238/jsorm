const { fill } = require('./tests/data_hokey_leage');
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
} = require('./tests/hokey_leage');
// fill();

console.log(komand_.update({ id: '1', name: 'ProGroup Company', popularity: '65' }, {name: "new", popularity: 0}))
console.log(komand_.get({id: 1}))

