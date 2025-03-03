<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="714C366C-1705-433D-970C-E04F6D62BD7D"
  >
    <safa-status :result="saveResult"></safa-status>
    <form-wrapper
      title="پیش فرض تخفیفات"
      vertical
    >
      <fit>
        <div class="row q-col-gutter-sm">
          <div
            v-if="!isNew"
            class="col-12 col-sm-6 col-md-3"
          >
            <safa-combo
              ciName="CI_IncomeDiscountDef"
              domainName="CI_SaraM1"
              label="نام"
              v-model="incomeDiscountDef"
              cdcName="incomeDiscountDef"
              :label-shrink="false"
            />
          </div>
          <div
            v-else
            class="col-12 col-sm-6 col-md-3"
          >
            <safa-text
              label="نام"
              v-model="newIncomeDicountDefTitle"
              cdcName="newIncomeDicountDefTitle"
            />
          </div>
        </div>

        <safa-datatable
          v-model="results.Income_DiscountDef"
          cdcName="Income_DiscountDef"
          ref="grid"
          name="grid"
          helper="discountSettings"
          :m="mode"
          :allowNewRow="false"
          @statusChanged="rowClicked"
          min-height="0"
          height="100%"
          maxHeight="100%"
          class="q-mt-sm"
          fit
          title="تخفیفات"
        />
      </fit>
      <template v-slot:footer>
        <form-actions
          :m="mode"
          @edit="editForm"
          @save="save"
          @cancel="cancel"
        >
          <template #after>
            <btn-new
              label="جدید"
              @click="newIncomeDicountDef"
              v-if="isShowNewBtn"
              key="new"
            />
            <btn-delete
              label="حذف"
              v-if="isShowDeleteBtn"
              key="delete"
              @click="deleteIncomeDiscontDef"
            />
            <!-- <q-btn label="خروج" class="btn-cancel"  /> -->
          </template>
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
export default {
  data () {
    return {
      title: 'پیش فرض تخفیفات',
      formKey: '9d78e60c-b611-41fb-b92f-6bd33f437dd8',
      name: 'UDiscountDefaults',
      main: true,
      sidebarCompatible: true,
      result: null,
      results: { Income_DiscountDef: [] },
      incomeDiscountDef: null,
      isShowNewBtn: true,
      isShowDeleteBtn: true,
      newIncomeDicountDefTitle: '',
      isNew: false,
      displayValue: null,
      saveResult: [],
      isView: false
    }
  },

  route: 'income/discount-defaults',
  mixins: [baseFormMixin],
  mounted () {
    this.getIncomeDiscountDefAll(0)
  },
  watch: {
    incomeDiscountDef () {
      this.getIncomeDiscountDefAll(this.incomeDiscountDef)
    }
  },
  methods: {
    rowClicked (e) {
      // console.log('row clicked', e)
    },
    getIncomeDiscountDefAll (ciIncomeDiscount) {
      this.showLoading()
      let data = {
        pCI_IncomeDiscountDef: ciIncomeDiscount
      }
      this.$services.SD.getIncomeDiscountDefAll(data)
        .then(async ({ data }) => {
          this.result = this.getResponse(data)

          if (this.result.success) {
            this.results = this.result.data

            if (!this.isView) {
              await this.log({
                action: this.logActions.view,
                bizCode: this.incomeDiscountDef,
                bizCodeTitle: 'incomeDiscountDef'
              })
            }
            this.isView = true
          }
        })
        .catch(response => {
          this.serverError()
          // console.log('@@@@@@', response)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    newIncomeDicountDef () {
      this.newIncomeDicountDefTitle = ''
      this.isShowNewBtn = false
      this.isShowDeleteBtn = false
      this.isEditable = true
      this.isNew = true
    },
    save () {
      let ciIncome = 0
      if (this.isNew) {
        this.results.IncomeDiscountDef_Title = this.newIncomeDicountDefTitle
        this.results.CI_IncomeDiscountDef = 0
        this.saveIncomeDiscountDef(ciIncome)
      } else {
        if (this.incomeDiscountDef === null) {
          this.showError('لطفا نام یکی از موارد پیش فرض را انتخاب نمایید.')
        } else {
          // this.results.IncomeDiscountDef_Title = this.incomeDiscountDef
          ciIncome = this.incomeDiscountDef
          this.saveIncomeDiscountDef(this.incomeDiscountDef)
        }
      }
    },
    saveIncomeDiscountDef (ciIncome) {
      this.showLoading()
      let data = {
        pObj: this.results
      }
      this.$services.SD.saveIncomeDiscountDef(data)
        .then(async ({ data }) => {
          this.saveResult = this.getResponse(data)
          if (this.saveResult.success) {
            await this.log({
              action: this.logActions.save,
              bizCode: this.incomeDiscountDef,
              bizCodeTitle: 'incomeDiscountDef'
            })
            this.getIncomeDiscountDefAll(ciIncome)
            this.isShowNewBtn = true
            this.isShowDeleteBtn = true
            this.isEditable = false

            this.showSuccess('ذخیره اطلاعات با موفقیت انجام شد.')
            if (this.isNew) {
              this.isNew = false
            }
          }
        })
        .catch(response => {
          this.serverError()
          console.log('res', response)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    deleteIncomeDiscontDef () {
      if (this.incomeDiscountDef === null) {
        this.showError(
          'لطفا نام یکی از موارد پیش فرض را برای حذف انتخاب کنید.'
        )
      } else {
        this.showConfirm('آیا از حذف پیش فرض انتخاب شده اطمینان دارید؟').onOk(
          () => {
            this.showLoading()
            let data = {
              pCI_IncomeDiscountDef: this.incomeDiscountDef
            }
            this.$services.SD.deleteCIDiscountDef(data)
              .then(({ data }) => {
                this.saveResult = this.getResponse(data)

                if (this.saveResult.success) {
                  this.getIncomeDiscountDefAll(this.incomeDiscountDef)
                  this.showSuccess('حذف با موفقیت انجام شد.')
                  // this.incomeDiscountDef = null
                }
              })
              .catch(response => {
                this.serverError()
              })
              .finally(() => {
                this.hideLoading()
              })
          }
        )
      }
    },
    editForm () {
      this.isEditable = true
      this.isShowDeleteBtn = false
      this.isShowNewBtn = false
    },
    cancel () {
      this.isEditable = false
      this.isShowNewBtn = true
      this.isShowDeleteBtn = true
    }
  }
}
</script>
