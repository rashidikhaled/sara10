<template>
  <safa-form :id="formKey" :caption="title" app-id="92404D00-D287-4A09-9596-29FCC9BC9DB9">
    <form-wrapper :title="title" vertical>
      <template #header>
        <safa-status :result="getEngineersUpdatedRes" />
      </template>
      <fit>
        <div class="row q-mb-sm flex items-center">
          <engineer-actions
            v-model="selectRow.IdentityCode"
            :disable="!selectRow.IdentityCode"
            class="col-12"
          />
        </div>
        <!--  این گرید تغییر به هلپر تغییر نکند columns-->
          <safa-grid
          title="اطلاعات خوداظهار"
          :columns="columns"
          v-model="GetEngineersUpdatedResult.EngineersUpdated"
          :m="mode"
          fit
          height="100%"
          max-height="100%"
          min-height="200px"
          :show-selected-checkbox="true"
          :allowMultipleSelection="false"
          :addRow="false"
          :deleteRow="false"
          :allowCopy="false"
          paginate
          @row:click="selectedRow"
          :pageSize="20"
        />
      </fit>
    </form-wrapper>

    <safa-popup
      title="خوداظهاری"
      vertical
      v-model="showKhodEzhariInfo"
      width="900px"
      height="800px"
    >
      <KhodEzhari
        :nidEng="NidEng_Temp"
        :name="name"
        :title="title"
        :formKey="formKey"
        @reload="loadObj"
      />
    </safa-popup>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import KhodEzhari from "./partials/KhodEzari.vue"

export default {
  mixins: [baseFormMixin],
  components: { KhodEzhari },
  data () {
    return {
      title: "بررسی اطلاعات خود اظهار",
      formKey: "eba216f1-bfa5-4095-a150-7d52a226b972",
      name: "KhodEzhar",
      main: true,
      sidebarCompatible: true,
      // #services
      getEngineersUpdatedRes: null,

      // #variables
      getCapacityKartablResult: {
        CapacityKartabl: [],
        Eng_Info: {
          EngName: "",
          EngFamily: ""
        }
      },

      GetEngineersUpdatedResult: {
        EngineersUpdated: []
      },
      selectRow: {},
      GridselectedRow: {},
      showKhodEzhariInfo: false,
      NidEng_Temp: "",
      columns: [
        {
          field: "IdentityCode",
          title: "کد عضویت",
          width: "120px"
        },
        {
          field: "EngName",
          title: "نام",
          width: "180px"
        },
        {
          field: "EngFamily",
          title: "نام خانوادگی",
          width: "180px"
        },
        {
          field: "EngInfoUpdateDate",
          title: "مشخصات مهندس",
          width: "100px",
          editor: "date",
          cellStyle: {
            padding: 0,
            margin: 0
          },
          cellRenderer: (params) =>
            `<div style="${
              params.data?.EngInfoIsUpdate
                ? "background:#bcf5bc;text-align:center"
                : ""
            }">${params.data?.EngInfoUpdateDate || ""}</div>`
        },
        {
          field: "EngPictureUpdateDate",
          title: "نمونه عکس ها",
          width: "100px",
          editor: "date",
          cellStyle: {
            padding: 0,
            margin: 0
          },
          cellRenderer: (params) =>
            `<div style="${
              params.data?.EngPictureIsUpdate
                ? "background:#bcf5bc;text-align:center"
                : ""
            }">${params.data?.EngPictureUpdateDate || ""}</div>`
        },
        {
          field: "EngJobUpdateDate",
          title: "پروانه اشتغال",
          width: "100px",
          editor: "date",
          cellStyle: {
            padding: 0,
            margin: 0
          },
          cellRenderer: (params) =>
            `<div style="${
              params.data?.EngJobIsUpdate
                ? "background:#bcf5bc;text-align:center"
                : ""
            }">${params.data?.EngJobUpdateDate || ""}</div>`
        },
        {
          field: "EngComUpdateDate",
          title: "صلاحیت ها",
          width: "100px",
          editor: "date",
          cellStyle: {
            padding: 0,
            margin: 0
          },
          cellRenderer: (params) =>
            `<div style="${
              params.data?.EngComIsUpdate
                ? "background:#bcf5bc;text-align:center"
                : ""
            }">${params.data?.EngComUpdateDate || ""}</div>`
        },
        {
          field: "EngOtherUpdateDate",
          title: "سایر اطلاعات",
          width: "auto",
          editor: "date",
          cellStyle: {
            padding: 0,
            margin: 0
          },
          cellRenderer: (params) =>
            `<div style="${
              params.data?.EngOtherIsUpdate
                ? "background:#bcf5bc;text-align:center"
                : ""
            }">${params.data?.EngOtherUpdateDate || ""}</div>`
        },
        {
          field: "itemDetail",
          title: "نمایش اطلاعات خود اظهاری",
          editor: "action",
          width: "180px",
          cellStyle: {
            padding: 0,
            margin: 5
          },
          btnTitle: "نمایش جزئیات",
          cellRenderer: "agCallbackBtn",
          callback: (params) => this.handleShowDetail(params)
        }
      ]
    }
  },
  async created () {
    await this.loadObj()
  },
  methods: {
    async loadObj () {
      this.showKhodEzhariInfo = false
      try {
        this.showLoading()
        const { data } = await this.$services.engineers.GetEngineersUpdated()
        this.getEngineersUpdatedRes = this.getResponse(data)
        if (this.getEngineersUpdatedRes.success) {
          this.GetEngineersUpdatedResult =
            this.getEngineersUpdatedRes.data.GetEngineersUpdatedResult
          await this.log({
            action: this.logActions.view,
            bizCode: "",
            bizCodeTitle: ""
          })
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },
    selectedRow ({ data }) {
      this.selectRow = data
    },
    cancel () {
      this.currentTab = "kartabl_tab"
      this.isEditable = false
      this.showNewButton = true
      // this.editInfoValue = initialValue.defaultValue
    },
    handleShowDetail (row) {
      this.GridselectedRow = row
      this.NidEng_Temp = row.NidEng_Temp
      this.showKhodEzhariInfo = true
    }
  }
}
</script>

<style lang="scss" scoped>
.hasBg {
  background-color: greenyellow;
}
</style>
