# Full Stack Developer - Project Test.

This system has 2 major parts 
- *Laravel*: Which has an authentication system. The clients can log in and
log out and sign up. Once they are logged in, they are able
to create a new article, the article has only a title and content which supports uploading gif images.
- *Nodejs*: [Check here](https://github.com/hkashko97/Full-Stack-Test--Nodejs)



we used editor js, a block-based open source editor, for the MVP
the client can only add text and gif images to the editor. You can add text using editor js out of the box, and we created a plugin that enables our clients to add GIFs using API search or they can copy the URL from the GIF provider and paste it to the editor, it should show the
GIF image instead of the URL.


## Installation

Clone the repository

```bash
git clone git@github.com:hkashko97/Full-Stack-Test—Laravel.git
```

Switch to the project directory

```bash
cd Full-Stack-Test—Laravel
```

Install dependencies using composer
```bash
composer install
```

Copy .env.example to .env and update the values inside it

```bash
cp .env.example .env
```

Now generate a new application key
```bash
php artisan key:generate
```

## Database migrations
Note: make sure to provide the database config in .env file before running the migrations
```bash
php artisan migrate
```

## Running
Building frontend files and serving the the UI
```bash
npm install && npm run dev
```

Then in different Terminal to run the server
```bash
php artisan serve
```

You can now access the server at http://localhost:8000

## Note
Make sure to provide *APP_URL* env variable inside .env file to avoid any broken styles, for this example would like this
```
APP_URL=http://localhost:8000
```
