module.exports = class Data1683735473188 {
    name = 'Data1683735473188'

    async up(db) {
        await db.query(`CREATE TABLE "early_bird_special_score" ("id" character varying NOT NULL, "last_clicked_in_block" integer NOT NULL, "last_reward" numeric NOT NULL, "press_count" integer NOT NULL, "total_rewards" numeric NOT NULL, CONSTRAINT "PK_d1b292d94bc40bd6ed22467c23d" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "back_to_the_future_score" ("id" character varying NOT NULL, "last_clicked_in_block" integer NOT NULL, "last_reward" numeric NOT NULL, "press_count" integer NOT NULL, "total_rewards" numeric NOT NULL, CONSTRAINT "PK_39d5a666f1ec8b11acd09d13df5" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "the_pressiah_cometh_score" ("id" character varying NOT NULL, "last_clicked_in_block" integer NOT NULL, "last_reward" numeric NOT NULL, "press_count" integer NOT NULL, "total_rewards" numeric NOT NULL, CONSTRAINT "PK_870b3f8cf9e3aac6e7e4f382d17" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "scores" ("id" character varying NOT NULL, "early_bird_special_score_id" character varying, "back_to_the_future_score_id" character varying, "the_pressiah_cometh_score_id" character varying, CONSTRAINT "PK_c36917e6f26293b91d04b8fd521" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_97f8b5b38b97dfa04fc03a4ed3" ON "scores" ("early_bird_special_score_id") `)
        await db.query(`CREATE INDEX "IDX_ef00bbbc575f78582e8ec9c157" ON "scores" ("back_to_the_future_score_id") `)
        await db.query(`CREATE INDEX "IDX_81156b62dedbba1c8ad8c34cb8" ON "scores" ("the_pressiah_cometh_score_id") `)
        await db.query(`ALTER TABLE "scores" ADD CONSTRAINT "FK_97f8b5b38b97dfa04fc03a4ed39" FOREIGN KEY ("early_bird_special_score_id") REFERENCES "early_bird_special_score"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "scores" ADD CONSTRAINT "FK_ef00bbbc575f78582e8ec9c157b" FOREIGN KEY ("back_to_the_future_score_id") REFERENCES "back_to_the_future_score"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "scores" ADD CONSTRAINT "FK_81156b62dedbba1c8ad8c34cb85" FOREIGN KEY ("the_pressiah_cometh_score_id") REFERENCES "the_pressiah_cometh_score"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`DROP TABLE "early_bird_special_score"`)
        await db.query(`DROP TABLE "back_to_the_future_score"`)
        await db.query(`DROP TABLE "the_pressiah_cometh_score"`)
        await db.query(`DROP TABLE "scores"`)
        await db.query(`DROP INDEX "public"."IDX_97f8b5b38b97dfa04fc03a4ed3"`)
        await db.query(`DROP INDEX "public"."IDX_ef00bbbc575f78582e8ec9c157"`)
        await db.query(`DROP INDEX "public"."IDX_81156b62dedbba1c8ad8c34cb8"`)
        await db.query(`ALTER TABLE "scores" DROP CONSTRAINT "FK_97f8b5b38b97dfa04fc03a4ed39"`)
        await db.query(`ALTER TABLE "scores" DROP CONSTRAINT "FK_ef00bbbc575f78582e8ec9c157b"`)
        await db.query(`ALTER TABLE "scores" DROP CONSTRAINT "FK_81156b62dedbba1c8ad8c34cb85"`)
    }
}
