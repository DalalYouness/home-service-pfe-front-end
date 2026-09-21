# Home Service Platform

A modern and professional front-end application for a home services marketplace, built with React, TypeScript, and Vite. The platform allows clients to discover local service providers, book services, and manage bookings through a clean and responsive interface.

This repository focuses on the user-facing experience for an online home service ecosystem where customers can request support from trusted professionals such as cleaners, repair specialists, and home maintenance experts.

## Overview

The application includes:

- A modern landing page for promoting the platform
- Service discovery and category-based browsing
- Provider profiles and detail views
- Reservation booking and management
- Personal account and profile settings
- Role-based user dashboards
- Provider onboarding and service management
- Real-time notifications and alerts
- Secure authentication flow with token-based API requests

## Platform Screenshots

This section contains screenshots of the main interfaces for our platform. You can open the screenshot folder here:

- [Open project screenshots folder](./project-screenshots)

Suggested interface screens to add in this folder:

- Landing page
- Login and registration
- Client dashboard
- Reservations page
- Provider dashboard
- Services management
- Profile and account settings

## Features

### Customer Experience
- Browse available service categories and providers
- View provider details and public information
- Book services and manage reservations
- Track and review service requests
- Update profile, email, password, and account preferences

### Provider Experience
- Become a service provider through a guided onboarding flow
- Manage offered services
- Access provider dashboards and operational tools
- View reservations and service performance information

### Administration
- Service management interface
- User and provider oversight tools
- Dashboard views for platform management

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Supabase JS
- STOMP / SockJS for real-time messaging
- Sonner for notifications
- Lucide React icons

## Project Structure

```text
home-service-pfe-front-end/
├── public/                  # Static assets
├── src/
│   ├── components/         # Reusable UI and page components
│   ├── context/            # Auth context and shared state
│   ├── errors/             # Error pages
│   ├── events/             # Application event definitions
│   ├── hooks/              # Custom React hooks
│   ├── services/           # API and backend communication layer
│   ├── types/              # TypeScript types
│   ├── App.tsx             # Main app routing
│   ├── main.tsx            # App entry point
│   ├── index.css           # Global styles
│   └── App.css             # Component-level styles
├── project-screenshots/     # Screenshot folder for the platform interfaces
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
├── package-lock.json
└── README.md
```

## Getting Started

### Prerequisites

Before running the app, make sure you have:

- Node.js 18 or later
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/DalalYouness/home-service-pfe-front-end.git
cd home-service-pfe-front-end
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the root directory and configure the backend URL if needed:

```env
VITE_API_BASE_URL=http://localhost:9999
```

> The frontend is configured to use the environment variable `VITE_API_BASE_URL`. If it is not defined, it defaults to `http://localhost:9999`.

### Run the Application

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

## Available Scripts

In the project directory, you can run:

```bash
npm run dev
```
Starts the Vite development server.

```bash
npm run build
```
Builds the app for production.

```bash
npm run preview
```
Serves the production build locally.

```bash
npm run lint
```
Runs ESLint checks on the source code.

```bash
npm run typecheck
```
Runs TypeScript type checking without emitting files.

## Environment and API Configuration

This frontend communicates with a backend service through the centralized Axios client located in:

```text
src/services/api.client.ts
```

The client attaches the JWT token from local storage to authorized requests and handles common app-level errors such as:

- 401 Unauthorized sessions
- 404 missing resources
- 500 server errors

## Authentication and State Management

The app uses a context-based authentication setup to manage user state and protected routes. It integrates with the backend through a centralized API service layer to keep requests consistent and maintainable.

## Notes

This project is designed as a front-end interface for a service-booking platform and is intended to work alongside a backend API that exposes authentication, provider, reservation, and service-management endpoints.

## License

This project does not currently declare a license file in the repository. For commercial or production use, please confirm repository ownership and licensing terms with the project maintainer.

## Repository

- GitHub: https://github.com/DalalYouness/home-service-pfe-front-end

## Contributing

Contributions, suggestions, and improvements are welcome. If you would like to contribute:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request with a clear description of the update
