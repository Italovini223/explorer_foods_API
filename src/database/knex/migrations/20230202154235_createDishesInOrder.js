
exports.up = knex => knex.schema.createTable("dishesInOrder", table => {
  table.increments("id");
  table.integer("order_id").references("id").inTable("orders").onDelete("CASCADE");
  table.text("title");
  table.integer("quantity");
});


exports.down = knex => knex.schema.dropTable("dishesInOrder");