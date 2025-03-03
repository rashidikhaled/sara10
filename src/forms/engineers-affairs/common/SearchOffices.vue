<template>
  <form-wrapper :title="`${title} - لیست دفاتر`" :padding="false">
    <template>
      <safa-status :result="getOrganOfficeListRes" />
    </template>
    <safa-datatable
      title="لیست دفاتر"
      v-model="organOfficeList"
      cdcName="EngOrgan_OfficeInfoList"
      helper="officeList"
      :show-selected-checkbox="true"
      :allowMultipleSelection="false"
      :addRow="false"
      :deleteRow="false"
      :allowCopy="false"
      @dbclick="dbClick"
      @rowclick="rowClick"
    />
    <template v-slot:footer>
      <form-actions
        :m="mode"
        :showEditButton="true"
        :showNewButton="true"
        @save="saveData"
        @edit="editData"
        @newInfo="newData"
        @cancel="isEditable = false"
      >
        <btn-default label="انتخاب" @click="selectButton" />
      </form-actions>
    </template>

    <safa-popup
      v-model="isShowModal"
      :show="isShowModal"
      @hide="isShowModal = false"
      title="دفتر نظام مهندسی"
      width="900px"
      height="600px"
    >
      <engineer-organ-office
        @hide="isShowModal = false"
        :title="title"
        :formKey="formKey"
        :m="mode"
      />
    </safa-popup>
  </form-wrapper>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import EngineerOrganOffice from "./EngineerOrganOffice.vue"

export default {
  mixins: [baseFormMixin],
  components: { EngineerOrganOffice },
  props: {
    m: String,
    formKey: String,
    title: String
  },
  data () {
    return {
      name: "SearchOffices",
      selectedRow: null,
      isShowModal: false,
      getOrganOfficeListRes: null,
      organOfficeList: []
    }
  },
  mounted () {
    this.loadObj()
  },
  methods: {
    loadObj () {
      this.showLoading()
      this.$services.engineers
        .getEngOrganOfficeInfoList({ pRequest: {} })
        .then(({ data }) => {
          this.getOrganOfficeListRes = this.getResponse(data)
          if (this.getOrganOfficeListRes.success) {
            this.organOfficeList =
              this.getOrganOfficeListRes.data
                ?.GetEngOrgan_OfficeInfoListResult ?? []
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
    newData () {
      this.isShowModal = true
    },
    editData () {
      this.showError("لطفا ردیف مورد نظر را انتخاب نمایید")
    },
    selectButton () {
      if (this.selectedRow === null) {
        return this.showError("لطفا ردیف مورد نظر را انتخاب نمایید")
      }
      this.$emit("selectedOffice", this.selectedRow)
    },
    rowClick (e) {
      this.selectedRow = e.row
    },
    dbClick (e) {
      this.$emit("selectedOffice", e.row)
    }
  }
}
</script>
