# playthatsong
add new songs to the dj's playlist

# Requirements

- node >= 6
- npm >= 3
- mongodb
- homebrew

# Install

```shell
npm install
```

# Run the Server 

```shell
npm run start-dev
```

# Stop the Server

```shell
ctrl + c
npm run stop-db-server
```

# API Documentation

## **Demo Data**

_only available on development mode_

**GET /setup**

Response body:
  ```json
  {
    "success": true,
    "message": "..."
  }
  ```

Error body:
  ```json
  {
    "success": false,
    "message": "error message"
  }
  ```

## **Auth**

**POST /api/v1/auth/login**

Request body:
  ```json
  {
    "name": "Username",
    "password": "HighSecureUserPassword"
  }
  ```

Response body:
  ```json
  {
    "success": true,
    "token": String,
    "user": {
      "_id": String,
      "name": String,
      "password": String,
      "admin": Boolean,
      "deejay": Boolean,
      "created": Number,
      "availableVotes": Number,
      "firstVoting": Number,
      "resetVoting": Number
    },
    "expires": Number
  }
  ```

Error body:
  ```json
  {
    "success": false,
    "message": "error message"
  }
  ```

**POST /api/v1/auth/register**

Optional Query Parameter:
  - flag: admin | dj

Request body:
  ```json
  {
    "name": "Username",
    "password": "HighSecureUserPassword"
  }
  ```

Response body:
  ```json
  {
    "success": true,
    "createdUser": {
      "_id": String,
      "name": String,
      "password": String,
      "admin": Boolean,
      "deejay": Boolean,
      "created": Number,
      "availableVotes": Number,
      "firstVoting": Number,
      "resetVoting": Number
    }
  }
  ```

Error body:
  ```json
  {
    "success": false,
    "message": "error message"
  }
  ```

## **User**

**GET /api/v1/users**

Optional Query Parameter:
  - flag: admin | dj | user

Response body:
  ```json
  {
    "success": true,
    "users": [{
      "_id": String,
      "name": String,
      "password": String,
      "admin": Boolean,
      "deejay": Boolean,
      "created": Number,
      "availableVotes": Number,
      "firstVoting": Number,
      "resetVoting": Number
    },
    ...
    ]
  }
  ```

Error body:
  ```json
  {
    "success": false,
    "message": "error message"
  }
  ```

**GET /api/v1/users/:id**

Path Parameter:
  - id: User ID [_id]

Response body:
  ```json
  {
    "success": true,
    "user": {
      "_id": String,
      "name": String,
      "password": String,
      "admin": Boolean,
      "deejay": Boolean,
      "created": Number,
      "availableVotes": Number,
      "firstVoting": Number,
      "resetVoting": Number
    }
  }
  ```

Error body:
  ```json
  {
    "success": false,
    "message": "error message"
  }
  ```

## **Events**

**GET /api/v1/events**

Optional Query Parameter:
  - dj: DJ ID [_id]

Response body:
  ```json
  {
    "success": true,
    "events": [{
      "_id": String,
      "deejayId": String,
      "title": String,
      "location": String,
      "organizer": String,
      "eventDate": Number,
      "songs": [ String ],
      "created": Number
    },
    ...
    ]
  }
  ```

Error body:
  ```json
  {
    "success": false,
    "message": "error message"
  }
  ```

**GET /api/v1/events/:eventid**

Path Parameter:
  - eventid: Event ID [_id]

Response body:
  ```json
  {
    "success": true,
    "event": {
      "_id": String,
      "deejayId": String,
      "title": String,
      "location": String,
      "organizer": String,
      "eventDate": Number,
      "songs": [ String ],
      "created": Number
    }
  }
  ```

Error body:
  ```json
  {
    "success": false,
    "message": "error message"
  }
  ```

**GET /api/v1/events/:eventid/songs**

Path Parameter:
  - eventid: Event ID [_id]

Response body:
  ```json
  {
    "success": true,
    "songs": [{
      "_id": String,
      "artist": String,
      "title": String,
      "eventId": String,
      "upvotes": Number,
      "downvotes": Number,
      "created": Number
    },
    ...
    ]
  }
  ```

Error body:
  ```json
  {
    "success": false,
    "message": "error message"
  }
  ```
**GET /api/v1/events/:eventid/songs/:songid**

Path Parameter:
  - eventid: Event ID [_id]
  - songid: Song ID [_id]

Response body:
  ```json
  {
    "success": true,
    "song": {
      "_id": String,
      "artist": String,
      "title": String,
      "eventId": String,
      "upvotes": Number,
      "downvotes": Number,
      "created": Number
    }
  }
  ```

Error body:
  ```json
  {
    "success": false,
    "message": "error message"
  }
  ```

**POST /api/v1/events**

Request body:
  ```json
  {
    "deejayId": String,
    "title": String,
    "location": String,
    "organizer": String,
    "eventDate": Number
  }
  ```

Response body:
  ```json
  {
    "success": true,
    "createdEvent": {
      "_id": String,
      "deejayId": String,
      "title": String,
      "location": String,
      "organizer": String,
      "eventDate": Number,
      "songs": [ String ],
      "created": Number
    }
  }
  ```

Error body:
  ```json
  {
    "success": false,
    "message": "error message"
  }
  ```

**POST /api/v1/events/:eventid/songs**

Path Parameter:
  - eventid: Event ID [_id]

Request body:
  ```json
  {
    "artist": String,
    "title": String
  }
  ```

Response body:
  ```json
  {
    "success": true,
    "updatedEvent": {
      "_id": String,
      "deejayId": String,
      "title": String,
      "location": String,
      "organizer": String,
      "eventDate": Number,
      "songs": [ String ],
      "created": Number
    },
    "createdSong": {
      "_id": String,
      "artist": String,
      "title": String,
      "eventId": String,
      "upvotes": Number,
      "downvotes": Number,
      "created": Number
    }
  }
  ```

Error body:
  ```json
  {
    "success": false,
    "message": "error message"
  }
  ```

**PUT /api/v1/events/:eventid**

Path Parameter:
  - eventid: Event ID [_id]

Request body:
  ```json
  {
    "deejayId": String,
    "title": String,
    "location": String,
    "organizer": String,
    "eventDate": Number,
    "songs": [ String ],
    "created": Number
  }
  ```

Response body:
  ```json
  {
    "success": true,
    "updatedEvent": {
      "_id": String,
      "deejayId": String,
      "title": String,
      "location": String,
      "organizer": String,
      "eventDate": Number,
      "songs": [ String ],
      "created": Number
    }
  }
  ```

Error body:
  ```json
  {
    "success": false,
    "message": "error message"
  }
  ```

**PUT /api/v1/events/:eventid/songs/:songid**

Path Parameter:
  - eventid: Event ID [_id]
  - songid: Song ID [_id]

Request body:
  ```json
  {
    "artist": String,
    "title": String,
    "upvotes": Number,
    "downvotes": Number,
    "created": Number
  }
  ```

Response body:
  ```json
  {
    "success": true,
    "updatedSong": {
      "_id": String,
      "artist": String,
      "title": String,
      "eventId": String,
      "upvotes": Number,
      "downvotes": Number,
      "created": Number
    }
  }
  ```

Error body:
  ```json
  {
    "success": false,
    "message": "error message"
  }
  ```

**DELETE /api/v1/events/:eventid/songs/:songid**

Path Parameter:
  - eventid: Event ID [_id]
  - songid: Song ID [_id]

Response body:
  ```json
  {
    "success": true,
    "updatedEvent": {
      "_id": String,
      "deejayId": String,
      "title": String,
      "location": String,
      "organizer": String,
      "eventDate": Number,
      "songs": [ String ],
      "created": Number
    }
  }
  ```

Error body:
  ```json
  {
    "success": false,
    "message": "error message"
  }
  ```

##**Songs**

**GET /api/v1/songs**

Response body:
  ```json
  {
    "success": true,
    "songs": [{
      "_id": String,
      "artist": String,
      "title": String,
      "eventId": String,
      "upvotes": Number,
      "downvotes": Number,
      "created": Number
    },
    ...
    ]
  }
  ```

Error body:
  ```json
  {
    "success": false,
    "message": "error message"
  }
  ```
**GET /api/v1/songs/:songid**

Path Parameter:
  - songid: Song ID [_id]

Response body:
  ```json
  {
    "success": true,
    "song": {
      "_id": String,
      "artist": String,
      "title": String,
      "eventId": String,
      "upvotes": Number,
      "downvotes": Number,
      "created": Number
    }
  }
  ```

Error body:
  ```json
  {
    "success": false,
    "message": "error message"
  }
  ```

**PATCH /api/v1/songs/:songid/upvote**

Path Parameter:
  - songid: Song ID [_id]

Request body:
  ```json
  {
    "userid": String
  }
  ```

Response body:
  ```json
  {
    "success": true,
    "updatedSong": {
      "_id": String,
      "artist": String,
      "title": String,
      "eventId": String,
      "upvotes": Number,
      "downvotes": Number,
      "created": Number
    },
    "updatedUser": {
      "_id": String,
      "name": String,
      "password": String,
      "admin": Boolean,
      "deejay": Boolean,
      "created": Number,
      "availableVotes": Number,
      "firstVoting": Number,
      "resetVoting": Number
    }
  }
  ```

Error body:
  ```json
  {
    "success": false,
    "message": "error message"
  }
  ```

**PATCH /api/v1/songs/:songid/downvote**

Path Parameter:
  - songid: Song ID [_id]

Request body:
  ```json
  {
    "userid": String
  }
  ```

Response body:
  ```json
  {
    "success": true,
    "updatedSong": {
      "_id": String,
      "artist": String,
      "title": String,
      "eventId": String,
      "upvotes": Number,
      "downvotes": Number,
      "created": Number
    },
    "updatedUser": {
      "_id": String,
      "name": String,
      "password": String,
      "admin": Boolean,
      "deejay": Boolean,
      "created": Number,
      "availableVotes": Number,
      "firstVoting": Number,
      "resetVoting": Number
    }
  }
  ```

Error body:
  ```json
  {
    "success": false,
    "message": "error message"
  }
  ```

## **Realtime support for socket.io**

**available Events**

  User:
    
    - "deejay_added"
    - "deejay_updated"
    - "deejay_deleted" 
  
  Event:

    - "event_added"
    - "event_updated"
    - "event_deleted"
  
  Song:

    - "song_added"
    - "song_updated"
    - "song_deleted"