# Streaming App

A robust streaming application built using ReactJS for the frontend and NestJS for the backend. The application supports user authentication, video streaming, real-time chat, and more.

## Table of Contents

### Streaming App

#### Table of Contents

#### About the Project

 - Built With

#### Getting Started

 - Prerequisites
 - Installation

#### Usage

 - Running the Application
 - API Endpoints

#### Project Structure

#### Contact

#### Acknowledgments

## About the Project

This project is a full-featured streaming application that allows users to stream video content, participate in real-time chat, and manage their streams. It includes user authentication, stream management, and real-time communication features.

### Built With
- ReactJS
- NestJS
- Docker
- Socket.IO


## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites
Before you begin, ensure you have the following installed:

- Docker: Install Docker from Docker's official website.
- Docker Compose: Docker Compose is included with Docker Desktop for Windows and Mac. For Linux, follow the instructions here.

#### Installation
1. Clone the repository

```
git clone https://github.com/yourusername/streaming-app.git
cd streaming-app

```

2. Verify the directory structure

Ensure your project structure looks like this:\

```
Streaming-app/
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   ├── src/
│   └── ... other backend files ...
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   ├── src/
│   └── ... other frontend files ...
└── docker-compose.yml


```

## Usage
### Running the Application

1. Navigate to your project directory:

```
cd C:\Users\Suraj\OneDrive\Desktop\Streaming-app

```

2. Build and run the containers:

```
docker-compose up --build

```

3. Access the application:
- Frontend: http://localhost:5000
- Backend: http://localhost:3000


### API Endpoints
#### Authentication
##### Signup:

- Endpoint: POST /auth/signup
- Request Body:
```
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

```

- Response:

```
{
  "token": "jwt-token",
  "user": {
    "name": "John Doe",
    "email": "john@example.com"
  }
}

```

##### Login:

- Endpoint: POST /auth/login
- Request Body:
``` 
{
  "email": "john@example.com",
  "password": "password123"
}

```
- Response:

```
{
  "token": "jwt-token",
  "user": {
    "email": "john@example.com"
  }
}
```

#### Streams
##### Create Stream:

- Endpoint: POST /streams
- Request Headers:

```

{
  "Authorization": "Bearer jwt-token"
}

```

- Request Body:

```
{
  "title": "My Stream",
  "description": "This is a test stream"
}

```

- Response:


```
{
  "id": 1,
  "title": "My Stream",
  "description": "This is a test stream",
  "user": {
    "id": 1,
    "email": "john@example.com"
  }
}

```

##### Get All Streams:

- Endpoint: GET /streams
- Response:

``` 
[
  {
    "id": 1,
    "title": "My Stream",
    "description": "This is a test stream",
    "user": {
      "id": 1,
      "email": "john@example.com"
    }
  }
]

```

##### Get Stream by ID:

- Endpoint: GET /streams/:id
- Response:


```
{
  "id": 1,
  "title": "My Stream",
  "description": "This is a test stream",
  "user": {
    "id": 1,
    "email": "john@example.com"
  }
}

```

##### Delete Stream:

- Endpoint: DELETE /streams/:id
- Request Headers:

```

{
  "Authorization": "Bearer jwt-token"
}

```
- Response:

```
{
  "message": "Stream deleted successfully"
}

```

## Project Structure

```
Streaming-app/
├── backend/
│   ├── src/
│   │   ├── auth/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── jwt.strategy.ts
│   │   │   ├── jwt-payload.interface.ts
│   │   │   └── user.entity.ts
│   │   ├── chat/
│   │   │   ├── chat.gateway.ts
│   │   │   ├── chat.module.ts
│   │   │   ├── chat.service.ts
│   │   ├── streams/
│   │   │   ├── stream.entity.ts
│   │   │   ├── streams.controller.ts
│   │   │   ├── streams.module.ts
│   │   │   ├── streams.service.ts
│   │   ├── app.module.ts
│   │   ├── main.ts
│   ├── package.json
│   ├── package-lock.json
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Chat/
│   │   │   │   ├── Chat.js
│   │   │   │   ├── Chat.css
│   │   │   ├── Stream/
│   │   │   │   ├── LiveStream/
│   │   │   │   │   ├── LiveStream.js
│   │   │   │   │   ├── LiveStream.css
│   │   │   │   ├── StartStream/
│   │   │   │   │   ├── StartStream.js
│   │   │   │   │   ├── StartStream.css
│   │   │   │   ├── Watchers/
│   │   │   │   │   ├── Watchers.js
│   │   │   │   │   ├── Watchers.css
│   │   │   ├── User/
│   │   │   │   ├── Profile/
│   │   │   │   │   ├── Profile.js
│   │   │   │   │   ├── Profile.css
│   │   │   │   ├── Auth/
│   │   │   │   │   ├── Login/
│   │   │   │   │   │   ├── Login.js
│   │   │   │   │   │   ├── Login.css
│   │   │   │   │   ├── Signup/
│   │   │   │   │   │   ├── Signup.js
│   │   │   │   │   │   ├── Signup.css
│   │   ├── context/
│   │   │   ├── AuthContext.js
│   │   ├── pages/
│   │   │   ├── Dashboard/
│   │   │   │   ├── Dashboard.js
│   │   │   │   ├── Dashboard.css
│   │   │   ├── LandingPage/
│   │   │   │   ├── LandingPage.js
│   │   │   │   ├── LandingPage.css
│   │   ├── api.js
│   │   ├── App.js
│   │   ├── index.js
│   │   ├── index.css
│   ├── package.json
│   ├── package-lock.json
│   └── Dockerfile
└── docker-compose.yml

```

## Contact
Suraj Sahu - @shaansuraj1 - surajsahu9658@gmail.com

Project Link: https://github.com/shaansuraj/streaming-app

## Acknowledgments
- ReactJS
- NestJS
- Docker
- Socket.IO
- Font Awesome
