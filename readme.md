#My Retail Case Study

##Overveiw

Built using webpack, react, redux, less, bootstrap, and express (preview app)

I made the assumption that the json data would be delivered by a REST endpoint.

##Tech Details

###Install

*requires node.js  (preferably at least v6 or newer) *

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

Configuration is required for the REST endpoint. It can be defined at build time as part of a Jenkins/CI server job via a enviromental variable. It must be exported before the build is run.

```export SERVICE_URL='//path/to/data'```

The server url can also be overridden at run time by populating the global variable:

```window.initData.SERVICE_URL```

**In preview app endpoint is mocked via an express route**

If being integrated into a server side application generated page the fingerprinted asset names can be  obtained by parsing the dist/stats/stats.json file and checking the js and css properties respectively. 







