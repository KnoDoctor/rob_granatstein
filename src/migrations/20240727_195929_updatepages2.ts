import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`
 ALTER TABLE "pages" ADD COLUMN "key_message_1_title" varchar;
ALTER TABLE "pages" ADD COLUMN "key_message_1_body" varchar;
ALTER TABLE "pages" ADD COLUMN "key_message_2_title" varchar;
ALTER TABLE "pages" ADD COLUMN "key_message_2_body" varchar;
ALTER TABLE "pages" ADD COLUMN "cta_1_title" varchar;
ALTER TABLE "pages" ADD COLUMN "cta_1_body" varchar;
ALTER TABLE "pages" ADD COLUMN "cta_2_title" varchar;
ALTER TABLE "pages" ADD COLUMN "cta_2_body" varchar;
ALTER TABLE "pages" ADD COLUMN "contact_form_title" varchar;
ALTER TABLE "pages" ADD COLUMN "contact_form_body" varchar;`)
};

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`
 ALTER TABLE "pages" DROP COLUMN IF EXISTS "key_message_1_title";
ALTER TABLE "pages" DROP COLUMN IF EXISTS "key_message_1_body";
ALTER TABLE "pages" DROP COLUMN IF EXISTS "key_message_2_title";
ALTER TABLE "pages" DROP COLUMN IF EXISTS "key_message_2_body";
ALTER TABLE "pages" DROP COLUMN IF EXISTS "cta_1_title";
ALTER TABLE "pages" DROP COLUMN IF EXISTS "cta_1_body";
ALTER TABLE "pages" DROP COLUMN IF EXISTS "cta_2_title";
ALTER TABLE "pages" DROP COLUMN IF EXISTS "cta_2_body";
ALTER TABLE "pages" DROP COLUMN IF EXISTS "contact_form_title";
ALTER TABLE "pages" DROP COLUMN IF EXISTS "contact_form_body";`)
};
