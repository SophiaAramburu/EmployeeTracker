USE buisness;

INSERT INTO department (id, name )
VALUES
(1,'CEO'),
(2,'LEAD'),
(3,'STAFF'),
(4,'HR')

INSERT INTO role 
(id, title, salary, department_id)
VALUES
(1,'CEO', '1000000.00', 1),
(2,'LEAD', '500000.00', 2),
(3,'STAFF', '400000.00', 3),
(4,'HR', '300000.00', 4)

INSERT INTO employee ( id, first_name, last_name, role_id, manager_id)
VALUES
(1,'Gucci', 'Mane', 1, 1),
(2,'Zro', 2, 1),
(3,'Dj', 'Screw', 3,2),
(4,'Project', 'Pat' 4, 3),
(5,'Juicy', 'J', 5,1);