create TABLE oauth_users (
  id SERIAL PRIMARY KEY,
  login VARCHAR(255),
  url VARCHAR(255),
  github_id INTEGER,
  first_login_date VARCHAR(255)
);


// creating a test item

INSERT INTO oauth_users(login, url, github_id, first_login_date ) VALUES ('vasya', 'https://github.com/users/vasya', 111, 'Mon Apr 29 2024 13:13:56 GMT+0300 (Moscow Standard Time)');