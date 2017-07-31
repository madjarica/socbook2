INSERT INTO `user`(`username`, `email`, `first_name`, `password`, `last_name`, `active`) VALUES ('madjarica', 'aleksandar.madjarev@gmail.com', 'Aleksandar', 'password', 'Madjarev', 1);
INSERT INTO `user`(`username`, `email`, `first_name`, `password`, `last_name`, `active`) VALUES ('zoricab', 'zorka0000@gmail.com', 'zorica', 'blabla', 'brkic', 1);
INSERT INTO `user`(`username`, `email`, `first_name`, `password`, `last_name`, `active`) VALUES ('zoki', 'zoki@gmail.com', 'Zoran', 'zokicar', 'Jankov', 1);
INSERT INTO `user`(`username`, `email`, `first_name`, `password`, `last_name`, `active`) VALUES ('boba', 'boba@gmail.com', 'Boba', '123456', 'Brkic', 1);
INSERT INTO `user`(`username`, `email`, `first_name`, `password`, `last_name`, `active`) VALUES ('admin', 'admin@gmail.com', 'Admin', 'admin', 'Admin', 1);
INSERT INTO `user`(`username`, `email`, `first_name`, `password`, `last_name`, `active`) VALUES ('user', 'user@gmail.com', 'User', 'user', 'User', 1);

INSERT INTO `socbook2`.`role`(`type`) VALUES ('ROLE_ADMIN');
INSERT INTO `socbook2`.`role`(`type`) VALUES ('ROLE_USER');

INSERT INTO `socbook2`.`user_roles`(`user_id`, `role_id`) VALUES (1, 1);
INSERT INTO `socbook2`.`user_roles`(`user_id`, `role_id`) VALUES (1, 2);
INSERT INTO `socbook2`.`user_roles`(`user_id`, `role_id`) VALUES (2, 1);
INSERT INTO `socbook2`.`user_roles`(`user_id`, `role_id`) VALUES (2, 2);
INSERT INTO `socbook2`.`user_roles`(`user_id`, `role_id`) VALUES (3, 2);
INSERT INTO `socbook2`.`user_roles`(`user_id`, `role_id`) VALUES (4, 2);
INSERT INTO `socbook2`.`user_roles`(`user_id`, `role_id`) VALUES (5, 1);
INSERT INTO `socbook2`.`user_roles`(`user_id`, `role_id`) VALUES (5, 2);
INSERT INTO `socbook2`.`user_roles`(`user_id`, `role_id`) VALUES (6, 2);

INSERT INTO `category`(`name`) VALUES ("Pretrazivaci");
INSERT INTO `category`(`name`) VALUES ("Socijalne mreze");
INSERT INTO `category`(`name`) VALUES ("Forumi");
INSERT INTO `category`(`name`) VALUES ("Email servisi");
INSERT INTO `category`(`name`) VALUES ("Vesti");
INSERT INTO `category`(`name`) VALUES ("Development");
INSERT INTO `category`(`name`) VALUES ("Posao");
INSERT INTO `category`(`name`) VALUES ("Razno");
INSERT INTO `category`(`name`) VALUES ("Oglasi");

INSERT INTO `tag`(`name`) VALUES ("Pretraga");
INSERT INTO `tag`(`name`) VALUES ("Popular");
INSERT INTO `tag`(`name`) VALUES ("Top");
INSERT INTO `tag`(`name`) VALUES ("Zanimljivo");
INSERT INTO `tag`(`name`) VALUES ("Besplatno");
INSERT INTO `tag`(`name`) VALUES ("Portal");
INSERT INTO `tag`(`name`) VALUES ("Zabava");
INSERT INTO `tag`(`name`) VALUES ("Kultura");
INSERT INTO `tag`(`name`) VALUES ("Video");
INSERT INTO `tag`(`name`) VALUES ("Muzika");

INSERT INTO `bookmark` (`created_date`, `description`, `title`, `url`, `visible`, `category_id`, `user_id`) VALUES (NOW(), "Gummi bears marzipan marzipan sweet roll sugar plum. Gummies sesame snaps sweet chocolate bar dragée tiramisu danish icing chupa chups. Pie tootsie roll cake pudding. Soufflé bonbon muffin. Sweet jujubes biscuit. Chocolate bar tiramisu carrot cake carrot cake. Brownie dessert cake powder. Danish chocolate muffin danish powder danish.", "Google", "http://www.google.com", true, 1, 1);
INSERT INTO `bookmark` (`created_date`, `description`, `title`, `url`, `visible`, `category_id`, `user_id`) VALUES (NOW(), "Topping gummi bears caramels gummi bears fruitcake cake sweet roll liquorice cake. Donut jelly beans carrot cake sesame snaps. Liquorice bear claw halvah. Apple pie sweet roll wafer bear claw chocolate cake chocolate. Chupa chups tart apple pie sweet cake gummies. Cake bonbon tootsie roll biscuit danish croissant. Sugar plum tart sweet. Pastry chocolate halvah jujubes sesame snaps tart cotton candy pastry.", "Reddit", "http://www.reddit.com", true, 3, 2);
INSERT INTO `bookmark` (`created_date`, `description`, `title`, `url`, `visible`, `category_id`, `user_id`) VALUES (NOW(), "Lemon drops cheesecake cotton candy donut muffin chupa chups chupa chups dragée gummies. Pie toffee topping dessert. Macaroon jelly ice cream. Brownie cotton candy dragée sweet gummi bears cupcake sweet. Biscuit marshmallow jujubes. Wafer dragée cupcake jelly beans icing tart marzipan carrot cake. Lollipop candy canes bonbon pudding sweet roll powder liquorice. Sweet icing soufflé lollipop. Dessert apple pie jujubes cheesecake sweet roll marshmallow dessert.", "Facebook", "http://www.facebook.com", true, 2, 4);
INSERT INTO `bookmark` (`created_date`, `description`, `title`, `url`, `visible`, `category_id`, `user_id`) VALUES (NOW(), "Gummi bears marzipan marzipan sweet roll sugar plum. Gummies sesame snaps sweet chocolate bar dragée tiramisu danish icing chupa chups. Pie tootsie roll cake pudding. Soufflé bonbon muffin. Sweet jujubes biscuit. Chocolate bar tiramisu carrot cake carrot cake. Brownie dessert cake powder. Danish chocolate muffin danish powder danish.", "Instagram", "http://www.instagram.com", true, 2, 2);
INSERT INTO `bookmark` (`created_date`, `description`, `title`, `url`, `visible`, `category_id`, `user_id`) VALUES (NOW(), "Topping gummi bears caramels gummi bears fruitcake cake sweet roll liquorice cake. Donut jelly beans carrot cake sesame snaps. Liquorice bear claw halvah. Apple pie sweet roll wafer bear claw chocolate cake chocolate. Chupa chups tart apple pie sweet cake gummies. Cake bonbon tootsie roll biscuit danish croissant. Sugar plum tart sweet. Pastry chocolate halvah jujubes sesame snaps tart cotton candy pastry.", "BBC", "http://www.bbc.com", true, 5, 3);
INSERT INTO `bookmark` (`created_date`, `description`, `title`, `url`, `visible`, `category_id`, `user_id`) VALUES (NOW(), "Lemon drops cheesecake cotton candy donut muffin chupa chups chupa chups dragée gummies. Pie toffee topping dessert. Macaroon jelly ice cream. Brownie cotton candy dragée sweet gummi bears cupcake sweet. Biscuit marshmallow jujubes. Wafer dragée cupcake jelly beans icing tart marzipan carrot cake. Lollipop candy canes bonbon pudding sweet roll powder liquorice. Sweet icing soufflé lollipop. Dessert apple pie jujubes cheesecake sweet roll marshmallow dessert.", "StackOverflow", "http://www.stackoverflow.com", true, 6, 1);
INSERT INTO `bookmark` (`created_date`, `description`, `title`, `url`, `visible`, `category_id`, `user_id`) VALUES (NOW(), "Gummi bears marzipan marzipan sweet roll sugar plum. Gummies sesame snaps sweet chocolate bar dragée tiramisu danish icing chupa chups. Pie tootsie roll cake pudding. Soufflé bonbon muffin. Sweet jujubes biscuit. Chocolate bar tiramisu carrot cake carrot cake. Brownie dessert cake powder. Danish chocolate muffin danish powder danish.", "Gmail", "http://mail.google.com", true, 4, 3);
INSERT INTO `bookmark` (`created_date`, `description`, `title`, `url`, `visible`, `category_id`, `user_id`) VALUES (NOW(), "Lemon drops cheesecake cotton candy donut muffin chupa chups chupa chups dragée gummies. Pie toffee topping dessert. Macaroon jelly ice cream. Brownie cotton candy dragée sweet gummi bears cupcake sweet. Biscuit marshmallow jujubes. Wafer dragée cupcake jelly beans icing tart marzipan carrot cake. Lollipop candy canes bonbon pudding sweet roll powder liquorice. Sweet icing soufflé lollipop. Dessert apple pie jujubes cheesecake sweet roll marshmallow dessert.", "Kupujem Prodajem", "http://www.kupujemprodajem.com", true, 8, 1);
INSERT INTO `bookmark` (`created_date`, `description`, `title`, `url`, `visible`, `category_id`, `user_id`) VALUES (NOW(), "Topping gummi bears caramels gummi bears fruitcake cake sweet roll liquorice cake. Donut jelly beans carrot cake sesame snaps. Liquorice bear claw halvah. Apple pie sweet roll wafer bear claw chocolate cake chocolate. Chupa chups tart apple pie sweet cake gummies. Cake bonbon tootsie roll biscuit danish croissant. Sugar plum tart sweet. Pastry chocolate halvah jujubes sesame snaps tart cotton candy pastry.", "IMDB", "http://www.imdb.com", true, 7, 4);

INSERT INTO `socbook2`.`bookmark_tag` (`bookmark_id`, `tag_id`) VALUES (1, 2);
INSERT INTO `socbook2`.`bookmark_tag` (`bookmark_id`, `tag_id`) VALUES (1, 1);
INSERT INTO `socbook2`.`bookmark_tag` (`bookmark_id`, `tag_id`) VALUES (1, 3);
INSERT INTO `socbook2`.`bookmark_tag` (`bookmark_id`, `tag_id`) VALUES (2, 1);
INSERT INTO `socbook2`.`bookmark_tag` (`bookmark_id`, `tag_id`) VALUES (2, 5);
INSERT INTO `socbook2`.`bookmark_tag` (`bookmark_id`, `tag_id`) VALUES (2, 4);
INSERT INTO `socbook2`.`bookmark_tag` (`bookmark_id`, `tag_id`) VALUES (3, 6);
INSERT INTO `socbook2`.`bookmark_tag` (`bookmark_id`, `tag_id`) VALUES (3, 7);
INSERT INTO `socbook2`.`bookmark_tag` (`bookmark_id`, `tag_id`) VALUES (4, 5);
INSERT INTO `socbook2`.`bookmark_tag` (`bookmark_id`, `tag_id`) VALUES (5, 8);
INSERT INTO `socbook2`.`bookmark_tag` (`bookmark_id`, `tag_id`) VALUES (5, 4);
INSERT INTO `socbook2`.`bookmark_tag` (`bookmark_id`, `tag_id`) VALUES (5, 7);
INSERT INTO `socbook2`.`bookmark_tag` (`bookmark_id`, `tag_id`) VALUES (5, 9);
INSERT INTO `socbook2`.`bookmark_tag` (`bookmark_id`, `tag_id`) VALUES (6, 3);
INSERT INTO `socbook2`.`bookmark_tag` (`bookmark_id`, `tag_id`) VALUES (7, 5);
INSERT INTO `socbook2`.`bookmark_tag` (`bookmark_id`, `tag_id`) VALUES (7, 8);
INSERT INTO `socbook2`.`bookmark_tag` (`bookmark_id`, `tag_id`) VALUES (8, 3);
INSERT INTO `socbook2`.`bookmark_tag` (`bookmark_id`, `tag_id`) VALUES (8, 2);
INSERT INTO `socbook2`.`bookmark_tag` (`bookmark_id`, `tag_id`) VALUES (9, 7);
INSERT INTO `socbook2`.`bookmark_tag` (`bookmark_id`, `tag_id`) VALUES (9, 1);

INSERT INTO `comment`(`comment_content`,`created_date`, `user_id`, `bookmark_id`, `rate_mark`) VALUES ("Fejsbuk je strava", NOW(), 3, 3, 4);
INSERT INTO `comment`(`comment_content`,`created_date`, `user_id`, `bookmark_id`, `rate_mark`) VALUES ("Fejsbuk je super", NOW(), 2, 3, 3);
INSERT INTO `comment`(`comment_content`,`created_date`, `user_id`, `bookmark_id`, `rate_mark`) VALUES ("Fejsbuk propo", NOW(), 1, 3, 2);