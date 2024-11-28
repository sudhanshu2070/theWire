# 🚀 Welcome to **The Wire**
A modern backend solution built with **Node.js** and **Express.js**, designed to handle login functionality seamlessly and securely. This project is deployed on **Vercel** and supports both local and public usage.

## 🛠️ **Steps to Get Started**

### **1. Clone the Repository**

Clone the repository to your local machine:
git clone <repository-url>
Replace <repository-url> with the URL of this repository.

2. Install Dependencies

Navigate to the project folder and install all required packages:
cd backend
npm install

3. Build the Application

Compile the TypeScript code into JavaScript:
npm run build

4. Start the Application

Run the application locally:
npm start
By default, the server will start at http://localhost:<port>.

5. Access the Public API

The API is hosted and available at:
https://thewire-salvatores-projects-9d7f38e8.vercel.app/api/login


### 🧪 Testing the API via Postman

1. Setting Up the Request

Open Postman.
Create a new POST request.
Enter the API endpoint URL: https://thewire-salvatores-projects-9d7f38e8.vercel.app/api/login.

2. Configuring Headers

Go to the Headers tab.
Add a new header:
Key: Content-Type
Value: application/json


3. Sending the Request

Switch to the Body tab.
Select raw.
Choose JSON from the dropdown.
Enter your request payload. For example:

json
{
    "username": "your-username",
    "password": "your-password"
}

4. Executing the Request
Click the Send button.

Check the response for authentication status and data.

📚 Additional Resources

Node.js Documentation
Express.js Documentation
Vercel Deployment Guide