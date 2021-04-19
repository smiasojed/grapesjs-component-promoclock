# GrapesJS Promoclock

Simple promoclock component for GrapesJS Editor

# [Demo](http://grapesjs.com/demo.html)





## Summary

* Plugin name: `gjs-component-promoclock`
* Components: `promoclock`
* Blocks: `promoclock`





## Options

* `blocks` Which blocks to add, default: `['promoclock']` (all)
* `defaultStyle` Add default style to blocks, default: true
* `duration` promoClock duration
* `cookie` Cookie name 'promoClockCookie'
* `expires` Cookie validity in days shall be greater than promoClock duration '100'
* `endText` Text to show when the promoclock is ended, default: 'EXPIRED'
* `dateInputType` Date input type, eg, 'date', 'datetime-local', default: 'date'
* `promoclockClsPfx` Promoclock class prefix, default: 'promoclock'
* `labelPromoclock` Promoclock label, default 'Promoclock'
* `labelPromoclockCategory` Promoclock category label, default 'Extra'
* `labelDays` Days label text used in component, default 'days'
* `labelHours` Hours label text used in component, default 'hours'
* `labelMinutes` Minutes label text used in component, default 'minutes'
* `labelSeconds` Seconds label text used in component, default 'seconds'





## Download

* `npm i grapesjs-component-promoclock` or `yarn add grapesjs-component-promoclock`





## Usage

```html
<link href="path/to/grapes.min.css" rel="stylesheet"/>
<script src="path/to/grapes.min.js"></script>
<script src="path/to/grapesjs-component-promoclock.min.js"></script>

<div id="gjs"></div>

<script type="text/javascript">
  var editor = grapesjs.init({
      container : '#gjs',
      plugins: ['gjs-component-promoclock'],
      pluginsOpts: {
        'gjs-component-promoclock': {/* ...options */}
      }
  });
</script>
```





## Development

Clone the repository

```sh
$ git clone https://github.com/artf/grapesjs-component-promoclock.git
$ cd grapesjs-component-promoclock
```

Install it

```sh
$ npm i
```

Start the dev server

```sh
$ npm start
```

Build before the commit. This will also increase the patch level version of the package

```sh
$ npm run build
```





## License

BSD 3-Clause
