<template>
  <form-wrapper
    title="ارجاع پرونده به دفتر"
    vertical
  >
    <form-row>
      <safa-text
        label="کد دفتر"
        v-model="officeCode"
        @keydown.enter="loadData"
        class="q-mr-sm"
        cdcName="officeCode"
      />
      <div
        v-if="currentOffice"
        class="q-mr-sm"
      >
        <safa-text
          label="نام دفتر"
          v-model="currentOffice.OfficeName"
          cdcName="OfficeName"
        />
      </div>
      <div class="q-gutter-sm">
        <btn-default
          label="..."
          @click="showOfficeList=true"
        />
        <btn-search
          label="جستجو"
          @click="loadData"
        />
      </div>

    </form-row>
    <q-separator class="q-my-sm" />
    <internal-section title="اطلاعات ارجاع به دفتر">
      <form-row>
      <form-control>
        <safa-combo
          label="سال"
          ciName="CI_Years"
          domainName="engineer"
          v-model="results.CI_Years"
          label-width="100px"
          cdcName="Years"
        />
        </form-control>
        <form-control>
        <safa-datepicker
          label="تاریخ ارجاع "
          label-width="100px"
          v-model="results.Ref_Info.ReleaseDate"
          cdcName="ReleaseDate"
        />
        </form-control>
        <form-control>
        <safa-datepicker
          label="تاریخ آزادسازی "
          label-width="100px"
          v-model="results.Ref_Info.DateOfRefrence"
          cdcName="DateOfRefrence"
        />
        </form-control>
        <form-control>
        <safa-datepicker
          label="تاریخ نامه "
          label-width="100px"
          v-model="results.Ref_Info.ReleaseLetterDate"
          cdcName="ReleaseLetterDate"
        />
        </form-control>
        <form-control>
        <safa-datepicker
          label="تاریخ انصراف "
          label-width="100px"
          v-model="results.Ref_Info.CancelDate"
          cdcName="CancelDate"
        />
        </form-control>
        <form-control>
        <safa-text
          label="شماره نامه"
          label-width="80px"
          v-model="results.Ref_Info.RefComments"
          cdcName="RefComments"
        />
        </form-control>
        <div style="width:100px"></div>
        <div class="col">
          <form-row>
            <safa-checkbox
              label=" مشارکت به صورت همکار"
              v-model="results.Ref_Info.IsFriend"
              cdcName="IsFriend"
            />
            <safa-checkbox
              label="کنسل شده"
              v-model="results.Ref_Info.IsCanceled"
              cdcName="IsCanceled"
            />
            <safa-checkbox
              label="ارجاع آزاد"
              v-model="results.Ref_Info.IsFree"
              cdcName="IsFree"
            />
          </form-row>
        </div>
      </form-row>
      <text-template
        label="توضیحات ارجاع"
        formKey="d33a578d-5eb7-4890-bd7a-a41728df9374"
        label-width="100px"
        class="q-mt-sm"
        type="textarea"
        cdcName="comments"
      />
    </internal-section>
    <safa-datatable
      @rowclick="rowClick"
      ref="grid2"
      title="ارجاعات"
      fit
      height="100%"
      max-height="100%"
      v-model="results.ReferOfficesInfo"
      helper="referFileToOffice"
      cdcName="ReferOfficesInfo"
    />
    <template v-slot:footer>
      <FormActions
        :m="mode"
        @edit="isEditable=true"
      />
    </template>
    <ShowModal
      title="لیست دفاتر"
      v-model="showOfficeList"
      vertical
    >
      <OfficeList @selectedOffice="selectedOffice" />
    </ShowModal>
  </form-wrapper>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import OfficeList from './partials/OfficeList'

export default {
  mixins: [baseFormMixin],
  components: { OfficeList },
  data: function () {
    return {
      name: 'UReferFileToOffice',
      formKey: '89883d08-3c21-4a32-8832-29ad4a9b5b63',
      title: 'ارجاع پرونده به دفتر',
      main: true,
      sidebarCompatible: true,
      officeCode: null,
      results: {
        Off_Info: {},
        ReferOfficesInfo: [],
        Ref_Info: {}
      },
      requestResults: {},
      isFemale: null,
      editID: null,
      showOfficeList: false,
      currentOffice: null
      // referFileToOffice: [

      //   {
      //     field: "officeCode",
      //     title: "کد دفتر"
      //   },
      //   {
      //     field: "officeName",
      //     title: "نام دفتر"
      //   },
      //   {
      //     field: "officeKind",
      //     title: "نوع دفتر"
      //   },

      //   {
      //     field: "percentShare",
      //     title: "درصد اعمال در سهمیه"
      //   },

      //   {
      //     field: "participationAsCoworker",
      //     title: " مشارکت به صورت همکار"
      //   },

      //   {
      //     field: "canceled",
      //     title: "کنسل شده"
      //   },

      //   {
      //     field: "freeUp",
      //     title: "آزاد شده"
      //   },

      //   {
      //     field: "isOwnerTheSupervisor",
      //     title: "آیا ناظر مالک است"
      //   },

      //   {
      //     field: "freeReferral",
      //     title: "ارجاع آزاد"
      //   },

      //   {
      //     field: "resignDate",
      //     title: " تاریخ انصراف"
      //   },

      //   {
      //     field: "canceledDate",
      //     title: "تاریخ ارجاع"
      //   },
      //   {
      //     field: "year",
      //     title: "سال"
      //   },

      //   {
      //     field: "canceledExplanation",
      //     title: "توضیحات ارجاع"
      //   }

      // ]
    }
  },

  methods: {
    // getReferOfficeInfo at mount
    getReferOfficeInfo () {
      this.showLoading()
      let payLoad = {
        RequestMessage: {
          OfficeCode: this.officeCode
        }
      }

      this.$services.engineers
        .getReferOfficeInfo(payLoad)
        .then(({ data }) => {
          this.requestResults = this.getResponse(data)
          if (this.requestResults.success) {
            this.results = this.requestResults.data
          }
        })
        .catch(response => {
          this.serverError()
          // console.log('load error .....', response)
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    // load data
    loadData () {
      this.showLoading()
      let payLoad = {
        pRequest: {
          OfficeCode: this.officeCode
        }
      }

      this.$services.engineers
        .getOfficeInfoWithCode(payLoad)
        .then(({ data }) => {
          this.requestResults = this.getResponse(data)
          if (this.requestResults.success) {
            this.results = this.requestResults.data.GetOfficeInfoWithCodeResult
            if (this.results.ReferOfficesInfo === null) {
              this.results.ReferOfficesInfo = []
            }
            if (!this.results.Ref_Info) {
              this.results.Ref_Info = {}
            }
          }
        })
        .catch(response => {
          this.serverError()
          // console.log('load error .....', response)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    selectedOffice (value) {
      this.showOfficeList = false
      this.currentOffice = value
      this.officeCode = value.OfficeCode
    },

    // TODO complete and refactor other mrthods
    search () {
      this.$q.loading.show({ message: 'در حال بارگذاری' })
      let thisc = this
      let data = {
        pRequest: {
          OfficeCode: this.officeCode
        }
      }

      this.$services.engActivity
        .GetOfficeInfoWithCode(data)
        .then(response => {
          thisc.results = response.data.GetOfficeInfoWithCodeResult
          this.$q.loading.hide()
        })
        .catch(e => {
          this.$q.loading.hide()
          // console.log(e)
          this.$q.dialog({
            title: 'خطا در سرور',
            message: 'متاسفانه مشکلی در سیستم رخ داده است.'
          })
        })
    },

    updateEditStatusById (id, newStatus) {
      if (!id) return
      const data = this.gridData.slice()
      const index = data.findIndex(d => d.ID === id)
      // override item
      data[index] = { ...data[index], inEdit: newStatus }
      // set gridview rows
      this.gridData = data
      if (newStatus) {
        this.editID = id
      }
    },
    rowClick: function (e) {
      if (this.editForm === true) {
        // set edit field's rows to FALSE
        this.updateEditStatusById(this.editID, false)
        // set edit field's clicked row to TRUE
        this.updateEditStatusById(e.dataItem.ID, true)
        this.$set(e.dataItem, 'inEdit', true)
      }
    },
    itemChange: function (e) {
      // get grid rows
      const data = this.gridData.slice()
      // console.log('data', data)
      // get row index by product id
      const index = data.findIndex(d => d.ID === e.dataItem.ID)
      // override item
      data[index] = { ...data[index], [e.field]: e.value }
      // set gridview rows
      this.gridData = data
      // console.log('data', this.gridData)
      // replace grid cell property
      this.$set(e.dataItem, e.field, e.value)
      // console.log('data', this.gridData)
    }
  }
}
</script>
