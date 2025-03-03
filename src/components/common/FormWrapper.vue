<template>
  <section
    :class="[className, {'no-header-slots': !hasHeaderSlots}]"
    :style="{padding: (fullscreen?0:20)+'px'}"
    class="form-wrapper bg-white"
  >
    <q-layout ref="formLayout"
              class="full-height"
              :class="[$q.dark.isActive?'':`bg-${bgColor}`]"
              container
              :style="['border-radius: 1px;', {boxShadow: $q.dark.isActive?'#ffffff3f 0px 0px 0px 1px' : '#d5d8de 0px 0px 0px 1px'}]"
              view="hHh lpR fFf">
      <q-header bordered class="form--header q-pr-sm form-wrapper-header"
                v-if="!hideTitle">
        <q-toolbar class="q-pa-none" style="min-height: 32px">
          <div
            class="col-auto"
            v-if="hasSlot('before-title')"
          >
            <slot name="before-title"></slot>
          </div>
          <div class="form-title text-grey-6 fw">
            <span class="title__wrapper">
              <span>{{ formTitle }}</span>
            </span>
          </div>
          <div class="header--section" v-if="hasSlot('header')">
            <slot name="header"/>
          </div>
          <div class="h-separator"></div>
          <span v-if="hasSlot('before-close')"><slot name="before-close"/></span>
          <span class="fw-close-btn">
              <q-btn
                @click="closeForm"
                dense
                icon="cancel_presentation"
                round
                size="13px"
                unelevated
                style="color: #607598"
                v-if="!hideClose"
              ></q-btn>
          </span>
          <div
            class="col"
            v-if="hasSlot('after-title')"
          >
            <slot name="after-title"></slot>
          </div>
        </q-toolbar>
      </q-header>

      <q-page-container id="form-wrapper-holder" ref="pagecontent">
        <q-page>
          <div class="absolute-full column no-wrap">
            <div class="column no-wrap full-height">
              <div :class="{'column': vertical}"
                   :style="{padding: (typeof padding==='undefined' || padding===false)?0: '8px'}"
                   class="pivotbar--content full-width no-wrap">
                <slot/>
              </div>
            </div>
          </div>
          <q-inner-loading
            :showing="loading"
            label="لطفا منتظر بمانید..."
            label-class="text-primary"
            color="primary"
            label-style="font-size: 16px"
          />
        </q-page>
      </q-page-container>

      <q-footer class="text-primary q-pa-sm form-wrapper-footer"
                :class="$q.dark.isActive?'bg-lighten4':'bg-grey-2'"
                v-if="hasSlot('footer')">
        <slot name="footer"/>
      </q-footer>
    </q-layout>
  </section>
</template>
<script>
export default {
  props: {
    title: {
      type: String
    },
    className: {
      type: String,
      default: ''
    },
    hideClose: {
      type: Boolean,
      default: false
    },
    hideTitle: {
      type: Boolean,
      default: false
    },
    fullscreen: Boolean,
    loading: Boolean,
    vertical: Boolean,
    padding: {
      type: [Boolean, String],
      default: true
    },
    bgColor: {
      type: String,
      default: 'white'
    }
  },
  data () {
    return {
      formTitle: '',
      mainForm: null
    }
  },
  computed: {
    isReadonlyMode () {
      if (!this.mainForm) return false
      return this.mainForm.forceReadonly
    },
    hasHeaderSlots () {
      return this.hasSlot('before-title') || this.hasSlot('header') || this.hasSlot('after-title') || this.hasSlot('before-close')
    }
  },
  methods: {
    searchParent (current) {
      if (!current) return

      if (current && current.main) {
        this.mainForm = current
        return
      }

      if (current.$parent) {
        if (current.$parent && current.$parent.main) {
          this.mainForm = current.$parent
          return
        }
        this.searchParent(current.$parent)
      }
    },
    closeForm () {
      this.$emit('close')
      this.$root.$emit('close-form')
      if (this.mainForm) {
        this.$store.dispatch('formLauncher/removeForm', this.mainForm.name)
      }
    },
    hasSlot (name = 'default') {
      return !!this.$slots[name] || !!this.$scopedSlots[name]
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
    fixSidebarFormWrapper () {
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.bindFormTitle()
      document.querySelector('.pivotbar--content').scrollTo(0, 0)

      // this.$emit('load')
      this.searchParent(this)
      // this.fixSidebarFormWrapper()
    })
  },
  watch: {
    title () {
      console.log(this.title)
      this.bindFormTitle()
    }
  }
}
</script>
<style lang="scss">
.form-wrapper {

  .pivotbar--content {
    outline: 0;
    flex-grow: 1;
    overflow-y: auto;
    overflow-x: hidden;
    scroll-behavior: smooth;
    position: relative;
  }

  .form-title {
    height: 32px;
    font-weight: 400;
    font-size: 11px;
    font-stretch: normal;
    font-style: normal;
    line-height: 32px;
    letter-spacing: normal;
    flex-grow: 1;
    /*width: 100%;*/
    display: inline-block;
    padding: 0;
    white-space: nowrap;
    min-width: min-content;
    min-width: fit-content;

    .title__wrapper {
      border: 0 solid #fff;
      overflow: hidden;
      padding-right: 30px;
      height: 100%;
      line-height: normal;
      display: inline-flex;
      align-items: center;

      > span {
        position: relative;
        display: inline-flex;
        align-items: center;
        color: #607598;
        height: 100%;
        padding: 0 8px;
        background-color: #dee7f1;
        background-image: linear-gradient(0deg, rgb(213, 222, 230), rgb(231, 237, 245));
        /*border: 2px solid #ecf1f7;*/
        border: none;
        border-radius: 1px;

        &:after {
          content: '';
          width: 30px;
          height: 30px;
          background-color: #dee7f1;
          background-image: linear-gradient(45deg, rgb(213, 222, 230), rgb(231, 237, 245));
          border: 2px solid #ecf1f7;
          transform: rotate(-45deg);
          border-left-color: transparent;
          border-top-color: transparent;
          border-radius: 1px;
          position: absolute;
          right: -10px;
          z-index: -1;
          top: 1px;
        }
      }

      body.body--dark & {
        > span {
          color: var(--dark-text-color);
          background-color: var(--lighten4);
          background-image: linear-gradient(0deg, var(--darken2), var(--lighten4));

          &:after {
            background-color: var(--lighten4);
            background-image: linear-gradient(45deg, var(--darken2), var(--lighten4));
            border-color: var(--dark-border);
          }
        }
      }

      /* &:after {
         border-bottom: 2px solid var(--q-color-primary);
         content: '';
         position: absolute;
         left: 0;
         bottom: 0px;
         right: 0;
       }*/
    }
  }

  /*
      .fw-close-btn {
        position: relative;

        &:before {
          content: '';
          border-right: 1px solid #ddd;
          height: 16px;
          width: 1px;
          position: absolute;
          left: -5px;
          top: 50%;
          transform: translateY(-50%)
        }
      }*/

  .form--header {
    .h-separator {
      border-left: 1px solid #ddd;
      height: 16px;
      width: 1px;
      padding: 0 4px;

      body.body--dark & {
        border-left-color: var(--border-color);
      }
    }

    .header--section {
      width: 100%;
      flex-grow: 0;
      flex-wrap: nowrap;
      max-width: 100%;
      overflow: hidden;
    }
  }

  .form-wrapper-header {
    body.body--dark & {
      //background-color: rgba(68, 94, 133, .48);
      background-color: var(--dark);
      background-image: linear-gradient(to top, var(--darken2), var(--lighten4));
      color: #fff;
    }

    body.body--light & {
      background-color: #dee7f1;
      background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);
      color: #000;
    }
  }

  .form-wrapper-footer {
    border-top: 1px solid $separator-color;

    body.body--dark & {
      border-top: 1px solid $separator-dark-color;
    }
  }
}

.safa-popup .form-wrapper.no-header-slots .q-header {
  display: none;
}
</style>
