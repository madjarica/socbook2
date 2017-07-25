INSERT INTO `user`(`username`, `email`, `first_name`, `password`, `last_name`, `active`) values ('madjarica', 'aleksandar.madjarev@gmail.com', 'Aleksandar', 'password', 'Madjarev', 1);
INSERT INTO `user`(`username`, `email`, `first_name`, `password`, `last_name`, `active`) values ('zoricab', 'zorka0000@gmail.com', 'zorica', 'blabla', 'brkic', 1);
INSERT INTO `user`(`username`, `email`, `first_name`, `password`, `last_name`, `active`) values ('zoki', 'zoki@gmail.com', 'Zoran', 'zokicar', 'Jankov', 1);
INSERT INTO `user`(`username`, `email`, `first_name`, `password`, `last_name`, `active`) values ('boba', 'boba@gmail.com', 'Boba', '123456', 'Brkic', 1);

INSERT INTO `socbook2`.`role`(`type`) VALUES ('ROLE_ADMIN');
INSERT INTO `socbook2`.`role`(`type`) VALUES ('ROLE_USER');

INSERT INTO `socbook2`.`user_roles`(`user_id`, `role_id`)VALUES(1, 1);
INSERT INTO `socbook2`.`user_roles`(`user_id`, `role_id`)VALUES(1, 2);
INSERT INTO `socbook2`.`user_roles`(`user_id`, `role_id`)VALUES(2, 1);
INSERT INTO `socbook2`.`user_roles`(`user_id`, `role_id`)VALUES(2, 2);
INSERT INTO `socbook2`.`user_roles`(`user_id`, `role_id`)VALUES(3, 2);
INSERT INTO `socbook2`.`user_roles`(`user_id`, `role_id`)VALUES(4, 2);

INSERT INTO `category`(`name`) values ("Pretrazivaci");
INSERT INTO `category`(`name`) values ("Socijalne mreze");
INSERT INTO `category`(`name`) values ("Forumi");

INSERT INTO `tag`(`name`) values ("A");
INSERT INTO `tag`(`name`) values ("B");
INSERT INTO `tag`(`name`) values ("C");
INSERT INTO `tag`(`name`) values ("Pretraga");
INSERT INTO `tag`(`name`) values ("Popular");
INSERT INTO `tag`(`name`) values ("Top");

INSERT INTO `bookmark` (`created_at`, `description`, `title`, `url`, `visible`, `category_id`, `user_id`) VALUES (NOW(), "Google je pretrazivac", "Google", "http://www.google.com", true, 1, 1);
INSERT INTO `bookmark` (`created_at`, `description`, `title`, `url`, `visible`, `category_id`, `user_id`) VALUES (NOW(), "Reddit je diskusioni servis", "Reddit", "http://www.reddit.com", true, 3, 2);
INSERT INTO `bookmark` (`created_at`, `description`, `title`, `url`, `visible`, `category_id`, `user_id`) VALUES (NOW(), "Facebook je socijalna mreza", "Facebook", "http://www.facebook.com", true, 2, 4);
INSERT INTO `bookmark` (`created_at`, `description`, `title`, `url`, `visible`, `category_id`, `user_id`) VALUES (NOW(), "Instagram je socijalna mreza", "Instagram", "http://www.instagram.com", true, 2, 2);

INSERT INTO `socbook2`.`bookmark_tag` (`bookmark_id`, `tag_id`)VALUES(1,2);
INSERT INTO `socbook2`.`bookmark_tag` (`bookmark_id`, `tag_id`)VALUES(2,1);
INSERT INTO `socbook2`.`bookmark_tag` (`bookmark_id`, `tag_id`)VALUES(1,1);
INSERT INTO `socbook2`.`bookmark_tag` (`bookmark_id`, `tag_id`)VALUES(1,3);

INSERT INTO `comment`(`comment_content`,`created_at`, `bookmark_id`, `user_id`) VALUES ("Fejsbuk je strava", NOW(), 3, 3);
