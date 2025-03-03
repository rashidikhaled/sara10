<template>
 <safa-form :id="formKey" :caption="title" appId="20C96248-C0C2-4DA0-BB07-9480B0C95DCE">
  <form-wrapper title="اعضای دفتر" vertical>
  <template #header>
    <safa-status :result="res" />
  </template>
    <div class="row q-col-gutter-sm q-mb-sm items-center">
      <OfficeInfoBox
        v-model="officeCode"
        label-width="80px"
        @fetched="loadData"
      />
      <OfficeActoins
        v-model="officeCode"
        :disable="!officeCode"
        class="col"
      />
    </div>
    <safa-tabs v-model="activeTab" :padding="false" class="q-mb-sm">
      <template v-slot:tabs>
        <tab-menu name="activeMembers" label="اعضای فعال" />
        <tab-menu name="leftEngineers" label="لیست مهندسان خارج شده" />
      </template>
      <tab-content name="activeMembers">
        <ActiveMembers
          v-model="model.memOffices.MemOffices_Info"
          @selectedMember="selectedMember"
        />
      </tab-content>
      <tab-content name="leftEngineers">
        <ExitEngineer v-model="model.memOffices.ExitEngineerOfOffice" />
      </tab-content>
    </safa-tabs>
    <div class="row q-col-gutter-sm">
      <safa-text label="کد دفتر جدید" v-model="newOffice" />
      <div>
        <btn-default label="انتفال اعضاء به دفتر جدید" @click="changeOffice" />
      </div>
    </div>

    <template v-slot:footer>
      <form-actions
        :m="mode"
        showEditButton
        showNewButton
        @edit="editData"
        @newInfo="newData"
        @cancel="isEditable = false"
      >
        <btn-default label="چاپ اطلاعات" />
      </form-actions>
    </template>

    <safa-popup v-model="showOfficeMember" width="900px" height="600px">
      <OfficeMember
        v-model="engInfo"
        @saveEngineer="loadData"
        :result="model.memOffices"
      />
    </safa-popup>
  </form-wrapper>
 </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import ActiveMembers from "./partials/ActiveMembers.vue"
import ExitEngineer from "./partials/ExitEngineer.vue"
import OfficeMember from "./partials/OfficeMember.vue"

import PersianDate from "persian-date"

const defaultModel = {
  MemOffices_Info: [],
  ExitEngineerOfOffice: []
}

export default {
  components: { ActiveMembers, ExitEngineer, OfficeMember },
  mixins: [baseFormMixin],

  data () {
    return {
      title: "عضویت در دفتر",
      formKey: "4b9b76dd-4b9d-42f2-b72d-72b3b23ffd30",
      name: "UJoinInOffice",
      main: true,
      officeCode: null,
      engInfo: null,
      showOfficeMember: false,
      activeTab: "activeMembers",
      newOffice: "",
      model: {
        memOffices: {
          ...defaultModel
        }
      },
      res: null
    }
  },
  mounted () {
    if (this.value) {
      this.loadData()
    }
  },
  methods: {
    async loadData () {
      this.showLoading()
      let payLoad = {
        pRequest: {
          CI_RequestType: "0",
          CI_Years: "0",
          OfficeCode: this.officeCode
        }
      }
      await this.$services.engineers
        .getMemOffices(payLoad)
        .then(async response => {
          this.res = this.getResponse(response.data)
          if (this.res.success) {
            this.model.memOffices = this.res.data.GetMemOfficesResult

            if (this.model.memOffices.MemOffices_Info.length > 0) {
              this.model.memOffices.MemOffices_Info.map(member => {
                if (member.IsPresident) member.class = "bg-green-3"

                if (
                  member.JobAgreementExpireDate &&
                  member.JobAgreementExpireDate <
                    new PersianDate().toLocale("en").format("YYYY/MM/DD")
                ) { member.class = "bg-red-3" }
              })
            }

            await this.log({
              action: this.logActions.view,
              bizCode: this.officeCode,
              bizCodeTitle: "کد دفتر"
            })
          }
        })
        .catch(err => {
          this.serverError()
          console.error(err, "err_getMemOffices")
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    editData () {
      if (this.engInfo) {
        this.showOfficeMember = true
      } else {
        this.showError("لطفا از لیست اعضاء یک سطر را انتخاب نمایید.")
      }
    },

    newData () {
      this.engInfo = null
      this.showOfficeMember = true
    },

    selectedMember (value) {
      this.engInfo = value
    },

    changeOffice () {
      if (this.newOffice !== "") {
        this.showError("لطفا از لیست اعضاء یک سطر را انتخاب نمایید.")
      } else {
        this.showError("لطفا کد دفتر جدید را وارد نمایید.")
      }
    }
  }
}
</script>
<style></style>
