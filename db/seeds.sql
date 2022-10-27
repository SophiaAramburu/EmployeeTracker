USE buisness;

INSERT INTO department (department_name)
VALUES
('CEO'),
('LEAD'),
('STAFF'),
('HR');

INSERT INTO role (title, salary, department_id)
VALUES
('CEO', 1000000, 1),
('LEAD', 500000, 2),
('STAFF', 400000, 3),
('HR', 300000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Gucci', 'Mane', 1, 1),
('Zro', 'G', 2, 1),
('Dj', 'Screw', 3,2),
('Project', 'Pat', 4, 3),
('Juicy', 'J', 5,1);