// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'chat_app',
      username: 'ziggy',
      password: 'yeezy'
    },
    migrations: {
      tableName: 'migrations',
      directory: './db/migrations'
    }
  }
};
