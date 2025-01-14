import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { AppDataSource } from './database';
import { User } from '../entities/User';
import { Constants } from '../helpers/constants';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: Constants.JWT_SECRET
};

passport.use(
  new JwtStrategy(options, async (payload, done) => {
    try {
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOneBy({ id: payload.id });

      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  })
);

export const authenticateJwt = passport.authenticate('jwt', { session: false });
