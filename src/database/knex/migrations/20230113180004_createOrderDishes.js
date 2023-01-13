
exports.up = knex => knex.schema.createTable("orderDishes", table => {
  table.increments("id");

  table.integer("order_id").references("id").inTable("orders").onDelete("CASCADE");
  table.integer("dish_id").references("id").inTable("dish").onDelete("CASCADE");

  table.text("title");
  table.integer("quantity");

  table.timestamp("create_at").default(knex.fn.now());

})

exports.down = knex => knex.schema.dropTable("orderDishes");
