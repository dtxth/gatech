create table discount
(
    id serial primary key,
    cost    FLOAT not null,
    discount    FLOAT   not null
);

INSERT INTO discount (cost, discount)
VALUES (1000, 3),
       (5000, 5),
       (7000, 7),
       (10000, 10),
       (50000, 15);
