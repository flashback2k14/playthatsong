#! /bin/bash

mongoimport --db playthatsong --collection users --drop --file ./users.json
mongoimport --db playthatsong --collection events --drop --file ./events.json
mongoimport --db playthatsong --collection songs --drop --file ./songs.json