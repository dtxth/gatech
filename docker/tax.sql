create table tax
(
    id serial primary key,
    region    varchar(2) not null,
    tax    float   not null
);

INSERT INTO tax (region, tax)
VALUES ('UT', 6.85),
       ('NV', 8),
       ('TX', 6.25),
       ('AL', 4),
       ('CA', 8.25);
