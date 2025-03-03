<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="badbf938-ee27-414f-8df4-6fa440f8fa70"
  >
  <form-wrapper :title="title">
    <fit>
      <FormRow>
        <FormControl>
          <safa-text
            label="شماره رای"
            label-width="73px"
            v-model="VoteNo"
            cdcName="VoteNo"
            @keypress.enter="search"
            required
            validation="required"
          />
        </FormControl>
        <FormControl>
          <btn-search label="جستجو" @click="search" />
        </FormControl>
      </FormRow>
      <q-separator class="q-my-sm" />
      <FormRow class="q-mb-sm">
        <FormControl>
          <safa-text
            label="شماره دبیرخانه"
            label-width="73px"
            v-model="model.Commission_Info.SecretariatNo"
            cdcName="SecretariatNo"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="شماره ارجاع"
            label-width="73px"
            v-model="model.Commission_Info.UrbanNidKartablItem"
            cdcName="UrbanNidKartablItem"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="نام مالک"
            label-width="73px"
            v-model="model.Commission_Info.OwnerName"
            cdcName="OwnerName"
            m="r"
          />
        </FormControl>
      </FormRow>
      <text-template
        label="آدرس"
        label-width="73px"
        v-model="model.Commission_Info.Address"
        cdcName="Address"
        fit
        m="r"
      />
    </fit>
    <template #footer>
      <form-actions :m="mode" :showEditButton="false" :showNewButton="false">
        <template v-slot:after>
          <btn-save label="ثبت احکام" @click="saveData" />
        </template>
      </form-actions>
    </template>
  </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],

  data () {
    return {
      title: "ثبت احکام",
      name: "USaveRulings",
      formKey: "0cff0f6a-d411-404f-8ca7-7d5cd807711e",
      main: true,
      model: {
        Commission_Info: {
          SecretariatNo: 0,
          UrbanNidKartablItem: 0,
          OwnerName: "",
          Address: ""
        },
        Commission_Vote: []
      },
      VoteNo: 0
    }
  },

  methods: {
    search () {
      if (this.VoteNo === 0) {
        return this.showError("لطفا شماره رای را وارد نمایید.")
      }
      this.showLoading()
      const payload = {
        pVoteNo: this.VoteNo
      }
      this.$services.commissionsSrv
        .getCommissionInfo(payload)
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            this.model = res.data.GetCommission_InfoResult
            await this.log({
              action: this.logActions.view,
              bizCode: this.VoteNo,
              bizCodeTitle: "VoteNo",
              saveDesc: `بارگذاری اطلاعات فرم ${this.title} برای شماره رای ${this.VoteNo} انجام گردید.`
            })
          } else {
            this.showError(res.errors[0].text)
          }
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    saveData () {
      if (!this.isValidForm()) return
      if (this.VoteNo === 0) {
        return this.showError("لطفا شماره رای را وارد نمایید.")
      }
      this.showLoading()
      this.$services.commissionsSrv
        .saveRulings({ pRequest: this.model })
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            this.showSuccess("عملیات با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.save,
              bizCode: this.VoteNo,
              bizCodeTitle: "VoteNo",
              saveDesc: `ذخیره اطلاعات فرم ${this.title} برای شماره رای ${this.VoteNo} انجام گردید.`
            })
          } else {
            this.showError(res.errors[0].text)
          }
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
