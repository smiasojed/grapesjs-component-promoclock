import {
  promoclockRef
} from './consts';

export default function(editor, opt = {}) {
  const c = opt;
  const bm = editor.BlockManager;
  const pfx = c.promoclockClsPfx;
  const style = c.defaultStyle ? `<style>
    .${pfx} {
      text-align: center;
      font-family: Helvetica, serif;
    }

    .${pfx}-block {
      display: inline-block;
      margin: 0 10px;
      padding: 10px;
    }

    .${pfx}-digit {
      font-size: 5rem;
    }

    .${pfx}-endtext {
      font-size: 5rem;
    }

    .${pfx}-cont,
    .${pfx}-block {
      display: inline-block;
    }
  </style>` : '';

  if (c.blocks.indexOf(promoclockRef) >= 0) {
    bm.add(promoclockRef, {
      label: c.labelPromoclock,
      category: c.labelPromoclockCategory,
      attributes: {class:'fa fa-clock-o'},
      content: `
        <div class="${pfx}" data-gjs-type="promoclock"></div>
        ${style}
      `
    });
  }
}
