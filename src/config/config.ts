export const config = {
    databaseType: process.env.DATABASE_TYPE,
    databaseHost: process.env.POSTGRES_HOST || 'postgres-db',
    databaseUser: process.env.DATABASE_USER || 'postgres',
    databasePass: process.env.DATABASE_PASSWORD || 'postgres',
    databaseDb: process.env.DATABASE_NAME || 'testdb',
    jwtSecret: process.env.JWT_SECRET,
    databasePort: +process.env.POSTGRES_PORT || 5432,
    appExpires: process.env.APP_EXPIRES,
    appPort: process.env.APP_PORT,
    apiRestaurantsUrl: process.env.API_RESTAURANTS_URL,
    apiRestaurantsKey: process.env.API_RESTAURANTS_KEY,
};
