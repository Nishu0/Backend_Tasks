const passport = require("passport");
const passportJwt = require("passport-jwt");
const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;

const dotenv=require("dotenv")
dotenv.config({path:'config.env'})

passport.use(
  new StrategyJwt(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.TOKEN_KEY,
    },
    async (token, done) => {
      try {
        return done(null, token);
      } catch (error) {
        done(error);
      }
    }
  )
);

/*    
      1)
      const decode=jwt.verify(token,config.get('process.env.TOKEN_KEY'))
      var user_id=decode.id
      console.log(decode)

      2)
      const jwt_payload = jwt.decode(yourJwtInString);
      const id = jwt_payload._id;
*/