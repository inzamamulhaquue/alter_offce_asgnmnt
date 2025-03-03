Website TheAlterOffice API

Overview

The Website TheAlterOffice API is a scalable backend system designed to collect and TheAlterOffice website and mobile app analytics data. It enables clients to track user behavior, including clicks, website visits, referrer data, and device metrics. The API ensures high availability, data integrity, and efficient aggregation of analytical insights.

Features

API Key Management: Register websites/apps, generate and manage API keys.

Event Data Collection: Capture and store analytics events efficiently.

Analytics & Reporting: Fetch insights based on event type, users, and devices.

Caching: Use Redis to optimize frequent queries.

Rate Limiting: Prevent abuse of event submissions.

Authentication: Use API keys for authentication.

Dockerized Deployment: Ready for cloud hosting any where for free

Swagger Documentation: Fully documented API for easy integration.

Authentication: API Keys

Containerization: Docker

Hosting: AWS / Render / Railway

Version Control: Git & GitHub

API Endpoints

1. API Key Management

POST -/api/auth/register

Registers a new website/app and generates an API key.

GET -/api/auth/api-key

Retrieves the API key for a registered app.

POST -/api/auth/revoke

Revokes an API key to prevent further use.

2. Event Data Collection

POST -/api/analytics/collect

Submits analytics events (Authenticated using API keys).

Request Body Example
{
    "message": "Event recorded"
}

3. Analytics Endpoints

GET -/api/analytics/event-summary

Retrieves analytics summary for a specific event type.
{
    "event": "page_view",
    "count": 0,
    "deviceData": []
}

GET -/api/analytics/user-stats

Returns user statistics including event counts and device details.
{
    "userId": "user123",
    "totalEvents": 0
}

Example Response for /api/analytics/event-summary

{
  "event": "click",
  "count": 3400,
  "uniqueUsers": 1200,
  "deviceData": {
    "mobile": 2200,
    "desktop": 1200
  }
}
<!-- /////////////////////// -->

Deployment

Clone the repository:

git clone -  

Set up environment variables:

PORT=5000
MONGO_URI=mongodb://localhost:27017/analytics
REDIS_URL=redis://localhost:6379

Run Docker container:

API Documentation

Swagger is used for API documentation. Run:

npm run swagger

Access at: http://localhost:3000/api-docs

Fork the repository.

Create a new branch (feature/your-feature).

Commit your changes.

Push and create a Pull Request.

License

This README serves as a comprehensive guide for setting up, using, and contributing to the API.

