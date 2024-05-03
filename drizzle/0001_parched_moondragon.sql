CREATE TABLE IF NOT EXISTS "investment" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"amount" integer NOT NULL,
	"teamId" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "submission" (
	"id" text PRIMARY KEY NOT NULL,
	"teamId" text NOT NULL,
	"stage" integer NOT NULL,
	"url" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "team" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"itemDescription" text,
	"imageUrl" text,
	"leaderId" text NOT NULL,
	"members" text[]
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "investment" ADD CONSTRAINT "investment_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "investment" ADD CONSTRAINT "investment_teamId_team_id_fk" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "submission" ADD CONSTRAINT "submission_teamId_team_id_fk" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "team" ADD CONSTRAINT "team_leaderId_user_id_fk" FOREIGN KEY ("leaderId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
