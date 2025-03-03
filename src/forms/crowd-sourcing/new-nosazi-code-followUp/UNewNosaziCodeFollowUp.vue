<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
    <form-wrapper :title="title" vertical>
      <template #header>
        <safa-status :result="result" />
      </template>
      <fit>
        <div class="row q-gutter-sm">
          <nosazi-code-input
            cdcName="fromNosaziCode"
            label="پیگیری کد نوسازی جدید"
            label-width="120px"
            v-model="newNosaziCode"
            @enter="getBaseLibInNosaziCode"
          >
          </nosazi-code-input>
          <div class="col-auto">
            <btn-search @click="search" />
          </div>
        </div>
        <div class="q-mt-sm">
          <safa-text
            type="textarea"
            label="شماره پرونده"
            class="col-12"
            m="r"
            v-model="nidWorkItem"
            label-width="120px"
          />
        </div>
      </fit>
    </form-wrapper>
  </safa-form>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "پیگیری کد نوسازی جدید",
      formKey: "61982e1a-6c1a-467f-8d1f-1202ae71858b",
      name: "UNewNosaziCodeFollowUp",
      main: true,
      result: null,
      newNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      nidWorkItem: ""
    }
  },

  methods: {
    search () {
      this.showLoading()
      const payload = {
        pNewNosaziCode: convertNosaziCodeObjectToString(this.newNosaziCode)
      }

      this.$services.SC.getShRequestInfoByNewNosaziCode(payload)
        .then(async ({ data }) => {
          this.result = this.getResponse(data)

          if (this.result.success) {
            this.nidWorkItem = this.result.data.Sh_RequestInfo.NidWorkItem

            await this.log({
              action: this.logActions.view,
              bizCode: payload.pNewNosaziCode,
              bizCodeTitle: "pNewNosaziCode",
              nosaziCode: payload.pNewNosaziCode,
              nidWorkItem: this.nidWorkItem ?? '',
              saveDesc: `نمایش پیگیری کد نوسازی جدید برای کد ${payload.pNewNosaziCode} انجام گردید.`
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
    },
    getBaseLibInNosaziCode () {
      this.ownerName = ""
      this.oldNosaziCode = ""
      let data = {
        pNosaziCode: {
          Apartment: this.newNosaziCode.Apartment,
          Block: this.newNosaziCode.Block,
          Building: this.newNosaziCode.Building,
          CI_City: 0,
          District: this.newNosaziCode.District,
          EumBaseInfoGroup: 0,
          EumNosaziCodeGroup: 0,
          EumNosaziCodeObjType: 0,
          EumRevisitGroup: 0,
          House: this.newNosaziCode.House,
          IsRoot: "false",
          NidBase: "00000000-0000-0000-0000-000000000000",
          NidNosaziCode: "00000000-0000-0000-0000-000000000000",
          Region: this.newNosaziCode.Region,
          Shop: this.newNosaziCode.Shop
        },
        pLoadFunc:
          "Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str,Base_PreCodeInfo",
        pIsLoadDeletedNosaziCode: false
      }
      this.showLoading()
      this.$services.SA.getBaseLibInNosaziCode(data)
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
        })
        .catch((response) => {
          this.workflowListResult = this.getResponse(response)
          console.log("error", response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
      this.isEditable = true
      this.isSearch = true
    }
  }
}
</script>
