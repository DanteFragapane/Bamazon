-- Create the database
DROP DATABASE IF EXISTS `bamazon`;
CREATE DATABASE `bamazon`;

-- Create the table
CREATE TABLE bamazon.products
(
  `item_id` int
(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar
(45) NOT NULL,
  `department_name` varchar
(45) NOT NULL,
  `price` int
(11) NOT NULL,
  `stock_quantity` int
(11) NOT NULL,
  PRIMARY KEY
(`item_id`)
);

-- Insert test data
INSERT INTO bamazon.products
  (product_name,
  department_name,
  price,
  stock_quantity)
VALUES
  ('apple', 'produce', 1, 100),
  ('banana', 'produce', 1, 100),
  ('pineapple', 'produce', 1, 100),
  ('white bread', 'food', 1.65, 100),
  ('black bread', 'food', 2, 50),
  ('rye bread', 'food', 1.80, 100),
  ('ribeye', 'meat', 4.50, 75),
  ('t-bone', 'meat', 5, 75),
  ('bicycle', 'sports', 399, 10),
  ('laptop', 'electronics', 1999, 10);