VITE_ECOMMERCE_DB_MYSQL="CREATE TABLE customers (customer_id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(100) NOT NULL,email VARCHAR(100) UNIQUE NOT NULL,phone VARCHAR(15),address VARCHAR(100));INSERT INTO customers (name, email, phone, address) VALUES('John Doe', 'johndoe@gmail.com', '1234567890', '123 Street, City'),('Jane Smith', 'janesmith@gmail.com', '0987654321', '456 Avenue, City'),('Alice Johnson', 'alicej@gmail.com', '1112223333', '789 Boulevard, City'),('Bob Brown', 'bobb@gmail.com', '4445556666', '321 Lane, City'),('Charlie Davis', 'charlied@gmail.com', '7778889999', '654 Road, City'),('David Miller', 'davidm@gmail.com', '1231231234', '987 Square, Town'),('Emma Wilson', 'emmaw@gmail.com', '5556667777', '741 Drive, Suburb'),('Frank Harris', 'frankh@gmail.com', '8889990000', '852 Plaza, Metro'),('Grace Lee', 'gracel@gmail.com', '3334445555', '369 Court, Village'),('Henry Adams', 'henrya@gmail.com', '6667778888', '159 Lane, Downtown'),('Ivy Carter', 'ivyc@gmail.com', '2223334444', '753 Park, Uptown'),('Jack Evans', 'jacke@gmail.com', '9998887777', '951 Highway, City'),('Kelly Baker', 'kellyb@gmail.com', '1110009999', '468 Way, District'),('Liam Turner', 'liamt@gmail.com', '7776665555', '357 Path, Riverside'),('Mia Martin', 'miam@gmail.com', '6665554444', '852 Walk, Harbor'),('Nathan Scott', 'nathans@gmail.com', '4443332222', '741 Route, County'),('Olivia White', 'oliviaw@gmail.com', '9990001111', '963 Alley, Province'),('Paul Thomas', 'pault@gmail.com', '8887776666', '258 Cross, Landmark'),('Quinn Hall', 'quinnh@gmail.com', '3332221111', '147 Crescent, Seaside'),('Ryan Clark', 'ryanc@gmail.com', '5554443333', '654 Road, Town'),('Sophia Lewis', 'sophial@gmail.com', '2221110000', '369 Circle, Suburb');CREATE TABLE sellers (seller_id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(100) NOT NULL,email VARCHAR(100) UNIQUE NOT NULL,phone VARCHAR(15),address VARCHAR(100));INSERT INTO sellers (name, email, phone, address) VALUES('Tech Store', 'techstore@gmail.com', '1122334455', '789 Tech Road, City'),('Zara','zaraclothing@gmail.com','1224334458','123 New York City'),('Fashion Hub', 'fashionhub@gmail.com', '5566778899', '321 Fashion Street, City'),('Home Essentials', 'homeessentials@gmail.com', '9988776655', '147 Home Avenue, City'),('Gaming World', 'gamingworld@gmail.com', '2233445566', '258 Gamer Street, City');CREATE TABLE products (product_id INT AUTO_INCREMENT PRIMARY KEY,seller_id INT,name VARCHAR(150) NOT NULL,description VARCHAR(100),price DECIMAL(10,2) NOT NULL,stock_quantity INT NOT NULL);INSERT INTO products (seller_id, name, description, price, stock_quantity) VALUES(1, 'Laptop', 'High-performance laptop', 1200.99, 10),(1, 'Smartphone', 'Latest model smartphone', 799.49, 15),(2, 'Pants', 'Casual Pants', 19.99, 50),(2, 'Pull overs', 'Winter pull overs', 29.99, 50),(3, 'T-shirt', 'Cotton T-shirt', 19.99, 50),(3, 'Jeans', 'Denim jeans', 39.99, 30),(4, 'Coffee Maker', 'Automatic coffee maker', 89.99, 20),(4, 'Vacuum Cleaner', 'Cordless vacuum cleaner', 129.99, 15),(5, 'Gaming Console', 'Next-gen gaming console', 499.99, 8),(6, 'Gaming Chair', 'Ergonomic gaming chair', 199.99, 12); CREATE TABLE orders (order_id INT AUTO_INCREMENT PRIMARY KEY,customer_id INT,seller_id INT,order_date TIMESTAMP,status ENUM('Pending', 'Shipped', 'Delivered', 'Cancelled') DEFAULT 'Pending',total_amount DECIMAL(10,2) NOT NULL,FOREIGN KEY (seller_id) REFERENCES sellers(seller_id) ON DELETE CASCADE,FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE);INSERT INTO orders (customer_id,seller_id, order_date, status, total_amount) VALUES(1,1,'2025-02-01 10:30:00', 'Shipped', 1219.98),(2,2, '2025-02-02 15:45:00', 'Pending', 799.49),(3,2, '2025-02-03 12:15:00', 'Delivered', 169.98),(4,3, '2025-02-04 08:00:00', 'Cancelled', 499.99),(5,4, '2025-02-05 17:20:00', 'Pending', 329.98),(6,5, '2024-02-06 13:30:00', 'Shipped', 599.00),(7,1, '2024-02-07 09:10:00', 'Delivered', 749.99),(8,1, '2024-02-08 14:55:00', 'Cancelled', 279.99),(9,1, '2024-02-09 11:45:00', 'Shipped', 459.00),(10,2, '2024-02-10 16:25:00', 'Pending', 899.49),(11,2, '2024-02-11 10:00:00', 'Delivered', 110.99),(12,2, '2024-02-12 13:40:00', 'Shipped', 689.99),(1,3,'2024-02-13 07:25:00', 'Pending', 214.50),(2,3, '2024-02-14 18:10:00', 'Delivered', 555.75),(3,3, '2024-02-15 12:35:00', 'Cancelled', 799.25),(4,4, '2024-02-16 09:50:00', 'Shipped', 923.99),(5,5, '2024-02-17 15:15:00', 'Pending', 305.00),(6,3, '2024-02-18 14:20:00', 'Delivered', 488.40),(7,4, '2024-02-19 16:45:00', 'Shipped', 712.30),(8,1, '2024-02-20 08:55:00', 'Cancelled', 289.99),(9,1, '2024-02-21 14:05:00', 'Pending', 920.10),(10,2, '2024-02-22 12:10:00', 'Delivered', 470.75),(11,2, '2024-02-23 10:20:00', 'Shipped', 600.00),(12,3,'2024-02-24 15:00:00', 'Pending', 150.50),(13,2, '2024-02-25 17:30:00', 'Delivered', 899.99),(14,4,'2024-02-26 09:40:00', 'Cancelled', 120.00),(15,4, '2024-02-27 11:25:00', 'Shipped', 520.99),(16,1, '2024-02-28 14:15:00', 'Pending', 740.60),(17,1,'2024-02-29 08:10:00', 'Delivered', 315.75),(18,1,'2024-03-01 12:55:00', 'Shipped', 690.20),(1,2, '2024-03-02 10:45:00', 'Delivered', 149.99),(2,1, '2024-03-03 16:35:00', 'Pending', 299.50),(3,3, '2024-03-04 07:20:00', 'Shipped', 400.75),(4,2, '2024-03-05 12:50:00', 'Cancelled', 225.99),(5,1, '2024-03-06 18:05:00', 'Shipped', 899.00),(6,2, '2024-03-07 14:20:00', 'Delivered', 420.40); CREATE TABLE ordered_items (order_id INT,product_id INT,quantity INT NOT NULL,FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE ,primary key(order_id,product_id));INSERT INTO ordered_items (order_id, product_id, quantity) VALUES (1, 1, 2), (1, 3, 1), (2, 5, 4), (2, 2, 2), (3, 7, 3), (3, 8, 1), (4, 4, 5), (5, 6, 2), (6, 9, 3), (6, 10, 4), (7, 1, 1), (7, 5, 2), (8, 3, 3), (9, 2, 1), (9, 8, 5), (10, 4, 2), (11, 7, 4), (12, 6, 3), (12, 10, 1), (13, 9, 2), (14, 1, 5), (14, 3, 4), (15, 5, 3), (16, 2, 2), (17, 8, 1), (18, 4, 3), (19, 7, 2), (20, 6, 5), (21, 9, 1), (22, 10, 2), (23, 1, 3), (24, 5, 2), (24, 3, 4), (25, 2, 5), (26, 8, 1), (27, 4, 3), (28, 7, 2), (29, 6, 4), (30, 9, 5), (30, 10, 3), (31, 1, 1), (31, 3, 2), (32, 5, 4), (33, 2, 3), (34, 8, 5), (35, 4, 1), (36, 7, 2), (36, 10, 4);"
