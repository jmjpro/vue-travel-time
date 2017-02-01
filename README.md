# Travel Time and Weather

> A vue.js + vueX + vee-validate project

> The Search and Reset buttons are disabled or enabled as appropriate based on the form state. For example, during a search both buttons are disabled

> The live demo https://jmjpro.github.io/vue-travel-time/dist is currently hosted at Github Pages which forces https. Since the code accesses non-secure API calls, you must force to browser to override checks for mixed content. One way to accomplish this is to start Chrome with the `--allow-running-insecure-content` flag. You must also bypass CORS restrictions. You can achieve this in Chrome via the extension https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en and adding the bypass URLs `https://jmjpro.github.io/vue-travel-time/*`, `https://maps.googleapis.com/maps/api/directions/json*`, and `http://api.openweathermap.org/data/2.5/weather*`.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
