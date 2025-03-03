<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="bea0de7d-9883-48e2-8a7b-9a30d8525255"
  >
    <form-wrapper hideTitle>
      <safa-status :result="confirmObjRes" />
      <fit>
        <form-row class="q-mb-sm">
          <form-control>
            <safa-combo
              source-type="local"
              v-model="ArchiveType"
              label-width="70px"
              label="نوع"
              ciName="ArchiveType"
              m="r"
              :options="optionsCombo"
            />
          </form-control>
          <form-control>
            <nosazi-code-input
              label="کد نوسازی"
              v-model="baseNosaziCode"
              cdcName="baseNosaziCode"
              label-width="65px"
              m="r"
            />
          </form-control>
        </form-row>
          <text-template
            label="توضیحات"
            label-width="70px"
            v-model="Comments"
            cdcName="Comments"
            fit
            class="q-my-sm"
          />
      </fit>
      <template #footer>
        <form-actions :m="mode" :showEditButton="false">
          <btn-save label="تایید" @click="confirmObj" />
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "بایگانی دائم پرونده",
      formKey: "DE48E77B-C9F6-4DB5-A65F-A9CC57849FF8",
      name: "UFinalArchive1",
      main: true,

      // Var
      ArchiveType: 0,
      optionsCombo: [{ ID: 0, title: "بایگانی دائم" }],
      Comments: "",
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },

      // respons
      confirmObjRes: null
    }
  },

  created () {
    if (this.selectedRequest) {
      this.baseNosaziCode = convertStringToNosaziCodeObject(
        this.selectedRequest.BizCode
      )
    } else {
      this.showError("لطفا ابتدا ردیف مورد نظر را از کارتابل انتخاب کنید")
      this.hideSidebar(this.name)
    }
  },
  methods: {
    async confirmObj () {
      if (
        !this.selectedRequest.TaskTitel.includes("بایگانی") &&
        !this.selectedRequest.TaskTitel.includes("بايگاني")
      ) {
        this.showError("پرونده در مرحله بایگانی نمی باشد")
        return
      }
      try {
        this.showLoading()
        const payload = {
          Comment: this.Comments,
          EumEventType: "3",
          EventType: "بایگانی دائم",
          NidProc: this.selectedRequest.NidProc,
          NidUser: this.getNidUser(),
          SysCI_RequestStatus: "2",
          UserName: this.getUserDisplayName()
        }
        const { data } = await this.$services.ES.getFinalArchive(payload)
        this.confirmObjRes = this.getResponse(data)
        if (this.confirmObjRes.success) {
          this.showSuccess("پرونده به بایگانی دائم انتقال پیدا کرد")
          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedRequest.NidWorkItem,
            bizCodeTitle: "NidWorkItem",
            saveDesc: `پرونده با NidWorkItem : ${this.selectedRequest.NidWorkItem} به بایگانی دائم انتقال پیدا کرد.`
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    }
  }
}
</script>
