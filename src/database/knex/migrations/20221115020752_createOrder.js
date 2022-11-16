
exports.up = knex => knex.schema.createTable("orders", table => {
  table.increments("id");
  table.integer("user_id").references("id").inTable("users");
  table.integer("total");
  table.text("dishes");
});

exports.down = knex => knex.schema.dropTable("orders");
