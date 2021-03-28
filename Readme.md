# Flowchart backend
## Installation
- `npm i`
- `npx sequelize-cli init`
- Copy .env.example to .env
- Fill environment variables (.env, config/config.json)
- `npx sequelize-cli db:migrate`
- `npm start`
___
## Environment variables
- `PORT` | (80, 443 etc)
- `NODE_ENV` | (development, test, production)
- `DB_NAME` | database name
- `DB_USERNAME` | database username
- `DB_PASSWORD` | database user password
- `JWT_SECRET` | jwt secret token
- `JWT_EXPIRE` | (5d, 7hr)
- `JWT_COOKIE_EXPIRE` | (5, 7) = (5 day, 7 day)