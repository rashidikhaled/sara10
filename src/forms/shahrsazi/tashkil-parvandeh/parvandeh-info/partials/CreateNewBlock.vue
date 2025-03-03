<template>
  <form-wrapper>
    <safa-status :result="result" />
    <FormRow>
      <form-control>
        <nosazi-code-input
          v-model="NosaziCodeBlock"
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
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"
export default {
  name: "CreateNewBlock",
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
    NosaziCodeBlock () {
      debugger
      return {
        District: this.nosaziCodeTemplate.District,
        Region: this.nosaziCodeTemplate.Region,
        Block: this.nosaziCodeTemplate.Block,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
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
      console.log("payload******", {
        PNosaziCode: {
          ...this.NosaziCodeBlock,
          EumRevisitGroup: 0,
          EumNosaziCodeObjType: 1,
          EumNosaziCodeGroup: 0,
          EumBaseInfoGroup: 0,
          IsRoot: false,
          NidBase: "00000000-0000-0000-0000-000000000000",
          NidNosaziCode: "00000000-0000-0000-0000-000000000000",
          NidNosaziCodeParent: "00000000-0000-0000-0000-000000000000",
          NidRevisit: "00000000-0000-0000-0000-000000000000",
          Id: null,
          CI_City: 0,
          ParentId: null,
          UserName: this.getUserDisplayName(),
          NidUser: this.getNidUser()
        },
        PParentNosaziCode: null,
        PFillGap: true
      })
      this.$services.SC.saveNosaziCode(
        {
          PNosaziCode: {
            ...this.NosaziCodeBlock,
            EumRevisitGroup: 0,
            EumNosaziCodeObjType: 1,
            EumNosaziCodeGroup: 0,
            EumBaseInfoGroup: 0,
            IsRoot: false,
            NidBase: "00000000-0000-0000-0000-000000000000",
            NidNosaziCode: "00000000-0000-0000-0000-000000000000",
            NidNosaziCodeParent: "00000000-0000-0000-0000-000000000000",
            NidRevisit: "00000000-0000-0000-0000-000000000000",
            Id: null,
            CI_City: 0,
            ParentId: null,
            UserName: this.getUserDisplayName(),
            NidUser: this.getNidUser()
          },
          PParentNosaziCode: null,
          PFillGap: true
        },
        {
          config: {
            District: this.NosaziCodeBlock.District
          }
        }
      )
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.$emit("input", false)
            this.$emit("success", this.NosaziCodeBlock)

            const strNosaziCode = convertNosaziCodeObjectToString(
              this.NosaziCodeBlock
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
          console.error("save error..", response)
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
