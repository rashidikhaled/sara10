<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ACE63A06-E835-457D-A1EA-3B477DD9E69B"
  >
    <form-wrapper :title="title" :padding="false" vertical>
      <template v-slot:header>
        <form-header-by-nosazi-code
          actions
          from-request
          v-model="baseNosaziCode"
          @fetched="fetched"
        />
        <safa-status :result="requestResult" />
        <safa-status :result="saveResult" />
      </template>
      <safa-tabs v-model="activeTab" class="fit" height="100%">
        <template v-slot:tabs>
          <tab-menu name="list" label="لیست" />
          <tab-menu name="innerMap" label="نقشه داخلی" v-if="showInternalMap" />
        </template>
        <tab-content name="list" :padding="false">
          <fit>
            <safa-datatable
              v-model="requestResult.data.Dwg_Wrapper_List"
              height="100%"
              ref="technical-grid"
              name="grid"
              helper="shahrsazi.buildingInternalmaps"
              :m="mode"
              :loadingAnimation="false"
              :hide-header="true"
              :bordered="false"
              fit
              title="لیست"
              @dbclick="handelDbClick"
              :addRow="true"
            >
            </safa-datatable>
          </fit>
        </tab-content>
        <tab-content name="innerMap" :padding="false">
          <InternalMapTab
            v-if="activeTab === 'innerMap'"
            :selectedRow="selectedRow"
            :baseNosaziCode="baseNosaziCode"
            :formKey="formKey"
            :title="title"
          />
        </tab-content>
      </safa-tabs>
      <template v-slot:footer>
        <FormActions
          :m="mode"
          @edit="isEditable = true"
          @cancel="isEditable = false"
          @save="editData"
          editSPId="72315a57-b629-44d3-a6e3-267a3eaa947a"
          editFormId="986f972d-8a03-479a-a631-6f0b410ef99a"
        >
          <template v-slot:after>
            <btn-new color="primary" label="ردیف جدید" @click="saveData" />
          </template>
        </FormActions>
      </template>
    </form-wrapper>
  </safa-form>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import loadDataPrequest from "./models/loadDataPrequest.js"
import editDataPrequest from "./models/editDataPrequest.js"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"
import InternalMapTab from "./partials/InternalMapTab"
export default {
  route: "/parvande/building-inhternal-maps",

  mixins: [baseFormMixin],
  components: { InternalMapTab },
  data () {
    return {
      title: "شهرسازی- نقشه های داخلی ساختمان",
      formKey: "986f972d-8a03-479a-a631-6f0b410ef99a",
      name: "UBuildingInternalMaps",
      main: true,
      sidebarCompatible: true,
      workflowCompatible: true,
      selectedRow: null,
      loadResult: {},
      isGoToEdit: false,
      activeTab: "list",
      editMode: "r",
      // savePrequest: {
      //   pTechnicalCommittee: {
      //     ErrorResult: {
      //       BizErrors: null,
      //       Requirements: null,
      //     },
      //     NidProc: "10ba38db-dba4-40a2-9079-4e7b4bc592b9",
      //     Sh_TechnicalCommittee: {
      //       Sh_TechnicalCommittee: {
      //         CI_TechnicalCommittee: "1",
      //         CI_TechnicalCommitteeMainUsing: "1",
      //         CI_TechnicalCommitteeSubUsing: "1",
      //         Comment: "Test Description",
      //         NidProc: "00000000-0000-0000-0000-000000000000",
      //         NidTechnicalCommittee: "00000000-0000-0000-0000-000000000000",
      //         VoteDate: "1398/12/20",
      //         VoteNo: "1",
      //       },
      //     },
      //   },
      // },
      items: [],
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      // selectedNosaziCode: "0-0-0-0-0-0-0",
      result: null,
      isDeleteDisabled: true,
      formActionEditMode: "r",
      requestResult: {
        data: {
          Dwg_Wrapper_List: []
        }
      },
      showInternalMap: false,
      saveResult: null,
      selectedRegion: 1
    }
  },

  methods: {
    handelDbClick (e) {
      this.activeTab = "innerMap"
      this.showInternalMap = true
      this.selectedRow = e.row
    },
    fetched (val) {
      this.selectedRegion = val.MainObj.District
      this.loadData()
    },
    saveData () {
      this.showLoading()
      let payLoad = {
        pDWG: {
          Dwg_Wrapper: {
            FileType: 0,
            NidDWG: "00000000-0000-0000-0000-000000000000",
            NidUser: this.getNidUser(),
            UserName: this.getUserDisplayName(),
            NidWorkItem: null
          },
          RequestType: 0
        },
        pNosaziCode: {
          Apartment: this.baseNosaziCode.Apartment,
          Block: this.baseNosaziCode.Block,
          Building: this.baseNosaziCode.Building,
          CI_City: 0,
          District: this.baseNosaziCode.District,
          EumBaseInfoGroup: 0,
          EumNosaziCodeGroup: 0,
          EumNosaziCodeObjType: 0,
          EumRevisitGroup: 0,
          House: this.baseNosaziCode.House,
          IsRoot: false,
          NidBase: "00000000-0000-0000-0000-000000000000",
          NidNosaziCode: "00000000-0000-0000-0000-000000000000",
          NidNosaziCodeParent: "00000000-0000-0000-0000-000000000000",
          NidRevisit: "00000000-0000-0000-0000-000000000000",
          NidUser: "00000000-0000-0000-0000-000000000000",
          Region: this.baseNosaziCode.Region,
          Shop: this.baseNosaziCode.Shop
        }
      }
      if (this.selectedRequest) {
        payLoad.pDWG.Dwg_Wrapper.NidWorkItem = this.selectedRequest.NidWorkItem
      }

      this.$services.SC.saveDwgWrapper(payLoad, {
        config: {
          District: this.baseNosaziCode.District
        }
      })
        .then(async (response) => {
          this.saveResult = this.getResponse(response.data)

          if (!this.saveResult.hasError) {
            this.showSuccess("ردیف جدید با موفقیت ایجاد شد")
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )
            await this.log({
              action: this.logActions.save,
              bizCode: strNosaziCode,
              bizCodeTitle: "کد نوسازی",
              nosaziCode: strNosaziCode
            })
            this.isEditable = false
            this.loadData()
          }
        })
        .catch((e) => {
          this.serverError()
          console.log("save error:", e)
        })
        .finally(this.hideLoading())
    },
    editData () {
      this.showLoading()

      editDataPrequest.pDWG.Dwg_Wrapper_List =
        this.requestResult.data.Dwg_Wrapper_List

      this.$services.SC.editDwgWrapper(editDataPrequest, {
        config: {
          District: this.selectedRegion
        }
      })
        .then(async (response) => {
          this.requestResult = this.getResponse(response.data)

          if (!this.requestResult.hasError) {
            this.showSuccess("ویرایش با موفقیت انجام شد")

            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )

            await this.log({
              action: this.logActions.save,
              bizCode: strNosaziCode,
              bizCodeTitle: "کد نوسازی",
              nosaziCode: strNosaziCode
            })
            this.isEditable = false
            this.loadData()
          }
        })
        .catch((e) => {
          this.serverError()
          console.log("edit error:", e)
        })
        .finally(this.hideLoading())
    },

    loadData () {
      loadDataPrequest.pNosaziCode.Apartment = this.baseNosaziCode.Apartment
      loadDataPrequest.pNosaziCode.Block = this.baseNosaziCode.Block
      loadDataPrequest.pNosaziCode.Building = this.baseNosaziCode.Building
      loadDataPrequest.pNosaziCode.District = this.baseNosaziCode.District
      loadDataPrequest.pNosaziCode.House = this.baseNosaziCode.House
      loadDataPrequest.pNosaziCode.Region = this.baseNosaziCode.Region
      loadDataPrequest.pNosaziCode.Shop = this.baseNosaziCode.Shop

      this.$services.SC.getDwgWrapperList(loadDataPrequest, {
        config: {
          District: this.selectedRegion
        }
      })
        .then(async (response) => {
          this.requestResult = this.getResponse(response.data)
          const strNosaziCode = convertNosaziCodeObjectToString(
            this.baseNosaziCode
          )

          await this.log({
            action: this.logActions.view,
            bizCode: strNosaziCode,
            bizCodeTitle: "کد نوسازی",
            nosaziCode: strNosaziCode
          })
        })
        .catch((e) => {
          this.serverError()
          console.log("load error:", e)
        })
    }
    // fetched(e) {
    //   this.loadData();
    // },
  }
}
</script>
