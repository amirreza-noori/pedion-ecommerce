DROP TYPE GENDER;

CREATE TYPE GENDER AS ENUM ('male', 'female');

CREATE TABLE IF NOT EXISTS users (
        id BIGSERIAL PRIMARY KEY,
        roleId INT NOT NULL,
        mobile BIGINT NOT NULL UNIQUE,
        email VARCHAR(64) UNIQUE,
        firstName VARCHAR(64),
        lastName VARCHAR(64),
        nikName VARCHAR(64),
        authorizationCode VARCHAR(64),
        gender GENDER,
        age INT,
        cash BIGINT,
        credit BIGINT,
        points BIGINT,
        password TEXT NOT NULL
);

-- INSERT INTO users (id, name, email, password)
-- 		    VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
-- 		    ON CONFLICT (id) DO NOTHING;
CREATE TABLE IF NOT EXISTS roles (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL UNIQUE
);

INSERT INTO
        roles (id, title)
VALUES
        (1, 'admin'),
        (2, 'customer'),
        (4, 'supplier'),
        (3, 'seller') ON CONFLICT (id) DO NOTHING;