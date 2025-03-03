<template>
  <safa-form
    :id="formKey"
    :caption="title"
   appId="BEA0DE7D-9883-48E2-8A7B-9A30D8525255"
  >
    <form-wrapper :hasFooter="false" :title="title">
      <safa-status :result="searchObjRes" />
      <safa-status :result="getActiveRequestRes" />
      <fit>
        <FormRow>
          <FormControl>
            <safa-combo
              v-model="cmb_ArchiveType"
              cdcName="cmb_ArchiveType"
              label="نوع بایگانی"
              label-width="100px"
              source-type="local"
              :options="items"
            >
            </safa-combo>
          </FormControl>
          <div class="flex q-col-gutter-x-sm">
            <nosazi-code-input
              v-model="baseNosaziCode"
              :actions="true"
              cdcName="baseNosaziCode"
              label-width="100px"
              label="کد نوسازی"
              @enter="searchObj"
            />
          </div>
        </FormRow>
        <FormRow class="q-mt-sm">
          <FormControl>
            <safa-text
              v-model="txt_RequestNo"
              label-width="100px"
              cdcName="txt_RequestNo"
              label="شماره درخواست"
            >
            </safa-text>
          </FormControl>
          <FormControl>
            <safa-text
              v-model="txt_NIdWorkItem"
              cdcName="txt_NIdWorkItem"
              label-width="100px"
              label="کد ارجاع"
            >
            </safa-text>
          </FormControl>
          <div class="q-mr-sm">
            <btn-search @click="searchObj" />
          </div>
          <div>
            <btn-default
              :disabled="isOnBtn"
              label="خروج از بایگانی موقت"
              @click="confirmGetActiveRequest"
            />
          </div>
        </FormRow>
        <safa-grid
          spId="B6D13BBC-34F7-4DB7-826E-51B5F46CC859"
          v-model="rowGrid1"
          helper="RequestsArchive_ListColumns"
          class="q-mt-sm"
          cdcName="grid1"
          m="r"
          fit
          height="100%"
          max-height="100%"
          min-height="100px"
          @row:click="selectedItemMethod"
        />
      </fit>
    </form-wrapper>
  </safa-form>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"

export default {
  mixins: [baseFormMixin],
  data: function () {
    return {
      title: "کارتابل بایگانی املاک و مستغلات",
      formKey: "90FBACB6-61FD-4F5E-BFA7-B744FD91D608",
      name: "URequests_Archive",
      main: true,

      // variables
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      items: [
        {
          ID: "1",
          Title: "بایگانی موقت"
        },
        {
          ID: "2",
          Title: "بایگانی دائم"
        }
      ],
      cmb_ArchiveType: 1,
      txt_RequestNo: 0,
      txt_NIdWorkItem: 0,
      selectedItem: null,

      // Res
      searchObjRes: null,
      getActiveRequestRes: null,

      // grid
      rowGrid1: [],
      grid1: [
        {
          field: "Row",
          title: "ردیف",
          width: "74px"
        },
        {
          field: "NIdWorkItem",
          title: "کد ارجاع",
          width: "120px"
        },
        {
          field: "RequestNo",
          title: "شماره درخواست",
          width: "120px"
        },
        {
          field: "Title",
          title: "نوع درخواست",
          width: "120px"
        },
        {
          field: "CodeString",
          title: "کد نوسازی",
          width: "120px"
        },
        {
          field: "RequestDate",
          title: "تاریخ درخواست",
          width: "120px"
        },
        {
          field: "RequesterName",
          title: "نام درخواست كننده",
          width: "150px"
        },
        {
          field: "AssingToUserName",
          title: "انجام دهنده",
          width: "120px"
        },
        {
          field: "TaskTitle",
          title: "مرحله",
          width: "120px"
        }
      ]
    }
  },
  computed: {
    isOnBtn () {
      return this.cmb_ArchiveType === "2"
    }
  },
  mounted () {},
  methods: {
    async searchObj () {
      this.showLoading()
      const NosaziCode = await convertNosaziCodeObjectToString(
        this.baseNosaziCode
      )
      const payLoad = {
        pSysCI_RequestStatus: this.cmb_ArchiveType,
        pRequestNo: this.txt_RequestNo,
        pNIdWorkItem: this.txt_NIdWorkItem,
        pCodeString: NosaziCode === "0-0-0-0-0-0-0" ? null : NosaziCode,
        pFrom: "0",
        pTo: "100"
      }
      try {
        const { data } = await this.$services.ES.getRequestsArchive(payLoad)
        this.searchObjRes = this.getResponse(data)
        if (this.searchObjRes.success) {
          this.rowGrid1 =
            this.searchObjRes.data.GetRequestsArchiveResult.RequestsArchive
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    confirmGetActiveRequest () {
      if (this.selectedItem) {
        this.showConfirm("آیا درخواست مورد نظر فعال شود؟").onOk(() => {
          this.getActiveRequest()
        })
      } else {
        this.showError("لطفا ابتدا یک درخواست را انتخاب کنید.")
      }
    },
    async getActiveRequest () {
      this.showLoading()

      const payLoad = {
        pNIdProc: this.selectedItem.NIdProcess
      }
      try {
        const { data } = await this.$services.ES.getActiveRequest(payLoad)
        this.getActiveRequestRes = this.getResponse(data)
        if (this.getActiveRequestRes.success) {
          this.showSuccess("درخواست مورد نظر فعال شد")
          this.searchObj()
          this.selectedItem = null
        }
      } catch (e) {
        console.error(e)
        this.serverError(e)
      } finally {
        this.hideLoading()
      }
    },
    selectedItemMethod ({ data: row }) {
      this.selectedItem = row || null
    }
  }
}
</script>
