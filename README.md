# Survey Application

A web application using React and Supabase with two distinct portals: one for surveyors to view responses and another for respondents to submit their information.

## Features

### Respondent Portal
- Public access interface for submitting survey responses
- Form validation for name and age inputs
- Success messages after successful submission
- Mobile-responsive design

### Surveyor Portal
- Password protected access (password: 4268)
- View all responses in a sortable table
- Sort by name, age, or timestamp
- Real-time updates when new responses are added
- Export data as CSV

## Technology Stack

- React with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Supabase for backend database and real-time functionality

## Setup Instructions

1. Clone the repository
2. Install dependencies with `npm install`
3. Create a Supabase account and project at [supabase.com](https://supabase.com)
4. Set up the SQL database by running the migration in `supabase/migrations/create_responses_table.sql`
5. Create a `.env` file in the root directory with:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
6. Start the development server with `npm run dev`

## Deployment

This application can be deployed to Netlify with the following steps:

1. Push your code to a GitHub repository
2. Connect your repository to Netlify
3. Set up environment variables in Netlify's dashboard
4. Configure continuous deployment from the main branch

## License

MIT