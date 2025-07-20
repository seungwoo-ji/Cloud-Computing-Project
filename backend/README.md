# Pet Registration Backend

A Node.js/Express backend application for pet registration with image upload to AWS S3 and SQLite database storage.

## Features

- **Pet Registration**: Register pets with name, age, breed, and image
- **Image Storage**: Automatic image upload to AWS S3
- **Database**: SQLite database for pet information storage
- **API Endpoints**: RESTful API for pet management
- **React Integration**: Serves React frontend application
- **File Validation**: Supports JPEG, JPG, PNG, WEBP formats (max 5MB)

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: SQLite3
- **Cloud Storage**: AWS S3
- **Frontend**: React (served from dist folder)

## Prerequisites

- Node.js (v14 or higher)
- npm
- AWS Account with S3 bucket
- AWS IAM user with S3 permissions

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```
