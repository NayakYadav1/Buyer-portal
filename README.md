# Buyer Portal

This is a simple buyer portal I built with a React frontend and a Node.js backend. It lets users sign up, log in, and manage their favorite properties. Everything's stored in a PostgreSQL database running in Docker. Pretty straightforward, but it covers the basics of authentication and data persistence.

## What You Need
- Node.js
- Docker and Docker Compose
- Git (for cloning the repo)

## Getting Started

### 1. Grab the Code
First, clone the repository and hop into the directory:
```bash
git clone <your-repo-url>
cd buyer-portal
```

### 2. Set Up the Backend
Navigate to the backend folder and install the dependencies:
```bash
cd backend
npm install
```

### 3. Set Up the Frontend
Now, go to the frontend folder and do the same:
```bash
cd ../frontend
npm install
```

### 4. Get the Database Running
Back in the backend folder, fire up the database with Docker:
```bash
cd ../backend
docker-compose up -d
```
This spins up PostgreSQL on port 5432. Easy peasy.

## Running the App

### Kick Off the Backend
In the backend directory:
```bash
cd backend
npm run dev
```
It'll be running at `http://localhost:5000`.

### Start the Frontend
In the frontend directory:
```bash
cd frontend
npm start
```
And that'll launch at `http://localhost:3000`.

## How It Works - Some Examples

### Signing Up and Logging In
1. Head to `http://localhost:3000` in your browser.
2. Click the "Sign up" link.
3. Fill out the form with your name, email, and password (like "John Doe", "john@example.com", "password123").
4. Hit "Register" – you should see a success message, and it'll switch to login mode.
5. Log in with those same details, and boom, you're on the dashboard with a "Welcome, John Doe!" greeting.

### Managing Favorites
1. Once logged in, check out the "Available Properties" on the dashboard.
2. Click the heart icon on a property, say "Modern Apartment Downtown".
3. It'll pop over to your "My Favorite Properties" list.
4. Want to remove it? Just click "Remove from Favorites".
5. Refresh the page – your favorites stick around thanks to the database.

### Logging Out and Staying Secure
1. Hit the "Logout" button on the dashboard.
2. You're back to the login page.
3. Try hitting the back button in your browser – nope, can't sneak back to the dashboard. It's protected.

## Project Layout

Here's the folder structure to give you a sense of how things are organized:

```
buyer-portal/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── authController.js      # Handles login and signup
│   │   │   └── favoritesController.js # Manages adding/removing favorites
│   │   ├── middleware/
│   │   │   └── auth.js               # Checks JWT tokens
│   │   ├── models/
│   │   │   ├── User.js               # User database stuff
│   │   │   └── Favorite.js           # Favorites database operations
│   │   ├── routes/
│   │   │   ├── auth.js               # Auth API routes
│   │   │   └── favorites.js          # Favorites API routes
│   │   ├── utils/
│   │   │   ├── db.js                 # Database connection
│   │   │   └── initDb.js             # Sets up the tables
│   │   └── app.js                    # Main Express server
│   ├── docker-compose.yml            # PostgreSQL setup
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/               # Reusable bits
│   │   ├── pages/
│   │   │   ├── Login.js              # Login/signup page
│   │   │   └── Dashboard.js          # The main dashboard
│   │   ├── utils/
│   │   │   └── api.js                # Talks to the backend
│   │   └── App.js                    # Handles routing
│   ├── public/
│   │   └── index.html
│   └── package.json
└── README.md
```

## Security Stuff
- Passwords are hashed with bcrypt (10 rounds, so they're secure).
- JWT tokens expire after an hour.
- Each user's data is kept separate.
- All inputs are validated.
- CORS is set up so the frontend can chat with the backend.

## If Things Go Wrong

### Database Problems
```bash
# See if PostgreSQL is up
docker ps

# Check the logs
docker logs buyer-portal-postgres-1

# Wipe and restart if needed
docker-compose down -v
docker-compose up -d
```

### Port Issues
- If 5000 is taken for the backend, tweak the `PORT` in `backend/.env`.
- The frontend usually picks the next free port automatically.
- For the database, adjust the ports in `docker-compose.yml`.

### Common Glitches
- **409 Conflict**: That email's already in use – try a different one.
- **401 Unauthorized**: Wrong login details or your token expired.
- **500 Server Error**: Peek at the backend console for clues.

## API Routes

### For Authentication
- `POST /api/auth/register` - Create a new account
- `POST /api/auth/login` - Log in

### For Favorites (needs a JWT token)
- `GET /api/favorites` - Fetch your favorites
- `POST /api/favorites` - Add a property
- `DELETE /api/favorites/:propertyId` - Remove one

---