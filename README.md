# FarmSure
FarmSure is a web platform designed to connect farmers and buyers in a streamlined way. The application allows buyers to post their crop demands, and farmers can search for these demands and negotiate a deal based on availability and pricing. The goal is to facilitate smooth transactions and efficient communication between the two parties.

Features:-
Demand Posting: Buyers can create crop demands based on their specific requirements (crop type, quantity, price, etc.).
Farmer Search: Farmers can search for posted demands to find the best match for the crops they are offering.
Secure Deals: Once a match is found, farmers and buyers can finalize contracts through the platform.
Contract Management: Both farmers and buyers can manage ongoing contracts and track progress.
Responsive Design: User-friendly interface that works across all devices (desktop, tablet, mobile).


Technologies Used:-
Frontend: React.js, Tailwind CSS
Backend: Node.js, Express.js
Database: MongoDB for storing user information, demands, and contracts
Authentication: Secure JWT-based login system for buyers and farmers
File Upload: Image upload capabilities using Cloudinary
Sorting and Filtering: Buyers can sort and filter demands by crop type, price, and more.

Installation:-
Clone the repository:
git clone https://github.com/sumantahitk/FarmSure.git
cd FarmSure

Install dependencies for both frontend and backend:
cd backend
npm install
cd ../frontend
npm install

Set up environment variables:-
Backend: Create a .env file with your MongoDB URI, Cloudinary credentials, and JWT secret.
Frontend: Adjust any API endpoint URLs as necessary.
Run the application:

# Backend
cd backend
npm run dev

# Frontend
cd frontend
npm start
