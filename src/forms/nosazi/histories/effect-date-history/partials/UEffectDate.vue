<template>
  <fit>
    <!-- <safa-status :result="loadResult" /> -->
    <safa-label></safa-label>
    <nosazi-code-input
      v-model="baseNosaziCode"
      cdcName="baseNosaziCode"
      class="q-mb-sm "
      @enter="loadData"
    />
    <safa-datatable
      ref="engineer-list-grid"
      v-model="results.Duty_ActDateHistoryList"
      :allowMultipleSelection="false"
      :clickable="true"
      :loadingAnimation="false"
      :selectable="true"
      cdcName="effectDate"
      class="q-mb-sm"
      fit
      height="100%"
      helper="nosazi.effectDate"
      m="r"
      max-height="100%"
      name="grid"
      title="تاریخچه"
      @dbclick="dbclick"
      @select-row="selectedChange"
    >
    </safa-datatable>

    <ShowModal
      v-model="showPopupInsertDate"
      height="350px"
      title="تاریخ اثر"
      vertical
      width="350px"
    >
      <safa-datepicker
        v-model="newDate"
        cdcName="newDate"
        mask="YYYY-MM-DD"
      />
      <template v-slot:footer>
        <div class="q-gutter-sm">
          <btn-save @click="saveData"/>
          <btn-cancel @click="hidePopupInsertDateHandler"/>
        </div>
      </template>
    </ShowModal>

    <div class="row q-gutter-sm ">
      <!-- <btn-new>
        <q-popup-edit
          class="col-3"
          v-model="newDate"
          :validate="val => val.length === 0"
          ref="newDatePopup"
          v-if="showPopupInsertDate"
        >
          <template v-slot="{ cancel }">
            <safa-datepicker
              v-model="newDate"
              mask="YYYY-MM-DD"
            >
              <template v-slot:after>
                <btn-cancel @click.stop="cancel" />
                <btn-cancel @click="saveData(cancel)" />
              </template>
            </safa-datepicker>
          </template>
        </q-popup-edit>
      </btn-new> -->
      <btn-new @click="showPopupInsertDateHandler"/>
      <btn-delete
        :disable="
              deletePrequest.pNidActDateHistory ===
                '00000000-0000-0000-0000-000000000000'
            "
        @click="deleteData"
      />
    </div>
  </fit>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin.js'
// import saveDataPrequest from '../models/saveDataPrequest.js'
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'

export default {
  data () {
    return {
      showPopupInsertDate: false,
      selectedItem: 0,
      requestResult: {},
      nidBaseResult: {},
      infoGroupItems: [
        {
          ID: 0,
          title: 'اطلاعات پرونده'
        },
        {
          ID: 100,
          title: 'نوسازی'
        }
      ],
      items: [],
      loadResult: null,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      getNidBasePrequest: {
        pDistrict: 0,
        pRegion: 0,
        pBlock: 0,
        pHouse: 0,
        pBuilding: 0,
        pApartment: 0,
        pShop: 0,
        pDutyType: 1,
        pEumNosaziCodeGroup: 0,
        pEumBaseInfoGroup: 0
      },
      loadDataPrequest: {
        pNidBase: '00000000-0000-0000-0000-000000000000'
      },
      newDate: '',
      deletePrequest: {
        pNidActDateHistory: '00000000-0000-0000-0000-000000000000'
      },
      isView: false
    }
  },
  mixins: [baseFormMixin],
  props: {
    value: Object,
    m: String,
    formKey: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    results: Object
  },
  methods: {
    showPopupInsertDateHandler () {
      this.showPopupInsertDate = true
    },
    hidePopupInsertDateHandler () {
      this.showPopupInsertDate = false
    },
    // load data
    loadData () {
      this.showLoading()
      let payLoad = {
        pDistrict: this.baseNosaziCode.District,
        pRegion: this.baseNosaziCode.Region,
        pBlock: this.baseNosaziCode.Block,
        pHouse: this.baseNosaziCode.House,
        pBuilding: this.baseNosaziCode.Building,
        pDutyType: 1,
        pApartment: this.baseNosaziCode.Apartment,
        pShop: this.baseNosaziCode.Shop,
        pEumBaseInfoGroup: 0,
        pEumNosaziCodeGroup: 0
      }

      this.$services.SB.getNidBase(payLoad, {
        config: {
          District: this.baseNosaziCode.District
        }
      })
        .then((response) => {
          this.nidBaseResult = this.getResponse(response.data)
          if (this.nidBaseResult.success) {
            this.loadDataPrequest.pNidBase = response.data.NidBase
            this.$services.SB.getActDateHistoryList(this.loadDataPrequest, {
              config: {
                District: this.baseNosaziCode.District
              }
            }).then(async ({ data }) => {
              this.results = this.getResponse(data).data
              const strNosaziCode = convertNosaziCodeObjectToString(
                this.baseNosaziCode
              )
              if (!this.isView) {
                await this.log({
                  action: this.logActions.view,
                  bizCode: strNosaziCode,
                  bizCodeTitle: 'کد نوسازی',
                  nosaziCode: strNosaziCode
                })
              }
              this.isView = true
            })
          }
        })
        .catch((ex) => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    openNewTab () {
      this.$emit('onEmitopenNewTab')
    },

    dbclick ({ event, target, row }) {
      console.log('row .....', row)
      this.$emit('getRow', row)
    },
    saveData (cancel) {
      if (!this.newDate) {
        this.showWarning('تاریخ باید مقدار داشته باشد')

        return
      }

      if (
        !this.newDate.match(
          '^[1-4]\\d{3}\\/((0[1-6]\\/((3[0-1])|([1-2][0-9])|(0[1-9])))|((1[0-2]|(0[7-9]))\\/(30|31|([1-2][0-9])|(0[1-9]))))$'
        )
      ) {
        this.showWarning('تاریخ باید معتبر باشد')

        return
      }

      this.showLoading()

      const newRow = {
        ActDate: this.newDate,
        ActDateLog: '<?xml version="1.0" encoding="utf-16"?>',
        CreateDate: null,
        CreateTime: null,
        CreateUserID: null,
        CreateUserName: null,
        NidActDateHistory: '00000000-0000-0000-0000-000000000000',
        NidBase: '00000000-0000-0000-0000-000000000000'
      }

      this.results.Duty_ActDateHistoryList.push(newRow)

      let saveDataPrequest = {
        pActDateHistory: this.results,
        pUser: this.currentUser
      }

      this.$services.SB.saveActDateHistory(saveDataPrequest, {
        config: {
          District: this.baseNosaziCode.District
        }
      })
        .then(async (response) => {
          this.requestResult = this.getResponse(response.data)

          if (this.requestResult.success) {
            // this.loadData()
            this.showSuccess('ذخیره با موفقیت انجام شد')
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )
            await this.log({
              action: this.logActions.save,
              bizCode: strNosaziCode,
              bizCodeTitle: 'کد نوسازی',
              nosaziCode: strNosaziCode
            })

            cancel()
            this.loadData()
          }
        })
        .catch((e) => {
          this.serverError()
        })
        .finally((_) => {
          this.hideLoading()
        })
    },

    deleteData () {
      this.showConfirm('آیا از حذف ردیف تاریخچه اثر اطمینان دارید؟').onOk(
        () => {
          this.showSending()

          this.$services.SB.deleteActDateHistory(this.deletePrequest, {
            config: {
              District: this.baseNosaziCode.District
            }
          })
            .then(async (response) => {
              this.hideSending()

              this.requestResult = this.getResponse(response.data)

              if (!this.requestResult.hasError) {
                this.showSuccess('حذف با موفقیت انجام شد')
                const strNosaziCode = convertNosaziCodeObjectToString(
                  this.baseNosaziCode
                )
                await this.log({
                  action: this.logActions.delete,
                  bizCode: strNosaziCode,
                  bizCodeTitle: 'کد نوسازی',
                  nosaziCode: this.strNosaziCode
                })
                this.loadData()
              }
            })
            .catch((error) => {
              this.hideSending()

              this.showError(error.message)
            })
        }
      )
    },
    infoGroupChange (e) {
      this.loadData()
    },
    selectedChange (e) {
      // console.log('//////e', e)

      this.deletePrequest.pNidActDateHistory = e[0].NidActDateHistory
    }
  }
}
</script>
