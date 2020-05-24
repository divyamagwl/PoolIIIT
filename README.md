<h1 align="center">PoolIIIT</h1>

### Installation

Open two terminals in the main repo for backend and frontend.

Terminal 1

	cd backend
	python3 -m venv venv
	. venv/bin/activate
	pip install -r requirements.txt

Terminal 2
	
	npm install

### Run the application

Terminal 1

	python3 manage.py runserver

Terminal 2
	
	npm start

## About the repo

This is the frontend and backend of PoolIIIT website.

### Tech stack 

	Backend 	: Django and Django REST API
	Frontend	: React and Ant Design UI

Features:
---------
* User registration
* Bookings
* Filtering of overlapping bookings

API Documentation:
-----------------

i. User - Registration
Create/ Register a new user.

	Endpoint 	: /register/

For testing purposes there are 4 users and 1 admin

Admin
	Username	: admin
	Password	: admin@1234

Testing Users
	Username	: TestUser1/TestUser2/TestUser3/TestUser4
	Password 	: testing1234

ii. User - Details
Update user details/ Delete user.

	Endpoint	: /users/<username>
	Sample		: /users/admin 

iii. Update Password
Reset Password of logged in user.

	Endpoint	: /users/<username>/reset-password

iv. Booking
Create new bookings.

	Endpoint	: /booking/

v. Booking - Details
Update booking details/ Delete Booking.

	Endpoint	: /booking/details/<id>

vi. Booking - Filtering
Displays all the bookings in the same time period as the created booking.

	Endpoint	: /booking/<id>

vii. User - Bookings
Displays all the bookings of a particular user.

	Endpoint	: /user/<username>/booking

### Other Details

Database used - Sqlite3

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br/>Feel free to check [issues page](https://github.com/divyamagwl/PoolIIIT/issues).

 
## Show your support

Give a ⭐️ if you like the project!
