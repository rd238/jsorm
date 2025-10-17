const {Model, field} = require("./models/model");

class komand extends Model {}
class gamer extends Model {}
class couple_of_komand extends Model {}
class tree_periods extends Model {}
class period extends Model {}
class link_komand_to_couple extends Model {}
class link_period_to_tree_periods extends Model {}
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
    field({name: "id_komand", foreign_key: komand_.name_table}),
);


let couple_of_komand_ = new couple_of_komand(
    field({name: "id", type: "bigint", primary_key: true}),
);


let tree_periods_ = new tree_periods(
    field({name: "id", type: "bigint", primary_key: true}),
);


let period_ = new period(
    field({name: "id", type: "bigint", primary_key: true}),
    field({name: "number", type: "int", _null: false}),
    field({name: "id_komand", type: "bigint", foreign_key: komand_.name_table}),
)


let link_komand_to_couple_ = new link_komand_to_couple(
    field({name: "id", type: "bigint", primary_key: true}),
    field({name: "id_komand", type: "bigint", foreign_key: komand_.name_table}),
    field({name: "id_couple_of_komand", type: "bigint", foreign_key: couple_of_komand_.name_table}),
)


let link_period_to_tree_periods_ = new link_period_to_tree_periods(
    field({name: "id", type: "bigint", primary_key: true}),
    field({name: "id_period", type: "bigint", foreign_key: period_.name_table}),
    field({name: "id_tree_periods", type: "bigint", foreign_key: tree_periods_.name_table}),
)


let gamer_stats_for_period_ = new gamer_stats_for_period(
    field({name: "id", type: "bigint", primary_key: true}),
    field({name: "id_gamer", type: "bigint", foreign_key: gamer_.name_table}),
    field({name: "id_period", type: "bigint", foreign_key: period_.name_table}),
    field({name: "rating", type: "int"}),
    field({name: "efficienty", type: "int"}),
)


let game_ = new game(
    field({name: "id", type: "bigint", primary_key: true}),
    field({name: "id_couple_of_komand", type: "bigint", foreign_key: couple_of_komand_.name_table}),
    field({name: "id_tree_periods", type: "bigint", foreign_key: tree_periods_.name_table}),
    field({name: "count_bilets", type: "int", _null: false}),
    field({name: "funds_spend", type: "int", _null: false}),
)


module.exports = {
    komand_,
    gamer_,
    couple_of_komand_,
    tree_periods_,
    period_,
    link_komand_to_couple_,
    link_period_to_tree_periods_,
    gamer_stats_for_period_,
    game_,
};