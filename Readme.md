## Social Media Application
 posts and comments can be added and upadated by an API requests.

# API Lists

# User api's
  
  # Get all users
  GET /user/api/users

  # Register user
  POST /user/api/register

  # Login user

  POST /user/api/login

# Friend Requests
  
  # Get all friends list

  GET user/api/usrs/:id/friends

  # Send a friend request

  POST user/api/usrs/:id/friends

  payload= friends id

  # Accept / Reject friend requests

  PATCH /user/api/users/:id/friends:friendId

  payload= friends id




# POSTS API

   # Get all posts;

   GET post/api/posts

   # Get post by id
    
    GET post/api/posts/:id

   # Post the post

   POST post/api/posts

   res.status(200).send({ "Message": "All Posts", "Posts":posts})

   # Update the post

   PATCH post/api/post/:id

   payload=req.body

   # Delete the post

   DELETE post/api/post/:id


# Add Like to post 


  POST post/api/posts/:id/like

  - like by id 
  - push the id in the likes array by await Post.findByIdAndUpdate( id,{$push:{likes:payload}} );
  - responde:  res.status(201).send({ "Message": "Likes Updated to Post"})

# Add Comment to post

   POST post/api/:id/comment
    
   - post can be taken from the request 
   - req.body={ user, text, createdAt }
   - user={id}
   -text:string,
   -createdAt:date



