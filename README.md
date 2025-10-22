# 🎮 Game API

## 🏁 Goal

Build an app where users choose games, start/stop a timer, and view clear statistics of played time.

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/berriestrawberrie/GameAPI.git
```

### 2. Create a `.env` File

Add the following connection string to your `.env` file make sure to place it in the backend folder:

```env
DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RfaWQiOjEsInNlY3VyZV9rZXkiOiJza19GM2xJYW9pNzRLZ2VzNXRjdWtkWGIiLCJhcGlfa2V5IjoiMDFLN1JHSjZLUzBHNFRGRFBCWUswOVdEU1oiLCJ0ZW5hbnRfaWQiOiJmODY0NTNjZmIyN2RlZTMyZWRlOGY1YTM3Y2ZhNWExNmY5ZjlkNTliODU3NDJmY2NlNTEyNmUwMjcwYjY3OGNkIiwiaW50ZXJuYWxfc2VjcmV0IjoiOWU4NTIyYjctMWU4OS00NzY1LTkzMjMtNWQxYmVhMjc2Y2Y4In0.QzUyCcwJgU8EbPDKcMrwx_wD3IXBAIrKVBEh3I-v5ZU"
PORT=5001
```

The database has the following structure
![ERD Diagram](/frontend/images/GameAPI.drawio.png)

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Server

make sure to cd into the backend folder:

```bash
npm run dev
```

if your server is running correctly you will the following in your terminal:

```
✅ Server running at http://localhost:5001
```

## 💻 Using the App

Run index.html file in the frontend folder.

### 1. Start the App

In a new terminal make sure to cd into the frontend folder:

```bash
npx live-server
```

if prompted to install live-server select ( y ). The application will then open in your preferred browser. You can use the left sidebar to navigate to all the pages.

### 2. Registering Users

You can register a new user by selecting the single user icon.
The following fields are required:

- ✅ Valid email
- ✅ First name
- ✅ Last name

![Registration page](/frontend/images/screenshots/register.png)

### 2. User Selection

Upon successful user registraion you can select a user from the users pages.
![Users page](/frontend/images/screenshots/alluser.png)
Clicking on avatar images from the grid or the carousel will take you to their user profile page. That has their personal game play statistics.

### 3. Game Selection

After you select a user you can play any of the four populate game options from the game selection page.

![Games page](/frontend/images/screenshots/games.png)
Selecting a game will redirect you to that game timer page. Where you can play as the selected user game instructions located right ( ? ).

![Games page](/frontend/images/screenshots/play.png)

The table shows all the current scores for this game, when you submit your playtime your score will populate in the table.

### 3. Game Statistics

Summary information for all the users and their scores can be view on the game statistics page.

![Stats page](/frontend/images/screenshots/stats.png)
