<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ACE63A06-E835-457D-A1EA-3B477DD9E69B"
  >
    <form-wrapper :title="title" :padding="false">
      <template #header>
        <form-header-by-nosazi-code
          v-model="baseNosaziCode"
          @fetched="fetched"
        />
        <safa-status :result="result" />
      </template>

      <safa-datatable
        helper="baseCommitment"
        v-model="loadCommitment.Base_Commitment"
        :m="mode"
        class="fit"
        height="100%"
        max-height="100%"
        min-height="100%"
        margin="0"
        :bordered="false"
        title="تعهد و رضایت "
      />
      <template #footer>
        <form-actions
          :m="mode"
          @edit="isEditable = true"
          @save="handleSaveAction"
          @cancel="load"
          editSPId="caf41bc3-baa9-4472-9a63-8fdf120c7572"
          editFormId="9f304a89-c596-44f2-904b-2296b5a564c4"
        />

      </template>
    </form-wrapper>
  </safa-form>
</template>
<script>
import baseLibInNosaziCodeModel from "./models/baseLibInNosaziCode"
import loadCommitmentModel from "./models/loadCommitment"
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"
export default {
  route: "/commitment/by-nosazi-code",
  mixins: [baseFormMixin],
  data () {
    return {
      title: "تعهد و رضایت بر اساس کد نوسازی",
      formKey: "9f304a89-c596-44f2-904b-2296b5a564c4",
      name: "UCommitmentByNosaziCode",
      main: true,
      result: null,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      baseLibInNosaziCode: { ...baseLibInNosaziCodeModel },
      options: {
        CI_City: 0,
        EumRevisitGroup: 0,
        EumBaseInfoGroup: 0,
        EumNosaziCodeGroup: 0,
        IsRoot: false
      },
      loadCommitment: { ...loadCommitmentModel },
      nidNosaziCode: "",
      selectedRegion: 1,
      nidBase: ""
    }
  },

  methods: {
    fetched (val) {
      this.selectedRegion = val.MainObj.District
      this.nidNosaziCode = val.MainObj.NidNosaziCode
      this.nidBase = val.MainObj.NidBase
      this.load()
    },
    async load () {
      this.isEditable = false
      this.showLoading()
      try {
        let payLoad = {
          pNidNidNosaziCode: this.nidNosaziCode
        }
        const { data } = await this.$services.SC.loadCommitmentInNidNosaziCode(
          payLoad, { config: { District: this.selectedRegion } }
        )
        this.result = this.getResponse(data)
        if (!this.result.success || !this.result.data["Base_Commitment"]) {
          this.showError("اطلاعات بارگذاری نشد")
          return
        }
        this.loadCommitment = this.result.data
      } catch (e) {
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    normalizeBaseCommitment () {
      return this.loadCommitment.Base_Commitment.map((m) => {
        return {
          ...m,
          CI_Suggest: m.CI_Suggest || 0,
          CommitmentNo: m.CommitmentNo || null,
          OfficeNo: m.OfficeNo || null,
          CI_CommitmentType: m.CI_CommitmentType || 0
        }
      })
    },
    async handleSaveAction () {
      this.showLoading()
      try {
        this.loadCommitment.Base_Commitment = this.normalizeBaseCommitment()
        let payLoad = {
          pCommitment: {
            ...this.loadCommitment,
            NidBase: this.nidBase
          },
          pUser: this.currentUser
        }
        let response = await this.$services.SC.saveCommitment(payLoad, { config: { District: this.selectedRegion } })
        this.result = this.getResponse(response.data)
        if (!this.result.success) {
          this.showError("اطلاعات ذخیره نشد")
          return
        }
        this.isEditable = false
        const strNosaziCode = convertNosaziCodeObjectToString(
          this.baseNosaziCode
        )
        await this.log({
          action: this.logActions.save,
          bizCode: strNosaziCode,
          bizCodeTitle: "کد نوسازی",
          nosaziCode: this.strNosaziCode
        })
        this.showSuccess("اطلاعات باموفقیت ذخیره شد")
        this.load()
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
