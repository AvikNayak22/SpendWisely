# SpendWisely
SpendWisely is a web-based expense tracker featuring secure authentication, income & expense tracking, categorization, data filtering and visualization capabilities.

## Features

- **User Authentication**: Easily register, login, and logout to securely access your account.
- **Transaction Management**: Add, edit, and delete transactions with ease, including details like amount, type, category, reference, and date.
- **Filtering and Sorting**: Filter and sort transactions based on date range, type, and category to quickly find the information you need.
- **Analytics**: Visualize your spending patterns over time with tabular data and charts, helping you understand where your money is going.
- **Responsive Design**: Enjoy a seamless experience across devices, whether you're using a desktop, tablet, or smartphone.

## Demo
[video (4).webm](https://github.com/AvikNayak22/SpendWisely/assets/110925067/b0103e40-5296-4965-a444-87b21d83657f)


## Technologies Used

- **Frontend**: React.js, Chakra UI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Authentication**: JSON Web Tokens (JWT), bcrypt
- **State Management**: Redux Toolkit

## Installation

1. Clone the repository:
   
   ```
    git clone https://github.com/AvikNayak22/SpendWisely.git
   ```
2. Change into the project directory: 
   ```
   cd SpendWisely
   ```
3. Install dependencies for both the client and server:
   ```
   cd client
   npm install
   ```
   ```
   cd ../server
   npm install
   ```
4. Create a `.env` file in the `server` directory with the following content:
   ```
   MONGO_URL=your-mongodb-connection-string
   JWT_KEY=your-jwt-key
   PORT=your-server-port-number
   ```
5. Start the client:
   ```
   npm run start
   ```
6. Start the server:
   ```
   npm run server
   ```
## API Endpoints
### User Routes
- **POST /api/v1/users/register:** Register a new user.
- **POST /api/v1/users/login:** Login a user.
- **POST /api/v1/users/logout:** Logout a user.
### Transaction Routes
- **POST /api/v1/transactions/add-transaction:** Add a new transaction.
- **POST /api/v1/transactions/edit-transaction:** Edit an existing transaction.
- **POST /api/v1/transactions/delete-transaction:** Delete a transaction.
- **POST /api/v1/transactions/get-transaction:** Get all transactions based on filters.

## Usage
- **Register:** Navigate to the registration page and create a new account.
- **Login:** Use your credentials to log in.
- **Add Transactions:** Add new income or expense transactions through the form.
- **View Transactions:** View your transactions in a table or as analytical charts.
- **Filter Data:** Use the filters to view transactions based on selected criteria.
- **Manage Transactions:** Edit or delete existing transactions as needed.

## Contributor
- Avik Nayak (@AvikNayak22)
