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


let g = new gamer();
let per = new period();

let res = g.select(["id", "name"]).where("id", "<", 10).or_where("id", "=", 15).end_request();

console.log(res)

