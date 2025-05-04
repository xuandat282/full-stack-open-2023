# Phonebook Backend

This is the backend for the Phonebook application created for the Full Stack Open course.

## Live application

[Link to the application on Render.com](https://your-app-name.onrender.com)

## Development

To run the application in development mode:

```bash
# Install dependencies
npm install

# Start the development server with nodemon
npm run dev
```

## Production

To run the application in production mode:

```bash
# Install dependencies
npm install

# Start the production server
npm start
```

## Frontend Development

The frontend code is expected to be built and placed in the `dist` directory.

## Environment Variables

Create a `.env` file in the root of the project with the following variables:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/phonebook?retryWrites=true
PORT=3001
```

Replace `username`, `password`, and `cluster` with your MongoDB Atlas credentials.
