import { sql } from "drizzle-orm";
import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "next-auth/adapters";

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  role: text("role").notNull().default("user"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const investments = pgTable("investment", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  amount: integer("amount").notNull(),
  teamId: text("teamId")
    .notNull()
    .references(() => teams.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt", { mode: "date" })
    .notNull()
    .default(sql`now()`),
});

export const teams = pgTable("team", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  itemDescription: text("itemDescription"),
  imageUrl: text("imageUrl"),
  leaderId: text("leaderId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  members: text("members")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" })
    .array(),
});

export const submissions = pgTable("submission", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  teamId: text("teamId")
    .notNull()
    .references(() => teams.id, { onDelete: "cascade" }),
  stage: integer("stage").notNull(),
  url: text("url").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" })
    .notNull()
    .default(sql`now()`),
});
