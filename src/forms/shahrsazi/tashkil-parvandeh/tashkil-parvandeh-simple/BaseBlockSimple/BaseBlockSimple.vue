<template>
  <div>
    <safa-status :result="result" />
    <safa-status :result="resultSave" />

    <safa-tabs v-model="currentTab">
      <template v-slot:tabs>
        <tab-menu
          v-for="{ name, title } in tabs"
          :key="name"
          :name="name"
          :label="title"
        />
      </template>
      <tab-content name="blockInfo" title="مشخصات بلوک">
        <tab-block-info v-model="currentData" v-bind="passedProps" />
      </tab-content>
      <tab-content name="comments" title="توضیحات">
        <tab-comment v-model="currentData" v-bind="passedProps" />
      </tab-content>
    </safa-tabs>

    <form-actions
      :m="mode"
      @edit="handleEdit"
      @save="handleSaveAction"
      @cancel="load"
    >
    </form-actions>
  </div>
</template>

<script>
import requestModel from "./models/requestModel"
import TabBlockInfo from "./partials/TabBlockInfo"
import TabComment from "./partials/TabComment"
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  name: "BaseBlockSimple",
  mixins: [baseFormMixin],
  components: {
    TabBlockInfo,
    TabComment
  },

  props: {
    value: Object,
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
    },
    selectedNosaziCode: String
  },

  data () {
    return {
      result: null,
      resultSave: null,
      currentTab: "blockInfo",
      isView: false,
      currentData: { ...requestModel },
      tabs: [
        {
          name: "blockInfo",
          title: "مشخصات بلوک"
        },
        {
          name: "comments",
          title: "توضیحات"
        }
      ]
    }
  },

  computed: {
    passedProps () {
      return { m: this.mode }
    }
  },

  methods: {
    handleSaveAction () {
      this.showSending()
      this.$services.SC.saveParvandehBlock(
        {
          PObj: this.currentData,
          pUser: this.currentUser,
          PDtoWorkflowData: {
            StateName: null,
            WorkflowGuid: "00000000-0000-0000-0000-000000000000"
          }
        },
        {
          config: {
            District: this.value.District
          }
        }
      )
        .then(async ({ data }) => {
          this.resultSave = this.getResponse(data)
          if (this.resultSave.success) {
            await this.log({
              action: this.logActions.save,
              bizCode: this.currentData._nidBase,
              bizCodeTitle: "NidBase",
              nosaziCode: this.value.nosaziCodeString
            })

            this.showSuccess("ذخیره با موفقیت انجام شد")
            this.load()
          } else {
            this.showError("انجام نشد")
          }
        })
        .catch((response) => {
          this.showError("ذخیره انجام نشد")
        })
        .finally(() => {
          this.hideLoading()
          this.isEditable = false
          this.$emit("changeEditMode", this.isEditable)
        })
    },
    handleEdit () {
      this.isEditable = true
      this.$emit("changeEditMode", this.isEditable)
    },
    load () {
      this.isEditable = false
      this.$emit("changeEditMode", this.isEditable)
      this.showLoading()

      return this.$services.SC.getParvandehBlock(
        {
          PNidBase: this.value.NidBase,
          PLoadFun:
            "Base_NosaziCode,Base_BlockInfo,Base_BlockOrganize,Base_BlockPath,Base_BlockPathConstant,Base_GreenSpace,MapImage"
        },
        {
          config: {
            District: this.value.District
          }
        }
      )
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.currentData = this.result.data
            if (!this.isView) {
              await this.log({
                action: this.logActions.view,
                bizCode: this.value.NidBase,
                bizCodeTitle: "NidBase",
                nosaziCode: this.value.nosaziCodeString
              })
            }
            this.isView = true
          }
        })
        .catch((data) => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  },
  created () {
    this.currentData = { ...requestModel }
  },
  mounted () {
    this.load()
  }
}
</script>
