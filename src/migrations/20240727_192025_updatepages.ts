import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`
 ALTER TABLE "pages" RENAME COLUMN "title" TO "page_title";
ALTER TABLE "pages" ADD COLUMN "banner_title" varchar;
ALTER TABLE "pages" ADD COLUMN "banner_subtitle" varchar;`)
};

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`
 ALTER TABLE "pages" ADD COLUMN "title" varchar;
ALTER TABLE "pages" DROP COLUMN IF EXISTS "page_title";
ALTER TABLE "pages" DROP COLUMN IF EXISTS "banner_title";
ALTER TABLE "pages" DROP COLUMN IF EXISTS "banner_subtitle";`)
};
