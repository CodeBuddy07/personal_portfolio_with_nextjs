# Personal Portfolio with Next.js

This is a personal portfolio project built with **Next.js** to showcase your skills, projects, and professional information. It includes dynamic components such as a **Contact Form**, **Authentication**, and **Dark Mode** toggle, with a responsive layout for desktop and mobile users.

---

## Features

- **Modern UI/UX**: Sleek, responsive design using Tailwind CSS.
- **Authentication**: Next Auth authentication for login/logout functionality.
- **Contact Form**: Submit contact messages via a simple form.
- **Dark Mode**: Toggle between light and dark modes.
- **Blog Page**: Showcase your blog posts or articles.
- **Project Page**: Showcase your projects.
- **Dashboard Management**: Manage your Projects and Blogs and Messages (CRUD).

---

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Next.js API routes for server-side logic
- **Authentication**: Next Auth
- **Database**: MongoDB 
- **Deployment**: Vercel (for deployment) or custom server setup

---

## Setup Instructions

### Prerequisites

Before you can set up this project, make sure you have the following installed:

- **Node.js** (version 16 or higher)
- **npm** or **yarn**
- **MongoDB** (if using a local database)

### Installation Steps

1. **Clone the repository:**

   Open a terminal window and run the following command to clone the repository:

   ```bash
   git clone https://github.com/your-username/personal-portfolio.git
   cd personal-portfolio

2. **Install dependencies:**

    In the project folder, run the following command to install the dependencies:

    ```bash
    npm install

    ```
    Or, if you're using yarn, run:

    ```bash
    yarn install

    ```

3. **Set up environment variables:**

    You will need to configure environment variables for your project, such as for MongoDB

    Create a .env.local file in the root directory and add the following:

    ```bash
    MONGODB_URI= mongodb://localhost:27017/your-database-name
    NEXTAUTH_SECRET= your-nextauth-secret
    NEXTAUTH_URL= http://localhost:3000


    ```

4. **Run the development server:**

    Once everything is set up, you can run the development server using:

    ```bash
    npm run dev

    ```
    Or, if you're using yarn, run:

    ```bash
    yarn dev

    ```
    Your app will be available at http://localhost:3000.




