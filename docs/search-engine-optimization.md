# Search Engine Optimization (SEO)

This section documents our approach for Search Engine Optimization for the Intershop Progressive Web App.

## Server Side Rendering

The PWA uses Universal for pre-rendering complete pages to tackle SEO concerns. An Angular application without Universal support will not respond to web crawlers with complete indexable page responses.

Angular's state transfer mechanism is used to transfer properties to the client side. We use it to de-hydrate the ngrx state in the server application and re-hydrate it on the client side. See [Using TransferState API in an Angular v5 Universal App](https://medium.com/angular-in-depth/using-transferstate-api-in-an-angular-5-universal-app-130f3ada9e5b) for specifics.

Follow the steps in the Getting Started to build and run the application in Universal mode.

Official Documentation for Angular Universal can be found at https://angular.io/guide/universal.

## robots.txt

We use the library [express-robots-txt](https://github.com/modosc/express-robots-txt) in the express.js server (`server.ts` in the project root) to supply a response to `robots.txt` for crawlers.

By default the universal server provides a response with access to all pages except some restricted paths (e.g. `/error` or `/account`). To use a custom `robots.txt` place it as a file in the `dist` folder.

## Page Metadata

The PWA uses the library [@ngx-meta/core](https://www.npmjs.com/package/@ngx-meta/core) for setting tags for title, meta description, robots, canonical links and open graph infos in page headers. It is also possible to use translation keys here.

The process is triggered by adding a guard to the routing, see [Project Documentation](https://www.npmjs.com/package/@ngx-meta/core#route-configuration). The default `MetaSettings` are configured in the SEO extension of the PWA and documented in @ngx-meta/core.

`seo.effects.ts` is the central place for customizations concerning dynamic content, e.g. names of products or categories (asynchronous data from the API). Effects are an essential part of our [State Management](./state-management.md).
