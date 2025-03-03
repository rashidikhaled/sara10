<template>
  <safa-form
    app-id="8460fd82-05d4-41b5-a2ea-686c140c8f1c"
    :id="formKey"
    :caption="title"
  >
    <form-wrapper title="خروج از لیست سیاه با کد ملی" vertical>
      <safa-status :result="exitBlacKListResult"/>
      <fit>
        <div class="row q-gutter-sm q-mb-sm">
          <safa-text
            v-model="value.NationalCode"
            :maxlength="10"
            cdcName="NationalCode"
            class="col-12 col-md-3 col-sm-5"
            dir="ltr"
            label="کد ملی"
            label-width="51px"
            mask="##########"

          ></safa-text>
          <safa-combo
            v-model="value.CI_BlackListCause"
            cdcName="BlackListCause"
            ciName="CI_BlackListCause"
            class="col-12 col-md-3 col-sm-5"
            domainName="CI_SaraM1"
            label="علت ورود"
            label-width="51px"
            m="r"
          ></safa-combo>
          <safa-combo-enum
            v-model="value.EumBlackListControl"
            cdcName="EumBlackListControl"
            class="col-12 col-md-3 col-sm-5"
            enum-name="EumBlackListControl"
            label="نوع کنترل"
            label-width="51px"
            m="r"
          />
        </div>
        <div>
          <text-template
            v-model="value.ExitComments"
            cdcName="ExitComments"
            class="fit"
            formKey="5C94C341-61FC-4674-AF03-13C74E959E8D"
            label="توضیحات"
            label-width="51px"
            margin="0"
            required
          validations="required"
            @keyup.enter="exit"
          />
        </div>
      </fit>
      <template v-slot:footer>
        <div class="row q-gutter-md">
          <btn-new
            label="خروج از لیست سیاه"
            @click="exit"
          ></btn-new>
        </div>
      </template>
    </form-wrapper>
  </safa-form>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data: function () {
    // ba313e63-0c45-42c8-b310-406f18fd12d4
    return {
      title: "خروج از لیست سیاه با کد ملی",
      formKey: 'ba313e63-0c45-42c8-b310-406f18fd12d4',
      name: "ExitBlackListBasedOnNationalCode",
      main: true,
      exitBlacKListResult: null,
      NidNosaziCode: "00000000-0000-0000-0000-000000000000"
    }
  },
  methods: {
    exit () {
      this.showLoading()
      let data = {
        pBlackListOwner: {
          CI_BlackListCause: this.value.CI_BlackListCause,
          Domain: null,
          EnterComments: this.value.EnterComments,
          EnterDate: this.value.EnterDate,
          EnterTime: this.value.EnterTime,
          EumBlackListControl: this.value.EumBlackListControl,
          EumBlackListStatus: this.value.EumBlackListStatus,
          EumOwnerCharacter: this.value.EumOwnerCharacter,
          ExitComments: this.value.ExitComments,
          ExitDate: this.value.ExitDate,
          ExitTime: this.value.ExitTime,
          FirstName: this.value.FirstName,
          LastName: this.value.LastName,
          NationalCode: this.value.NationalCode,
          NidBlack: "00000000-0000-0000-0000-000000000000",
          NidBlackOwner: "00000000-0000-0000-0000-000000000000",
          NidNosaziCode: this.value.NidNosaziCode,
          NidUserEnter: this.value.NidUserEnter,
          NidUserExit: this.getNidUser(),
          UserEnter: this.value.UserEnter,
          UserExit: this.getUserDisplayName()
        }
      }
      this.$services.SA.exitFromBlackListWithNationalCode(data, {
        config: { District: this.selectedDistrict }
      })
        .then(async ({ data }) => {
          this.exitBlacKListResult = this.getResponse(data)
          if (this.exitBlacKListResult.success) {
            this.showSuccess('خروج لیست سیاه با موفقیت انجام شد.')
            this.load()
            await this.log({
              action: this.logActions.view,
              bizCode: this.nidNosaziCode,
              bizCodeTitle: 'nidNosaziCode'
            })
          }
        })
        .catch((response) => {
          this.exitBlacKListResult = this.getResponse(response)
          this.showError(this.exitBlacKListResult.BizErrors.ErrorTitel)
          this.showError(' انجام نشد')
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
