
exports.up = knex => knex.schema.createTable("dish", table =>{

  table.increments("id");
  table.text("name");
  table.text("description");
  table.integer("price");
  table.text("avatar");
});


exports.down = knex => knex.schema.dropTable("dish");
