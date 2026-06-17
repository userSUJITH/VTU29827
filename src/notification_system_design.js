Campus Notification Platform - Notification System Design
Overview
The Campus Notification Platform helps students stay informed by delivering important updates related to placements, campus events, and examination results. Students can view, manage, and receive notifications in real time through a centralized notification service.
Key Features
The platform supports the following operations:

Create a notification
View all notifications
View a specific notification
Mark a notification as read
Mark all notifications as read
Delete a notification
Receive real-time notifications


Authentication
All API requests must include a valid Bearer Token.
Required Headers
Authorization: Bearer <access_token>
Content-Type: application/json


Notification Categories
Notifications are classified into the following types:

PLACEMENT
EVENT
RESULT


1. Create Notification
Endpoint
POST /api/notifications

Request Body
{
  "studentId": 1042,
  "title": "TCS Hiring Drive",
  "message": "TCS hiring drive scheduled tomorrow",
  "type": "PLACEMENT"
}

Success Response
{
  "success": true,
  "notificationId": "ntf_001"
}

Status Code
201 Created


2. Get Notifications
Retrieves a paginated list of notifications for a student.
Endpoint
GET /api/notifications?page=1&limit=20&unreadOnly=false

Success Response
{
  "success": true,
  "count": 2,
  "notifications": [
    {
      "id": "ntf_001",
      "title": "TCS Hiring Drive",
      "message": "TCS hiring drive scheduled tomorrow",
      "type": "PLACEMENT",
      "isRead": false,
      "createdAt": "2026-06-17T10:00:00Z"
    }
  ]
}

Status Code
200 OK


3. Get Notification by ID
Fetches details of a specific notification.
Endpoint
GET /api/notifications/{notificationId}

Success Response
{
  "success": true,
  "notification": {
    "id": "ntf_001",
    "title": "TCS Hiring Drive",
    "message": "TCS hiring drive scheduled tomorrow",
    "type": "PLACEMENT",
    "isRead": false
  }
}


4. Mark Notification as Read
Updates the notification status to indicate it has been read.
Endpoint
PATCH /api/notifications/{notificationId}/read

Success Response
{
  "success": true,
  "message": "Notification marked as read"
}


5. Mark All Notifications as Read
Marks every notification for the student as read.
Endpoint
PATCH /api/notifications/read-all

Success Response
{
  "success": true,
  "message": "All notifications marked as read"
}


6. Delete Notification
Removes a notification from the system.
Endpoint
DELETE /api/notifications/{notificationId}

Success Response
{
  "success": true,
  "message": "Notification deleted successfully"
}


Notification Data Model
Each notification contains the following attributes:
{
  "id": "string",
  "studentId": "number",
  "title": "string",
  "message": "string",
  "type": "PLACEMENT | EVENT | RESULT",
  "isRead": "boolean",
  "createdAt": "timestamp"
}


Error Handling
If an operation fails, the API returns a standardized error response.
Example Error Response
{
  "success": false,
  "message": "Notification not found"
}

Common HTTP Status Codes



Status Code
Description




200
Request successful


201
Resource created successfully


400
Invalid request data


401
Authentication failed


404
Resource not found


500
Internal server error




Real-Time Notification System
Technology Used
WebSocket is used to deliver notifications instantly to connected students.
WebSocket Endpoint
ws://localhost:3000/ws/notifications

New Notification Event
Whenever a new notification is created, the server pushes the following event to connected clients:
{
  "event": "NEW_NOTIFICATION",
  "data": {
    "id": "ntf_001",
    "title": "TCS Hiring Drive",
    "message": "TCS hiring drive scheduled tomorrow",
    "type": "PLACEMENT"
  }
}

Benefits of Using WebSockets

Instant notification delivery
No need for continuous polling
Reduced API traffic and server load
Improved user experience
Supports large-scale student communication efficiently


API Summary



Method
Endpoint
Description




POST
/api/notifications
Create a new notification


GET
/api/notifications
Retrieve all notifications


GET
/api/notifications/{id}
Retrieve notification by ID


PATCH
/api/notifications/{id}/read
Mark notification as read


PATCH
/api/notifications/read-all
Mark all notifications as read


DELETE
/api/notifications/{id}
Delete a notification




