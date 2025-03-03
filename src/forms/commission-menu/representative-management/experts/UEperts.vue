<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="badbf938-ee27-414f-8df4-6fa440f8fa70"
  >
  <form-wrapper :title="title">
    <fit>
      <form-row class="q-mb-sm">
        <form-control>
          <safa-combo
            :options="expertsOptions"
            label="کارشناسان"
            v-model="currentNidExpert"
            cdcName="currentNidExpert"
            label-width="75px"
            source-type="local"
          />
        </form-control>
        <form-control class="flex items-center">
          <safa-checkbox
            label="فعال/غیرفعال"
            v-model="model.expert.ExpertInfo.IsActive"
            cdcName="IsActive"
          />
        </form-control>
      </form-row>
      <form-row class="q-mb-sm">
        <form-control>
          <safa-text
            label="نام"
            label-width="75px"
            v-model="model.expert.ExpertInfo.FirstName"
            cdcName="FirstName"
          />
        </form-control>
        <form-control>
          <safa-text
            label="نام خانوادگی"
            label-width="75px"
            v-model="model.expert.ExpertInfo.LastName"
            cdcName="LastName"
          />
        </form-control>
        <form-control>
          <btn-default label="جدید" @click="reset" label-width="75px" />
        </form-control>
      </form-row>
      <safa-datatable
        helper="expertsColumns"
        v-model="model.expert.ExpertAbility"
        cdcName="ExpertAbility"
        fit
        height="100%"
        max-height="100%"
        min-height="200px"
        paginate
        :m="mode"
        :show-selected-checkbox="false"
        :allowMultipleSelection="false"
      />
    </fit>
    <template v-slot:footer>
      <form-actions
        :m="mode"
        @edit="isEditable = true"
        @save="saveData"
        @cancel="isEditable = false"
      >
        <template v-slot:after>
          <btn-delete label="حذف" @click="deleteData" />
          <btn-default label="گزارش" />
        </template>
      </form-actions>
    </template>
  </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
// import { uid } from "quasar";

const defaultModel = {
  ExpertAbility: [],
  CI_Ability: [],
  ExpertInfo: {
    FirstName: "",
    LastName: "",
    IsActive: false
  }
}

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "کارشناسان",
      name: "UEperts",
      formKey: "5fdebb31-ba1d-4af7-8ace-727c1786e862",
      main: true,
      model: { expert: { ...defaultModel } },
      currentData: [],
      expertsOptions: [],
      currentNidExpert: null
    }
  },

  mounted () {
    this.getAllExperts()
  },

  methods: {
    async getAllExperts () {
      try {
        this.showLoading()
        const { data } = await this.$services.commissions.getAllExperts()
        const res = this.getResponse(data)
        if (res.success) {
          if (
            res.data.GetAllExpertsResult.AllExpertInfos &&
            res.data.GetAllExpertsResult.AllExpertInfos.length > 0
          ) {
            this.expertsOptions =
              res.data.GetAllExpertsResult.AllExpertInfos.map(
                ({ NidExpert, FirstName = "---", LastName = "---" }) => {
                  return {
                    ID: NidExpert,
                    Title: `${FirstName + " " + LastName}`
                  }
                }
              )
            this.currentNidExpert = this.expertsOptions[0].ID
            await this.getExpert()
          }
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },

    async getExpert () {
      try {
        this.isEditable = false
        this.showLoading()
        const { data } = await this.$services.commissions.getExpert({
          pExpert: { NidExpert: this.currentNidExpert }
        })
        const res = this.getResponse(data)
        if (res.success) {
          this.model.expert = res.data.GetExpertResult
          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedNidCommission,
            bizCodeTitle: "NidCommission",
            saveDesc: `بارگذاری اطلاعات  ${this.title} انجام گردید.`
          })
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },

    saveData () {
      this.showLoading()
      const payload = {
        pExpert: { NidExpert: this.currentNidExpert, ...this.model.expert }
      }
      this.$services.commissions
        .saveExpert(payload)
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            this.showSuccess("عملیات با موفقیت انجام شد")
            await this.log({
              action: this.logActions.save,
              bizCode: "",
              bizCodeTitle: "",
              saveDesc: `ذخیره اطلاعات  ${this.title} انجام گردید.`
            })
            this.getAllExperts()
          }
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    deleteData () {
      this.showConfirm("آیا برای حذف اطمینان دارید؟").onOk(() => {
        const payload = {
          pNidExpert: this.currentNidExpert
        }
        this.$services.commissions
          .deleteExpert(payload)
          .then(async ({ data }) => {
            const res = this.getResponse(data)
            if (res.success) {
              this.showSuccess("عملیات با موفقیت انجام شد")
              await this.log({
                action: this.logActions.delete,
                bizCode: this.currentNidExpert,
                bizCodeTitle: "currentNidExpert",
                saveDesc: `عملیات حذف در ${this.title} انجام گردید.`
              })
              this.getAllExperts()
            }
          })
          .catch((error) => {
            console.error(error)
            this.hideSending()
            this.showError(error.message)
          })
      })
    },
    reset () {
      this.model.expert.ExpertInfo.FirstName = ""
      this.model.expert.ExpertInfo.LastName = ""
      this.model.expert.ExpertInfo.NidExpert =
        "00000000-0000-0000-0000-000000000000"
      this.model.expert.NidExpert = "00000000-0000-0000-0000-000000000000"
      this.model.expert.ExpertAbility = []
      this.currentNidExpert = "00000000-0000-0000-0000-000000000000"
    }
  },
  watch: {
    currentNidExpert () {
      if (this.currentNidExpert === "00000000-0000-0000-0000-000000000000") {
        return
      }
      this.getExpert()
    }
  }
}
</script>
