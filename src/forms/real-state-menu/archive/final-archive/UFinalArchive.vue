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
        />
      </fit>
      <template #footer>
        <form-actions :showEditButton="false">
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
      title: "بایگانی موقت پرونده",
      formKey: "FB0FCB7D-4F98-4F9F-96FA-551F5F0A7546",
      name: "UFinalArchive",
      main: true,

      // Var
      ArchiveType: 0,
      optionsCombo: [{ ID: 0, title: "بایگانی موقت" }],
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

      // Res
      confirmObjRes: null
    }
  },
  created () {
    if (!this.selectedRequest) {
      this.showError("لطفا ابتدا ردیف مورد نظر را از کارتابل انتخاب کنید")
      this.hideSidebar(this.name)
      return
    }
    this.baseNosaziCode = convertStringToNosaziCodeObject(
      this.selectedRequest.BizCode
    )
  },
  methods: {
    confirmObj () {
      const payload = {
        PFinalArchiveMessage: {
          Comment: this.Comments,
          EumEventType: "5",
          EventType: "بایگانی موقت",
          NidProc: this.selectedRequest.NidProc,
          NidUser: this.getNidUser(),
          SysCI_RequestStatus: "1",
          UserName: this.currentUser.FullName
        }
      }

      this.showLoading()
      this.$services.ES.getFinalArchive(payload)
        .then(async ({ data }) => {
          this.confirmObjRes = this.getResponse(data)
          if (this.confirmObjRes.success) {
            this.showSuccess("عملیات با موفقیت انجام شد")
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidWorkItem,
              bizCodeTitle: "NidWorkItem",
              saveDesc: `انتقال به بایگانی موقت با NidWorkItem : ${this.selectedRequest.NidWorkItem} انجام شد.`
            })
            this.hideSidebar(this.name)
          }
        })

        .catch((e) => {
          console.error(e)
          this.serverError()
        })

        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
