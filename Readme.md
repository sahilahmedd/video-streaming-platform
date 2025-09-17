# VideoTube - Video Streaming Platform Backend

A comprehensive backend API for a video streaming platform built with Node.js, Express.js, and MongoDB. This project provides all the essential features for a modern video sharing platform similar to YouTube.

## 🚀 Features

### User Management

- User registration and authentication
- JWT-based authentication with refresh tokens
- Password encryption using bcrypt
- User profile management (avatar, cover image)
- Channel profiles with subscriber counts
- Watch history tracking

### Video Management

- Video upload and storage using Cloudinary
- Video publishing and unpublishing
- Video search and filtering
- Pagination support
- Video metadata (title, description, duration, views)
- Thumbnail management

### Social Features

- Like system for videos, comments, and tweets
- Comment system with CRUD operations
- Subscription system for channels
- Playlist creation and management
- Tweet functionality

### Additional Features

- Health check endpoints
- Global error handling
- File upload middleware using Multer
- CORS configuration
- Cookie management
- Input validation and sanitization

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: Cloudinary
- **File Upload**: Multer
- **Password Hashing**: bcrypt
- **Pagination**: mongoose-aggregate-paginate-v2

## 📁 Project Structure

```
src/
├── controllers/          # Route handlers
│   ├── comment.controller.js
│   ├── dashboard.controller.js
│   ├── healthcheck.controller.js
│   ├── like.controller.js
│   ├── playlist.controller.js
│   ├── subscription.controller.js
│   ├── tweet.controller.js
│   ├── user.controller.js
│   └── video.controller.js
├── middlewares/          # Custom middleware
│   ├── auth.middleware.js
│   ├── globalErrorHandler.js
│   └── multer.middleware.js
├── models/              # Database models
│   ├── comment.model.js
│   ├── like.model.js
│   ├── playlist.model.js
│   ├── subscriptions.model.js
│   ├── tweet.model.js
│   ├── user.model.js
│   └── video.model.js
├── routes/              # API routes
│   ├── comment.routes.js
│   ├── healthcheck.routes.js
│   ├── likes.routes.js
│   ├── playlist.routes.js
│   ├── subscription.routes.js
│   ├── tweet.routes.js
│   ├── user.routes.js
│   └── video.routes.js
├── utils/               # Utility functions
│   ├── ApiError.js
│   ├── ApiResponse.js
│   ├── asyncHandler.js
│   └── cloudinary.js
├── db/                  # Database configuration
│   └── index.js
├── app.js              # Express app configuration
├── index.js            # Application entry point
└── constants.js        # Application constants
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Cloudinary account (for file storage)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd videos-streaming
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory with the following variables:

   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017

   # JWT Secrets
   ACCESS_TOKEN_SECRET=your_access_token_secret
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   ACCESS_TOKEN_EXPIRY=15m
   REFRESH_TOKEN_EXPIRY=7d

   # Cloudinary
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret

   # Server
   PORT=8000
   CORS_ORIGIN=http://localhost:3000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:8000` (or the port specified in your environment variables).

## 🚀 Quick Start with Postman

[![Run in Postman](https://run.pstmn.io/button.svg)](https://god.gw.postman.com/run-collection/9b32070d-279e-45f6-aa75-2384d6b18474)

## 📚 API Endpoints

### Authentication Routes (`/api/v1/users`)

- `POST /register` - User registration
- `POST /login` - User login
- `POST /logout` - User logout
- `POST /refresh-token` - Refresh access token
- `POST /change-password` - Change password
- `GET /current-user` - Get current user
- `PATCH /update-account` - Update account details
- `PATCH /avatar` - Update user avatar
- `PATCH /cover-image` - Update cover image
- `GET /c/:username` - Get channel profile
- `GET /watch-history` - Get watch history

### Video Routes (`/api/v1/users`)

- `GET /videos` - Get all videos (with pagination and search)
- `POST /videos/publish` - Publish a new video
- `GET /video/:videoId` - Get video by ID
- `PATCH /video/:videoId` - Update video
- `DELETE /video/:videoId` - Delete video
- `PATCH /video/publish/:videoId` - Toggle publish status

### Playlist Routes (`/api/v1/users`)

- `POST /playlist` - Create playlist
- `GET /playlist/user/:userId` - Get user playlists
- `GET /playlist/:playlistId` - Get playlist by ID
- `PUT /playlist/:playlistId` - Update playlist
- `DELETE /playlist/:playlistId` - Delete playlist
- `PUT /playlist/:playlistId/video/:videoId` - Add video to playlist
- `DELETE /playlist/:playlistId/video/:videoId` - Remove video from playlist

### Comment Routes (`/api/v1/users`)

- `GET /comment/:videoId` - Get video comments
- `POST /comment/:videoId` - Add comment
- `PATCH /comment/:commentId` - Update comment
- `DELETE /comment/:commentId` - Delete comment

### Like Routes (`/api/v1/users`)

- `GET /likes/videos/:userID` - Get liked videos
- `PATCH /likes/video/:videoId` - Toggle video like
- `PATCH /likes/comment/:commentId` - Toggle comment like
- `PATCH /likes/tweet/:tweetId` - Toggle tweet like

### Subscription Routes (`/api/v1/users`)

- `PATCH /channel/subscribe/:channelId` - Toggle subscription
- `GET /channel/subscribers/:channelId` - Get channel subscribers
- `GET /channel/subscriptions/:subscriberId` - Get user subscriptions

### Tweet Routes (`/api/v1/users`)

- `GET /tweets` - Get user tweets
- `POST /tweets` - Create tweet
- `PUT /tweets/:tweetId` - Update tweet
- `DELETE /tweets/:tweetId` - Delete tweet

### Health Check (`/api/v1/users`)

- `GET /health` - Health check endpoint

## 🔧 Key Features Implementation

### Authentication & Authorization

- JWT-based authentication with access and refresh tokens
- Password hashing using bcrypt
- Protected routes with middleware
- Cookie-based token storage

### File Upload

- Multer middleware for handling file uploads
- Cloudinary integration for cloud storage
- Support for multiple file types (images, videos)
- Automatic file optimization

### Database Design

- MongoDB with Mongoose ODM
- Proper schema relationships and references
- Indexing for performance optimization
- Data validation and constraints

### Error Handling

- Global error handling middleware
- Custom error classes
- Consistent API response format
- Proper HTTP status codes

## 🚀 Development

### Available Scripts

- `npm run dev` - Start development server with nodemon

### Code Quality

- Prettier configuration for code formatting
- ESLint for code linting
- Consistent code structure and naming conventions

## 🚀 Deployment

### Vercel Deployment

This project is configured for Vercel deployment with serverless functions.

1. **Install Vercel CLI**

   ```bash
   npm i -g vercel
   ```

2. **Deploy to Vercel**

   ```bash
   vercel
   ```

3. **Set Environment Variables**
   In your Vercel dashboard, add all the required environment variables:

   - `MONGODB_URI`
   - `ACCESS_TOKEN_SECRET`
   - `REFRESH_TOKEN_SECRET`
   - `ACCESS_TOKEN_EXPIRY`
   - `REFRESH_TOKEN_EXPIRY`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
   - `CORS_ORIGIN`

4. **Redeploy**
   ```bash
   vercel --prod
   ```

### Important Notes for Vercel

- The app uses serverless functions, so avoid long-running processes
- File uploads are handled via Cloudinary (not local storage)
- Database connections are managed per request
- CORS origin should be set to your frontend domain

## 📝 Environment Variables

Make sure to set up the following environment variables:

| Variable                | Description               | Required           |
| ----------------------- | ------------------------- | ------------------ |
| `MONGODB_URI`           | MongoDB connection string | Yes                |
| `ACCESS_TOKEN_SECRET`   | JWT access token secret   | Yes                |
| `REFRESH_TOKEN_SECRET`  | JWT refresh token secret  | Yes                |
| `ACCESS_TOKEN_EXPIRY`   | Access token expiry time  | Yes                |
| `REFRESH_TOKEN_EXPIRY`  | Refresh token expiry time | Yes                |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name     | Yes                |
| `CLOUDINARY_API_KEY`    | Cloudinary API key        | Yes                |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret     | Yes                |
| `PORT`                  | Server port               | No (default: 8000) |
| `CORS_ORIGIN`           | CORS allowed origin       | Yes                |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test your changes
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Sahil Ahmed**

---

_This project is completed and ready for production use._
