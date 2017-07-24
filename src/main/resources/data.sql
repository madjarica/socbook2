INSERT INTO `user`(`username`, `email`, `first_name`, `password`, `last_name`, `active`) values ('madjarica', 'aleksandar.madjarev@gmail.com', 'Aleksandar', 'password', 'Madjarev', 1);
INSERT INTO `user`(`username`, `email`, `first_name`, `password`, `last_name`, `active`) values ('zoricab', 'zorka0000@gmail.com', 'zorica', 'blabla', 'brkic', 1);

INSERT INTO `socbook2`.`role`(`type`) VALUES ('ROLE_ADMIN');
INSERT INTO `socbook2`.`role`(`type`) VALUES ('ROLE_USER');

INSERT INTO `socbook2`.`user_roles`(`user_id`, `role_id`)VALUES(1, 1);
INSERT INTO `socbook2`.`user_roles`(`user_id`, `role_id`)VALUES(1, 2);
INSERT INTO `socbook2`.`user_roles`(`user_id`, `role_id`)VALUES(2, 1);
INSERT INTO `socbook2`.`user_roles`(`user_id`, `role_id`)VALUES(2, 2);

INSERT INTO `category`(`name`) values ("Pretrazivaci");
INSERT INTO `category`(`name`) values ("Socijalne mreze");
INSERT INTO `category`(`name`) values ("Forumi");

INSERT INTO `tag`(`name`) values ("A");
INSERT INTO `tag`(`name`) values ("B");
INSERT INTO `tag`(`name`) values ("C");

INSERT INTO `bookmark` (`created_at`, `description`, `title`, `url`, `visible`, `category_id`, `user_id`) VALUES (NOW(), "Google je pretrazivac", "Google", "http://www.google.com", true, 1, 1);
INSERT INTO `bookmark` (`created_at`, `description`, `title`, `url`, `visible`, `category_id`, `user_id`) VALUES (NOW(), "Reddit je diskusioni servis", "Reddit", "http://www.reddit.com", true, 3, 2);

INSERT INTO `socbook2`.`bookmark_tag` (`bookmark_id`, `tag_id`)VALUES(1,2);
INSERT INTO `socbook2`.`bookmark_tag` (`bookmark_id`, `tag_id`)VALUES(2,1);
INSERT INTO `socbook2`.`bookmark_tag` (`bookmark_id`, `tag_id`)VALUES(1,1);
INSERT INTO `socbook2`.`bookmark_tag` (`bookmark_id`, `tag_id`)VALUES(1,3);