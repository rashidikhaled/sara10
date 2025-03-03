<template>
  <form-wrapper>
    <safa-status :result="result" />
    <FormRow>
      <form-control>
        <nosazi-code-input
          v-model="NosaziCodeHouse"
          label-width="80px"
          label="کد نوسازی"
        />
      </form-control>
    </FormRow>
    <template #footer>
      <div class="row q-gutter-x-sm">
        <btn-save @click="handleSaveAction" label="ذخیره" />
        <btn-cancel label="انصراف" @click="$emit('hide')" />
      </div>
    </template>
  </form-wrapper>
  <!-- </safa-popup> -->
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"
export default {
  name: "CreateNewHouse",
  mixins: [baseFormMixin],
  props: {
    value: Boolean,
    nosaziCodeTemplate: Object,
    formKey: {
      type: String,
      default: "",
      required: true
    },
    title: {
      type: String,
      default: "",
      required: true
    },
    name: {
      type: String,
      default: "",
      required: true
    }
  },
  computed: {
    NosaziCodeHouse () {
      return {
        District: this.nosaziCodeTemplate.District,
        Region: this.nosaziCodeTemplate.Region,
        Block: this.nosaziCodeTemplate.Block,
        House: this.nosaziCodeTemplate.House,
        Building: 0,
        Apartment: 0,
        Shop: 0
      }
    }
  },
  data () {
    return {
      dialogStatus: false,
      // nosaziCode: {},
      result: null
    }
  },

  methods: {
    handleSaveAction () {
      this.showLoading()
      this.$services.SC.saveNosaziCode(
        {
          PNosaziCode: {
            ...this.NosaziCodeHouse,
            // ...this.nosaziCode,
            EumNosaziCodeObjType: 2,
            UserName: this.getUserDisplayName(),
            NidUser: this.getNidUser()
          },
          PParentNosaziCode: null,
          PFillGap: true
        },
        {
          config: {
            District: this.NosaziCodeHouse.District
          }
        }
      )
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.$emit("input", false)
            this.$emit("success", this.NosaziCodeHouse)

            const strNosaziCode = convertNosaziCodeObjectToString(
              this.NosaziCodeHouse
            )

            await this.log({
              action: this.logActions.save,
              bizCode: strNosaziCode,
              bizCodeTitle: "کد نوسازی",
              nosaziCodeTemplate: strNosaziCode
            })

            this.showSuccess("عملیات باموفقیت انجام پذیرفت")
            this.$emit("hide")
          }
        })
        .catch((response) => {
          this.serverError()
          console.error("save error ...", response)
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
