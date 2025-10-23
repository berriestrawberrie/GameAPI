# 🎮 Game API

## 🏁 Goal

Build an app where users choose games, start/stop a timer, and view clear statistics of played time.

## ⚙️ Requirements

Before you begin, ensure you have:

- **Node.js** (v18+ recommended)
- **npm** or **yarn**
- **PostgreSQL** installed and running
- A valid **DATABASE_URL** connection string in `.env`

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/berriestrawberrie/GameAPI.git

cd GameAPI
```

### 2. Backend setup

Go to the backend folder and install dependencies:

cd backend
npm install

Then, generate Prisma client:

npx prisma generate

### 3. Environment Variables

Create a `.env` File

Add the following connection string to your `.env` file make sure to place it in the backend folder:

```env
DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RfaWQiOjEsInNlY3VyZV9rZXkiOiJza19GM2xJYW9pNzRLZ2VzNXRjdWtkWGIiLCJhcGlfa2V5IjoiMDFLN1JHSjZLUzBHNFRGRFBCWUswOVdEU1oiLCJ0ZW5hbnRfaWQiOiJmODY0NTNjZmIyN2RlZTMyZWRlOGY1YTM3Y2ZhNWExNmY5ZjlkNTliODU3NDJmY2NlNTEyNmUwMjcwYjY3OGNkIiwiaW50ZXJuYWxfc2VjcmV0IjoiOWU4NTIyYjctMWU4OS00NzY1LTkzMjMtNWQxYmVhMjc2Y2Y4In0.QzUyCcwJgU8EbPDKcMrwx_wD3IXBAIrKVBEh3I-v5ZU"
PORT=5001
```

![ERD Diagram](/frontend/images/GameAPI.drawio.png)

### 4. Database Migration & Seeding

Run Prisma migration and seed the database with sample data:

npx prisma migrate dev
npx prisma db seed

✅ This creates the tables and populates them with initial sample users, games, and scores.

### 5. Start the Backend Server

npm run dev

Your backend should now be running at:
👉 http://localhost:5001

### 6. Frontend setup

In another terminal window, start the frontend (using a simple static server):

cd frontend
npx live-server --port=3000

Or, if you’re using VS Code:

Right-click on frontend/index.html

Choose "Open with Live Server"

Frontend will be served at:
👉 http://localhost:3000

### 7. Testing the App

Open your browser at http://localhost:3000

Create users and start new game sessions

View live statistics and charts on the User Statistics and Game Statistics pages

### 8. Registering Users

You can register a new user by selecting the single user icon.
The following fields are required:

- ✅ Valid email
- ✅ First name
- ✅ Last name

![Registration page](/frontend/images/screenshots/register.png)

### 9. User Selection

Upon successful user registraion you can select a user from the users pages.
![Users page](/frontend/images/screenshots/alluser.png)
Clicking on avatar images from the grid or the carousel will take you to their user profile page. That has their personal game play statistics.

### 10. Game Selection

After you select a user you can play any of the four populate game options from the game selection page.

![Games page](/frontend/images/screenshots/games.png)
Selecting a game will redirect you to that game timer page. Where you can play as the selected user game instructions located right ( ? ).

![Games page](/frontend/images/screenshots/play.png)

The table shows all the current scores for this game, when you submit your playtime your score will populate in the table.

### 11. Game Statistics

Summary information for all the users and their scores can be view on the game statistics page.

![Stats page](/frontend/images/screenshots/stats.png)
