# Apis for devTinder

## authRouter - for signup, login and logout
- POST /signup
- POST /login
- POST /logout


## profileRouter - to view and edit my personal profile
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## userRouter - to view feed i.e., cards to left swipe or right swipe
## to view all my connections and to view all the connection requests that i got
- GET /user/feed
- GET /user/connections
- GET /user/requests

## connectionRequestRouter
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId
