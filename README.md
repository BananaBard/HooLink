# HooLink

HooLink is a user-friendly URL shortening service that allows authenticated users to create short links for easier sharing and tracking. This project showcases a clean, modern landing page and offers secure user authentication with OAuth providers like Google.

## Features

- **User Authentication:** Secure login using Google OAuth.
- **URL Shortening:** Generate short links for long URLs.
- **Expiration:** Short links automatically expire after a set period.
- **Clipboard Copying:** Easily copy short links to the clipboard.
- **Responsive Design:** Optimized for both desktop and mobile devices.

## Technologies Used

- **Frontend:**
  - React
  - Tailwind CSS
  - Vite

- **Backend:**
  - Supabase (for authentication and database)

- **Deployment:**
  - Vercel

## Setup and Installation

### Prerequisites

- Node.js (>=14.x)
- npm or yarn
- Supabase project
You will need two tables, those are the sql codes for each one:
Links:
```sql
create table
  public.links (
    id uuid not null default gen_random_uuid (),
    original_url text not null default ''::text,
    shortened_url text not null,
    "createdAt" timestamp with time zone not null default now(),
    "expiresAt" timestamp with time zone not null,
    clicked numeric not null default '0'::numeric,
    creator text null,
    description text null,
    tags text[] null,
    constraint links_pkey primary key (id),
    constraint links_shortened_url_key unique (shortened_url),
    constraint links_description_check check ((length(description) < 140))
  ) tablespace pg_default;
```
Users:
```sql
create table
  public.users (
    id uuid not null default gen_random_uuid (),
    email text not null,
    constraint users_pkey primary key (id)
  ) tablespace pg_default;
```

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/BananaBard/hoolink.git
   cd hoolink
2. **Install dependencies:**
   ```bash
   npm run dev
   # or
   yarn dev
3. **Create a .env file in the root directory and add your Supabase and Vercel configuration:**
   ```bash
   VITE_BASE_URL= Base URL from your deploy, will be used to create the shortened links
   VITE_SUPABASE_KEY= Provided by Supabase
   VITE_SUPABASE_URL= Provided by Supabase
4. **Run the application:**
    ```bash
    npm run dev
    # or
    yarn dev

    
### Deployment

This project is deployed on Vercel. To deploy your own version:

1. **Push your code to a GitHub repository.**
2. **Go to [Vercel](https://vercel.com/) and create a new project, importing your GitHub repository.**
3. **Set up the environment variables in Vercel:**
   - `VITE_BASE_URL`
   - `VITE_SUPABASE_KEY`
   - `VITE_SUPABASE_URL`
4. **Deploy the project.**


### Usage

1. **Sign Up / Sign In:**
   - Use Google OAuth to sign up or sign in.

2. **Create Short Links:**
   - Enter the original URL.
   - Generate the short link.

3. **Manage Links:**
   - View all your shortened links.
   - Copy links to the clipboard.
   - Delete links
