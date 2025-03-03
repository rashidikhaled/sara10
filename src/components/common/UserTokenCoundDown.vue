<template>
  <div id="user-token-countdown" title="زمان باقیمانده">
    <div class="row justify-center items-center no-wrap q-py-xs">
      <div class="col-4">
        <span id="timer-hours"></span>
        <p>ساعت</p>
      </div>
      <div class="col-auto timer-dots">:</div>
      <div class="col-4">
        <span id="timer-mins"></span>
        <p>دقیقه</p>
      </div>
      <div class="col-auto timer-dots">:</div>
      <div class="col-4">
        <span id="timer-secs"></span>
        <p>ثانیه</p>
      </div>
    </div>
  </div>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  name: "UserTokenCoundDown",
  mixins: [baseFormMixin],
  data () {
    return {
      timer: null
    }
  },
  props: {
    // endDate: [Number, Date, String]
  },
  methods: {
    countdown () {
      // let hours, minutes, seconds
      // const daysElem = this.$el.querySelector('#days')
      const hoursElem = this.$el.querySelector("#timer-hours")
      const minutesElem = this.$el.querySelector("#timer-mins")
      const secondsElem = this.$el.querySelector("#timer-secs")

      const endDate = this.getDate().getTime()

      this.timer = setInterval(
        function () {
          let now = new Date().getTime()
          let t = endDate - now

          if (t >= 0) {
            let hours = Math.floor(t / (1000 * 60 * 60))
            let mins = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60))
            let secs = Math.floor((t % (1000 * 60)) / 1000)

            hoursElem.innerHTML = ("0" + hours).slice(-2)

            minutesElem.innerHTML = ("0" + mins).slice(-2)

            secondsElem.innerHTML = ("0" + secs).slice(-2)

            if (hours <= 1 && mins < 30) {
              this.$el.classList.add("highlight")
              this.$el.style.animationDuration =
                Math.min(Math.max(mins, 1), 30) + "s"

              if (mins <= 5) {
                this.$el.classList.add("explosion")
              } else {
                this.$el.classList.remove("explosion")
              }
            } else {
              this.$el.classList.remove("highlight")
            }
          } else {
            this.$stSecurity.dispatch("authorize/signOut")

            setTimeout(
              function () {
                this.showWarning(
                  "زمان نشست شما به پایان رسیده است."
                )
                // this.redirectToLogin()
              }.bind(this),
              1000
            )
          }
        }.bind(this),
        1000
      )
    },
    getDate () {
      const ts = this.$stSecurity.getters['authorize/expiryDate']
      if (!ts) return new Date()
      return new Date(ts)
      // return new Date(new Date().getTime() + (1 * 60000))
    }
  },
  computed: {},
  mounted () {
    this.$nextTick(() => {
      this.countdown()
    })
  },
  beforeDestroy () {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }
}
</script>

<style scoped lang="scss">
#user-token-countdown {
  direction: rtl;
  border-radius: 4px;

  > div {
    border-radius: 4px;
    color: var(--text-theme-color);
    min-width: 130px;
    text-align: center;

    > div {
      text-align: center;

      &:not(.timer-dots) {
        padding: 0 4px;
      }

      span {
        font-size: 15px;
        line-height: 18px;
        height: 18px;
        display: block;
      }

      p {
        margin: 0;
        font-size: 8px;
        line-height: 12px;
        color: #a5b8cd;
      }
    }
  }

  &.highlight {
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    animation-iteration-count: infinite;
    animation-name: flash;
    transition: 0.2s all ease;
    opacity: 1;
    --timer-highlight-color: #ffc107;

    &:not(.explosion) {
      > div {
        color: #fff !important;
        transition: 0.2s all ease;
      }
    }

    &.explosion {
      border: 1px solid var(--timer-highlight-color);

      > div {
        color: var(--timer-highlight-color) !important;
        transition: 0.2s all ease;

        p {
          color: var(--timer-highlight-color) !important;
        }
      }
    }
  }
}

@keyframes flash {
  0%,
  50%,
  100% {
    opacity: 1;
  }
  25%,
  75% {
    opacity: 0;
  }
}
</style>
