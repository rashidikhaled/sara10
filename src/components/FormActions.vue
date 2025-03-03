<template>
  <div class="form-action full-width">
    <button-group :buttons="currentButtons" height="30px" ref="bgroups">
      <slot name="before"></slot>
      <btn-new
        v-show="!isFormEditable && showNewButton"
        :spId="newSPId"
        :formId="newFormId"
        :spCaption="newSPCaption"
        @click="newInfo"
        :disable="disable"
      />
      <slot
        name="afterNew"
        v-if="!isFormEditable"
      ></slot>

      <btn-edit
        v-show="!isFormEditable && showEditButton"
        @click="edit"
        :label="editButtonTitle"
        :force="force"
        :spId="editSPId"
        :formId="editFormId"
        :spCaption="editSPCaption"
        :disable="disable"
      />
      <slot
        name="afterEdit"
        v-if="!isFormEditable"
      ></slot>

      <btn-save
        :label="saveButtonTitle"
        v-if="isFormEditable && showSaveButton"
        :spId="saveSPId"
        :spCaption="saveSPCaption"
        :formId="saveFormId"
        @click="save"
        :disable="disable"
      />
      <slot
        name="afterSave"
        v-if="isFormEditable"
      ></slot>

      <btn-cancel
        v-if="isFormEditable && showCancelButton"
        @click="cancel"
        :disable="disable"
      />
      <slot name="after"></slot>
      <slot></slot>
      <template v-for="(btn,index) in internalButtons">
        <component
          :is="normalizeName(btn.type)"
          :key="'BTN_'+index"
          :label="btn.label"
          :icon="btn.icon"
          :data-id="index"
          :spId="btn.spId"
          :spCaption="btn.spCaption"
          v-bind="cleanProps(btn)"
          @click="btn.click($event, btn)"
        />
      </template>
    </button-group>
  </div>
</template>

<script>
export default {
  name: 'FormActions',
  inheritAttrs: false,
  props: {
    buttons: [Array, Object],
    value: String,
    newSPCaption: {
      type: String,
      default: 'جدید'
    },
    force: {
      type: Boolean,
      default: true
    },
    newSPId: String,
    newFormId: String,
    editSPCaption: {
      type: String,
      default: 'ویرایش'
    },
    editSPId: String,
    editFormId: String,
    saveSPCaption: {
      type: String,
      default: 'ذخیره'
    },
    saveSPId: {
      type: String
    },
    saveFormId: String,
    m: {
      type: String,
      default: 'r'
    },
    disable: Boolean,
    size: String,
    showNewButton: {
      type: Boolean,
      default: false
    },
    showEditButton: {
      type: Boolean,
      default: true
    },
    showSaveButton: {
      type: Boolean,
      default: true
    },
    showCancelButton: {
      type: Boolean,
      default: true
    },
    editButtonTitle: {
      type: String,
      default: 'ویرایش'
    },
    saveButtonTitle: {
      type: String,
      default: 'ذخیره'
    }

  },
  data () {
    return {
      internalButtons: []
    }
  },
  computed: {
    currentButtons () {
      if (!this.buttons) return []
      if (!this.value) return this.buttons
      return this.buttons[this.value] || []
    },
    isFormEditable () {
      return this.m === 'e'
    }
  },
  beforeMount () {
    this.internalButtons = []
    const self = this
    this.$root.$on('setButtons', function (key, buttons) {
      // console.log('emit buttons', buttons, typeof buttons)
      self.appendButtons(key, buttons)
    })
    this.$root.$on('removeButtons', function (key) {
      // console.log('removeButtons', key)
      self.removeButtons(key)
    })
  },
  methods: {
    normalizeName (baseName = 'default') {
      baseName = baseName.toLowerCase().replace(/btn-/g, '')
      return `btn-${baseName}`
    },
    cleanProps (props) {
      return Object.keys(props)
        .filter((key) => !['label', 'click', 'type', 'icon', 'spId', 'spCaption', 'showInWorkflow', 'showInSidebar', 'showInResponderForm', 'alwaysShow'].includes(key))
        .reduce((obj, key) => {
          obj[key] = props[key]
          return obj
        }, {})
    },
    removeButtons (key) {
      if (key) {
        this.internalButtons = this.internalButtons.filter(x => x.k !== key)
      }
    },
    appendButtons (key, buttons) {
      if (buttons && Array.isArray(buttons)) {
        this.removeButtons(key)
        this.internalButtons = [...this.internalButtons, ...buttons.map(x => ({ ...x, k: key }))]
      }
    },
    newInfo () {
      this.$emit('newInfo')
    },
    edit () {
      this.$emit('edit')
    },
    cancel () {
      this.$emit('cancel')
    },
    save () {
      this.$emit('save')
    }
  },
  watch: {
    internalButtons () {
      this.$refs.bgroups.onResize()
    }
  }
}
</script>
