CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    mobile VARCHAR(15) NOT NULL,
    amount NUMERIC NOT NULL,
    purpose TEXT NOT NULL,
    language VARCHAR(20) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);