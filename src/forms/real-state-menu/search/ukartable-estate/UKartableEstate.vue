<template>
   <safa-form
   :id="formKey"
   :caption="title"
   appId="BEA0DE7D-9883-48E2-8A7B-9A30D8525255"
   >
  <form-wrapper :title="title" padding>
    <template #header>
      <safa-status :result="result"/>
      <safa-status :result="saveResult"/>
      <safa-status :result="getRequesterRes" />
    </template>
    <fit>
      <form-row class="q-mb-sm">
        <!-- <div class="flex q-col-gutter-x-sm">

          </div> -->
          <form-control>
          <safa-text
          label="شماره درخواست"
            v-model="RequestNo"
            label-width="100px"
            cdcName="RequestNo"
            @keyup.enter="loadData"
          />
        </form-control>
        <form-control>
          <safa-text
            label="کد ارجاع"
            v-model="NIdWorkItem"
            @keyup.enter="loadData"
            label-width="100px"
            cdcName="NIdWorkItem"
          />
        </form-control>

        <form-control>
          <safa-combo2
            domainName="Estate"
            label=" نوع درخواست"
            ciName="cmb_ArchiveType"
            cdcName="cmb_ArchiveType"
            v-model="cmb_ArchiveType"
            @keyup.enter="loadData"
            label-width="100px"
            type="Multiple"
            ref="RequestTypeRef"
          />
        </form-control>
        <form-control>
          <safa-combo2
            domainName="Estate"
          label="وضعیت درخواست"
            ciName="ArchiveType"
            cdcName="ArchiveType"
            v-model="ArchiveType"
            @keyup.enter="loadData"
            label-width="100px"
            type="Multiple"
            ref="RequestTypeRef"
          />
        </form-control>
        <nosazi-code-input
              v-model="baseNosaziCode"
              :actions="true"
              cdcName="baseNosaziCode"
              label-width="100px"
              label="کد نوسازی"
              @keyup.enter="loadData"
            />
         <form-control>
          <safa-text
            clearable
            label="نام درخواست کننده"
            v-model="RequesterName"
            cdcName="RequesterName"
            label-width="100px"
            @keyup.enter="loadData"
          />
        </form-control>

        <div class="q-gutter-sm">
              <btn-default label="پاک کردن" @click="clearField" />
              <btn-search label="جستجو" @click="loadData" />
              <btn-default label="چاپ" @click="print" />
          </div>
        </form-row>
      <safa-grid
        title="کارتابل پاسخگو"
        @row:click="selectedItemMethod"
        m="r"
        minHeight="300px"
        ref="kartable"
        :settings="true"
        :columns="kartableColumns"
        v-model="rowGrid1"
        paginate
      />
    </fit>
  </form-wrapper>
</safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
// import GardeshParvandehDetails from 'src/kartable/partials/GardeshParvandehDetails'

export default {
  mixins: [baseFormMixin],
  // components: { GardeshParvandehDetails },

  data () {
    return {
      title: "کارتابل پاسخگو املاک و مستغلات ",
      formKey: "DBA9C835-BCF2-4BBC-8AC9-6D1CE689E033",
      name: "UKartableEstate",
      main: true,

      skip: 0,
      take: 200,

      kartableColumns: [

        {
          field: "RequestNo",
          title: "شماره درخواست"
        },
        {
          field: "RequestType",
          title: "نوع درخواست"
        },

        {
          field: "NIdWorkItem",
          title: "کد ارجاع"
        },
        {
          field: "CodeString",
          title: "کد نوسازی"
        },
        {
          field: "UrbanNIdRequest",
          title: "شماره درخواست شهرسازی"
        },
        {
          field: "UrbanNIdKartablItem",
          title: "کد ارجاع شهرسازی"
        },
        {
          field: "RequestDate",
          title: "تاریخ درخواست"
        },

        {
          field: "RequesterName",
          title: "نام درخواست کننده"
        },

        {
          field: "AssingToUserName",
          title: "انجام دهنده"
        },
        {
          field: "TaskTitle",
          title: "مرحله"
        },
        {
          field: "SysCI_RequestStatus",
          title: "وضعیت درخواست"
        }
      ],
      // services
      getRequesterRes: null,

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
      RequestNo: 0,
      NIdWorkItem: 0,
      cmb_ArchiveType: 0,
      CI_RequestStatus: 0,
      RequesterName: "",
      rowGrid1: {},
      workflowTitleGroups: [],
      totalRow: 0
    }
  },

  methods: {

    clearField () {
      this.baseNosaziCode.District = 0
      this.baseNosaziCode.Region = 0
      this.baseNosaziCode.Block = 0
      this.baseNosaziCode.House = 0
      this.baseNosaziCode.Building = 0
      this.baseNosaziCode.Apartment = 0
      this.baseNosaziCode.Shop = 0
      this.RequestNo = 0
      this.cmb_ArchiveType = 0
      this.NIdWorkItem = 0
      this.UrbanNIdRequest = 0
      this.UrbanNIdKartablItem = 0
      this.CI_RequestStatus = 0
      this.RequesterName = ""
    },
    selectedItemMethod ({ data: row }) {
      this.selectedItem = row || null
    },

    loadData  () {
      const payload = {
        PNidUser:
          this.selectedRequest !== null
            ? this.selectedRequest.NidProc
            : "00000000-0000-0000-0000-000000000000",
        PDistrict: this.baseNosaziCode.District,
        PRegion: this.baseNosaziCode.Region,
        PBlock: this.baseNosaziCode.Block,
        PHouse: this.baseNosaziCode.House,
        PBuilding: this.baseNosaziCode.Building,
        PApartment: this.baseNosaziCode.Apartment,
        PShop: this.baseNosaziCode.Shop,
        pRequestNo: this.RequestNo,
        pCI_RequestType: this.cmb_ArchiveType,
        pNIdWorkItem: this.NIdWorkItem,
        pUrbanNIdRequest: this.NIdRequest,
        pUrbanCI_RequestType: this.CI_RequestType,
        pUrbanNIdKartablItem: this.NIdKartablItem,
        pSysCI_RequestStatus: this.CI_RequestStatus,
        pRequesterName: this.RequesterName,
        pFrom: 0,
        pTo: 100
      }
      debugger
      this.showLoading()
      this.$services.ES.getRequester(payload)
        .then(async ({ data }) => {
          this.getRequesterRes = this.getResponse(data)
          if (this.getRequesterRes.success) {
            this.rowGrid1 = this.getRequesterRes.data.GetRequesterResult.Requester
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    async print () {
      const reportPath =
        "/ComReport/Rpt_Responder="
      const queryParams = {
        NidUser: this.getNidUser(),
        NidProc: this.selectedItem.NidProc
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: this.selectedItem.NidProc,
        bizCodeTitle: "NidProc"
      })
    }
  }
}
</script>
