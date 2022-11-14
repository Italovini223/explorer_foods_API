
exports.up = knex => knex.schema.createTable("ingredients", table => {
  table.text("name")
  table.integer("dish_id").references("id").inTable("dish");
});


exports.down = knex => knex.schema.dropTable("ingredients");
