
exports.up = knex => knex.schema.createTable("orders", table => {
  table.increments("id");
  table.integer("user_id").references("id").inTable("users");
  
  table.text("status");
  table.text("total");
  table.text("payMethod");

  table.timestamp("crated_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("orders");
