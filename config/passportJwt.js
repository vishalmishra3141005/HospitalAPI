
const Doctor = require("../models/Doctor");

const passport = require("passport");

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_KEY,
};

passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
    try {
        let doctor = await Doctor.findById(jwt_payload._id).exec();
        if (doctor) {
            done(null, doctor);
        } else {
            done(null, false);
        }
    } catch(err) {
        done(err, false);
    }

}));

module.exports = passport;