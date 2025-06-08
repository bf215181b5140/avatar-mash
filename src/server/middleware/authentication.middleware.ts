import { DatabaseService } from '../database/database.service';
import InitMiddleware from './init.middleware';
import session, { SessionOptions } from 'express-session';
import passport from 'passport';
import { Profile, Strategy as TwitterStrategy } from 'passport-twitter';
import { User } from '../database/entities/user.entity';
import { Credentials } from '../database/entities/credentials.entity';
import { NextFunction, Request, Response } from 'express';

const mysqlStore = require('express-mysql-session')(session);

export default class AuthenticationMiddleware extends InitMiddleware {

  constructor(database: DatabaseService) {
    super(database);

    const sessionStore = new mysqlStore({
      host: process.env.DB_HOST || '',
      port: Number(process.env.DB_PORT) || 0,
      user: process.env.DB_USER || '',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || '',
    });

    const sessionOptions: SessionOptions = {
      secret: process.env.COOKIE_SECRET || '',
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7
      },
      store: sessionStore
    };

    if (process.env.NODE_ENV === 'production') {
      this.app.set('trust proxy', 1);
      if (sessionOptions.cookie) sessionOptions.cookie.secure = true;
    }

    // Register passport strategies and serialization
    this.initTwitterStrategy();
    this.initSessionSerialization();

    // Register session middleware
    this.app.use(session(sessionOptions));
    this.app.use(passport.session());

    // TODO temp delete this
    this.app.use((req, res, next) => {
      console.log('checking user', req.user);
      next();
    });

    // Login routes
    this.app.get('/api/login/twitter', passport.authenticate('twitter'));

    // Authentication callback routes
    this.app.get('/api/login/callback/twitter', passport.authenticate('twitter', { failureRedirect: '/', failureMessage: true }), (req, res) => res.redirect('/profile'));

    // Logout route
    this.app.get('/api/logout', (req, res) => req.logout(() => res.redirect('/')));
  }

  protected authenticate() {
    return (req: Request, res: Response, next: NextFunction) => {
      if (!req.user) {
        res.status(401).send('Unauthorized');
      } else {
        next();
      }
    };
  }

  private initTwitterStrategy() {
    passport.use(new TwitterStrategy({
      consumerKey: process.env.TWITTER_API_KEY || '',
      consumerSecret: process.env.TWITTER_API_SECRET || '',
      callbackURL: process.env.NODE_ENV === 'development' ? 'http://localhost:8083/api/login/callback/twitter' : 'https://www.avatarmash.com/api/login/callback/twitter'
    }, async (token: string, tokenSecret: string, profile: Profile, done: (error: any, user?: User) => void) => {

      console.log('twitter login strategy in progress...', profile);

      const user = await this.database.transaction(async em => {
        const credentials = await em.findOne(Credentials, { where: { provider: 'x', subject: profile.id }, relations: { user: true } });
        const image = typeof profile.photos?.[0]?.value === 'string' ? profile.photos[0].value : null;

        if (credentials?.user) {
          if (credentials.user.image !== image) {
            await em.createQueryBuilder<User>(User, 'user')
              .update({ image: image })
              .where('user.id = :id', { id: credentials.user.id })
              .execute();
          }

          return credentials.user;
        }

        if (!credentials) {
          // Save and retreive new user
          const newUser = new User();
          newUser.displayName = profile.displayName;
          newUser.image = image;
          const user = await em.save(newUser);

          // save new credentials
          const newCredentials = new Credentials();
          newCredentials.provider = 'x';
          newCredentials.subject = profile.id;
          newCredentials.user = user;
          await em.save(newCredentials);

          return user;
        }
      });

      if (!user) done(new Error('User not found'));

      done(null, user);
    }));
  }

  private initSessionSerialization() {
    passport.serializeUser((user, cb) => {
      process.nextTick(function () {
        return cb(null, {
          id: (user as any).id,
        });
      });
    });

    passport.deserializeUser((user, cb) => {
      process.nextTick(function () {
        return cb(null, (user as any));
      });
    });
  }

}