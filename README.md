<h1 align="center">PoolIIIT</h1>

### Installation

	python3 -m venv venv
	. venv/bin/activate
	pip install -r requirements.txt

### Run the application

	python3 manage.py runserver

## About the repo

This is the backend of PoolIIIT (frontend will be added soon). Tech stack used is Django and Django REST API.

### Features:
---------
* User registration
* Bookings
* Filtering of overlapping bookings

### API Documentation:
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

	Endpoint	: /users/<id>
	Sample		: /users/1 (Admin Profile)

iii. Booking
Create new bookings.

	Endpoint	: /booking/

iv. Booking - Details
Update booking details/ Delete Booking.

	Endpoint	: /booking/details/<id>

v. Booking - Filtering
Displays all the bookings in the same time period as the created booking.

	Endpoint	: /booking/<id>
 
### Other Details

Database used - Sqlite3

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br/>Feel free to check [issues page](https://github.com/divyamagwl/PoolIIIT/issues).

 
## Show your support

Give a ⭐️ if you like the project!
