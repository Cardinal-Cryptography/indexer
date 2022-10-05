module.exports = class Data1664982980262 {
  name = 'Data1664982980262'

  async up(db) {
    await db.query(`CREATE TABLE "early_bird_special_scores" ("id" character varying NOT NULL, "account" text NOT NULL, "last_clicked_in_block" integer NOT NULL, "total_rewards" numeric NOT NULL, CONSTRAINT "PK_d03f520f2db84c4326d0537cc06" PRIMARY KEY ("id"))`)
  }

  async down(db) {
    await db.query(`DROP TABLE "early_bird_special_scores"`)
  }
}
