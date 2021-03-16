# Blog API
"/api/users"
"/api/confirm"
"/api/posts"

## User APIS

### register user 
method : POST , <br>
API URL : "/api/users/register", <br>
request body: { firstName, lastName, userName, email, password}, <br>
response : <br>
1- status:200, response: {user, confirmationUrl} <br>
2- status:500, response: {message, err} <br>

### login user 
method : POST , <br>
API URL : "/api/users/login", <br>
request body: { email, password} , // email can be the user email or the user name <br>
response : <br>
1- status:200, response: token <br>
1- status:401, response: "Invalid Email or password" <br>
1- status:401, response: "You must confirm your email addresse" <br>
1- status:401, response: "Your account has been deactivated" <br>
2- status:500, response: "err" <br>

### get user 
method : GET , <br>
API URL : "/api/users/me", <br>
request body: { firstName, lastName, userName, email, password}, <br>
response : <br>
1- status:200, response: user <br>
2- status:500, response: "Failed to get User" <br>


