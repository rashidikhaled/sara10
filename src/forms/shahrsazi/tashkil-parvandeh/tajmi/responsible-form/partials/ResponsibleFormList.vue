<template>
  <div class="row">
    <div class="col-12 col-md-auto">
      <div class="q-pa-md" style="max-width: 350px; width: 300px;">
        <q-toolbar class="bg-grey-7 text-white shadow-2">
          <q-toolbar-title>لیست فرم ها</q-toolbar-title>
        </q-toolbar>
        <q-scroll-area style="height: calc(100vh - 200px); width: 100%;">
          <q-list bordered separator v-if="forms && forms.length > 0">
            <q-intersection
              v-for="form in forms"
              :key="form.NidForm"
              transition="fade"
              class="example-item"
              once
            >
              <q-item
                @click="showClick(form)"
                class="q-my-sm"
                clickable
                v-ripple
              >
                <q-item-section>
                  <q-item-label>{{ form.Caption }}</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-icon name="text_snippet" color="green"/>
                </q-item-section>
              </q-item>
            </q-intersection>
          </q-list>
          <q-list bordered separator v-else>
            <q-intersection
              v-for="(item, index) in Array(20).fill('')"
              :key="index"
              transition="scale"
              class="example-item"
              once
            >
              <q-item>
                <q-item-section class="q-my-sm">
                  <q-item-label>
                    <q-skeleton type="text"/>
                  </q-item-label>
                  <q-item-label caption>
                    <q-skeleton type="text" width="65%"/>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-intersection>
          </q-list>
        </q-scroll-area>
      </div>
    </div>
    <div class="col-12 col-md">
      <div class="form-view q-mt-md">
        <component v-if="selectedForm"
                   :isSelectFromWorkflow="false"
                   :isSelectFromMenu="false"
                   :isSelectFromResponder="true"
                   :taskInfo="selectedRow"
                   :is="selectedForm.FormUrl"/>
        <div v-else class="flex items-top justify-center q-pt-xl">
          <span class="text-h5 text-grey-5">محل نمایش جزئیات فرم ها</span>
        </div>
      </div>
    </div>
    <!--    <safa-datagrid-->
    <!--    helper="formList"-->
    <!--     v-model="results"-->
    <!--     @ShowClick="showClick" />-->
  </div>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
// import dynamicForms from '../../../utils/getDynamicForms'

export default {
  data: function () {
    return {
      forms: [],
      showDetails: false,
      selectedForm: null
    }
  },
  mixins: [baseFormMixin],
  props: {
    selectedRow: Object
  },
  mounted () {
    this.getFormList()
  },
  methods: {
    getFormList () {
      this.showLoading()
      let data = {}
      // var forms = dynamicForms()
      // // console.log(forms)

      this.$services.task
        .getFormList(data)
        .then(({ data }) => {
          // console.log('form list', data)
          const result = this.getResponse(data)
          if (result.success) {
            this.forms = result.data
          }
        })
        .catch(response => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    sotrBasedOnCaption (a, b) {
      if (a.Caption < b.Caption) {
        return -1
      } else if (a.Caption > b.Caption) {
        return 1
      } else {
        return 0
      }
    },
    showClick (form) {
      // let nid = form.NidForm
      // const id = nid
      // const form = this.results.filter(x => x.NidForm === id)[0]
      if (!form) {
        console.error('فرم پیدا نشد')
        return
      }
      // console.log(form)
      // const FormUrl = form.FormUrl
      // const taskSubForm = 'respoder-' + FormUrl
      // const resolve = this.$router.resolve({ name: taskSubForm })
      // if (resolve.href === '/') {
      //   console.warn('Form not resolved: ', resolve)
      //   return
      // }
      // this.$router.push({ name: taskSubForm }).catch(() => {})
      if (form.FormUrl && form.FormUrl.indexOf('.') > -1) {
        this.selectedForm = null
      } else {
        this.selectedForm = form
      }
    }
  },
  watch: {
    selectedForm (value) {
      if (value) this.showDetails = true
    }
  }
}
</script>
<style lang="scss">
.form-view {
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 200px);
  display: inline-block;
  background-color: #f9f9f9;

  .form-wrapper {
    box-shadow: none !important;
    margin: 0 !important;
  }
}
</style>
