import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule, {preserveWhitespaces: true})
  .then(success => {
    console.log('Bootstrap success');
    const preBootstrap = document.getElementById('preloader-container');
    document.getElementsByTagName('meta')['og:url'].content = environment.AdvicePortalDomain;

    // Add the class-name to initiate the transitions
    preBootstrap.className = 'loaded';

    // Remove the preloader container after the transition has completed
    setTimeout(
      function removeLoadingScreen() {
        preBootstrap
          .parentNode
          .removeChild(preBootstrap);
      }, 500);
  });
