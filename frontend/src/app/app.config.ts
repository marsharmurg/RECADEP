import { provideHttpClient, withFetch  } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { routes } from './app.routes';
import { provideRouter } from '@angular/router';
import { AuthModule } from '@auth0/auth0-angular';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withFetch()),
    provideRouter(routes),
    importProvidersFrom(AuthModule.forRoot({
      domain: 'dev-1xf2p1cnt6igj7cz.us.auth0.com',
      clientId: '1hw2tQ6FfezNmO2KDtTGpU5EF5Howorv',
      authorizationParams: {
        redirect_uri: window.location.origin
      },
      cacheLocation: 'localstorage',
      useRefreshTokens: true
    }))
  ]
};

