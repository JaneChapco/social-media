# Social Media API

This project is the backend for a basic social media application. It was created as an assignment to practice building a REST API using Node.js, Express, MongoDB, and Mongoose.

## Features

The API allows users to:

* Create, view, update, and delete users
* Create, view, update, and delete posts
* Add comments to posts
* View comments
* Delete comments from posts

Posts are associated with users, and comments are associated with both a user and a post.

## Technologies Used

* Node.js
* Express.js
* MongoDB
* Mongoose
* Postman for API testing

## Project Structure

The application uses separate routes, controllers, and models for users, posts, and comments. MongoDB is used to store the application's data, with Mongoose schemas defining the relationships between the different resources.

## Testing

The API endpoints were tested using Postman to confirm that users, posts, and comments can be created, retrieved, updated, and deleted successfully.

## Notes

This project is backend-only and does not include a React or other frontend interface.
