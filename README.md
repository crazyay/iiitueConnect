# IIITUEConnect

### Hosting Information
This project is hosted on a free-tier service, which means that the server might enter a sleep state during periods of inactivity. As a result, the first request after a period of inactivity may experience a delay of up to 50 seconds while the server spins up.

## Overview
**IIITUEConnect** is a web application developed to streamline the administrative processes at **IIIT Una**, providing a seamless experience for students and staff. It features two separate portals:
- A **Student Portal** for submitting applications, complaints, and registrations.
- A **Staff Portal** for reviewing submissions, managing registrations, and validating fees.

The system includes real-time notifications and email updates to keep users informed about the status of their submissions and registrations.

## Features

### Student Portal
- **User Registration & Login**: Secure registration and login functionality for students to create accounts and access their profiles.
- **Academic and Hostel Registrations**: 
   - Students can submit academic and hostel registrations, including fees.
   - After submission, students can track the status of their registrations.
- **Complaint Management**: Students can submit and track complaints related to any issue they face.
- **Notifications**: Students receive email notifications for:
   - Registration approvals, rejections, or issues.
   - Updates on their complaints and applications.
- **Receipts Submission**: During registration, students can submit fee receipts, which are validated by staff members.

### Staff Portal
- **Staff Login**: Secure access for staff members to manage the workflow.
- **Registration Review**:
   - Staff can review and validate academic and hostel registrations.
   - They can also view receipts submitted by students and validate them.
- **Application and Complaint Management**: Staff can review, approve, reject, or provide feedback on student applications and complaints.
- **Email Notifications**: Staff can send emails to students if there are any issues with the registration, receipts, or complaints.
   - Students receive confirmation emails when registrations and complaints are validated or updated.

## Technologies Used
- **Frontend**: 
   - **React.js** (for both student and staff portals)
   - HTML, CSS, JavaScript
- **Backend**: 
   - **Node.js**, **Express.js**
- **Database**: 
   - **MongoDB**
- **Authentication**: 
   - **JSON Web Tokens (JWT)** for secure user authentication.
- **Email Service**: 
   - **Nodemailer** for automated email notifications.

## Installation
To set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/iiitueconnect.git
