<template>
  <form-wrapper>
    <safa-status :result="result" />
    <FormRow>
      <form-control>
        <nosazi-code-input
          v-model="NosaziCodeShop"
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
</template>

<script>
import loaderMixin from "src/mixins/loaderMixin"
import messageMixin from "src/mixins/messageMixin"
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"
export default {
  name: "CreateNewShop",
  mixins: [loaderMixin, messageMixin, baseFormMixin],
  props: {
    value: Boolean,
    nosaziCodeTemplate: Object,
    parent: Object,
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
    NosaziCodeShop () {
      return {
        District: this.nosaziCodeTemplate.District,
        Region: this.nosaziCodeTemplate.Region,
        Block: this.nosaziCodeTemplate.Block,
        House: this.nosaziCodeTemplate.House,
        Building: this.nosaziCodeTemplate.Building,
        Apartment: this.nosaziCodeTemplate.Apartment,
        Shop: this.nosaziCodeTemplate.Shop
      }
    }
  },

  data () {
    return {
      dialogStatus: false,
      result: null
    }
  },

  methods: {
    handleSaveAction () {
      this.showLoading()
      this.$services.SC.saveNosaziCode(
        {
          PParentNosaziCode: this.nosaziCodeTemplate,
          PNosaziCode: {
            ...this.NosaziCodeShop,
            EumNosaziCodeObjType: 6,
            UserName: this.getUserDisplayName(),
            NidUser: this.getNidUser()
          },
          PFillGap: true
        },
        {
          config: {
            District: this.NosaziCodeShop.District
          }
        }
      )
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.$emit("input", false)
            this.$emit("success", this.NosaziCodeShop)

            const strNosaziCode = convertNosaziCodeObjectToString(
              this.NosaziCodeShop
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
