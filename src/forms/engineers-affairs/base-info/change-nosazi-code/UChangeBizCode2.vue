<template>
  <safa-form :id="formKey" :caption="title" appId="20C96248-C0C2-4DA0-BB07-9480B0C95DCE">
    <FormWrapper :title="title">
      <template #header>
        <safa-status :result="changeNosaziCodeRes" />
      </template>
      <fit className="q-gutter-y-sm">
        <nosazi-code-input
          label="کد نوسازی قدیم"
          label-width="95px"
          actions
          :m="mode"
          v-model="nosaziCodeBase"
        />
        <nosazi-code-input
          label="کد نوسازی جدید"
          label-width="95px"
          actions
          :m="mode"
          v-model="nosaziCodeDest"
        />
      </fit>
      <template #footer>
        <form-actions
          :m="mode"
          @edit="isEditable = true"
          @cancel="isEditable = false"
          @save="changeNosaziCode"
        />
      </template>
    </FormWrapper>
  </safa-form>
</template>

<script>
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],

  data () {
    return {
      title: "تغییر کد نوسازی",
      formKey: "f5fceebc-2a27-4f9f-8e90-c941c159945e",
      name: "UChangeNosaziCode",
      main: true,
      changeNosaziCodeRes: null,

      nosaziCodeBase: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },

      nosaziCodeDest: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },

      SECTION: [
        "District",
        "Region",
        "Block",
        "House",
        "Building",
        "Apartment",
        "Shop"
      ]
    }
  },

  mounted () {
    this.nosaziCodeBase = this?.selectedNosaziCode
  },

  methods: {
    convert (val) {
      const codeObj = {}
      if (val && typeof val === "string") {
        const split = val.split("-").map(Number)
        this.SECTION.forEach((part, i) => {
          codeObj[part] = split[i] || 0
        })
      } else if (val && typeof val === "object") {
        this.SECTION.forEach(part => {
          codeObj[part] = Number(val[part]) || 0
        })
      } else {
        this.SECTION.forEach(part => {
          codeObj[part] = 0
        })
      }
      return codeObj
    },

    isValidNosaziCode (code) {
      return !!(code?.District && code?.Region && code?.Block)
    },

    // change Nosazi Code Function
    changeNosaziCode () {
      this.nosaziCodeDest = this.convert(this.nosaziCodeDest)

      if (this.isValidNosaziCode(this.nosaziCodeDest)) {
        const payload = {
          pRequest: {
            ClsChangeNosaziCode: {
              NosaziCode_Base: convertNosaziCodeObjectToString(
                this.nosaziCodeBase
              ),
              NosaziCode_Dest: convertNosaziCodeObjectToString(
                this.nosaziCodeDest
              )
            }
          }
        }
        this.$services.engineers
          .changeNosaziCode(payload)
          .then(async ({ data }) => {
            this.changeNosaziCodeRes = this.getResponse(data)

            // success response
            await this.log({
              action: this.logActions.update,
              bizCode: convertNosaziCodeObjectToString(this.nosaziCodeDest),
              bizCodeTitle: "bizCode"
            })
            this.showSuccess("کد نوسازی با موفقیت تغییر یافت")
          })
          .catch(error => console.error(error.message))
      } else {
        this.showError("کد نوسازی جدید معتبر نمیباشد")
      }
    }
  }
}
</script>
