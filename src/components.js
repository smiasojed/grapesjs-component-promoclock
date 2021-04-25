export default function(editor, opt = {}) {
  const c = opt;
  const domc = editor.DomComponents;
  const defaultType = domc.getType('default');
  const textType = domc.getType('text');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;
  const textModel = textType.model;
  const textView = textType.view;
  const pfx = c.promoclockClsPfx;
  const PROMOCLOCK_TYPE = 'promoclock';

  domc.addType(PROMOCLOCK_TYPE, {

    model: defaultModel.extend({
      defaults: {
        ...defaultModel.prototype.defaults,
        duration: c.duration,
        cookie: c.cookie,
        expires: c.expires,
        endText: c.endText,
        redirect: c.redirect,
        droppable: false,
        traits: [{
          label: 'Duration',
          name: 'duration',
          changeProp: 1,
        },{
          label: 'Cookie name',
          name: 'cookie',
          changeProp: 1,
        },{
          label: 'Cookie validity',
          name: 'expires',
          changeProp: 1,
        },{
          label: 'End text',
          name: 'endText',
          changeProp: 1,
        },{
          label: 'Redirect to',
          name: 'redirect',
          changeProp: 1,
        }],
        script: function() {
          var cookieName = '{[ cookie ]}';
          var cookieExpires = '{[ expires ]}';
          var endTxt = '{[ endText ]}';
          var duration = '{[ duration ]}';
          var redirectUrl = '{[ redirect ]}';
          var promoclockEl = this.querySelector('[data-js=promoclock]');
          var endTextEl = this.querySelector('[data-js=promoclock-endtext]');
          var dayEl = this.querySelector('[data-js=promoclock-day]');
          var hourEl = this.querySelector('[data-js=promoclock-hour]');
          var minuteEl = this.querySelector('[data-js=promoclock-minute]');
          var secondEl = this.querySelector('[data-js=promoclock-second]');
          var oldInterval = this.gjs_promoclock_interval;
          var durationMs = Number(duration)*24*60*60*1000;
          if(oldInterval) {
            oldInterval && clearInterval(oldInterval);
          }

          var getCookieValue = function(name) {
            var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
            if (match) {
              return match[2];
            } else {
              return '';
            }
          }

          var setCookieValue = function (name,value,days) {
            var expires = "";
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days*24*60*60*1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + (value || "")  + expires + "; path=/";
        }

          var setTimer = function (days, hours, minutes, seconds) {
            dayEl.innerHTML = days < 10 ? '0' + days : days;
            hourEl.innerHTML = hours < 10 ? '0' + hours : hours;
            minuteEl.innerHTML = minutes < 10 ? '0' + minutes : minutes;
            secondEl.innerHTML = seconds < 10 ? '0' + seconds : seconds ;
          }

          var moveTimer = function() {
            var now = new Date().getTime();
            var distance = promoClockDate - now;
            var days = Math.floor(distance / 86400000);
            var hours = Math.floor((distance % 86400000) / 3600000);
            var minutes = Math.floor((distance % 3600000) / 60000);
            var seconds = Math.floor((distance % 60000) / 1000);

            setTimer(days, hours, minutes, seconds);

            /* If the count down is finished, write some text */
            if (distance < 0) {
              clearInterval(interval);
              endTextEl.innerHTML = endTxt;
              promoclockEl.style.display = 'none';
              endTextEl.style.display = '';
              if (redirectUrl) {
                if (window.location !== window.parent.location) {
                  endTextEl.innerHTML = redirectUrl;
                } else {
                  window.location.replace(redirectUrl);
                }
              }
            }
          }

          if (durationMs) {
            var promoClockDate = Date.now() + durationMs;
            var promoClockDateCookie = getCookieValue(cookieName);
            if (promoClockDateCookie === '') {
              setCookieValue(cookieName, promoClockDate, Number(cookieExpires));
            } else {
              promoClockDate = Number(promoClockDateCookie);
            }
            var interval = setInterval(moveTimer, 1000);
            this.gjs_promoclock_interval = interval;
            endTextEl.style.display = 'none';
            promoclockEl.style.display = '';
            moveTimer();
          } else {
            setTimer(0, 0, 0, 0);
          }
        }
      },
    }, {
      isComponent(el) {
        if(el.getAttribute &&
          el.getAttribute('data-gjs-type') == PROMOCLOCK_TYPE) {
          return {
            type: PROMOCLOCK_TYPE
          };
        }
      },
    }),

    view: defaultView.extend({
      init() {
        this.listenTo(this.model, 'change:duration change:cookie change:expires', () => document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); }));
        this.listenTo(this.model, 'change:expires change:cookie change:endText change:duration change:redirect', this.updateScript);

        const comps = this.model.get('components');

        // Add a basic promoclock template if it's not yet initialized
        if (!comps.length) {
          comps.reset();
          comps.add(`
            <span data-js="promoclock" class="${pfx}-cont">
              <div class="${pfx}-block">
                <div data-js="promoclock-day" class="${pfx}-digit"></div>
                <div class="${pfx}-label">${c.labelDays}</div>
              </div>
              <div class="${pfx}-block">
                <div data-js="promoclock-hour" class="${pfx}-digit"></div>
                <div class="${pfx}-label">${c.labelHours}</div>
              </div>
              <div class="${pfx}-block">
                <div data-js="promoclock-minute" class="${pfx}-digit"></div>
                <div class="${pfx}-label">${c.labelMinutes}</div>
              </div>
              <div class="${pfx}-block">
                <div data-js="promoclock-second" class="${pfx}-digit"></div>
                <div class="${pfx}-label">${c.labelSeconds}</div>
              </div>
            </span>
            <span data-js="promoclock-endtext" class="${pfx}-endtext"></span>
          `);
        }

      }
    }),
  });
}
