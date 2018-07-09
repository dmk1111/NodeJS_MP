let config = {
    development: {
        username: 'postgres',
        password: 'postgres',
        database: 'node_development',
        host: 'localhost',
        dialect: 'postgres',
        migrationStorage: 'json',
        migrationStoragePath: 'sequelizeMeta.json',
        // migrationStorageTableName: 'sequelize_meta',
        seederStorage: 'json',
        seederStoragePath: 'sequelizeData.json',
        // seederStorageTableName: 'sequelize_data',
    },
    test: {
        //free DB at Heroku
        username: 'kqfstqbpdveblo',
        password: 'd7f0495146cabc6b5022676341e6bc46bc718934623cb64fb8e581cd697f4cbc',
        database: 'd8sou08tt8p60v',
        host: 'ec2-54-243-40-26.compute-1.amazonaws.com',
        dialect: 'postgres',
        dialectOptions: {
            ssl: true
        }
    },
    production: {
        username: process.env.PROD_DB_USERNAME,
        password: process.env.PROD_DB_PASSWORD,
        database: process.env.PROD_DB_NAME,
        host: process.env.PROD_DB_HOSTNAME,
        dialect: 'postgres'
    }
};

module.exports = config;