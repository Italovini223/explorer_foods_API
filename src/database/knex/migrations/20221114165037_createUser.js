const { default: knex } = require("knex");

exports.up = knex => knex.schema.createTable("users", table => {
  table.increments("id");
  table.text("name");
  table.text("email");
  table.text("password");
  table.boolean("isAdmin");
  table.timestamp("created_at").default(knex.fn.now());

});


exports.down = knex => knex.schema.dropTable("users");