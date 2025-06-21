import { pgTable, serial, integer, text, timestamp, uuid, time } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
	id: text('id').primaryKey(),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull(),
	createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).defaultNow()
});

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

// AI Scheduler tables
export const task = pgTable('task', {
	id: uuid('id').primaryKey().defaultRandom(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	title: text('title').notNull(),
	description: text('description'),
	estimatedMinutes: integer('estimated_minutes').notNull(),
	priority: integer('priority').default(1),
	createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).defaultNow()
});

export const schedule = pgTable('schedule', {
	id: uuid('id').primaryKey().defaultRandom(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	generatedAt: timestamp('generated_at', { withTimezone: true, mode: 'date' }).defaultNow(),
	startTime: time('start_time').notNull(),
	endTime: time('end_time').notNull(),
	notes: text('notes')
});

export const scheduledTask = pgTable('scheduled_task', {
	id: uuid('id').primaryKey().defaultRandom(),
	scheduleId: uuid('schedule_id')
		.notNull()
		.references(() => schedule.id, { onDelete: 'cascade' }),
	taskId: uuid('task_id')
		.notNull()
		.references(() => task.id, { onDelete: 'cascade' }),
	startTime: timestamp('start_time', { withTimezone: true, mode: 'date' }).notNull(),
	endTime: timestamp('end_time', { withTimezone: true, mode: 'date' }).notNull()
});

// Type exports
export type Session = typeof session.$inferSelect;
export type User = typeof user.$inferSelect;
export type Task = typeof task.$inferSelect;
export type Schedule = typeof schedule.$inferSelect;
export type ScheduledTask = typeof scheduledTask.$inferSelect;
