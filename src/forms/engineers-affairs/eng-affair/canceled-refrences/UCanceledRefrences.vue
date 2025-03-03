<template>
  <form-wrapper :title="title">
    <safa-status :result="loadObjRes" />
    <fit>
      <FormRow class="q-mb-sm">
        <FormControl>
          <safa-text
            label="کد عضویت"
            label-width="70px"
            v-model="model.canceledRef.pIdentityCode"
            cdcName="pIdentityCode"
            @keypress.enter="loadObj"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="نام"
            label-width="70px"
            v-model="model.canceledRef.pEngName"
            cdcName="pEngName"
            @keypress.enter="loadObj"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="نام خانوادگی"
            label-width="70px"
            v-model="model.canceledRef.pEngFamily"
            cdcName="pEngFamily"
            @keypress.enter="loadObj"
          />
        </FormControl>
        <nosazi-code-input
          label="کد نوسازی"
          label-width="60px"
          :actions="false"
          v-model="baseNosaziCode"
          cdcName="baseNosaziCode"
          @enter="loadObj"
        />
        <div class="q-gutter-sm">
          <btn-search @click="loadObj" />
          <btn-cancel label="پاک کردن" @click="clearFilter" />
        </div>
      </FormRow>
      <safa-datatable
        title="لیست ارجاعات انصراف داده شده"
        v-model="refEngineerCancelList"
        cdcName="refEngineerCancelList"
        helper="refEngineerCancelListColumns"
        :show-selected-checkbox="false"
        :allowMultipleSelection="false"
        :addRow="false"
        :deleteRow="false"
        :allowCopy="false"
        :selectable="false"
        :take="20"
        fit
        paginate
        hideHeader
      />
    </fit>
  </form-wrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"

const defaultModel = {
  pCodeString: "",
  pIdentityCode: "",
  pEngName: "",
  pEngFamily: "",
  pFromRow: 0,
  pToRow: 50
}
export default {
  mixins: [baseFormMixin],
  data () {
    return {
      name: "UCanceledRefrences",
      title: "ارجاعات انصراف داده شده",
      formKey: "995a28a0-5677-4243-996d-37aa9d920bfe",
      main: true,

      // #variables
      model: { canceledRef: { ...defaultModel } },
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },

      // #services
      refEngineerCancelList: null
    }
  },

  mounted () {
    this.loadObj()
  },

  methods: {
    async loadObj () {
      if (this.baseNosaziCode.District !== 0) {
        this.model.canceledRef.pCodeString = convertNosaziCodeObjectToString(
          this.baseNosaziCode
        )
      } else this.model.canceledRef.pCodeString = ""
      try {
        this.showLoading()
        const { data } =
          await this.$services.engineers.getRefEngineerCancelList(
            this.model.canceledRef
          )
        this.loadObjRes = this.getResponse(data)
        if (this.loadObjRes.success) {
          this.refEngineerCancelList =
            this.loadObjRes.data?.GetRefEngineerCancel_ListResult
              ?.RefEngineerCancel_List ?? []
          await this.log({
            action: this.logActions.view,
            bizCode: "",
            bizCodeTitle: ""
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    clearFilter () {
      this.baseNosaziCode = {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      }
      this.model.canceledRef = { ...defaultModel }
      this.loadObj()
    }
  }
}
</script>
