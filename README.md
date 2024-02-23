# Chat System

Chat System is a feature-rich application that includes  group chat functionalities. It is built using Next.js, TypeScript, Axios for the frontend, and Express with MongoDB for the backend. WebSocket with Redis is employed for real-time communication.

## Project Structure
`chat-system/`

`|-- client/ # Frontend code
| |-- src/
| |-- ...`

`|-- server/ # Backend code
| |-- src/
| |-- ...
|-- ...`

### Frontend

The `client` directory contains the frontend code for the project, built using Next.js and TypeScript. Primary source code is located in the `src` folder.

### Backend

The `server` directory contains the backend code for the project. Express is used for the server, MongoDB for the database, and WebSocket with Redis for real-time communication. Main source code is found in the `src` folder.

## Getting Started

To run the Chat System locally, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/chat-system.git`
2. Install dependencies:

   - Frontend: `cd client && npm install`
   - Backend: `cd server && npm install`

3. Set up MongoDB and Redis instances.

4. Start the development servers:

   - Frontend: `cd client && npm run dev`
   - Backend: `cd server && npm start`

Visit `http://localhost:3000` in your browser to access the Chat System.

## Features
- Group Chat: Engage in group conversations for effective communication.
- Real-time Updates: Utilize WebSocket for real-time message updates.
- Backend: Express server with MongoDB for efficient data storage.

## Contributing

Contributions are welcome! Feel free to open issues and pull requests to enhance the Chat System.

