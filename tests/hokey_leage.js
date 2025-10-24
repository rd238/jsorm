const {Model, field} = require("../models/model");

class komand extends Model {}
class gamer extends Model {}
class period extends Model {}
class gamer_stats_for_period extends Model {}
class game extends Model {}


let komand_ = new komand(
    field({name: "id", type: "bigint", primary_key: true}),
    field({name: "name", type: "varchar(100)", _null: false}),
    field({name: "popularity", type: "int"}),
);


let gamer_ = new gamer(
    field({name: "id", type: "bigint", primary_key: true}),
    field({name: "name", type: "varchar(100)", _null: false}),
    field({name: "id_komand", type: "bigint", foreign_key: komand_.name_table}),
);


let game_ = new game(
    field({name: "id", type: "bigint", primary_key: true}),
    field({name: "id_guest_komand", type: "bigint", foreign_key: komand_.name_table}),
    field({name: "id_master_komand", type: "bigint", foreign_key: komand_.name_table}),
    field({name: "count_bilets", type: "int", _null: false}),
    field({name: "funds_spend", type: "int", _null: false}),
)


let period_ = new period(
    field({name: "id", type: "bigint", primary_key: true}),
    field({name: "number", type: "int", _null: false}),
    field({name: "id_game", type: "bigint", foreign_key: game_.name_table}),
)


let gamer_stats_for_period_ = new gamer_stats_for_period(
    field({name: "id", type: "bigint", primary_key: true}),
    field({name: "id_gamer", type: "bigint", foreign_key: gamer_.name_table}),
    field({name: "id_period", type: "bigint", foreign_key: period_.name_table}),
    field({name: "goals", type: "int"}),
)


module.exports = {
    komand_,
    gamer_,
    period_,
    gamer_stats_for_period_,
    game_,
};