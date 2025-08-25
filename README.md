# Todo List App - Backend

This is the **Express + Prisma + MySQL backend** for the Todo List App.  
It provides REST API endpoints for managing tasks.

Frontend repo: github.com/codets1989/todo-frontend

## 1. Database Setup

1. Start MySQL (XAMPP Control Panel → MySQL → Start).
2. Open phpMyAdmin (XAMPP → Admin).
3. Create a database named `todo_app`.
4. Create a user (optional):
   - Username: `todo_user`
   - Password: `yourpassword`
   - Host: `localhost`
   - Grant ALL privileges to the database
5. Update `.env` file in project root:
DATABASE_URL="mysql://root:@127.0.0.1:3306/todo_app"
or
DATABASE_URL="mysql://todo_user:yourpassword@127.0.0.1:3306/todo_app"

## 2. Install Dependencies
```
npm install
```

## 3. Prisma Setup

1. Generate Prisma Client:
```
npx prisma generate
```

2. Run migrations to create tables
```
npx prisma migrate dev --name init
```

## 4. Start Backend

```
npm run dev
```

