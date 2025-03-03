<template>
  <safa-form :id="formKey" :caption="title" app-id="ACE63A06-E835-457D-A1EA-3B477DD9E69B">
    <form-wrapper title="ثبت و پیگیری پرونده نظارت آتش نشانی" vertical>
      <safa-status :result="saveResult" />
      <div class="row q-col-gutter-sm q-pb-sm">
        <safa-text
          v-model="loadPrequest.NidWorkItem"
          label="شماره درخواست"
          @keyup.enter="loadFireFightingLog"
          class="col-md-2"
        />
        <safa-combo
          v-model="selectedRegion"
          :options="regionItems"
          label="منطقه"
          source-type="local"
          class="col-md-2"
        >
        </safa-combo>
        <div class="col-1">
          <btn-search label="جستجو" @click="loadFireFightingLog" />
        </div>
      </div>
      <safa-datatable
        :hideHeader="true"
        v-model="items"
        helper="firePeygiri"
        height="100%"
        max-height="100%"
        min-height="100%"
        margin="0"
        title="پرونده ها"
      >
      </safa-datatable>
      <template v-slot:footer>
        <btn-default label="بررسی درخواست" @click="saveFireFighting" />
      </template>
    </form-wrapper>
  </safa-form>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import {
  convertStringToNosaziCodeObject
} from "src/utils/nosaziCodeOperation"

export default {
  route: "/parvande/fire-peygiri",
  mixins: [baseFormMixin],
  data () {
    return {
      title: "شهرسازی- ثبت و پیگیری پرونده نظارت آتش نشانی",
      formKey: "a69ac3c3-87b2-4fef-8154-f33b7108f46d",
      name: "UFirePeygiri",
      main: true,
      sidebarCompatible: true,
      loadPrequest: {
        NidWorkItem: ""
      },
      items: [],
      regionItems: [
        { ID: 1, Title: 1 },
        { ID: 2, Title: 2 },
        { ID: 3, Title: 3 },
        { ID: 4, Title: 4 },
        { ID: 5, Title: 5 },
        { ID: 6, Title: 6 },
        { ID: 7, Title: 7 },
        { ID: 8, Title: 8 },
        { ID: 9, Title: 9 },
        { ID: 10, Title: 10 },
        { ID: 11, Title: 11 },
        { ID: 12, Title: 12 }
      ],
      selectedRegion: 1,
      savePrequest: {
        NidWorkItem: "",
        pUser: {}
      },
      saveResult: null
    }
  },
  components: {},
  created () {
    if (this.selectedRequest) {
      this.loadPrequest.NidWorkItem = this.selectedRequest.NidWorkItem
      this.baseNosaziCode = convertStringToNosaziCodeObject(
        this.selectedRequest.BizCode
      )
      this.selectedRegion = convertStringToNosaziCodeObject(
        this.selectedRequest.BizCode
      ).District
      this.loadFireFightingLog()
    }
  },
  methods: {
    loadFireFightingLog () {
      if (this.loadPrequest.NidWorkItem !== "") {
        let payload = {
          NidWorkItem: this.loadPrequest.NidWorkItem
        }
        this.showLoading()
        // this.loadPrequest.NidWorkItem = this.loadPrequest.NidWorkItem;
        this.$services.SC.loadFireFightingLog(payload, {
          config: { District: this.selectedRegion }
        })
          .then(async (response) => {
            this.items = this.getResponse(response.data).data.FireFighting_Log
            await this.log({
              action: this.logActions.view,
              bizCode: this.loadPrequest.NidWorkItem.toString(),
              bizCodeTitle: "NidWorkItem"
            })
          })
          .catch((err) => {
            this.serverError()
            console.error(err)
          })
          .finally(() => {
            this.hideLoading()
          })
      }
    },
    saveFireFighting () {
      this.showSending()
      this.savePrequest.NidWorkItem = parseInt(this.loadPrequest.NidWorkItem)

      this.savePrequest.pUser = {
        JobLocationGuid: "00000000-0000-0000-0000-000000000000",
        UserGuid: this.getNidUser(),
        UserName: this.getUsername()
      }

      this.$services.SC.saveFireFighting(this.savePrequest, {
        config: { District: this.selectedRegion }
      })
        .then(async (response) => {
          this.saveResult = this.getResponse(response)

          if (response.data.ErrorResult.BizErrors.length === 0) {
            await this.log({
              action: this.logActions.save,
              bizCode: this.loadPrequest.NidWorkItem.toString(),
              bizCodeTitle: "NidWorkItem",
              nosaziCode: this.selectedRegion
            })

            this.showSuccess("عملیات با موفقیت انجام شد")
          }
        })
        .catch((err) => {
          this.serverError()
          console.error(err)
        })
        .finally(() => {
          this.hideSending()
        })
    }
  }
}
</script>
