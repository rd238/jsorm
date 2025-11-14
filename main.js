const {Model, field} = require("./models/model");

class airplanes_data extends Model {}
// class airports_data extends Model {}
// class boarding_passes extends Model {}
// class bookings extends Model {}
// class flights extends Model {}
// class routes extends Model {}
// class seats extends Model {}
// class segments extends Model {}
// class tickets extends Model {}

let airplanes_data_ = new airplanes_data();
// let airports_data_ = new airports_data();
// let boarding_passes_ = new boarding_passes();
// let bookings_ = new bookings();
// let flights_ = new flights();
// let routes_ = new routes();
// let seats_ = new seats();
// let segments_ = new segments();
// let tickets_ = new tickets();


for (let a = 0; a < 10; a++) {
    let time_start = Date.now();

        airplanes_data_.select(["COUNT(airplanes_data.airplane_code)", "COUNT(routes.departure_airport)"])
            ._join("airports_data", "airports_data.airport_code = airplanes_data.airplane_code")
            ._join("routes", "routes.departure_airport = routes.departure_airport")
            ._join("flights", "flights.flight_id = flights.flight_id")
            .group_by([
                "airports_data.airport_code",
                "airports_data.city",
                "routes.departure_airport",
                "routes.validity",
            ])
            .having("airports_data.airport_code = airports_data.airport_code")
            .order_by(["routes.departure_airport", "routes.validity"])
            .end_request();

    let time_end = Date.now();

    console.log(`${(time_end - time_start) / 1000}`);
}
