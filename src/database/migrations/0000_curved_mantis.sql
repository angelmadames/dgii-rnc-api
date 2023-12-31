CREATE TABLE IF NOT EXISTS "rnc" (
  "id" varchar PRIMARY KEY NOT NULL,
  "name" varchar(256),
  "commercialName" varchar(256),
  "description" text,
  "phone" varchar(11),
  "address" varchar,
  "status" varchar,
  "paymentSystem" varchar
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "rnc_idx" ON "rnc" ("id");
