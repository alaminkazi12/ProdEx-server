# ProdEx Server

This is the backend server for the ProdEx project. It handles product data, including filtering, searching, sorting, and pagination.

## Project Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/alaminkazi12/ProdEx-server.git
   cd ProdEx-server
   Install dependencies:
   ```

bash
npm install
Create a .env file in the root directory and add the following environment variables:

env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
Start the server:

bash
npm start
The server will run on http://localhost:5000.

API Endpoints
Get Products
URL: /products

Method: GET

Query Parameters:

page (number, optional): The page number for pagination. Default is 1.
limit (number, optional): Number of products per page. Default is 8.
search (string, optional): Search query for filtering products by name.
brand (string, optional): Filter products by brand.
category (string, optional): Filter products by category.
minPrice (number, optional): Minimum price filter.
maxPrice (number, optional): Maximum price filter.
sortField (string, optional): Field to sort by. Default is product_creation_date.
sortOrder (string, optional): Sort order, either asc or desc. Default is desc.
Response:

200 OK: Returns a list of products matching the query parameters.
500 Internal Server Error: If there is an error fetching products.
Running the Project Locally
Ensure MongoDB is running locally or your cloud database is accessible.

Start the server using the steps mentioned in the installation section.

Use an API client (like Postman) or integrate it with your frontend to interact with the API endpoints.

Project Structure
index.js: Entry point for the server.
routes/: Contains the API route definitions.
models/: Contains the MongoDB models.
controllers/: Contains the logic for handling requests and responses.
