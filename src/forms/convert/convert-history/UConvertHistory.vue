<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="0F9623AC-4BC7-42AD-A8E6-52A72187C6B5"
  >
    <form-wrapper :title="title" vertical>
      <template #header>
        <safa-status :result="result" />
      </template>
      <FormRow class="q-mb-sm">
        <FormControl>
          <safa-text
            v-model="model.ConvertUserName"
            cdcName="ConvertUserName"
            label="کاربر کانورت"
            label-width="82px"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            v-model="model.FromConvertDate"
            cdcName="FromConvertDate"
            label="از تاریخ"
            label-width="82px"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            v-model="model.ToConvertDate"
            cdcName="ToConvertDate"
            label="تا تاریخ"
            label-width="82px"
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-model="model.FirstUserName"
            cdcName="FirstUserName"
            label="کاربر مبدا"
            label-width="82px"
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-model="model.SecondUserName"
            cdcName="SecondUserName"
            label="کاربر مقصد"
            label-width="82px"
          />
        </FormControl>
        <div>
          <btn-search label="جستجو" class="q-mr-sm" @click="search" />
          <btn-delete label="پاک کردن" @click="reset" />
        </div>
      </FormRow>
      <safa-grid
        v-model="ConvertHistoryList"
        cdcName="ConvertHistoryList"
        :suppressRowClickSelection="false"
        :allowMultipleSelection="false"
        fit
        height="100%"
        :columns="convertHistoryListColumns"
        m="r"
        max-height="100%"
        paginate
        @grid:ready="onGridReady"
      />
      <safa-popup v-model="showArchive" title="آرشیو کانورت">
        <UArchive v-model="archiveiData" />
      </safa-popup>
    </form-wrapper>
  </safa-form>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import UArchive from "./partials/UArchive"

export default {
  components: {
    UArchive
  },
  mixins: [baseFormMixin],
  data () {
    return {
      title: "تاریحچه کانورت",
      formKey: "FC286361-0BF4-472E-BC49-37E7280280D6",
      name: "UConvertHistory",
      main: true,
      result: null,
      showArchive: false,
      showArchiveTab: false,
      model: {
        ConvertUserName: null,
        FirstUserName: null,
        SecondUserName: null,
        FromConvertDate: null,
        ToConvertDate: null
      },
      conditionConvertDate: "",
      ConvertHistoryList: [],
      archiveiData: [],
      convertHistoryListColumns: [
        // {
        //   field: "isSelected",
        //   width: "42px",
        //   headerCheckboxSelection: true,
        //   checkboxSelection: true,
        //   align: "center",
        //   headerAlign: "center",
        //   pinned: "right",
        //   lockPosition: true,
        //   filter: false,
        //   filterable: false
        // },
        {
          field: "NidWorkItemConvertRequest",
          title: "شماره درخواست کانورت",
          width: "140px"
        },
        {
          field: "NidWorkItem",
          title: "شماره درخواست",
          width: "140px"
        },
        {
          field: "FirstUserName",
          title: "کاربر مبدا",
          width: "100px"
        },
        {
          field: "SecondUserName",
          title: "کاربر مقصد",
          width: "117px"
        },
        {
          field: "ConvertUserName",
          title: "کاربر کانورت",
          width: "100px"
        },
        {
          field: "ConvertDate",
          title: "تاریخ کانورت",
          width: "120px"
        },
        {
          field: "ConvertTime",
          title: "ساعت کانورت",
          width: "120px"
        },
        {
          field: "",
          title: "آرشیو",
          btnTitle: "آرشیو",
          editor: "action",
          width: "100px",
          btnColor: "primary",
          btnIcon: "folder_open",
          cellRenderer: "agCallbackBtn",
          callback: (params) => this.archiveHandler(params)
        }
      ]
    }
  },
  computed: {
    query () {
      const sql = [];
      // Like Op fields
      ["ConvertUserName", "FirstUserName", "SecondUserName"]
        .filter((field) => this.model[field] !== null)
        .forEach((field) => {
          sql.push(`(${field} LIKE N'%${this.model[field]}%')`)
        })
      // Dates fields
      if (
        this.model.FromConvertDate != null &&
        this.model.FromConvertDate !== ""
      ) {
        sql.push(`(ConvertDate >= N'${this.model.FromConvertDate}')`)
      }
      if (this.model.ToConvertDate != null && this.model.ToConvertDate !== "") {
        sql.push(`(ConvertDate <= N'${this.model.ToConvertDate}')`)
      }
      if (!sql.length) {
        return ""
      }
      // sql.push('**')
      return " WHERE " + (sql.length > 1 ? sql.join(" AND ") : sql.toString())
    },
    archiveConfig () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue("archiveCore")
    }
  },
  methods: {
    reset () {
      this.model = {}
    },
    onGridReady (params) {
      this.gridApi = params.api
    },

    archiveHandler (selectedItem) {
      this.archiveiData = selectedItem
      this.showArchive = true
    },
    search () {
      this.showLoading()
      this.$services.SX.getConvertHistory({
        pFromRow: 0,
        pToRow: 50,
        pWhere: this.query
      })
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.ConvertHistoryList =
              this.result.data.Sara8Sys_ConvertHistoryList.map((e) => {
                return {
                  ...e,
                  isSelected: false
                }
              })

            // this.result.data.Sara8Sys_ConvertHistoryList
            await this.log({
              action: this.logActions.view,
              bizCode: "",
              bizCodeTitle: "",
              saveDesc: `نمایش تاریحچه کانورت انجام گردید.`
            })
          }
        })
        .catch((error) => {
          console.error(error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
