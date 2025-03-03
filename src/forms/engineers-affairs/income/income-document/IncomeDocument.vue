<template>
  <form-wrapper :title="title">
    <fit>
      <div class="row q-col-gutter-sm items-center q-mb-sm">
        <FormRow>

          <engineer-info-box
            label="کد عضویت"
            labelWidth="60px"
            v-model="identityCode"
            @fetched="loadData"
          />
          <FormControl>
            <safa-combo
              label="سال"
              label-width="60px"
              class="col-md-3"
              ciName="CI_Years"
              domainName="engineer"
              v-model="getIncomeDocResult.CI_Years"
            />
          </FormControl>

          <engineer-actions
            v-model="getIncomeDocResult.Eng_Info.IdentityCode"
            :disable="!getIncomeDocResult.Eng_Info.IdentityCode"
            class="col-md-4 col-12"
          />

        </FormRow>
      </div>

      <safa-tabs
        v-model="currentTab"
        type="fixed"
        fit
        :bordered="false"
        :padding="false"
        class="q-mb-sm"
      >
        <template v-slot:tabs>
          <tab-menu
            name="detail_tab"
            label="جزئیات"
          />
          <tab-menu
            v-if="isEditable"
            name="fishInfo_tab"
            label="اطلاعات فیش"
          />
        </template>
        <tab-content name="detail_tab">
          <income-doc-detail
            :docDetails="getIncomeDocResult.ClsIncomeDoc.Income_DocDetails"
            @selectedRow="selectedRow"
            @deleteRow="deleteRow"
          />
        </tab-content>
        <tab-content name="fishInfo_tab">
          <fish-info
            :model="selectRow"
            :m="mode"
          />
        </tab-content>
      </safa-tabs>

      <div class="row q-col-gutter-sm">
        <FormRow>
          <FormControl>
            <safa-custom-text
              type="money"
              label="مانده کل بدهی"
              label-width="75px"
              class="col-sm-3 col-md-3"
              m="r"
            />
          </FormControl>
          <!-- v-model="getIncomeDocResult.IncomeSummery.Debit" -->
          <FormControl>
            <safa-custom-text
              type="money"
              label="مانده کل بستانکار"
              label-width="75px"
              class="col-sm-3 col-md-3"
              m="r"
            />
          </FormControl>
          <!-- v-model="getIncomeDocResult.IncomeSummery.AllSymptoms" -->
          <FormControl>
            <safa-custom-text
              type="money"
              label="کل عوارض"
              label-width="75px"
              class="col-sm-3 col-md-3"
              m="r"
            />
          </FormControl>
          <!-- v-model="getIncomeDocResult.IncomeSummery.Credit" -->
          <FormControl>
            <safa-text
              label="مانده به حروف"
              label-width="75px"
              class="col-12"
              placeholder="صفر"
              m="r"
            />
          </FormControl>
          <!-- v-model="getIncomeDocResult.IncomeSummery.Column1" -->
        </FormRow>
      </div>
    </fit>
    <template v-slot:footer>
      <form-actions
        :m="mode"
        :showEditButton="true"
        :showNewButton="true"
        @save="saveData"
        @edit="updateData"
        @newInfo="newData"
        @cancel="cancel"
      >
        <template
          v-slot:after
          v-if="!isEditable"
        >
          <btn-default label="تاریخچه چاپ"/>
          <btn-default label="چاپ فیش"/>
          <btn-default label="چاپ صورت حساب"/>
          <btn-default label="ریز محاسبات"/>
          <btn-default label="چاپ فیش دفاتر"/>
          <btn-default label="چاپ فیش اشخاص حقیقی"/>
        </template>
      </form-actions>
    </template>
  </form-wrapper>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import { controlValidation } from 'ui-core'
import IncomeDocDetail from './partials/IncomeDocDetail.vue'
import FishInfo from './partials/FishInfo.vue'

const defaultValue = {
  CI_IncomeDocType: 0,
  CI_Years: 1400,
  Comments: '',
  Credit: 0,
  Debit: 0,
  FishNo: 0,
  IncomeDate: '',
  NIdDoc: '00000000-0000-0000-0000-000000000000',
  NIdEng: '00000000-0000-0000-0000-000000000000',
  NIdDoc_tmp: 0,
  NIdFil: null,
  NIdCheque: null
}

export default {
  mixins: [baseFormMixin, controlValidation],
  components: { IncomeDocDetail, FishInfo },
  props: {
    value: [Number, String]
  },
  data () {
    return {
      title: 'سند درآمد',
      name: 'IncomeDocument',
      formKey: '8655a2cf-140d-4702-bda8-f261d231f7c4',
      main: true,
      sidebarCompatible: true,
      expansionState: true,
      currentTab: 'detail_tab',
      selectRow: null,
      isView: false,
      isNew: false,
      getIncomeDocResult: {
        ArchitectureCode: '',
        CI_RequestType: 0,
        CI_Years: 0,
        ClsIncomeDoc: {
          IncomeSummery: '',
          Income_Doc: '',
          Income_DocDetails: [],
          NidEngineer: '00000000-0000-0000-0000-000000000000',
          NidIncome: '00000000-0000-0000-0000-000000000000',
          Years: 0
        },
        Eng_Info: {
          IdentityCode: null
        }
      },
      saveIncomeDocResult: {
        ArchitectureCode: '',
        CI_RequestType: 0,
        CI_Years: 0,
        ClsIncomeDoc: {
          IncomeSummery: '',
          Income_Doc: {
            CI_IncomeDocType: 0,
            CI_Years: 0,
            Comments: '',
            Credit: 0,
            Debit: 0,
            FishNo: 0,
            IncomeDate: '',
            NIdCheque: '',
            NIdDoc: '00000000-0000-0000-0000-000000000000',
            NIdDoc_tmp: 0,
            NIdEng: '00000000-0000-0000-0000-000000000000',
            NIdFil: ''
          },
          Income_DocDetails: '',
          NidEngineer: '00000000-0000-0000-0000-000000000000',
          NidIncome: '00000000-0000-0000-0000-000000000000',
          Years: 0
        }
      }
    }
  },
  mounted () {
    if (this.value) {
      this.identityCode = this.value
      this.loadData()
    }
  },
  methods: {
    loadData () {
      this.showLoading()
      let payLoad = {
        pRequest: {
          CI_RequestType: this.getIncomeDocResult.CI_RequestType,
          CI_Years: this.getIncomeDocResult.CI_Years,
          EngineerCode: this.identityCode,
          NidCheckerGroup: '00000000-0000-0000-0000-000000000000',
          NidEng: '00000000-0000-0000-0000-000000000000',
          NidFil: '00000000-0000-0000-0000-000000000000'
        }
      }
      this.$services.engineers
        .getIncomeDoc(payLoad)
        .then(async (response) => {
          this.result = this.getResponse(response.data)
          if (this.result.success) {
            this.getIncomeDocResult = this.result.data.GetIncomeDocResult
            if (!this.isView) {
              await this.log({
                action: this.logActions.view,
                bizCode: this.identityCode,
                bizCodeTitle: 'کد عضویت'
              })
            }
            this.isView = true
          }
        })
        .catch((error) => {
          console.error('getIncomeDoc error', error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    selectedRow (val) {
      if (val) {
        this.selectRow = val
      }
    },
    updateData () {
      if (this.selectRow) {
        this.isNew = false
        this.isEditable = true
      } else {
        this.showError('لطفا یک سطر انتخاب نمایید')
      }
    },
    saveData () {
      if (this.currentTab !== 'fishInfo_tab') {
        this.showError('لطفا ویرایش اطلاعات فیش را تکمیل نمایید.')
        return
      }
      this.save()
    },
    save () {
      if (!this.isValidForm()) return
      this.showLoading()
      if (this.isNew) {
        this.saveIncomeDocResult.ClsIncomeDoc.Income_Doc = this.selectRow
        this.saveIncomeDocResult.ClsIncomeDoc.Income_Doc.NIdDoc =
          '00000000-0000-0000-0000-000000000000'
        this.saveIncomeDocResult.ClsIncomeDoc.Income_Doc.NIdEng =
          this.getIncomeDocResult.ClsIncomeDoc.NidEngineer
      } else {
        this.saveIncomeDocResult.ClsIncomeDoc.Income_Doc = this.selectRow
      }
      let payLoad = {
        pRequest: this.saveIncomeDocResult
      }
      this.$services.engineers
        .saveIncomeDoc(payLoad)
        .then(async (response) => {
          this.result = this.getResponse(response.data)
          if (this.result.success) {
            this.isEditable = false
            this.currentTab = 'detail_tab'
            this.showSuccess('عملیات با موفقیت انجام شد.')
            await this.log({
              action: this.logActions.save,
              bizCode: this.identityCode,
              bizCodeTitle: 'کد عضویت'
            })
            this.isNew = false
            this.loadData()
          }
        })
        .catch((error) => {
          console.error('saveIncomeDoc error', error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    deleteRow (val) {
      this.showConfirm('آیا از حذف سطر انتخاب شده اطمینان دارید؟').onOk(() => {
        this.showLoading()
        let payLoad = {
          pRequest: {
            ClsIncomeDoc: {
              NidEngineer: val.dataItem.NIdEng,
              NidIncome: val.dataItem.NIdDoc,
              Years: val.dataItem.CI_Years
            }
          }
        }
        this.$services.engineers
          .deleteIncomeDoc(payLoad)
          .then(async (response) => {
            this.result = this.getResponse(response.data)
            if (this.result.success) {
              this.showSuccess('عملیات حذف با موفقیت انجام شد.')
              await this.log({
                action: this.logActions.delete,
                bizCode: this.identityCode,
                bizCodeTitle: 'کد عضویت'
              })
              this.loadData()
            }
          })
          .catch((error) => {
            console.error('deleteRow error', error)
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      })
    },
    newData () {
      this.selectRow = defaultValue
      this.isNew = true
      this.isEditable = true
    },
    cancel () {
      this.isEditable = false
      this.currentTab = 'detail_tab'
    }
  },
  watch: {
    isEditable () {
      this.isEditable
        ? (this.currentTab = 'fishInfo_tab')
        : (this.currentTab = 'detail_tab')
    }
  }
}
</script>
