Redstone Mc Avatar
==================

A very lightweight script - at only __430 bytes__.  You put in a Minecraft username, and it returns the requested user's data, including their __UUID__, current __username__, __skin URL__, and __cape__ (If avalible)...

##Required Modules

 - __https__: This is standard in NodeJS. Used for making GET requests to the API.

##Process

This script makes 2 intial HTTP requests:

 1. Fetching the UUID from a username.
 2. Fetching the JSON data from the retrieved UUID.

Then a callback function is triggered, with the data returned as argument.  Here is an example of what this might look like:

```
var mcnode = require("./mcnode.js");

mcnode.request("zjamentyler", function(user){
  console.log(user.profileId);
  // This would log the user's UUID,
});
```

To see what's available, simply log `user`, to see what can be fetched.
