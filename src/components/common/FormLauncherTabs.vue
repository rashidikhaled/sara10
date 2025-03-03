<template>
  <div id="app-form-tabs" class="relative-position flex no-wrap items-base justify-between">
    <template v-if="side === 'right'">
      <div class="flex inline items-center" style="min-width: 40px;max-width: 40px;">
        <q-btn icon="more_horiz" size="sm" color="grey" class="full-width full-height" flat>
          <q-menu @show="showMenu" anchor="bottom right" self="top right" max-width="280px"
                  content-style="min-width: 280px;">
            <q-item>
              <q-item-section>
                <div class="tabs__search q-mx-xs">
                  <input ref="searchInput" type="search" v-model="searchTerm"/>
                  <q-icon name="search" size="sm" color="grey"/>
                </div>
              </q-item-section>
            </q-item>
            <q-separator/>
            <q-item clickable
                    dense
                    :active="form.formKey===activeForm"
                    style="max-width: 100%"
                    v-close-popup
                    v-for="form in filterdForms"
                    :key="form.formKey"
                    @click="setActiveForm(form.formKey)">
              <q-item-section avatar style="min-width: 32px;">
                <q-icon :name="form.icon" class="q-mr-xs" size="xs"
                        v-if="form.icon"/>
              </q-item-section>
              <q-item-section class="ellipsis text-body4">{{ form.title || '' }}</q-item-section>
            </q-item>
          </q-menu>
        </q-btn>
      </div>
      <q-separator vertical/>
      <div class="flex inline items-center" style="min-width: 40px;max-width: 40px;">
        <q-btn :disable="disablePrevForm" icon="chevron_right" @click="activePrevForm" size="sm" color="grey" flat
              class="full-width full-height"/>
      </div>
      <q-separator vertical/>
      <div class="flex inline items-center" style="min-width: 40px;max-width: 40px;">
        <q-btn :disable="disableNextForm" icon="chevron_left" @click="activeNextForm" size="sm" color="grey" flat
              class="full-width full-height"/>
      </div>
      <!--    <q-separator vertical/>
          <div class="flex inline items-center" style="min-width: 40px;max-width: 40px;">
            <q-btn icon="warning" @click="showRemoteForm" size="sm" color="amber" flat
                  class="full-width full-height"/>
          </div>-->
      <q-separator vertical/>
    </template>
    <div class="tabs__forms relative-position overflow-scroll">
      <div class="form__tabs_list flex items-center no-wrap absolute-top-left">
        <div v-for="form in currentLauncherForms"
            :draggable="!form.lock"
             :key="form.formKey"
             :class="[isActiveForm(form) ? `tab--active shadow-2` : '',{'tab--pin': form.pin}]"
             :style="{
               color: getTextColor(form)
             }"
             :data-tabid="`tab-${form.formKey}`"
             @dragstart="onDrag($event, form.formKey)"
             class="form__tabs_btn no-wrap overflow-hidden relative-position q-hoverable q-clickable">
          <div class="q-focus-helper no-pointer-events"></div>
          <div class="form__tabs_bg absolute-full no-pointer-events"
               :style="{ backgroundColor: getBgColor(form)}"></div>
          <!--          <q-separator v-if="!form.lock && !form.pin" vertical-->
          <!--                       style="height: 12px; align-self: center"/>-->
          <span class="form__tabs_btn_content non-selectable" @click="setActiveForm(form.formKey, form.side)">
            <q-icon v-if="form.icon || isActiveForm(form)" :name="form.icon || 'edit_note'"
                    class="q-mr-xs" size="xs"/><span
            v-html="form.title || '...'"></span>
          </span>
          <span v-if="!form.lock && !form.pin" class="form__tabs_btn_close"><q-icon @click="removeForm(form.formKey)"
                                                                                    name="close" size="14px"/></span>
          <div class="form__tabs_active_line no-pointer-events"
               :style="{background: getBorderColor(form)}"></div>
          <q-menu
            touch-position
            context-menu
            transition-show="scale"
            transition-hide="scale"
            v-if="currentLauncherForms.length>1"
          >

            <q-list dense style="min-width: 100px">
              <q-item clickable v-close-popup @click="removeForm(form.formKey)" v-if="!form.lock && !form.pin">
                <q-item-section>بستن</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="removeAllForm(form.side)" v-if="currentLauncherForms.length >2">
                <q-item-section>بستن همه</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="removeAllExpectForm(form.formKey, form.side)" v-if="currentLauncherForms.length >2">
                <q-item-section>بستن تب های دیگر</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import formLauncherMixin from 'src/mixins/formLauncherMixin'

export default {
  name: 'FormLauncherTabs',
  mixins: [formLauncherMixin],
  data () {
    return {
      searchTerm: ''
    }
  },
  props: {
    side: {
      type: String,
      default: "right",
      required: true
    }
  },
  computed: {
    currentLauncherForms () {
      return Array.prototype.filter.call(this.launcherForms, ({ side }) => side === this.side)
    },
    filterdForms () {
      if (!this.searchTerm) return this.currentLauncherForms
      return this.currentLauncherForms.filter(form => form.title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1)
    },
    disableNextForm () {
      return this.activeFormIndex >= (this.launcherFormsCount - 1)
    },
    disablePrevForm () {
      return this.activeFormIndex <= 0
    },
    launcherFormsCount () {
      return this.$store.getters['formLauncher/formsCount']
    },
    activeFormIndex () {
      return this.$store.getters['formLauncher/activeFormIndex']
    }
  },
  methods: {
    showMenu () {
      this.$nextTick(() => {
        if (this.$refs.searchInput) this.$refs.searchInput.focus()
      })
    },
    isActiveForm (form) {
      return form.formKey === form.side === 'right' ? this.activeForm : this.leftActiveForm
    },
    getTextColor (form) {
      const activeColor = this.$q.dark.isActive ? '#eaf0f5' : form.color
      const normalColor = this.$q.dark.isActive ? '#bbc3c9' : '#838383'
      const isActive = form.formKey === form.side === 'right' ? this.activeForm : this.leftActiveForm
      if (isActive) return activeColor
      return normalColor
      // form.formKey===activeForm && form.pin ? '#fff' : form.pin ? form.color : (form.formKey===activeForm ? form.color : `#585858`)
    },
    getBgColor (form) {
      const activeColor = this.$q.dark.isActive ? 'var(--dark-lighten)' : 'white'
      const normalColor = 'transparent' // this.$q.dark.isActive ? 'var(--dark)' : 'transparent'
      if (form.formKey === form.side === 'right' ? this.activeForm : this.leftActiveForm) return activeColor
      return normalColor
      // form.formKey===activeForm ? (form.pin ? form.color : '#fff') : `transparent`
    },
    getBorderColor (form) {
      const activeColor = this.$q.dark.isActive ? '#eaf0f5' : form.color
      const normalColor = 'transparent' // this.$q.dark.isActive ? 'transparent' : 'transparent'
      const isActive = form.formKey === form.side === 'right' ? this.activeForm : this.leftActiveForm
      if (isActive) return activeColor
      return normalColor
      // form.formKey===activeForm ? (form.pin ? form.color : '#fff') : `transparent`
    },
    onDrag (event, formKey) {
      event.dataTransfer.setData('key', formKey)
    }
  }
}
</script>
<style lang="scss">
$tab_height: var(--form-launcher-tab-height, 30px);

#app-form-tabs {
  height: $tab_height;
  min-height: $tab_height;
  overflow: hidden;
  //background: #cddef1;
  //background: linear-gradient(to bottom, #e8eaeb 0%, #e6ecf1 50%, #e0eaef 100%);
  //box-shadow: inset 1px 1px 5px rgba(0, 0, 0, .15);

  body.body--dark & {
    background: var(--q-color-dark-page);
  }

  body.body--light & {
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAADCAIAAABee8vuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAB1JREFUeNpi/P79O8PgAyzMzMyD0FlMDIMSAAQYAC22AvZUamhbAAAAAElFTkSuQmCC");
  }

  .tabs__forms {
    height: $tab_height;
    max-width: 100%;
    width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    min-height: 40px;
    min-height: calc(var(--form-launcher-tab-height, 30px) + 10px);
  }

  .form__tabs_list {
    height: $tab_height;

    > * {
      height: $tab_height;
      position: relative;

      &:after {
        content: '';
        width: 1px;
        height: 100%;
        margin: auto;
        background-color: rgba(0, 0, 0, .05);
        z-index: 1;
        position: absolute;
        right: 0;
      }

      body.body--dark &:after {
        background-color: rgba(255, 255, 255, .05);
      }

    }

    .q-btn__wrapper {
      min-height: auto;
    }

    .form__tabs_btn {
      cursor: default;
      display: flex;
      align-items: center;
      //border: 1px solid #cbcbcb;
      //background-color: #f5f5f5;
      //color: #797979;
      //margin-right: 8px;
      //border-radius: 3px;
      white-space: nowrap;
      padding: 0 4px 0 8px;

      &.tab--pin {
        padding: 0 8px;
      }

      .form__tabs_bg {
        z-index: 0;
      }

      .form__tabs_btn_content {
        padding: 0;
        height: 100%;
        display: flex;
        align-items: center;
        z-index: 1;
      }

      .form__tabs_btn_close {

        .q-icon {
          width: 22px;
          height: 24px;
          color: rgba(0, 0, 0, .3);
          cursor: pointer;

          &:hover {
            color: rgba(0, 0, 0, .6)
          }

          body.body--dark & {
            color: rgba(255, 255, 255, .3);

            &:hover {
              color: rgba(255, 255, 255, .6)
            }
          }
        }
      }

      .form__tabs_active_line {
        height: 2px;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 1;
      }

      /*      &.tab--active {
              !*background: var(--q-color-primary) !important;
              border-color: var(--q-color-primary) !important;*!
              color: #f5f5f5 !important;
            }

            &.tab--pin:not(.tab--active) {
              background-color: #f5f5f5;
              border-color: var(--q-color-primary);
              color: var(--q-color-primary);

              body.body--dark & {
                background-color: var(--lighten1) !important;
                border-color: var(--q-color-primary) !important;
                color: inherit;
              }
            }

            body.body--dark & {
              background: var(--dark);
              color: var(--text-color);
              border-color: var(--border-color);
            }*/
    }
  }
}

.tabs__search {
  width: 100%;
  height: 32px;
  position: relative;

  .q-icon {
    position: absolute;
    left: 0;
    top: 0;
    width: 24px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  input {
    //border: 1px solid rgba(0, 0, 0, .5);
    //border-radius: 3px;
    border: none;
    padding: 4px;
    padding-left: 32px;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    font-size: 13px;
  }

  body.body--dark & {
    icon {
      color: var(--text-color);
    }

    input {
      background-color: var(--dark);
      color: var(--text-color);
      border-color: var(--border-color);
    }
  }
}
</style>
