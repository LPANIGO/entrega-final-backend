import dotenv from 'dotenv'; //trabajar con multientornos

const mode = process.argv.slice(2)[0];
console.log(mode);
dotenv.config({
    path:mode==="PROD"?'src/config/.env.production':'src/config/.env.development'
});

export default {
    app: {
        MODE: process.env.MODE||'PROD',
        PORT: process.env.PORT || 8080,
        DEBUG: process.env.DEBUG||false
    },

    mongo: {
        USER: process.env.MONGO_USER || 'leopanigo',
        PASSWORD: process.env.MONGO_PW || 'Mongo2.0',
        DB: process.env.MONGO_DB || 'testRegister'
    },
    jwt: {
        SECRET: process.env.JWT_SECRET || 'patroclo',
        COOKIE: process.env.JWT_COOKIE || 'whiteGandalf'
    },
    session: {
        ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'admin@gmail.com',
        ADMIN_PWD: process.env.ADMIN_PWD ||12345678
    }
}