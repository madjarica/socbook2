INSERT INTO `user`(`username`, `email`, `first_name`, `password`, `last_name`, `active`) values ('aaa', 'aaa@aaa.com', 'abc', 'aaa', 'cba', 1);
INSERT INTO `user`(`username`, `email`, `first_name`, `password`, `last_name`, `active`) values ('zoricab', 'zorka0000@gmail.com', 'zorica', 'blabla', 'brkic', 1);

INSERT INTO `socbook2`.`role`(`type`) VALUES ('ROLE_ADMIN');
INSERT INTO `socbook2`.`role`(`type`) VALUES ('ROLE_USER');

INSERT INTO `socbook2`.`user_roles`(`user_id`,`role_id`)VALUES(1, 2);
INSERT INTO `socbook2`.`user_roles`(`user_id`,`role_id`)VALUES(2, 1);
INSERT INTO `socbook2`.`user_roles`(`user_id`,`role_id`)VALUES(2, 2);