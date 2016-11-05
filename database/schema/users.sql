/*
    Users Table
 */
CREATE TABLE IF NOT EXISTS users (
    uuid uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,

    name varchar(128) NOT NULL,
    email varchar(128) NOT NULL UNIQUE,
        CONSTRAINT valid_email CHECK ((email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$') AND
                                      (email = lower(email))),
    hashed_password varchar(128) NOT NULL,
    salt varchar(128) NOT NULL,
    role varchar(128) NOT NULL DEFAULT 'user',
        CONSTRAINT valid_role CHECK (role = ANY (ARRAY['user', 'admin']))
  );

CREATE TABLE IF NOT EXISTS users_reset_password (
    user_uuid uuid REFERENCES users(uuid) ON DELETE CASCADE,
    reset_password_token uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    reset_password_expires timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP + INTERVAL '1 hour'
);
