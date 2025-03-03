<template>
  <FormWrapper :title="title">
    <template #header>
      <safa-status :result="backToSaraRes" />
      <form-header-by-nosazi-code
        v-model="baseNosaziCode"
        cdcName="baseNosaziCode"
        m="r"
        :actions="false"
      />
    </template>
    <fit>
      <FormRow>
        <FormControl>
          <safa-text
            label="شماره ارجاع"
            label-width="80px"
            v-model="nidWorkItem"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            label="درخواست"
            label-width="80px"
            v-model="sendType"
            source-type="local"
            :options="sendTypeOptions"
          />
        </FormControl>
      </FormRow>
    </fit>
    <template #footer>
      <form-actions :showEditButton="false">
        <template v-slot:after>
          <btn-default label="ارسال" @click="saveObj" />
          <btn-default label="انصراف" @click="cancelObj" />
        </template>
      </form-actions>
    </template>
  </FormWrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],

  data () {
    return {
      title: "ارسال به شهرسازی",
      formKey: "a8a0bb2a-8742-4246-8898-b5f982fb307b",
      name: "URequestSara",
      main: true,

      // #variables
      nidWorkItem: "",
      sendType: 0,
      sendTypeOptions: [
        { ID: 0, Title: "ارسال به شهرسازی" },
        { ID: 1, Title: "عودت" },
        { ID: 2, Title: "بایگانی موقت" }
      ],
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
      backToSaraRes: null
    }
  },
  created () {
    if (this.isSelectedRequest()) {
      this.nidWorkItem = this.selectedRequest.NidWorkItem
    } else this.cancelObj()
  },
  methods: {
    async saveObj () {
      try {
        const payload = {
          pRequest: {
            IsConfirm: false,
            IsRefreshOnly: false,
            IsSendToSaraRequest: true,
            NidProc: this.selectedRequest.NidProc,
            SysCI_RequestStatus: 0,
            UserGUID: this.getNidUser(),
            UserName: this.getUserDisplayName()
          }
        }
        switch (this.sendType) {
          case 0: // ارسال به شهرسازی
            payload.pRequest.SysCI_RequestStatus = 1
            break
          case 1: // عودت به منطقه
            payload.pRequest.SysCI_RequestStatus = 5
            break
          case 2: // بایگانی موقت
            payload.pRequest.SysCI_RequestStatus = 1
            payload.pRequest.IsSendToSaraRequest = false
            break
        }
        this.showLoading()
        const { data } = await this.$services.engineers.BackToSara(payload)
        this.backToSaraRes = this.getResponse(data)
        if (this.backToSaraRes.success) {
          await this.log({
            action: this.logActions.send,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.BizCode,
            nidWorkItem: this.nidWorkItem
          })
          this.showSuccess("درخواست مورد نظر فعال شد")
          this.cancelObj()
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    cancelObj () {
      this.hideSidebar(this.name)
    }
  }
}
</script>
