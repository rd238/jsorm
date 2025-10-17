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


let g = new komand();
let per = new period();

let res = g.select(["id", "name"]).where("id", "<", 10).or_where("id", "=", 15).end_request();
let res1 = g.filter();
let res2 = g.get({id: 1});
let res4test = g.select().where("id", "=", 21).or_where("id", "=", 20).end_request();
console.log(res4test)


