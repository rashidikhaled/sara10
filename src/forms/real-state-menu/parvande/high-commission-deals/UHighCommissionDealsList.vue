<template>
  <safa-form :id="formKey" :caption="title" appId="BEA0DE7D-9883-48E2-8A7B-9A30D8525255">
    <form-wrapper :title="title" :hideTitle="hideTitle">
      <template #header>
        <safa-status :result="loadObjRes" />
        <safa-status :result="getHighCommissionDealsInfoRes" />
        <safa-status :result="SaveHighCommissionDealsInfoRes" />
        <safa-status :result="delHighCommissionDealsInfoRes" />
      </template>
      <fit>
        <safa-splitter v-model="spliterModel" class="fit">
          <template v-slot:before>
            <q-list bordered>
              <q-item
                clickable
                v-ripple
                v-for="(item, index) in treeView"
                :key="index"
                @click="selectItem(item)"
              >
                <q-item-section avatar>
                  <q-avatar color="primary" icon="mark_chat_read" />
                </q-item-section>
                <q-item-section>
                  {{ getName(item) }}
                </q-item-section>
              </q-item>
            </q-list>
          </template>
          <template v-slot:after>
              <FormRow class="q-pa-sm">
              <FormControl>
                <safa-text
                  label-width="150px"
                  v-model="model.HighCommissionDeals_Info.LicenseSalesNo"
                  cdcName="LicenseSalesNo"
                  :m="mode"
                  label="شماره مجوز فروش"
                />
              </FormControl>
              <FormControl>
                <safa-datepicker
                  label-width="150px"
                  v-model="
                    model.HighCommissionDeals_Info.HighCommissionDealsDate
                  "
                  cdcName="HighCommissionDealsDate"
                  :m="mode"
                  label="تاریخ کمیسیون"
                />
              </FormControl>
              <FormControl>
                <safa-text
                  label-width="150px"
                  v-model="model.HighCommissionDeals_Info.AmountReceivedBuyer"
                  cdcName="AmountReceivedBuyer"
                  :m="mode"
                  label="مبلغ دریافتی از خریدار"
                />
              </FormControl>
              <FormControl>
                <safa-text
                  label-width="150px"
                  v-model="model.Total_Price"
                  cdcName="FinancierName"
                  m="r"
                  label="مبلغ کل"
                />
              </FormControl>
              <FormControl class="q-mb-sm">
                <safa-checkbox
                  label="ملک تصرفی می باشد"
                  :m="mode"
                  v-model="model.IsSeizin"
                />
              </FormControl>
              <FormControl class="fit">
                <text-template
                  label-width="150px"
                  v-model="
                    model.HighCommissionDeals_Info.HighCommissionDealsResult
                  "
                  cdcName="HighCommissionDealsResult"
                  label="نتیجه کمیسیون"
                />
              </FormControl>
            </FormRow>

          </template>
        </safa-splitter>
      </fit>
      <template v-slot:footer>
        <FormActions
          :m="mode"
          @edit="isEditable = true"
          @cancel="isEditable = false"
          @save="saveObj"
        >
          <template>
            <btn-default label="حذف" @click="deleteObj" />
          </template>
        </FormActions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
export default {
  mixins: [baseFormMixin],
  data () {
    return {
      formKey: 'FDF6D6A5-3974-4541-831F-A85A680E1F2E',
      name: 'UHighCommissionDealsList',
      title: 'کمیسیون عالی معاملات',
      main: true,
      // #region services
      loadObjRes: null,
      getHighCommissionDealsInfoRes: null,
      SaveHighCommissionDealsInfoRes: null,
      delHighCommissionDealsInfoRes: null,
      // #endregion

      // variables
      spliterModel: 16,
      ListItem: [],
      treeView: [],
      PNidHighCommissionDeals: '',
      PNIdRequest: '',

      // model
      model: {
        HighCommissionDeals_Info: {
          LicenseSalesNo: 0,
          HighCommissionDealsDate: '',
          AmountReceivedBuyer: '',
          Total_Price: '',
          HighCommissionDealsResult: ''
        },
        Total_Price: '',
        IsSeizin: false
      }
    }
  },
  props: {
    hideTitle: {
      type: Boolean,
      default: false
    },
    currentObj: {
      type: Object,
      default: () => {}
    },
    baseNosaziCode: {
      type: Object,
      default: () => {}
    }
  },
  mounted () {
    this.loadObj()
  },
  methods: {
    async loadObj () {
      try {
        this.showLoading()
        const { data } =
          await this.$services.ES.getHighCommissionDealsInfoRequestList({
            pNIdProc:
              this.currentObj?.NIdProcess || '00000000-0000-0000-0000-000000000000'
          })
        this.loadObjRes = this.getResponse(data)
        if (this.loadObjRes.success) {
          const res =
            this.loadObjRes.data.GetHighCommissionDeals_Info_RequestListResult
          if (res && res.length > 0) {
            this.treeView = res.filter(
              (f) =>
                f.PNidHighCommissionDeals !==
                '00000000-0000-0000-0000-000000000000'
            )
          }
          this.PNidHighCommissionDeals = res[0].NidHighCommissionDeals
          this.PNIdRequest = res[0].NidRequest
          await this.log({
            action: this.logActions.view,
            bizCode: '',
            bizCodeTitle: ''
          })
          this.getHighCommissionDealsInfo()
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    getHighCommissionDealsInfo () {
      this.showLoading()
      this.$services.ES.getHighCommissionDealsInfo({
        PNidHighCommissionDeals: this.PNidHighCommissionDeals,
        PNIdRequest: this.PNIdRequest || this.currentObj?.NidRequest
      })
        .then(({ data }) => {
          this.getHighCommissionDealsInfoRes = this.getResponse(data)
          if (this.getHighCommissionDealsInfoRes.success) {
            this.model =
              this.getHighCommissionDealsInfoRes.data
                ?.GetHighCommissionDeals_InfoResult ?? {}
          }
        })
        .catch((e) => {
          console.error(e)
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    getName (item) {
      return `کمیسیون عالی - ${item.LicenseSalesNo}`
    },

    saveObj () {
      this.showLoading()
      let request = { ...this.model }
      request.HighCommissionDeals_Info.NidRequest = this.currentObj?.NidRequest || '00000000-0000-0000-0000-000000000000'
      const payload = {
        PObj: { ...this.model }
      }
      this.$services.ES.SaveHighCommissionDealsInfo(payload)
        .then(({ data }) => {
          this.SaveHighCommissionDealsInfoRes = this.getResponse(data)
          if (this.SaveHighCommissionDealsInfoRes.success) {
            this.model =
              this.SaveHighCommissionDealsInfoRes.data.SaveHighCommissionDeals_InfoResult
            this.showSuccess('عملیات با موفقیت انجام شد')
            this.isEditable = false
            this.log({
              action: this.logActions.save,
              bizCode: '',
              bizCodeTitle: '',
              saveDesc: `ذخیره اطلاعات فرم ${this.title} انجام گردید.`
            })
            this.loadObj()
          }
        })
        .catch((e) => {
          this.showError(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    deleteObj () {
      this.showConfirm('آیا از حذف اطلاعات اطمینان دارید؟').onOk(() => {
        this.delHighCommissionDealsInfo()
      })
    },

    delHighCommissionDealsInfo () {
      this.showLoading()
      this.$services.ES.delHighCommissionDealsInfo({
        PNIdHighCommissionDeals: this.PNidHighCommissionDeals
      })
        .then(({ data }) => {
          this.delHighCommissionDealsInfoRes = this.getResponse(data)
          if (this.delHighCommissionDealsInfoRes.success) {
            this.showSuccess('حذف اطلاعات باموفقیت انجام شد')
            // this.delet = this.delHighCommissionDealsInfoRes.data?.DelHighCommissionDeals_InfoResult ?? false
          }
        })
        .catch((e) => {
          console.error(e)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    selectItem (item) {
      this.PNidHighCommissionDeals = item.NidHighCommissionDeals
      this.PNIdRequest = item.NidRequest
      this.getHighCommissionDealsInfo()
    }
  }
}
</script>
