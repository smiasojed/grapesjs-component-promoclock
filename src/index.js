import grapesjs from 'grapesjs';
import loadComponents from './components';
import loadBlocks from './blocks';
import {
  promoclockRef
} from './consts';

export default grapesjs.plugins.add('gjs-component-promoclock', (editor, opts = {}) => {
  let c = opts;

  let defaults = {
    blocks: [promoclockRef],

    // Default style
    defaultStyle: true,

    // Default cookie name
    cookie: 'promoClockCookie',

    //Default cookie validity
    expires: '100',

    // Text to show when the promoclock is ended
    endText: 'EXPIRED',

    // Duration in days
    duration: '',

    // Date input type, eg, 'date', 'datetime-local'
    dateInputType: 'date',

    // Promoclock class prefix
    promoclockClsPfx: 'promoclock',

    // Promoclock label
    labelPromoclock: 'Promoclock',

    // Promoclock category label
    labelPromoclockCategory: 'Extra',

    // Days label text used in component
    labelDays: 'days',

    // Hours label text used in component
    labelHours: 'hours',

    // Minutes label text used in component
    labelMinutes: 'minutes',

    // Seconds label text used in component
    labelSeconds: 'seconds',
  };

  // Load defaults
  for (let name in defaults) {
    if (!(name in c))
      c[name] = defaults[name];
  }

  // Add components
  loadComponents(editor, c);

  // Add components
  loadBlocks(editor, c);

});
