<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="90BBA2FE-5569-45B3-9A7B-EB92B3B19CA1"
  >
    <form-wrapper :title="title" vertical>
      <template #header>
        <safa-status :result="result" />
      </template>
      <fit>
        <div class="row q-mb-sm">
          <safa-checkbox
            label="اینجانب متقاضی ثبت نام در لیست ارجاع پویا نظارت می باشم"
            v-model="model.EngDutySelfDeclaration.IsConfirm"
          />
        </div>
        <safa-splitter v-model="gridSplitter" horizontal>
          <template #before>
            <fit v-if="isShowConfirm">
              <safa-datatable
                helper="WorkingRegions"
                fit
                paginate
                min-height="150px"
                height="100%"
                max-height="100%"
                :show-selected-checkbox="false"
                :allowMultipleSelection="false"
                title="مناطق کاری"
                v-model="model.ListEngOtherDataTemp"
                m="e"
              />
            </fit>
          </template>
          <template #after>
            <fit>
              <safa-datatable
                helper="BildingType"
                fit
                paginate
                min-height="150px"
                height="100%"
                max-height="100%"
                :show-selected-checkbox="false"
                :allowMultipleSelection="true"
                v-model="model.ListEngDutyBuildingGroup"
                m="e"
              />
            </fit>
          </template>
        </safa-splitter>
      </fit>
      <template v-slot:footer>
        <btn-save @click="saveData" />
      </template>
    </form-wrapper>
  </safa-form>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "خود اظهاری ارجاع پویا",
      formKey: "78EBEA4F-ABB8-4ACA-A18B-1BDFAD400FCF",
      name: "UEngineerDutySelfDeclaration",
      main: true,
      gridSplitter: 50,
      model: {
        EngDutySelfDeclaration: {
          IsConfirm: false
        },
        ListEngOtherDataTemp: [],
        ListEngDutyBuildingGroup: []
      },
      result: null,
      isShowConfirm: true
    }
  },

  created () {
    this.loadObj()
  },

  methods: {
    loadObj () {
      this.showLoading()
      const payload = {
        pNidEng: this.getNidUser()
        // pNidEng: "06191d4d-8d9d-44fc-9fe8-0756e0cfd984",
      }
      this.$services.eng
        .getEngDutySelfDeclaration(payload)
        .then(({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.model = this.result.data.GetEng_DutySelfDeclarationResult
          }
        })
        .catch((error) => {
          console.error(error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    saveData () {
      if (
        this.model.EngDutySelfDeclaration.IsConfirm === false ||
        this.model.EngDutySelfDeclaration.IsConfirm === null
      ) {
        this.showConfirm("آیا از ارجاع پویا انصراف می دهید").onOk(() => {
          this.model.EngDutySelfDeclaration.IsConfirm = false
          this.saveObj()
          this.hideSidebar("UEngineerDutySelfDeclaration")
        })
      } else {
        this.model.EngDutySelfDeclaration.IsConfirm = true
        this.saveObj()
        this.hideSidebar("UEngineerDutySelfDeclaration")
      }
    },

    saveObj () {
      this.showLoading()
      this.model.ListEngOtherDataTemp = this.normalizeListEngOtherDataTemp()
      const payload = {
        pClsEngineerDutySelfDeclaration: {
          ...this.model
        }
      }
      this.$services.eng
        .saveEngDutySelfDeclaration(payload)
        .then(({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.showSuccess("ذخیره با موفقیت انجام شد.")
          }
        })
        .catch((error) => {
          console.error(error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    normalizeListEngOtherDataTemp () {
      return this.model.ListEngOtherDataTemp.map((m) => {
        return {
          ...m,
          IsUpdate: m.IsUpdate || false
        }
      })
    }
  },
  watch: {
    "model.EngDutySelfDeclaration.IsConfirm" () {
      if (this.model.EngDutySelfDeclaration.IsConfirm === true) {
        this.isShowConfirm = true
      } else {
        this.isShowConfirm = false
      }
    }
  }
}
</script>
