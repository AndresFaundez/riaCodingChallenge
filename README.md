Currency Exchange Dashboard
A simple and modern currency exchange dashboard built with Next.js App Router, using the Frankfurter API to display real-time and historical exchange rates.

This project was developed as part of a coding challenge, with a strong focus on:

Clean architecture

Server/Client responsibility separation

Usability

Efficient data fetching

Features
Exchange Rates

Displays current exchange rates for major currencies

Allows changing the base currency

Server-side rendered for fast initial load

Currency Converter

Convert any amount between supported currencies

Automatic recalculation on input change

Uses live exchange rates from the Frankfurter API

Bonus: Historical Exchange Rate Chart

The chart shows rate trends over the last 30 days for USD against EUR.
The idea is for the user to know the latests trends of the currency they want to send so they know the best time to do it.

Since I am fairly new to Next.js, I wasn't able to implement changing base and target currencies, but that was the initial idea.

Uses server-side fetching and safe data handling (addressing challenges encountered with date formatting).

Architecture
The app follows a clear Server/Client separation, achieved using the App Router:

Server Components:

Fetch exchange rates and historical data.

Handle date calculations and API constraints.

Client Components:

Handle easy user interaction.

Render UI elements.

For the charts, the original plan was to trigger server re-renders via URL search parameters, but I wasn't able to implement this within the given timeframe.

However, I believe this approach improves UX, performance, and clearly follows the Open/Closed principle.

AI Usage and Extra Material
Since this was only my second approach to the Next.js and TypeScript environment, I leveraged external resources to accelerate development and ensure best practices:

AI Assistance:

TypeScript & Typing: AI was used primarily to generate accurate TypeScript interfaces and handle complex type definitions, ensuring type safety throughout the project (Also i asked gemini pro to fix the grammar on this readme).

UI & Styling: I used AI to refine the CSS and achieve the "Cyberpunk/Glassmorphism" aesthetic, ensuring the components looked polished and responsive.

Inspiration:

The visual concept, particularly the modern CSS approach and lighting effects, was inspired by the JavaScript Mastery channel. You can check the reference video here(https://www.youtube.com/watch?v=I1V9YWqRIeI).

FUTURE: 
I think the most important feats that should be added in the future are error display and the functionality of the charts (my initial idea)
Usage
1. Install dependencies
Bash

npm install
# or
yarn install
# or
pnpm install
2. Run development server
Bash

npm run dev
# or
yarn dev
# or
pnpm dev
Tech Stack
Next.js 16 (App Router)

React

TypeScript

Highcharts

Frankfurter API

Tailwind CSS