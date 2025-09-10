# Reddit for Good - Frontend

A React-based frontend for visualizing Reddit posts on a map. Custom markers categorize posts (e.g., groceries, rides), and users can see post details via popups.


(Replace with your actual screenshot)

Features

Map visualization of Reddit posts using React Leaflet.

Custom markers based on post categories (grocery, ride, etc.).

Permanent legend showing categories on the side.

Popups with title, description, and link to Reddit post.

Responsive and hackathon-ready UI.

Tech Stack

React + Vite

Leaflet & React-Leaflet

Axios (for API calls)

TailwindCSS (styling)

Render (backend hosting)

Getting Started
Prerequisites

Node.js (v18+ recommended)

NPM or Yarn

Backend running (https://reddit-for-good-backend.onrender.com
)

Installation

Clone the repository:

git clone https://github.com/harshitsingh633/reddit-for-good-frontend.git
cd reddit-for-good-frontend


Install dependencies:

npm install
# or
yarn


Create .env file (optional):

VITE_BACKEND_URL=https://reddit-for-good-backend.onrender.com


Default backend URL will be http://localhost:5000 if .env is not provided.

Start the development server:

npm run dev
# or
yarn dev


Open your browser:

http://localhost:5173

Folder Structure
src/
  components/
    MapView.jsx        # Map and markers component
    Legend.jsx         # Permanent legend component
  App.jsx
  main.jsx

Usage

Markers on the map are automatically categorized.

Click a marker to see the post title, snippet, and Reddit link.

Legend helps identify categories at a glance.