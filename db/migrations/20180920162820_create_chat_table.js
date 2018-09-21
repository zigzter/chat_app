
exports.up = function(knex, Promise) {
  return knex.schema.createTable('chat_history', t => {
    t.increments('id');
    t.string('username');
    t.text('message');
    t.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('chat_history');
};
