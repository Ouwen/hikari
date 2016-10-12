CREATE TABLE IF NOT EXISTS redis (
		key uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    value jsonb NOT NULL
);

CREATE FUNCTION expired_redis_delete_old_rows()
RETURNS trigger AS $$
	BEGIN
		DELETE FROM redis WHERE created_at < CURRENT_TIMESTAMP - INTERVAL '1 hour';
		RETURN NEW;
	END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER expired_redis_delete_old_rows_trigger
    AFTER INSERT ON redis
    EXECUTE PROCEDURE expired_redis_delete_old_rows();
