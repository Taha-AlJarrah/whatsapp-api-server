# WhatsApp API Server
# Description
This script provides a secure and efficient API server for interacting with WhatsApp using the Venom-Bot library. It allows you to automate sending text messages, files, and images, as well as monitor the connection status of the WhatsApp client. It's designed for businesses, developers, and anyone who wants to integrate WhatsApp functionality into their applications.
#
# Features
1-Send Text Messages:
- Automate sending messages to WhatsApp numbers via a REST API.

2-Send Files and Images:
- Share files, documents, or images with optional captions.

3-Connection Monitoring:
- Verify if the WhatsApp client is online and ready to send or receive messages.

4-API Key Authentication:
- Secure access to the API with an API key.

5-Swagger Documentation:
- Easily test and explore the API using Swagger's interactive UI.

6-Automatic Reconnection:
- If the WhatsApp client disconnects, the script will attempt to reconnect automatically.

7-Real-Time Communication:
- Ideal for automating notifications, alerts, or customer communication.
#
# System Requirements
- Node.js: Version 16.x or later.
- npm: Comes pre-installed with Node.js.
- Google Chrome: Latest stable version.
#
# Installation
Step 1: Clone the Repository

Clone the repository to your local system:
- `apt install git`
- `git clone https://github.com/Taha-AlJarrah/whatsapp-api-server.git`
- `cd whatsapp-api-server`
# 
Step 2: Install Dependencies

Install Node.js

Install the latest Node.js and npm (Node Package Manager):
- `curl -fsSL https://deb.nodesource.com/setup_23.x | sudo bash -`
- `sudo apt install -y nodejs`
- `npm install`
- `npm init -y`

Verify the installation:
- `node -v`
- `npm -v`
# 
Install Google Chrome

Download and install Google Chrome, which is required for Venom-Bot:
- `wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb`
- `apt install ./google-chrome-stable_current_amd64.deb`

Verify the installation:
- `google-chrome --version`
# 
Venom-Bot:

The core library for interacting with WhatsApp Web.
- `npm install venom-bot`
# 
Express:

A lightweight web framework to handle API requests.
- `npm install express`
# 
Crypto:

A built-in library for generating secure API keys.
- `npm install crypto`
# 
Swagger-UI-Express:

Integrates Swagger UI for interactive API documentation.
- `npm install swagger-ui-express`
# 
Swagger-JSDoc:

Generates Swagger-compatible documentation from JSDoc comments.
- `npm install swagger-jsdoc`
# 
Step 3: Configure the API

The API key is predefined in the script:
- `const API_KEY = '2c9a570f-4f19-48b3-b82c-8c6c7ed3d4a2';`

Use this key for all API requests.
# 
Step 4: Run the Server

Start the server:
- `node index.js`

If everything is configured correctly, you should see:

`API server is running on http://localhost:4000`

`WhatsApp client is ready.`
#
# API Usage
1-Send a Text Message
- Endpoint: `/api/message`
- Method: `GET`
- Parameters:
   - `number`: WhatsApp number (e.g., `964xxxxxxxxxx`).
   - `message`: Text message to send.
   - `api_key`: Your API key for authentication.

Example:

`curl -X GET "http://localhost:4000/api/message?number=964xxxxxxxxxx&message=Hello&api_key=2c9a570f-4f19-48b3-b82c-8c6c7ed3d4a2"`
# 
2-Send a File or Image
- Endpoint: `/api/send-file`
- Method: `POST`
- Body:
   - `number`: WhatsApp number (e.g., `964xxxxxxxxxx`).
   - `filePath`: Path to the file (e.g., `/path/to/image.jpg`).
   - `caption (optional)`: A caption for the file.
   - `api_key`: Your API key for authentication.

Example:

`curl -X POST "http://localhost:4000/api/send-file" -H "Content-Type: application/json" -d '{"number": "964xxxxxxxxxx","filePath": "/path/to/file.jpg","caption": "This is an image","api_key": "2c9a570f-4f19-48b3-b82c-8c6c7ed3d4a2"}'`
#
3-Check Connection Status
-Endpoint: `/api/status`
-Method: `GET`
-Parameters:
   - `api_key`: Your API key for authentication.

Example:

`curl -X GET "http://localhost:4000/api/status?api_key=2c9a570f-4f19-48b3-b82c-8c6c7ed3d4a2"`

Response:

`{"status": "connected"}`
#
4-Swagger API Documentation
- Access the Swagger UI for interactive API testing at:

`http://localhost:4000/api-docs/`
#
# Benefits

- Automation: Ideal for integrating WhatsApp into your applications or workflows.
- Efficiency: Reduces the need for manual messaging.
- Customization: Easily add or modify API endpoints.
- Security: Ensures access control with a robust API key mechanism.
- Documentation: Simplifies understanding and using the API.
#
# Common Issues and Solutions

1-API Key Error
- Ensure the `x-api-key` header or `api_key` parameter matches the script's API key.

2-WhatsApp Client Not Ready
- Verify that Chrome is installed and functional.
- Restart the script to reconnect to WhatsApp.

3-Port Already in Use
- If port 4000 is in use, update the port variable in the script:

`const port = 4001; // New port`
#
# Security Notes

1-API Key Protection:
- The API key ensures only authorized access. Never expose it publicly.

2-Input Validation:
- Validate inputs to prevent unauthorized or harmful requests.
#
# Developer Information

Developer: Taha Al Jarrah

Github: https://github.com/Taha-AlJarrah/

Feel free to contact me for support, contributions, or customization inquiries.
