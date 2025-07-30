# 🎓 IIIT Una Connect

<div align="center">
  <img src="https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-18.x-green?style=for-the-badge&logo=node.js" alt="Node.js" />
  <img src="https://img.shields.io/badge/MongoDB-6.0-green?style=for-the-badge&logo=mongodb" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Stripe-Payment-purple?style=for-the-badge&logo=stripe" alt="Stripe" />
</div>

## 📋 Table of Contents
- [Overview](#overview)
- [System Architecture](#system-architecture)
- [UML Diagram](#uml-diagram)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [API Endpoints](#api-endpoints)
- [UI/UX Design System](#uiux-design-system)
- [Deployment](#deployment)
- [Contributing](#contributing)

## 🌟 Overview

**IIIT Una Connect** is a comprehensive web application designed to streamline administrative processes at **Indian Institute of Information Technology Una**. The platform provides a unified digital ecosystem for students and administrators, featuring modern UI/UX design, secure authentication, and efficient workflow management.

### 🎯 Key Objectives
- **Digitize** traditional paper-based administrative processes
- **Streamline** student registration and complaint management
- **Enhance** communication between students and administration
- **Provide** real-time tracking and notifications
- **Ensure** secure and efficient fee payment processing

### 🏗️ System Architecture

The application follows a **microservices architecture** with separate frontend applications for different user roles:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Student       │    │   Admin         │    │   Backend       │
│   Frontend      │    │   Frontend      │    │   API Server    │
│   (React)       │    │   (React)       │    │   (Node.js)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   MongoDB       │
                    │   Database      │
                    └─────────────────┘
```

## 🔄 UML Diagram

### System Component Diagram

```mermaid
graph TB
    subgraph "Frontend Layer"
        SF[Student Frontend<br/>React App]
        AF[Admin Frontend<br/>React App]
    end
    
    subgraph "API Layer"
        API[Express.js API Server]
        AUTH[JWT Authentication]
        MAIL[Email Service<br/>Nodemailer]
        PAY[Payment Gateway<br/>Stripe]
    end
    
    subgraph "Data Layer"
        DB[(MongoDB Database)]
        FS[File Storage<br/>Multer]
    end
    
    SF --> API
    AF --> API
    API --> AUTH
    API --> MAIL
    API --> PAY
    API --> DB
    API --> FS
    
    classDef frontend fill:#e1f5fe
    classDef api fill:#f3e5f5
    classDef data fill:#e8f5e8
    
    class SF,AF frontend
    class API,AUTH,MAIL,PAY api
    class DB,FS data
```

### Database Schema Overview

```mermaid
erDiagram
    USER {
        string id PK
        string email
        string password
        string name
        string rollNo
        string role
        date createdAt
    }
    
    ACADEMIC_REGISTRATION {
        string id PK
        string userId FK
        string semester
        string course
        string status
        string receiptFile
        date submittedAt
    }
    
    HOSTEL_REGISTRATION {
        string id PK
        string userId FK
        string hostelName
        string messName
        number feeAmount
        string receiptNo
        string status
        date submittedAt
    }
    
    COMPLAINT {
        string id PK
        string userId FK
        string type
        string description
        string status
        string resolution
        date submittedAt
        date resolvedAt
    }
    
    PLACEMENT {
        string id PK
        string userId FK
        string company
        number package
        string position
        date placementDate
    }
    
    PAYMENT {
        string id PK
        string userId FK
        number amount
        string stripeSessionId
        string status
        date createdAt
    }
    
    USER ||--o{ ACADEMIC_REGISTRATION : submits
    USER ||--o{ HOSTEL_REGISTRATION : submits
    USER ||--o{ COMPLAINT : files
    USER ||--o{ PLACEMENT : has
    USER ||--o{ PAYMENT : makes
```

## ✨ Features

### 👨‍🎓 Student Portal

#### 🔐 Authentication & Profile
- **Secure Registration** with email verification
- **JWT-based Login** with session management
- **Profile Management** with personal information updates
- **Password Reset** functionality

#### 📚 Academic Services
- **Academic Registration** with semester selection
- **Course Enrollment** with prerequisite validation
- **Grade Tracking** and academic progress monitoring
- **Certificate Requests** with digital delivery

#### 🏠 Hostel Management
- **Hostel Registration** with room preferences
- **Mess Registration** with meal plan selection
- **Fee Payment** with receipt upload
- **Room Allocation** status tracking

#### 💳 Payment System
- **Secure Fee Payment** via Stripe integration
- **Two-step Payment Process** for better UX
- **Payment History** with downloadable receipts
- **Multiple Payment Methods** support

#### 📝 Complaint Management
- **Complaint Submission** with categorization
- **Real-time Status Tracking** with notifications
- **Resolution Comments** and feedback system
- **Complaint History** with search functionality

#### 🎯 Placement Services
- **Placement Registration** for job opportunities
- **Company Information** and job descriptions
- **Application Tracking** with status updates
- **Interview Scheduling** and notifications

### 👨‍💼 Admin Portal

#### 📊 Dashboard & Analytics
- **Comprehensive Dashboard** with key metrics
- **Real-time Statistics** and data visualization
- **User Activity Monitoring** and reports
- **System Health** monitoring

#### 👥 User Management
- **Student Registration** approval workflow
- **User Role Management** and permissions
- **Account Status** control and monitoring
- **Bulk Operations** for efficiency

#### 📋 Application Processing
- **Academic Registration** review and approval
- **Hostel Registration** processing with room assignment
- **Document Verification** with file preview
- **Batch Processing** for multiple applications

#### 🎫 Complaint Resolution
- **Complaint Assignment** to appropriate departments
- **Resolution Tracking** with timeline
- **Automated Notifications** to students
- **Performance Metrics** and reporting

#### 🏢 Placement Management
- **Company Registration** and profile management
- **Job Posting** creation and management
- **Student-Company Matching** algorithms
- **Placement Statistics** and success tracking

#### 🖼️ Content Management
- **Gallery Management** with image categorization
- **News & Events** posting and scheduling
- **Announcement System** with targeted delivery
- **Media Library** organization

## 🛠️ Technology Stack

### Frontend Technologies
- **React 18.2.0** - Modern UI library with hooks
- **React Router 6.x** - Client-side routing
- **Tailwind CSS 3.x** - Utility-first CSS framework
- **FontAwesome** - Icon library for consistent iconography
- **React Toastify** - Toast notifications
- **Stripe React** - Payment processing components

### Backend Technologies
- **Node.js 18.x** - JavaScript runtime environment
- **Express.js 4.x** - Web application framework
- **MongoDB 6.0** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing
- **Multer** - File upload handling
- **Nodemailer** - Email service integration
- **Stripe** - Payment processing

### Development Tools
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **Git** - Version control
- **npm/yarn** - Package management

## 📁 Project Structure

```
iiiteconnect/
├── 📁 frontend/                 # Student Portal (React)
│   ├── 📁 public/
│   ├── 📁 src/
│   │   ├── 📁 components/       # React components
│   │   │   ├── Nav.js          # Navigation component
│   │   │   ├── Home.js         # Home page
│   │   │   ├── Login.js        # Authentication
│   │   │   ├── Paymentform.js  # Payment processing
│   │   │   ├── Hostelform.js   # Hostel registration
│   │   │   ├── Complaint.js    # Complaint management
│   │   │   └── Placements.js   # Placement services
│   │   ├── App.js              # Main app component
│   │   └── index.js            # Entry point
│   ├── package.json
│   └── tailwind.config.js
├── 📁 adminfrontend/            # Admin Portal (React)
│   ├── 📁 src/
│   │   ├── 📁 components/       # Admin components
│   │   │   ├── Nav.js          # Admin navigation
│   │   │   ├── Home.js         # Admin dashboard
│   │   │   ├── Complaints.js   # Complaint management
│   │   │   ├── Gallery.js      # Gallery management
│   │   │   ├── News.js         # News management
│   │   │   ├── HostelReg.js    # Hostel registrations
│   │   │   └── Placements.js   # Placement management
│   │   └── App.js
│   └── package.json
├── 📁 backend/                  # API Server (Node.js)
│   ├── 📁 routes/              # API routes
│   ├── 📁 models/              # Database models
│   ├── 📁 middleware/          # Custom middleware
│   ├── 📁 uploads/             # File uploads
│   ├── server.js               # Server entry point
│   └── package.json
├── 📄 README.md                # This file
└── 📄 .env.example             # Environment variables template
```

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** (v18.x or higher)
- **MongoDB** (v6.0 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/iiiteconnect.git
cd iiiteconnect
```

### 2. Environment Setup
Create environment files for each component:

#### Backend Environment (.env)
```bash
# Database
MONGODB_URI=mongodb://localhost:27017/iiiteconnect

# JWT Secret
JWT_SECRET=your_jwt_secret_key_here

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Server Configuration
PORT=5000
NODE_ENV=development
```

#### Frontend Environment (.env)
```bash
# API Configuration
REACT_APP_API_BASE_URL=http://localhost:5000/api

# Stripe Configuration
REACT_APP_STRIPE_KEY=pk_test_your_stripe_publishable_key
```

#### Admin Frontend Environment (.env)
```bash
# API Configuration
REACT_APP_API_BASE_URL=http://localhost:5000/api
```

### 3. Backend Setup
```bash
cd backend
npm install
npm start
```

### 4. Frontend Setup (Student Portal)
```bash
cd frontend
npm install
npm start
```

### 5. Admin Frontend Setup
```bash
cd adminfrontend
npm install
npm start
```

### 6. Database Setup
Ensure MongoDB is running locally or configure connection to MongoDB Atlas:
```bash
# Start MongoDB locally
mongod

# Or use MongoDB Atlas connection string
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/iiiteconnect
```

## 🔗 API Endpoints

### Authentication
```
POST   /api/auth/register     # User registration
POST   /api/auth/login        # User login
POST   /api/auth/logout       # User logout
POST   /api/auth/reset        # Password reset
GET    /api/auth/verify       # Email verification
```

### Academic Registration
```
GET    /api/academic          # Get all registrations
POST   /api/academic          # Submit registration
PUT    /api/academic/:id      # Update registration
DELETE /api/academic/:id      # Delete registration
POST   /api/academic/:id/approve  # Approve registration
```

### Hostel Management
```
GET    /api/hostel            # Get hostel registrations
POST   /api/hostel            # Submit hostel registration
PUT    /api/hostel/:id        # Update registration
POST   /api/hostel/:id/approve    # Approve registration
```

### Complaint Management
```
GET    /api/complaints        # Get all complaints
POST   /api/complaints        # Submit complaint
PUT    /api/complaints/:id    # Update complaint
POST   /api/complaints/:id/resolve  # Resolve complaint
```

### Payment Processing
```
POST   /api/fees/payment      # Create payment session
POST   /api/fees/success      # Payment success webhook
GET    /api/fees/history      # Payment history
```

### Placement Management
```
GET    /api/placements        # Get placement data
POST   /api/placements        # Add placement record
PUT    /api/placements/:id    # Update placement
DELETE /api/placements/:id    # Delete placement
```

### Content Management
```
GET    /api/gallery           # Get gallery images
POST   /api/gallery           # Upload image
DELETE /api/gallery/:id       # Delete image
GET    /api/news              # Get news/events
POST   /api/news              # Create news/event
PUT    /api/news/:id          # Update news/event
```

## 🎨 UI/UX Design System

### Color Palette
```css
/* Primary Colors */
--primary-blue: #2563eb
--primary-blue-dark: #1d4ed8
--primary-blue-light: #3b82f6

/* Secondary Colors */
--secondary-gray: #6b7280
--secondary-gray-light: #9ca3af
--secondary-gray-dark: #374151

/* Status Colors */
--success-green: #10b981
--warning-yellow: #f59e0b
--error-red: #ef4444
--info-blue: #06b6d4

/* Background Colors */
--bg-primary: #ffffff
--bg-secondary: #f8fafc
--bg-tertiary: #e2e8f0
```

### Typography
```css
/* Font Families */
--font-primary: 'Inter', sans-serif
--font-secondary: 'Roboto', sans-serif

/* Font Sizes */
--text-xs: 0.75rem
--text-sm: 0.875rem
--text-base: 1rem
--text-lg: 1.125rem
--text-xl: 1.25rem
--text-2xl: 1.5rem
--text-3xl: 1.875rem
--text-4xl: 2.25rem
```

### Component Standards
- **Cards**: Rounded corners (8px), subtle shadows, white background
- **Buttons**: Primary (blue), Secondary (gray), Success (green), Danger (red)
- **Forms**: Consistent spacing, focus states, validation styling
- **Navigation**: Fixed header, responsive design, clear hierarchy
- **Icons**: FontAwesome for consistency, appropriate sizing

## 🌐 Deployment

### Production Environment Variables
```bash
# Backend Production
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=strong_production_secret
STRIPE_SECRET_KEY=sk_live_...

# Frontend Production
REACT_APP_API_BASE_URL=https://api.iiitueconnect.com
REACT_APP_STRIPE_KEY=pk_live_...
```

### Deployment Options

#### Option 1: Traditional VPS/Cloud Server
```bash
# Install PM2 for process management
npm install -g pm2

# Start backend with PM2
cd backend
pm2 start server.js --name "iiite-backend"

# Build and serve frontend
cd frontend
npm run build
# Serve with nginx or apache

# Build and serve admin frontend
cd adminfrontend
npm run build
# Serve with nginx or apache
```

#### Option 2: Docker Deployment
```dockerfile
# Dockerfile example for backend
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

#### Option 3: Cloud Platform (Heroku, Vercel, Netlify)
- **Backend**: Deploy to Heroku or Railway
- **Frontend**: Deploy to Vercel or Netlify
- **Database**: MongoDB Atlas for cloud database

### Performance Optimization
- **Code Splitting**: Implement lazy loading for routes
- **Image Optimization**: Compress and optimize images
- **Caching**: Implement Redis for session management
- **CDN**: Use CloudFlare for static asset delivery
- **Monitoring**: Implement logging and error tracking

## 🤝 Contributing

### Development Workflow
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Standards
- **ESLint**: Follow the configured linting rules
- **Prettier**: Use for consistent code formatting
- **Comments**: Document complex logic and functions
- **Testing**: Write unit tests for new features
- **Commits**: Use conventional commit messages

### Pull Request Guidelines
- Provide clear description of changes
- Include screenshots for UI changes
- Ensure all tests pass
- Update documentation if needed
- Request review from maintainers

### Issue Reporting
When reporting issues, please include:
- **Environment**: OS, Node.js version, browser
- **Steps to Reproduce**: Clear step-by-step instructions
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Screenshots**: If applicable

## 📞 Support & Contact

- **Email**: support@iiitueconnect.com
- **Documentation**: [Wiki](https://github.com/yourusername/iiiteconnect/wiki)
- **Issues**: [GitHub Issues](https://github.com/yourusername/iiiteconnect/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/iiiteconnect/discussions)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **IIIT Una** for the opportunity to develop this platform
- **React Community** for the amazing ecosystem
- **MongoDB** for the flexible database solution
- **Stripe** for secure payment processing
- **All Contributors** who helped build this platform

---

<div align="center">
  <p><strong>Made with ❤️ for IIIT Una Community</strong></p>
  <p>© 2024 IIIT Una Connect. All rights reserved.</p>
</div>
