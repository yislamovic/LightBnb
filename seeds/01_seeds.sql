INSERT INTO users (name, email, password)
VALUES ('Sir Wankington', 'wankington@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');

INSERT INTO users (name, email, password)
VALUES ('Tod Milton', 'TMill69@AOL.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');

INSERT INTO users (name, email, password)
VALUES ('Chad Chadson', 'THECHAD111@live.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');


INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (1, 'Shacky Shack', 'its a shack', 'www.thumnail.com/image', 'www.cover.com/image', 10, 20, 1, 1, 'Canada', '1186 OutintheWoods Drive', 'Calgary', 'Alberta', 'L1A0IR', FALSE);

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (2, 'Detatched House', 'Town House', 'www.thumnail.com/image', 'www.cover.com/image', 150, 4, 3, 4, 'Canada', '1083 Suburbs Drive', 'Toronto', 'Ontario', 'M8P0J7', TRUE);

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (3, 'Mansion', 'Exquisite Residence', 'www.thumnail.com/image', 'www.cover.com/image', 11500, 10, 8, 8, 'United States of America', '599 Toorichforyourblood Crescent', 'Los Angeles', 'California', '0999LKO', TRUE);


INSERT INTO reservations (start_date, end_date, 2, 3)
VALUES (2018-09-11, 2018-09-26);

INSERT INTO reservations (start_date, end_date, 2, 2)
VALUES (2019-01-04, 2019-02-01);

INSERT INTO reservations (start_date, end_date, 1, 4)
VALUES ( 2021-10-01, 2021-10-14);


INSERT INTO reservations (guest_id, property_id, reservation_id, rating, message)
VALUES (2, 3, 1, 3, 'messages');

INSERT INTO reservations (guest_id, property_id, reservation_id, rating, message)
VALUES (1, 2, 2, 4, 'messages');

INSERT INTO reservations (guest_id, property_id, reservation_id, rating, message)
VALUES (3, 1, 3, 4, 'messages');

