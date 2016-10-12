CREATE TABLE IF NOT EXISTS notifications (
	uuid uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
	created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	user_uuid uuid NOT NULL,
	read_yet boolean NOT NULL DEFAULT false,
	notification jsonb NOT NULL DEFAULT '{
			"type": "text"
		}',
		CONSTRAINT exists_notification_type CHECK ((notification->>'type') IS NOT NULL)
);
