<template>
  <safa-form
    appId="90BBA2FE-5569-45B3-9A7B-EB92B3B19CA1"
    :id="formKey"
    :caption="title"
  >
    <form-wrapper :title="title" vertical>
      <template #header>
        <safa-status :result="getBarokafCommitmentRes" />
        <safa-status :result="saveBarokafCommitmentRes" />
      </template>

      <fit>
        <FormRow :md="3" :lg="3" :xl="3">
          <FormControl>
            <safa-text
              v-model="dataContext.Fil_Info.CodeString"
              label="کد نوسازی :"
              label-width="125px"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-text
              v-model="dataContext.Fil_Info.NidWorkItem"
              label="کد ارجاع :"
              label-width="125px"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-text
              v-model="dataContext.Fil_Info.infrastructure"
              label="مساحت کل زیربنا :"
              label-width="125px"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-text
              v-model="dataContext.Fil_Owner.FullName"
              label="نام مالک :"
              label-width="125px"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-text
              v-model="dataContext.Fil_Info.RegisterPlack"
              label="شماره پلاک ثبتی :"
              label-width="125px"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-text
              v-model="dataContext.Fil_Info.Floor"
              label="تعداد طبقات :"
              label-width="125px"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-text
              v-model="dataContext.Fil_Info.District"
              label="شهرداری منطقه :"
              label-width="125px"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-text
              v-model="dataContext.Fil_Info.ExportLicenseNo"
              label="شماره پروانه ساختمانی :"
              label-width="125px"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-text
              v-model="dataContext.Fil_Info.Floor"
              label="تاریخ بازدید مهندس ناظر :"
              label-width="125px"
              m="r"
            />
          </FormControl>
          <FormControl class="col-8">
            <safa-text
              v-model="dataContext.Fil_Info.Address"
              label="آدرس :"
              label-width="125px"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-text
              v-model="dataContext.Fil_Info.Floor"
              label="تاریخ صدور پروانه ساختمان :"
              label-width="125px"
              m="r"
            />
          </FormControl>
        </FormRow>
      </fit>

      <template v-slot:footer>
        <form-actions :showEditButton="false">
          <template v-slot:after>
            <btn-default label="تأیید" @click="btnConfirmClick" />
            <btn-default label="گزارش" />
          </template>
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import kartableReferencesMixin from "../mixins/kartableReferencesMixin"
// import PersianDate from "persian-date"
// import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"

export default {
  mixins: [baseFormMixin, kartableReferencesMixin],

  data () {
    return {
      name: "UBarokafCommitment",
      formKey: "885E26CF-13E2-42B9-961E-F7B3238D8E69",
      title: "تعهدات بروکف",
      main: true,

      // DataContext
      dataContext: {
        Fil_Info: {
          CodeString: "",
          NidWorkItem: "",
          infrastructure: 0,
          RegisterPlack: 0,
          Floor: 0,
          District: 0,
          ExportLicenseNo: 0
        },
        Fil_Owner: {
          FullName: "",
          Address: ""

        }
      },

      // Responses
      getBarokafCommitmentRes: null,
      saveBarokafCommitmentRes: null
    }
  },

  computed: {},

  methods: {
    loadObj () {
      this.showLoading()
      const payload = {
        pNidFil: this.selectedExecRep.NIdFil,
        pNidUser: this.getNidUser(),
        pUserName: this.getUserDisplayName()
      }

      this.$services.engineers
        .getBarokafCommitment(payload)
        .then(({ data }) => {
          this.getBarokafCommitmentRes = this.getResponse(data)

          if (this.getBarokafCommitmentRes.success) {
            this.dataContext =
              this.getBarokafCommitmentRes.data.GetBarokafCommitmentResult.ClsBarokafCommitment
          }
        })
        .catch((error) => {
          console.error(error)
          this.hideLoading()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    btnConfirmClick () {
      this.showLoading()

      const payload = {
        pClsBarokafCommitment: {
          ...this.dataContext,
          _UserName: this.getUserDisplayName(),
          _NidUser: this.getNidUser()
        }
      }

      this.$services.engineers
        .saveBarokafCommitment(payload)
        .then(({ data }) => {
          this.saveBarokafCommitmentRes = this.getResponse(data)

          if (this.saveBarokafCommitmentRes.success) {
            this.showSuccess("با موفقیت تأیید گردید")
          }
        })
        .catch((error) => {
          console.error(error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  },

  async created () {
    if (await this.canOpenWindow()) this.loadObj()
  }
}
</script>
