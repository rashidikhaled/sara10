<template>
  <safa-form :id="formKey" :caption="title" appId="90bba2fe-5569-45b3-9a7b-eb92b3b19ca1">
    <form-wrapper :title="title" :padding="false">
      <template #header>
        <safa-status :result="getFilInfoWithNidFilRes" />
        <safa-status :result="getDwgWrapperListRes" />
        <safa-status :result="saveDwgWrapperRes" />
        <safa-status :result="editDwgWrapperRes" />
        <form-header-by-nosazi-code
          v-model="baseNosaziCode"
          v-if="isNosaziCodeVisible"
          @input="loadDwgList"
          :actions="false"
        />
      </template>
      <fit>
        <safa-tabs v-model="activeTab">
          <template v-slot:tabs>
            <tab-menu name="listTab" label="لیست" />

            <tab-menu
              name="objPlanTab"
              label="نقشه داخلی"
              v-if="isShowObjPlanTab"
              closable
              @close="closeObjPlanTab"
            />
          </template>

          <tab-content name="listTab" :padding="false">
            <safa-datatable
              fit
              min-height="100px"
              height="100%"
              max-height="100%"
              v-model="dataContext.Dwg_Wrapper_List"
              :columns="gvDWGListColumns"
              :m="mode"
              :showRowNumber="false"
              :show-selected-checkbox="false"
              :allowMultipleSelection="false"
              @dbclick="gvDWGListRowActivated"
            />
          </tab-content>

          <tab-content name="objPlanTab" title="نقشه داخلی"> </tab-content>
        </safa-tabs>
      </fit>
      <template #footer>
        <form-actions
          :m="mode"
          @edit="isEditable = true"
          editSPId="72315a57-b629-44d3-a6e3-267a3eaa947a"
          editFormId="01D5DE15-E75B-459F-8F6D-8CA1019FC3BF"
          editSPCaption="ویرایش"
          @cancel="isEditable = false"
          @save="btnSaveClick"
        >
          <btn-default label="ردیف جدید" @click="save" />
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import kartableReferencesMixin from "../mixins/kartableReferencesMixin"

import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"

export default {
  name: "UBuildingPlan",

  mixins: [baseFormMixin, kartableReferencesMixin],

  data () {
    return {
      title: "نقشه های داخلی ساختمان",
      formKey: "01D5DE15-E75B-459F-8F6D-8CA1019FC3BF",
      name: "UBuildingPlan",
      main: true,

      activeTab: "listTab",

      // Context
      nosaziCodeStrSubSys: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      isNosaziCodeVisible: true,
      isLoadedFromMenu: false,
      isLoadFromSubSys: false,
      isShowObjPlanTab: false,
      dataContext: {
        Dwg_Wrapper_List: []
      },
      gvDWGListColumns: [
        {
          field: "FileType",
          title: "نوع فایل DWG",
          width: "120px",
          editor: "ci",
          ciName: "EumDWGFileType",
          domain: "CI_SaraM1"
        },
        {
          field: "NidWorkItem",
          title: "شماره درخواست",
          width: "130px"
        },
        {
          field: "UserName",
          title: "کاربر",
          width: "140px"
        },
        {
          field: "CreateDate",
          title: "تاریخ ایجاد",
          width: "140px",
          editor: "date"
        },
        {
          field: "CreateTime",
          title: "ساعت ایجاد",
          width: "80px"
        },
        {
          field: "Comments",
          title: "توضیحات",
          width: "150px"
        }
      ],
      nidProc: "00000000-0000-0000-0000-000000000000",
      nidWorkItem: "00000000-0000-0000-0000-000000000000",

      // Responses
      getFilInfoWithNidFilRes: null,
      getDwgWrapperListRes: null,
      saveDwgWrapperRes: null,
      editDwgWrapperRes: null
    }
  },

  methods: {
    loadObj () {
      this.showLoading()

      const payload = {
        pRequest: {
          NidFil: this.selectedExecRep.NIdFil
        }
      }

      this.$services.engineers
        .getFilInfoWithNidFil(payload)
        .then(({ data }) => {
          this.getFilInfoWithNidFilRes = this.getResponse(data)

          if (this.getFilInfoWithNidFilRes.success) {
            if (
              this.getFilInfoWithNidFilRes.data.GetFil_InfoWithNidFilResult
                .fil_Info != null ||
              this.getFilInfoWithNidFilRes.data.GetFil_InfoWithNidFilResult
                .fil_Info.CodeString != null
            ) {
              this.nosaziCodeStrSubSys = convertStringToNosaziCodeObject(
                this.getFilInfoWithNidFilRes.data.GetFil_InfoWithNidFilResult
                  .fil_Info.CodeString
              )
              this.isLoadFromSubSys = true
              this.nidProc =
                this.getFilInfoWithNidFilRes.data.GetFil_InfoWithNidFilResult
                  .fil_Info.NidProc || "00000000-0000-0000-0000-000000000000"
              this.nidWorkItem =
                this.getFilInfoWithNidFilRes.data.GetFil_InfoWithNidFilResult.fil_Info.NidWorkItem
              this.loadObj2()
            }
          }
        })
        .catch((error) => {
          console.error(error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    loadObj2 () {
      if (!this.isLoadedFromMenu) this.isNosaziCodeVisible = false
      if (this.isLoadFromSubSys) {
        this.loadDwgList()
      }
    },

    loadDwgList () {
      this.showLoading()

      const payload = {
        pNosaziCode: {
          Apartment: 0,
          Block: 0,
          Building: 0,
          CI_City: 0,
          District: 0,
          EumBaseInfoGroup: 0,
          EumNosaziCodeGroup: 0,
          EumNosaziCodeObjType: 0,
          EumRevisitGroup: 0,
          House: 0,
          IsRoot: false,
          NidBase: "00000000-0000-0000-0000-000000000000",
          NidNosaziCode: "00000000-0000-0000-0000-000000000000",
          NidNosaziCodeParent: "00000000-0000-0000-0000-000000000000",
          NidRevisit: "00000000-0000-0000-0000-000000000000",
          NidUser: "00000000-0000-0000-0000-000000000000",
          Region: 0,
          Shop: 0
        }
      }
      Object.assign(
        payload.pNosaziCode,
        this.isLoadFromSubSys ? this.nosaziCodeStrSubSys : this.baseNosaziCode
      )

      this.$services.SC.getDwgWrapperList(payload, this.config)
        .then(({ data }) => {
          this.getDwgWrapperListRes = this.getResponse(data)

          if (this.getDwgWrapperListRes.success) {
            this.dataContext.Dwg_Wrapper_List = this.isLoadedFromMenu
              ? this.getDwgWrapperListRes.data.Dwg_Wrapper_List || []
              : this.getDwgWrapperListRes.data.Dwg_Wrapper_List.filter(
                (a) => a.NidWorkItem
              ) || []
          }
        })
        .catch((error) => {
          console.error(error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    gvDWGListRowActivated ({ row: tmpContext }) {
      // #todo
      this.isShowObjPlanTab = true
      this.activeTab = "objPlanTab"
    },

    save () {
      this.showLoading()

      let tmpObj = {
        Dwg_Wrapper: {}
      }

      if (!this.isLoadedFromMenu) {
        tmpObj.Dwg_Wrapper.NidProc = this.isLoadFromSubSys
          ? this.selectedExecRep.NidProc
          : this.taskInfo.NidProc
        tmpObj.Dwg_Wrapper.NidWorkItem = this.isLoadFromSubSys
          ? this.selectedExecRep.NidWorkItem
          : this.taskInfo.NidWorkItem
      }
      if (this.isLoadFromSubSys) {
        tmpObj.Dwg_Wrapper.UserName = this.getUserDisplayName()
        tmpObj.Dwg_Wrapper.NidUser = this.getNidUser()
      } else {
        tmpObj.Dwg_Wrapper.UserName = this.getUserDisplayName()
        tmpObj.Dwg_Wrapper.NidUser = this.getNidUser()
      }

      // eslint-disable-next-line no-unused-vars
      let payload = {
        pDWG: { ...tmpObj },
        pNosaziCode: Object.assign(
          this.isLoadFromSubSys ? this.nosaziCodeStrSubSys : this.baseNosaziCode
        )
      }

      this.$services.SC.saveDwgWrapper(payload, this.config)
        .then(({ data }) => {
          this.saveDwgWrapperRes = this.getResponse(data)
          if (this.saveDwgWrapperRes.success) {
            this.loadDwgList()
            this.showSuccess("ردیف جدید با موفقیت ایجاد شد.")
          }
        })
        .catch((error) => {
          console.error(error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    btnSaveClick () {
      this.edit()
    },

    edit () {
      if (
        // eslint-disable-next-line eqeqeq
        this.dataContext.Dwg_Wrapper_List.filter((b) => b.FileType == 1)
          .length > 1
      ) {
        this.showError("لطفا فقط یک ردیف را برای فایل لفاف حجمی انتخاب کنید")
        return false
      }

      this.showLoading()

      const payload = { pDWG: { ...this.dataContext } }

      this.$services.SC.editDwgWrapper(payload, this.config).then(
        ({ data }) => {
          this.editDwgWrapperRes = this.getResponse(data)

          if (this.editDwgWrapperRes.success) {
            this.loadDwgList()
            this.isEditable = false
          }
        }
      )
    },

    closeObjPlanTab () {
      this.isShowObjPlanTab = false
      this.activeTab = "listTab"
    }
  },

  computed: {
    config () {
      return {
        config: {
          District: this.selectedExecRep.CodeString.split("-")[0]
        }
      }
    }
  },

  async created () {
    if (await this.canOpenWindow()) this.loadObj()
  }
}
</script>
