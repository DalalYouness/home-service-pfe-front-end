# Dalyou — Home Services Platform Front-End

This repository contains the front-end part of the Home Services Platform developed as part of my final-year master's degree project. The project focuses on creating a modern digital platform that allows users to discover and request home services efficiently.

The implementation is organized in phases, and this first stage covers the Identity Service module.

## Project overview

Dalyou is a home services platform designed to make it easier for users to:

- create an account
- sign in securely
- recover a forgotten password
- browse available service providers
- continue the journey in future modules of the application

This repository represents the front-end interface and user experience for the first section of the platform.

## Master project context

This project is part of my last-year master's degree and aims to design and prototype a complete platform for home services. The application is structured in several sections, and each section is developed progressively.

We are currently working on the first part:

- Identity Service

The screens delivered in this first phase are limited to 4 essential flows, with the rest to be added later.

## Screens included in this first phase

### 1. Create account
A registration form where the user enters personal information such as:

- first name
- last name
- email address
- phone number
- password
- date of birth
- gender
- country
- city
- address

This screen is part of the onboarding process for new users.

### 2. Login
A sign-in page for existing users with:

- email field
- password field
- forgot password link
- login button
- account creation redirect

### 3. Reset password
A recovery flow that allows the user to:

- enter an email address
- set a new password
- confirm the new password
- reset access to the platform

### 4. Available service providers
A listing screen showing available professionals for a service category such as plumbing. This screen includes:

- category title
- provider cards
- avatar or initials
- location
- rating and reviews
- profile button

This screen represents the first step toward selecting a service provider.

## Screens implemented from the provided mockups

The repository already includes the following screens corresponding to the requested UI:

1. Account creation screen  
   File: `src/components/RegisterForm.tsx`

2. Login modal and password reset flow  
   File: `src/components/LoginForm.tsx`

3. Available providers modal for a service category  
   File: `src/components/ProvidersModal.tsx`

4. Landing page and main entry screen  
   File: `src/components/LandingPage.tsx`

These screens are connected through the app router in `src/App.tsx` and match the mockup flow described for the Dalyou identity and provider discovery experience.

## Technology stack

This front-end project is built with modern React tooling:

- React
- TypeScript
- Vite
- React Router
- Axios
- Lucide React
- Tailwind CSS
- Supabase
- WebSocket / STOMP support for real-time communication

## Repository structure

```bash
src/
├── components/
├── context/
├── errors/
├── hooks/
├── services/
├── types/
├── App.tsx
├── index.css
├── main.tsx
└── assets/
```

## Getting started

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

### Build the project

```bash
npm run build
```

### Type-check the application

```bash
npm run typecheck
```

## Roadmap

This project will be developed in several parts:

1. Identity Service
2. Customer / User Dashboard
3. Service Request Management
4. Provider Management and Booking Flow
5. Additional features and improvements

The current repository includes the first section only, as part of the initial design and UI implementation.

## Notes

This is a front-end prototype and UI implementation for a master's project. The design is focused on usability, clarity, and a clean user experience for the home services domain.

The remaining sections will be added progressively in future updates.

## Author

This project is developed for my final-year master's degree in the context of a home services platform.

---

Dalyou — Home Services Platform Front-End

Repository: https://github.com/DalalYouness/home-service-pfe-front-end
