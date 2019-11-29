NODE_ENV=development node app.js
NODE_ENV=production node app.js
sails_hooks\_\_grunt=false NODE_ENV=production node app.js

"hooks": {
"grunt": false
},
"paths": {
"public": "assets"
},

# Create User

use sails1demo
db.createUser(
{
user: "sails1demo",
pwd: "sails1demo123",
roles: [ "readWrite", "dbAdmin" ]
}
)

git init .
git remote add -t \* -f origin git@192.168.0.77:Templates/Sails1Template.git
git checkout -f master

# for grunt error

sudo gem install sass

# if still issue try

sudo gem install clean

npm install grunt-sails-linker --save-dev --save-exact

grunt buildProd
grunt buildProd --build=prod --force

# to create ADMIN user

# password is 123546

=> type 'sails console' then paste this line
=> Admin.create({firstName: 'Super', lastName: 'Admin',email:'admin@admin.com',password:'$2a$10\$4Nc8PvwLgiJWcE4mcibv9uIpdlz7yYbu2wkpQXkdyhFbjzlwZOYBS'}).fetch().exec(console.log)

#to start job
=> node worker.js

# to start radis server

=> redis-server --daemonize yes
nodemon --ignore 'assets/swagger/*'
