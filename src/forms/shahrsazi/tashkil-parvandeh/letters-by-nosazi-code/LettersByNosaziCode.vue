<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
    <form-wrapper title="مکاتبات بر اساس کد نوسازی" :padding="false">
      <template #header>
        <form-header-by-nosazi-code
          v-model="baseNosaziCode"
          @fetched="fetched"
        />
        <safa-status :result="result" />
      </template>
      <safa-datatable
        helper="baseLetters"
        v-model="loadLetter.Base_Letter"
        :m="mode"
        height="100%"
        max-height="100%"
        min-height="100%"
        margin="0"
        :paginate="false"
        :bordered="false"
        title="مکاتبات براساس کد نوسازی"
      />
      <template v-slot:footer>
        <form-actions
          :m="mode"
          @edit="isEditable = true"
          @save="save"
          @cancel="load"
          editSPId="4851c722-f38d-4e61-9266-ea5deece939b"
          editFormId="b22add53-0ab0-4f16-8b85-9bdaa3a28d11"

        />

      </template>
    </form-wrapper>
  </safa-form>
</template>
<script>
import baseLibInNosaziCodeModel from "./models/baseLibInNosaziCode"
import loadLetterModel from "./models/loadLetter.js"
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"

export default {
  route: "/letters/by-nosazi-code",
  mixins: [baseFormMixin],
  data () {
    return {
      title: "مکاتبات بر اساس کد نوسازی",
      formKey: "b22add53-0ab0-4f16-8b85-9bdaa3a28d11",
      name: "LettersByNosaziCode",
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
      loadLetter: { ...loadLetterModel },
      selectedRegion: 1,
      nidNosaziCode: "00000000-0000-0000-0000-000000000000"
    }
  },

  computed: {
    // config () {
    //   return {
    //     config: {
    //       District: this.baseNosaziCode.District
    //     }
    //   }
    // }
  },
  mounted () {
    if (this.selectedRequest) {
      this.selectedRegion = this.selectedDistrict
      this.load()
    }
  },
  methods: {
    fetched (val) {
      this.selectedRegion = val.MainObj.District
      this.nidNosaziCode = val.MainObj.NidNosaziCode
      this.load()
    },
    async save () {
      this.showLoading()
      try {
        let data = {
          pLetter: this.loadLetter,
          pUser: this.currentUser
        }
        let response = await this.$services.SC.saveLetterInNidNosaziCode(data, {
          config: {
            District: this.selectedRegion
          }
        })
        this.result = this.getResponse(response.data)
        if (!this.result.success) {
          this.showError("اطلاعات ذخیره نشد")
          return
        }
        this.showSuccess("اطلاعات باموفقیت ذخیره شد")

        const strNosaziCode = convertNosaziCodeObjectToString(
          this.baseNosaziCode
        )

        await this.log({
          action: this.logActions.save,
          bizCode: strNosaziCode,
          bizCodeTitle: "کد نوسازی",
          nosaziCode: this.strNosaziCode
        })

        this.load()

        // end
      } catch (e) {
        this.showError("خطایی در سرویس رخ داد")
      } finally {
        this.hideLoading()
      }
    },
    async load () {
      this.isEditable = false
      try {
        this.showLoading()
        // Fetch letters
        let payload = {
          pNidNidNosaziCode: this.nidNosaziCode
        }
        const { data } = await this.$services.SC.loadLetterInNidNosaziCode(
          payload,
          {
            config: {
              District: this.selectedRegion
            }
          }
        )
        this.result = this.getResponse(data)
        if (!this.result.success || !this.result.data["Base_Letter"]) {
          this.showError("مکاتبات بارگذاری نشد")
          return
        }
        this.loadLetter = this.result.data

        const strNosaziCode = convertNosaziCodeObjectToString(
          this.baseNosaziCode
        )

        await this.log({
          action: this.logActions.view,
          bizCode: strNosaziCode,
          bizCodeTitle: "کد نوسازی",
          nosaziCode: this.strNosaziCode
        })

        // end
      } catch (e) {
        this.showError("خطایی در سرویس رخ داد")
      } finally {
        this.hideLoading()
      }
    }
  }
}
</script>
