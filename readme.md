## Angular2 Hydrane

## Install
```bash
git clone https://github.com/vickenliu/hydraneVicken
cd angular2-express-slim

# Install dependencies
npm install

# run and watch for changes in .ts files
npm start

# Applciation url: http://localhost:3000
```

## Development
Uncomment in public/index.html:

```html
<script src="js/systemjs.config.js"></script>
<script>
  System.config({
    defaultJSExtensions: true,
    packages: {
      app: {
        format: 'register',
        defaultExtension: 'js'
      }
    }
  });
  System.import('main')
        .then(null, console.error.bind(console));
</script>
```

Comment out
```html
<!-- Production mod -->
<script src="js/bundle.min.js"></script>
```
