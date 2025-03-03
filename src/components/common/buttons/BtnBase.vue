<template>
  <safa-securityPanel
    v-if="spId"
    :id="spId"
    :caption="spCaption"
    :force="force"
    :form-id="formId"
  >
    <q-btn
      v-bind="$attrs"
      v-on="$listeners"
      :disabled="buttonDisabled"
      :class="customClass"
      :size="buttonSize"
      :style="customStyle"
      class="btn--standard"
    >
      <template
        v-for="(_, slot) of $scopedSlots"
        v-slot:[slot]="scope"
      >
        <slot
          v-bind="scope"
          :name="slot"
        />
      </template>
    </q-btn>
  </safa-securityPanel>
  <q-btn
    v-else
    :disabled="buttonDisabled"
    v-bind="$attrs"
    v-on="$listeners"
    :class="customClass"
    :size="buttonSize"
    :style="customStyle"
    class="btn--standard"
  >
    <template
      v-for="(_, slot) of $scopedSlots"
      v-slot:[slot]="scope"
    >
      <slot
        v-bind="scope"
        :name="slot"
      />
    </template>
  </q-btn>
</template>
<script>
export default {
  inheritAttrs: false,
  props: {
    spId: String,
    spCaption: String,
    customStyle: [String, Object],
    customClass: String,
    formId: String,
    disabled: Boolean,
    showInWorkflow: Boolean,
    showInSidebar: {
      type: Boolean,
      default: true
    },
    showInResponderForm: Boolean,
    alwaysShow: Boolean,
    force: {
      type: Boolean,
      default: true
    },
    whitelist: {
      type: Array,
      default: () => ([
        {
          term: 'آرشیو',
          op: 'contains',
          scopes: ['all'] // , 'responder', 'sidebar', 'workflow'
        },
        {
          term: 'تقسیط',
          op: 'contains',
          scopes: ['all']
        },
        {
          term: 'درآمد گزارش تقسیط',
          op: 'contains',
          scopes: ['all']
        },
        {
          term: 'گزارش',
          op: 'contains',
          scopes: ['all']
        },
        // {
        //   term: 'خرید دین',
        //   op: 'contains',
        //   scopes: ['all']
        // },
        {
          term: "وضعیت شماره پرونده",
          op: 'contains',
          scopes: ['all']
        },
        {
          term: "پیگیری درخواست",
          op: 'contains',
          scopes: ['all']
        },

        {
          term: 'ریزمحاسبه',
          op: 'contains',
          scopes: ['all']
        },
        {
          term: 'ریزمحاسبات',
          op: 'contains',
          scopes: ['all']
        },
        {
          term: 'مجاز درآمد',
          op: 'contains',
          scopes: ['all']
        },
        {
          term: 'نمایش آرشیو تبلت',
          op: 'contains',
          scopes: ['all']
        },
        {
          formName: 'UAgreementTabs',
          term: 'بازیابی',
          op: 'contains',
          scopes: ['all']
        },
        {
          formName: 'UAgreementTabs',
          term: 'محاسبه',
          op: 'contains',
          scopes: ['all']
        },
        {
          term: 'نمایش مغاریتها',
          op: 'contains',
          scopes: ['all']
        },
        {
          formName: 'UIncome',
          term: 'گزارش تقسیط',
          op: 'hide',
          scopes: ['all']
        },
        {
          formName: 'UServey',
          term: 'آرشیو DWG',
          op: 'hide',
          scopes: ['all']
        },
        {
          formName: 'UIncome',
          term: 'اجرای عملیات تقسیط',
          op: 'hide',
          scopes: ['all']
        },
        {
          formName: 'URevisitInfo',
          term: 'آرشیو',
          op: 'hide',
          scopes: ['responder'] // , 'responder', 'sidebar', 'workflow'
        }
      ])
    }
  },
  data () {
    return {
      forceDisabled: false,
      mainForm: null
    }
  },
  mounted () {
    this.checkButtonVisibility()
  },
  methods: {
    checkButtonVisibility () {
      // console.log('btn loaded.')
      if (this.alwaysShow) return
      this.mainForm = this.findMainForm()
      if (this.mainForm) {
        // const isSelectFromMenu = this.mainForm.isSelectFromMenu
        // const isSelectFromWorkflow = this.mainForm.isSelectFromWorkflow
        const isSelectFromResponder = this.mainForm.isSelectFromResponder

        const close = () => {
          this.$destroy()
          this.$el?.parentNode?.removeChild(this.$el)
          // this.forceDisabled = true
        }

        // console.log('isSelectFromMenu', isSelectFromMenu)
        // console.log('isSelectFromWorkflow', isSelectFromWorkflow)
        // console.log('isSelectFromResponder', isSelectFromResponder)
        //
        // console.log('button showInSidebar ', this.showInSidebar)
        // console.log('button showInWorkflow ', this.showInWorkflow)
        // console.log('button showInResponderForm ', this.showInResponderForm)

        // if (isSelectFromMenu && !this.showInSidebar) close()
        // if (isSelectFromWorkflow && !this.showInWorkflow) close()
        if (this.mainForm.isSelectFromGardeshParvandeh) {
          close()
          this.forceDisabled = true
          return
        }
        if (isSelectFromResponder) {
          if (!this.showInResponderForm && !this.suppressClose('responder')) close()
        }
      }
    },
    suppressClose (scope) {
      let valid = false
      // {
      //   term: 'محاسبه',
      //     op: 'contains',
      //   scopes: ['all']
      // }
      try {
        const btnLabel = (this.$slots?.default[0]?.text || this.label || this.spCaption || '').trim().convertToPersian()
        this.whitelist.filter(s => s.scopes.includes(scope) || s.scopes.some(x => x === 'all')).forEach(item => {
          switch (item.op) {
            case 'contains':
              if (item?.formName) {
                if (item?.formName === this.mainForm.name && `${btnLabel}`.indexOf(item.term.convertToPersian()) > -1) valid = true
              } else {
                if (`${btnLabel}`.indexOf(item.term.convertToPersian()) > -1) valid = true
              }
              break
            case 'hide':
              if (item?.formName === this.mainForm.name && `${btnLabel}`.indexOf(item.term.convertToPersian()) > -1) valid = false
              break
          }
        })
      } catch (ex) {
        console.log('rrrp', ex)
      }

      return valid
    },
    findMainForm () {
      let parent = this.$parent

      while (parent && !parent.main) {
        parent = parent.$parent
      }

      return parent
    }
  },
  computed: {
    buttonDisabled () {
      if (this.forceDisabled) return true
      return !!this.disabled
    },
    buttonSize () {
      return this.$attrs.size || '10px'
    }
  }
}
</script>
<style>
.btn--standard {
  white-space: nowrap;
  border: 1px solid;
  font-weight: normal;
  /* height: 30px; */
}

@media screen and (max-width: 1400px) {
  .btn--standard {
    font-size: 10px;
  }
}

</style>
