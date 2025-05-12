# The Wild Oasis - Next.js Application

The Wild Oasis is a luxurious cabin booking platform built with [Next.js](https://nextjs.org/). It provides a seamless user experience for exploring, reserving, and managing stays in luxury cabins located in the heart of the Italian Dolomites.

## Features

- **Cabin Listings**: Browse through a variety of luxury cabins with detailed descriptions, pricing, and availability.
- **User Authentication**: Secure login using Google OAuth via `next-auth`.
- **Reservation Management**: Make, edit, and delete reservations with real-time updates.
- **Dynamic Filtering**: Filter cabins by capacity (small, medium, large).
- **Responsive Design**: Fully optimized for desktop and mobile devices.
- **Server Actions**: Leverages Next.js server actions for efficient data handling.

## Tech Stack

- **Frontend**: React, Next.js, Tailwind CSS
- **Backend**: Supabase (PostgreSQL)
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS with custom themes
- **Date Handling**: `date-fns` for date manipulation
- **State Management**: React Context API

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account for backend setup

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/the-wild-oasis-next.git
   cd the-wild-oasis-next
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Copy `.env.sample` to `.env.local` and fill in the required values:

   ```bash
   cp .env.sample .env.local
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the application for production.
- `npm run start`: Start the production server.
- `npm run lint`: Run ESLint to check for code quality issues.

## Folder Structure

```
.
├── app/                # Next.js app directory
│   ├── _components/    # Reusable UI components
│   ├── _lib/           # Utility functions and services
│   ├── cabins/         # Cabin-related pages
│   ├── account/        # User account pages
│   ├── api/            # API routes
│   ├── globals.css     # Global styles
│   └── layout.js       # Root layout
├── public/             # Static assets
├── .env.sample         # Environment variable template
├── tailwind.config.js  # Tailwind CSS configuration
├── next.config.mjs     # Next.js configuration
├── package.json        # Project metadata and dependencies
└── README.md           # Project documentation
```

## Environment Variables

The following environment variables are required:

- `SUPABASE_URL`: Your Supabase project URL.
- `SUPABASE_KEY`: Your Supabase API key.
- `NEXTAUTH_URL`: The base URL of your application.
- `NEXTAUTH_SECRET`: A secret key for NextAuth.
- `AUTH_GOOGLE_ID`: Google OAuth client ID.
- `AUTH_GOOGLE_SECRET`: Google OAuth client secret.

## Deployment

The application can be deployed on platforms like [Vercel](https://vercel.com/) or any other Node.js hosting provider. Follow these steps:

1. Build the application:

   ```bash
   npm run build
   ```

2. Deploy the `.next` directory and ensure environment variables are set in the hosting platform.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push the branch.
4. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [date-fns](https://date-fns.org/)
- [NextAuth.js](https://next-auth.js.org/)

---

You can see the live site [here](https://bookings-nextjs.vercel.app/).
