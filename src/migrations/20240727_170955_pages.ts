import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`
 ALTER TABLE "pages" ADD COLUMN "slug" varchar NOT NULL;
ALTER TABLE "pages" ADD COLUMN "bio_photo_id" integer NOT NULL;
DO $$ BEGIN
 ALTER TABLE "pages" ADD CONSTRAINT "pages_bio_photo_id_media_id_fk" FOREIGN KEY ("bio_photo_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`)
};

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`
 ALTER TABLE "pages" DROP CONSTRAINT "pages_bio_photo_id_media_id_fk";

ALTER TABLE "pages" DROP COLUMN IF EXISTS "slug";
ALTER TABLE "pages" DROP COLUMN IF EXISTS "bio_photo_id";`)
};
