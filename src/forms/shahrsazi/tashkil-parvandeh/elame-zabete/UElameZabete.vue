<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ACE63A06-E835-457D-A1EA-3B477DD9E69B"
  >
    <form-wrapper vertical title="اعلام ضابطه" :padding="false">
      <template #header>
        <form-header-by-nosazi-code
          v-model="baseNosaziCode"
          cdcName="baseNosaziCode"
          @fetched="fetchedData"
          from-request
          :taskInfo="taskInfo"
          />
          <!-- isArsseNosazi -->
        <safa-status :result="loadZabetehListWithHistoryRes" />
        <safa-status :result="results" />
      </template>

      <safa-tabs
        ref="zabeteTab"
        v-model="activeTab"
        :bordered="false"
        :padding="false"
      >
        <template v-slot:tabs>
          <tab-menu name="Zabete" label=" ضابطه" />
          <tab-menu name="details" label="جزئیات" v-if="isdetails" />
          <tab-menu name="History" label="تاریخچه ضابطه"/>
        </template>

        <tab-content name="Zabete" title="ضابطه">
          <Zabete
            :results="results"
            @reload="reload"
            :nidNosaziCode="nidNosaziCode"
            @showZabeteDetailes="showZabeteDetailes"
            @clickRow="clickRow"
            :baseNosaziCode="baseNosaziCode"
            :formKey="formKey"
            :title="title"
            :name="name"
            ref="zabetehTab"
          />
        </tab-content>
        <tab-content name="details" title="جزئیات">
          <ZabeteDetails
            :results="results"
            v-if="isdetails"
            :nidNosaziCode="nidNosaziCode"
            :selectedNidZabete="selectedNidZabete"
            :currentNidProc="currentNidProc"
            :formKey="formKey"
            :title="title"
            :name="name"
            ref="detailsTab"
             @reload="reload"
            :m="mode"
            @successSave="successSave"
            @setMode="isEditable = true"
            :baseNosaziCode="baseNosaziCode"
            :userName="userName"
          />
        </tab-content>
        <tab-content name="History" title="تاریخچه ضابطه">
          <History
            :results="results"
            @reload="reload"
            :nidNosaziCode="nidNosaziCode"
            @showZabeteDetailes="showZabeteDetailes"
            @clickRow="clickRow"
            :baseNosaziCode="baseNosaziCode"
            :formKey="formKey"
            :title="title"
            :name="name"
            ref="zabetehTab"
          />
        </tab-content>
      </safa-tabs>

      <template v-slot:footer>
        <div
          class="row q-gutter-sm"
          v-show="!isShowDetailsButtons && activeTab === 'Zabete'"
        >
          <btn-default
          v-show="showButton('newRow')"
            @click="createNewRecord"
            label="ایجاد ردیف محاسبه"
            class="q-mt-sm"
            spId="61f8a91c-f2c4-483c-944a-5caa92efa04d"
            spCaption="ایجاد ردیف محاسبه"
          />
          <btn-delete
          v-show="showButton('deletZabete') && displayDeleteBtn"
            @click="deleteZabete"
            label="حذف ضابطه"
            class="q-mt-sm"
            spId="f9afd458-1313-4a48-87ed-5269fdf3bf8b"
            spCaption="حذف ضابطه"
          />
        </div>
        <div v-show="isShowDetailsButtons && activeTab === 'details'">
          <form-actions
          v-show="isShowDetailsButtons && activeTab === 'details'"
            :m="mode"
            @cancel="isEditable = false"
            @edit="editZabeteDetail"
            :showEditButton="showButton('edit')"
            editSPId="866814a0-213c-485b-aca3-e531e7deffeb"
            editSPCaption="ویرایش"
            editFormId="f309a704-4f5b-4faa-a356-86acf69f5275"
            @save="save"
          >
            <template #after v-if="!isEditable">
              <btn-edit
              v-show="$refs.detailsTab.editFloor && showButton('editChideman')"
                label="ویرایش چیدمان در طبقات"
                @click="$refs.detailsTab.handelEditFloor"
                formId="f309a704-4f5b-4faa-a356-86acf69f5275"
                spId="a1c6ece0-1d5c-4e78-b0a4-4336e5f6b8ad"
                spCaption="ویرایش چیدمان در طبقات"
              />
              <btn-save
              v-show="$refs.detailsTab.saveFloor && showButton('saveChideman')"
                label="ذخیره چیدمان در طبقات"
                @click="$refs.detailsTab.save"
                formId="f309a704-4f5b-4faa-a356-86acf69f5275"
              />
              <btn-default
              v-show="showButton('copyChideman')"
                label="کپی به چیدمان مجاز"
                @click="copyToPrincipleAgreement"
                formId="f309a704-4f5b-4faa-a356-86acf69f5275"
                spId="0a3d2cbd-c901-497e-8add-031f4a2d3834"
                spCaption="کپی به موافقت اصولی"
              />
              <btn-default
              v-show="showButton('elamZabeteSave')"
                label="اعلام ضابطه و ذخیره"
                @click="calculateZabetehAndSave"
                spId="2346f4fa-6589-454c-a8b5-8146e5de7c21"
                spCaption="اعلام ضابطه و ذخیره"
                formId="f309a704-4f5b-4faa-a356-86acf69f5275"
              />
              <btn-default
              v-show="showButton('elamZabete')"
                label="اعلام ضابطه"
                @click="calculateZabete"
                spId="e19ead15-c89f-469e-aad1-c21c24eb78a6"
                spCaption="اعلام ضابطه"
                formId="f309a704-4f5b-4faa-a356-86acf69f5275"
              />
              <btn-default
              v-show="showButton('mohasebeChidemanSave')"
                label="محاسبه چیدمان در طبقات و ذخیره"
                @click="calculateZabetehChidemanAndSave"
                spId="446264d4-53b2-4c0c-970a-7409156e521c"
                spCaption="محاسبه چیدمان در طبقات و ذخیره"
                formId="f309a704-4f5b-4faa-a356-86acf69f5275"
              />
              <btn-default
                label="گزارش"
                @click="print"
                v-show="showButton('print')"
              />
            </template>
          </form-actions>
        </div>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import ZabeteDetails from "./partials/ZabeteDetails.vue"
import Zabete from "./partials/Zabete.vue"
import History from "./partials/History.vue"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      displayDeleteBtn: false,
      isShowDetailsButtons: false,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      title: "شهرسازی- اعلام ضابطه",
      formKey: "79692b1d-0ac2-48af-805b-e062d884b5f7",
      fetchNidProc: "00000000-0000-0000-0000-000000000000",
      name: "UElameZabete",
      main: true,
      sidebarCompatible: true,
      workflowCompatible: true,
      activeTab: "Zabete",
      gridData: [],
      editID: null,
      loadZabetehListWithHistoryRes: null,
      results: { ZabetehList: [] },
      nidNosaziCode: null,
      showZabeteDetails: false,
      isdetails: false,
      selectedNidZabete: null,
      currentNidProc: null,
      selectedDist: 1,
      userName: ""
    }
  },
  components: {
    ZabeteDetails,
    Zabete,
    History
  },
  computed: {
    showFooterButtons () {
      if (this.activeTab === "details" && this.isEditable === false) {
        return true
      } else {
        return false
      }
    }
  },

  methods: {
    editZabeteDetail () {
      this.$refs.detailsTab.edit()
    },
    showButton (key) {
      return this.actionButtons.includes(key)
    },
    createNewRecord () {
      this.$refs.zabetehTab.createNewRecord()
    },
    copyToPrincipleAgreement () {
      this.$refs.detailsTab.copyToPrincipleAgreement()
    },
    calculateZabete () {
      this.$refs.detailsTab.calculateZabete()
    },
    calculateZabetehChidemanAndSave () {
      this.$refs.detailsTab.calculateZabetehChidemanAndSave()
    },
    calculateZabetehAndSave () {
      this.$refs.detailsTab.calculateZabetehAndSave()
    },
    print () {
      this.$refs.detailsTab.print()
    },
    fetchedData (value) {
      // this.fetchNidProc = value.MainObj.NidProc
      this.nidNosaziCode = value._NidNosaziCode
      this.selectedDist = value.MainObj.District
      this.load()
    },
    loadDetail () {
      this.isEditable = false
      this.$refs.detailsTab.load()
    },
    clickRow (value) {
      this.displayDeleteBtn = true
      this.userName = value.UserName
    },
    save () {
      this.$refs.detailsTab.save()
    },
    successSave () {
      this.isEditable = false
      this.$refs.detailsTab.saveFloor = false
      this.$refs.detailsTab.editFloor = true
    },
    deleteZabete () {
      this.$refs.zabetehTab.deleteRecord()
    },
    async load () {
      let data = {
        pNidNosaziCode: this.nidNosaziCode,
        pNidProc: this.selectedRequest
          ? this.selectedRequest.NidProc
          : "00000000-0000-0000-0000-000000000000",
        pDoCalculateInNoZabeteh: false,
        pUser: this.currentUser,
        pDtoWorkflowData: {
          StateName: "f4a80d82-1bf8-4a28-b1f1-1532865ee12c",
          WorkflowGuid: "5ca8477d-2a3a-4962-9c63-a8690ff8975c"
        },
        pIsLoadDeletedNosaziCode: false
      }
      const response = await this.$services.SC.loadZabetehListWithHistory(
        data,
        { config: { District: this.selectedDist } }
      )
      this.loadZabetehListWithHistoryRes = this.getResponse(response.data)
      if (this.loadZabetehListWithHistoryRes.success) {
        this.results = this.loadZabetehListWithHistoryRes.data

        await this.log({
          action: this.logActions.view,
          bizCode: this.nidNosaziCode,
          bizCodeTitle: " شناسه کد نوسازی",
          nosaziCode: this.selectedRequest ? this.selectedRequest.BizCode : "",
          nidWorkItem: this.selectedRequest ? this.selectedRequest.NidWorkItem : "",
          saveDesc: `بارگذاری اطلاعات در فرم اعلام ضابطه انجام گردید.`
        })
      }
    },
    reload () {
      this.load()
    },

    showZabeteDetailes (value) {
      this.selectedNidZabete = value.NidZabeteh
      this.currentNidProc = value.NidProc
      this.isdetails = true
      this.isShowDetailsButtons = true
      this.activeTab = "details"
    },
    clickZabeteh () {
      this.showDeleteBtn = true
    }
  },
  props: {
    actionButtons: {
      type: Array,
      default: () => [
        "edit",
        "newRow",
        "deletZabete",
        "editChideman",
        "saveChideman",
        "copyChideman",
        "elamZabeteSave",
        "elamZabete",
        "mohasebeChidemanSave",
        "print"
      ]
    },
    showInnerBtn: { type: Boolean, default: true }
  }
}
</script>
