# Backend_Tasks
It contains various Task regarding Backend like Schema Designing, Authentication, RESTAPI, etc.

## [Task 1: Create a MVC structure Login and Register User Routes with CRUD API](https://github.com/Nishu0/Backend_Tasks/tree/main/Task%201:%20Create%20a%20MVC%20structure%20Login%20and%20Register%20User%20Routes%20with%20CRUD%20API)

### Purpose :: I currently only have a very simple server. Js application checks to see if a user already exists in our database; if not, the user can register. It uses the MVC architecture and CRUP routes for user authentication. This should serve as a starting point for me to study and develop my own api.

### Install
1. Clone or download the repo
2. go to task1 directory
3. run command to install all required module npm install(make sure node is installed on your machine/server)
4. *run nodemon server.js will start your node server.*
5. *access http://localhost:8000* 

### File Structure

1. server.js is main file when node starts, performs all necessary checks and loads the necessary modules.
2. below are the code lines in server.js which call the defined user routes into server.js
    const userRoutes=require("./routes/user_routes") //under app folder routes the file where all user routes are defined.  
3. /routes/user_routes.js is file where all routes/end points are define

## [Task 2: Task 2: Create Notes and Bookmark feature for the user with 3 input name (Title or Link, Description, Tags). Search Feature by Tags](https://github.com/Nishu0/Backend_Tasks/tree/main/Task%202:%20Create%20Notes%20and%20Bookmark%20feature%20for%20the%20user%20with%203%20input%20name%20(Title%20or%20Link%2C%20Description%2C%20Tags).%20Search%20Feature%20by%20Tags)

### Purpose:: At this point, I have a very basic server.js application using the MVC architecture to get user notes and bookmarks details with an authentication system (with help of passport and jwt) so that only signed-in users may publish and edit notes/bookmark after finishing all the minor aspects. Although there are still things I should take care of (such as input validation, error handling, error pages, and so on) this should work as a foundation to learn and build my own api.  
If you want to take this example a step further, you could (unrelated to the architecture) to make this a robust api. However, the only restriction is your own creativity, so feel free to clone the application repository and have some fun!

### Install
1. Clone or download the repo
2. go to task2 directory
3. run command to install all required module npm install(make sure node is installed on your machine/server)
4. *run nodemon server.js will start your node server.*
5. *access http://localhost:8000* 

### File Structure

1. server.js is main file when node starts, it do all checks here and load required module.
2. below are the code lines in server.js where redirect to route file  
    const userRoutes=require("./routes/user") //under app folder routes the file where all user routes are defined.  
    const notesRoutes=require("./routes/note") //under app folder routes the file where all notes routes are defined.  
    const bookmarkRoutes=require("./routes/bookmark") //under app folder routes the file where all bookmark routes are defined.  
3. /routes/.. is file where all routes/end points are define. and each route is calling corresponding /app/controllers.
4. /models/.. has all required models and can be loaded through same as any modules loads in node.
5. For the authentication purpose passport & jwt(JSON Web Token) is used below are code lines 
    var passportjwt=require('./auth/passport_jwt')
    const passport=require('passport')
