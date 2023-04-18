# Dummy auth app

This app demonstrates integrating an app with Keycloak using OpenID Connect.

## Deploying
### In fly.io
Set `CLIENT_SECRET` environment variable:

```
flyctl secrets set CLIENT_SECRET=***
```

### In keycloak
Create a new client. Most settings can be left as defaults.

- Set redirect URL to `/callback`
- Set root URL to whatever the deployment URL is, e.g. `https://***.fly.dev`
- Enable implicit flow only if you want to be able to test on localhost
