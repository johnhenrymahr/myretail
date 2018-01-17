##overveiw

Built using webpack, react, redux, less, bootstrap, and express (preview app)

It was unclear what the json data file represented so I made the assumption it would be delivered by a REST endpoint.

##details

###Install

pull down repo and install dependencies

```git clone https://github.com/johnhenrymahr/myretail.git```


```cd myretail```

```npm install```

###Run Preview/Development App

```npm start```

visit in web browser
```http://localhost:1616```

###Run Tests

```npm test```

###Build
```npm run build```

output will be in dist/ folder as well as dist.zip and dist.tar.gz.

##Deployment / CI

Not really sure about surrounding ifrastructure but...

A workable index.html file is generated as part of the build with necessary links and DOM mount point for the react app.

The key is the url to the rest endpoint. It can be defined at build time as part of a Jenkins/CI server job via a enviromental variable.

```export SERVICE_URL='//path/to/data'```

The server url can also be overridden at run time by populating the global variable:

```window.initData.SERVICE_URL```

Then the index file and supporting css adn js files can be copied to the approriate webserver directory. Resouces are also provded in zip and tar archives for easier transport.

On the other had if this is being integrated into another application that applciation will need the fingerprinted 
paths to the resources (css file and js bundle) so the correct paths can be echoed for link and script tags.

these car be obtained by parsing the dist/stats/stats.json file and checking the js and css properties respectively. 






