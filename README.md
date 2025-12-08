# The Wild Oasis 🏕️

A modern cabin booking and reservation management web application built with Next.js, featuring real-time database integration and user authentication.

## Overview

The Wild Oasis is a full-stack web application designed for managing cabin rentals and guest reservations. Users can browse available cabins, make reservations, manage their bookings, and update their guest profiles. The application leverages cutting-edge web technologies for a seamless user experience.

## Features

- **Cabin Browsing**: Explore available cabins with detailed descriptions, pricing, and capacity information
- **Reservations**: Book cabins with an intuitive date selection interface
- **User Authentication**: Secure Google OAuth login via NextAuth.js
- **Guest Profiles**: Create and update guest information after registration
- **Reservation Management**: View, edit, and delete existing reservations
- **Real-time Database**: Powered by Supabase for instant data synchronization
- **Responsive Design**: Mobile-optimized interface with Tailwind CSS
- **Dynamic Routing**: Fast, efficient page navigation with Next.js 14

## Tech Stack

### Frontend
- **Framework**: Next.js 14.2.30
- **Styling**: Tailwind CSS 3.4.1
- **UI Components**: React 18
- **Icons**: Heroicons
- **Date Picking**: react-day-picker 8.10.1
- **Date Utilities**: date-fns 3.0.0

### Backend & Database
- **Authentication**: NextAuth.js 5.0
- **Database**: Supabase (PostgreSQL)
- **API**: Next.js API Routes

### Development Tools
- **Linting**: ESLint
- **CSS Processing**: PostCSS

## Project Structure

```
app/
├── _components/        # Reusable React components
├── _lib/              # Utility functions and services
├── _styles/           # Global CSS styles
├── api/               # API routes
├── about/             # About page
├── account/           # User account pages
│   ├── profile/       # User profile management
│   └── reservations/  # Reservation management
├── cabins/            # Cabin listing and details
└── login/             # Authentication page
```

### Key Components

- **CabinList & CabinCard**: Display available cabins
- **ReservationForm**: Handle booking requests
- **DateSelector**: Interactive date selection for bookings
- **ReservationCard & ReservationReminder**: Manage existing reservations
- **UpdateProfileForm**: Guest profile updates
- **Navigation & Header**: Site navigation and layout

### Core Services

- **data-service.js**: Supabase queries for cabins, bookings, and guest data
- **auth.js**: NextAuth configuration with Google OAuth
- **actions.js**: Server actions for mutations
- **supabase.js**: Supabase client initialization

## Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Supabase account with database set up
- Google OAuth credentials for authentication

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd the-wild-oasis
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables in `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Production Build

Build and start the production server:
```bash
npm run build
npm start
```

Or use the combined command:
```bash
npm run prod
```

## Database Schema (Supabase)

The application uses the following main tables:
- **cabins**: Cabin details (name, capacity, pricing, images)
- **bookings**: Reservation information (dates, cabin, guest)
- **guests**: Guest profiles (name, email, contact info)

## Authentication

The application uses Google OAuth for secure authentication via NextAuth.js. Upon first login, guest profiles are automatically created in the database.

## Image Storage

Cabin images are stored in Supabase's storage bucket and served via the configured CDN endpoint.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run prod` - Build and start production server
- `npm run lint` - Run ESLint

## License

This project is private and proprietary.

## Author

Victor DevLab
