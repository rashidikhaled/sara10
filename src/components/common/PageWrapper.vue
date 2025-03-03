<template>
  <section
    class="form-wrapper"
    :class="
      className +
        (hasTab ? ' has-tab' : '') +
        (hasHeader ? ' has-header' : '') +
        (hasFooter ? ' has-footer' : '') +
        (hasBackground ? ' has-bg' : '')
    "
  >
    <div
      v-if="hasHeader"
      id="fw-header-sec"
    >
      <slot name="header"></slot>
    </div>
    <div
      id="fw-content-placeholder"
      :style="fwContentStyle"
    >
      <div id="fw-content">
        <div
          class="form-title fw"
          v-show="!hideTitle"
        >
          <div class="row items-center q-col-gutter-sm">
            <div
              class="col-auto"
              v-if="!hideClose"
            >
              <q-btn
                size="sm"
                color="grey-6"
                icon="close"
                flat
                round
                @click="closeForm"
              ></q-btn>
            </div>
            <div
              class="col-auto"
              v-if="hasSlot('before-title')"
            >
              <slot name="before-title"></slot>
            </div>
            <div class="col">{{formTitle}}</div>
            <div
              class="col-auto"
              v-if="hasSlot('after-title')"
            >
              <slot name="after-title"></slot>
            </div>
          </div>
        </div>
        <q-scroll-area class="form-wrapper-scroll">
          <slot></slot>
        </q-scroll-area>
      </div>
    </div>
    <div
      v-if="hasFooter"
      id="fw-footer-sec"
    >
      <slot name="footer"></slot>
    </div>
  </section>
</template>
<script>
var timer
export default {
  props: {
    title: {
      type: String
    },
    isCalculateSize: {
      type: Boolean,
      default: true
    },
    hasBackground: {
      type: Boolean,
      default: true
    },
    hasHeader: {
      type: Boolean,
      default: false
    },
    hasFooter: {
      type: Boolean,
      default: true
    },
    className: {
      type: String,
      default: ''
    },
    ignoreTab: {
      type: Boolean,
      default: false
    },
    bottomOffset: {
      type: Number,
      default: 0
    },
    hideClose: {
      type: Boolean,
      default: false
    },
    hideTitle: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      formTitle: ''
    }
  },
  computed: {
    fwContentStyle () {
      return !this.hasHeader ? { paddingTop: 0, paddingBottom: 0 } : {}
    }
  },
  methods: {
    closeForm () {
      // this.$router.push('/?activeTab=kartable')
      // this.$root.$emit('setForm', 'kartable')
      this.setForm({ formKey: 'system', formName: 'kartable', title: 'کارتابل', layout: 1 })
    },
    footerHeight () {
      const element = document.querySelector('#fw-footer-sec')
      if (!this.existElem(element)) return 0
      return element.getBoundingClientRect().height
    },
    hasSlot (name = 'default') {
      return !!this.$slots[name] || !!this.$scopedSlots[name]
    },
    headerHeight () {
      const element = document.querySelector('#fw-header-sec')
      if (!this.existElem(element)) return 0
      return element.getBoundingClientRect().height
    },
    offsetTop () {
      return this.getOffsetTop('#fw-content-placeholder')
    },
    hasTab () {
      var element = document.querySelector('#fw-content-placeholder .q-tabs')
      const hasElem = this.existElem(element)
      // console.log('has tab', hasElem && !this.ignoreTab)
      return hasElem && !this.ignoreTab
    },
    existElem (element) {
      return typeof element !== 'undefined' && element !== null
    },
    getOffsetTop (selector) {
      const element = document.querySelector(selector)
      if (this.existElem(element)) {
        return element.getBoundingClientRect().top
      }
      return 0
    },
    applyScroll () {
      if (!this.isCalculateSize) return

      const contentEl = this.$el.querySelector('#fw-content')
      const scrollWrapperEl = this.$el.querySelector('.form-wrapper-scroll')

      // form wrapper set height
      const winHeight = window.innerHeight
      const totalExtraOffset = this.offsetTop() + this.bottomOffset + 20
      const formWrapperHeight = winHeight - totalExtraOffset

      this.$el.style.height = formWrapperHeight + 'px'

      // form-wrapper-scroll set height
      const formTitleHeight = this.hideTitle
        ? 0
        : contentEl.querySelector('.form-title').getBoundingClientRect()
          .height + 20
      const fwContentPadding = this.hasBackground ? 40 : 0
      const extraSpacing = fwContentPadding + formTitleHeight
      scrollWrapperEl.style.height =
        contentEl.getBoundingClientRect().height - extraSpacing + 'px'

      const autoHeightElems = scrollWrapperEl.querySelectorAll('.auto-height')
      if (autoHeightElems.length) {
        autoHeightElems.forEach((el) => {
          const offsetSize = (el.getAttribute('offset') && parseInt(el.getAttribute('offset'))) || 0

          el.style.height =
            scrollWrapperEl.getBoundingClientRect().height -
            (10 + offsetSize) +
            'px'
        })
      }
    },
    bindFormTitle () {
      if (this.hideTitle) return
      if (this.title) {
        this.formTitle = this.title
      } else {
        // console.log(this.$el)
        const internalTitle = this.$el.querySelector('.form-title:not(.fw)')
        if (internalTitle) {
          this.formTitle = internalTitle.innerText
          internalTitle.remove()
        }
      }
    },
    update () {
      this.applyScroll()
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.bindFormTitle()

      window.addEventListener('resize', this.applyScroll)
      const self = this
      timer = setInterval(function () {
        self.applyScroll()
      }, 60000)

      // Init
      this.applyScroll()
    })
  },
  updated () {
    this.applyScroll()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.applyScroll)
    if (timer) {
      clearInterval(timer)
    }
  },
  watch: {
    title () {
      this.bindFormTitle()
    }
  }
}
</script>
<style lang="scss">
.form-wrapper {
  margin: 20px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;

  #fw-content-placeholder {
    padding-bottom: 20px;
    flex: 1;
    max-height: 100%;
    min-height: 0;

    #fw-content {
      width: 100%;
      height: 100%;
      margin: 0;
    }
  }
  &.has-bg {
    background-color: #fff;
    box-shadow: 1px 2px 4px #b9b9b9;
    border-radius: 4px;

    #fw-content {
      padding: 20px;
    }
  }
}

#fw-footer-sec {
  display: flex;
  justify-content: right;
  align-items: center;
  padding: 10px;
  background-color: #f5f5f5;
  width: 100%;
  height: auto;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.08);
  border-top: 1px solid #ddd;

  // button {
  //   margin: 0 8px !important;
  // }
}
</style>
