const {
    Model,
    field,
    } = require('./models/model');

class komand extends Model {}
class game extends Model {}
class gamer extends Model {}
class couple_of_komand extends Model {}
class gamer_stats_for_period extends Model {}
class link_komand_to_couple extends Model {}
class link_period_to_tree_periods extends Model {}
class period extends Model {}
class tree_periods extends Model {}
class test extends Model {}


let g = new test({});
let per = new period({});

let res = g.upgrade_filter();

for (let a = 0; a < res.length; a++) {
    console.log(res[a]);
}

