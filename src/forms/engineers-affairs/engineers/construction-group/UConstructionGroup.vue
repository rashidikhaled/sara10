<template>
  <safa-form :id="formKey" :caption="title" app-id="92404D00-D287-4A09-9596-29FCC9BC9DB9">
    <form-wrapper :title="title" vertical>
      <template #header>
        <safa-status :result="resLoadObj" />
        <safa-status :result="resSaveObj" />
        <safa-status :result="response" />
      </template>
      <fit>
        <div class="q-col-gutter-sm q-mb-sm">
          <engineer-info-box
            label="کد مهندس"
            labelWidth="70px"
            v-model="identityCode"
            @fetched="fetched"
            class="col-12 col-md-4"
          />
          <safa-checkbox
            class="col-12"
            v-model="model.EngDutySelfDeclaration.IsConfirm"
            label="این مهندس، متقاضی ثبت نام در لیست ارجاع پویا نظارت می باشد."
            :m="showFooter && isEditable ? 'e' : 'r'"
          />
        </div>
        <safa-grid
          v-if="model.EngDutySelfDeclaration.IsConfirm"
          title="مناطق کاری"
          :columns="listEngDutyBuildingGroupColumns"
          v-model="model.ListEngDutyBuildingGroup"
          m="r"
          fit
          height="100%"
          max-height="100%"
          min-height="250px"
          :show-selected-checkbox="false"
          :allowMultipleSelection="false"
          :addRow="false"
          :deleteRow="false"
          :allowCopy="false"
          :selectable="false"
          class="q-mb-sm"
        />
        <safa-grid
          helper="constructionGroupColumns"
          v-model="constructionGroup"
          m="r"
          title="لیست گروه های ساختمانی"
          height="100%"
          max-height="100%"
          min-height="200px"
          :show-selected-checkbox="false"
          :allowMultipleSelection="false"
          :addRow="false"
          :deleteRow="false"
          :allowCopy="false"
          :selectable="false"
        />
      </fit>
      <template v-slot:footer v-if="showFooter">
        <form-actions
          :m="mode"
          @edit="isEditable = true"
          @save="saveDataHandler"
          @cancel="isEditable = false"
        />
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  props: {},
  data () {
    return {
      title: "گروه ساختمانی",
      formKey: "cc44608b-3e80-4ac8-91b1-2c37ed6a0dc1",
      name: "UConstructionGroup",
      main: true,
      showFooter: false,
      identityCode: null,
      constructionGroup: [],
      resLoadObj: null,
      resSaveObj: null,
      response: null,
      defaultConstructionGroup: [
        {
          ConstructionGroupName: "الف",
          FromArea: "1",
          ToArea: "600",
          FromCeiling: "1",
          ToCeiling: "2"
        },
        {
          ConstructionGroupName: "ب",
          FromArea: "601",
          ToArea: "2000",
          FromCeiling: "3",
          ToCeiling: "5"
        },
        {
          ConstructionGroupName: "ج",
          FromArea: "2001",
          ToArea: "5000",
          FromCeiling: "6",
          ToCeiling: "10"
        },
        {
          ConstructionGroupName: "د",
          FromArea: "5001",
          ToArea: "بیش از 5001 متر",
          FromCeiling: "11",
          ToCeiling: "بیش از 11 سقف"
        }
      ],
      listEngDutyBuildingGroupColumns: [
        { field: "", title: "عنوان", width: "100px" },
        { field: "", title: "مقدار", width: "100px" }
      ],
      model: {
        EngDutySelfDeclaration: {
          IsActive: false,
          IsConfirm: false,
          NidEng: null,
          NidEng_DutySelfDeclaration: null
        },
        IdentityCode: null,
        ListEngDutyBuildingGroup: [],
        ListEngOtherDataTemp: [],
        NidEng: null
      }
    }
  },
  methods: {
    fetched (val) {
      this.getRefToEng()
      this.loadObj()
    },

    async getRefToEng () {
      this.showLoading()
      let payLoad = {
        Prequest: {
          EngineerCode: this.identityCode
        }
      }
      await this.$services.engineers
        .GetRefToEngineerWithEngCode(payLoad)
        .then(({ data }) => {
          const response = this.getResponse(data)
          if (response.success) {
          }
        })
        .catch((e) => {
          console.error(e)
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    async loadObj () {
      this.showLoading()
      let payLoad = {
        pIdentyCode: this.identityCode
      }
      await this.$services.engineers
        .getEngDutySelfDeclarationByIdentityCode(payLoad)
        .then(async ({ data }) => {
          this.resLoadObj = this.getResponse(data)
          if (this.resLoadObj.success) {
            this.model =
              this.resLoadObj.data.GetEng_DutySelfDeclarationByIdentityCodeResult
            this.constructionGroup = this.defaultConstructionGroup
            this.showFooter = true
            await this.log({
              action: this.logActions.view,
              bizCode: this.identityCode,
              bizCodeTitle: "کد مهندس"
            })
          }
        })
        .catch((e) => {
          console.error(e)
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    saveDataHandler () {
      if (!this.model.EngDutySelfDeclaration.IsConfirm) {
        this.showConfirm("آیا از ارجاع پویا انصراف می دهید؟").onOk(() =>
          this.saveData()
        )
      } else {
        this.saveData()
      }
    },

    async saveData () {
      this.showLoading()
      let payLoad = {
        pClsEngineerDutySelfDeclaration: this.model
      }
      await this.$services.engineers
        .saveEngDutySelfDeclaration(payLoad)
        .then(async ({ data }) => {
          this.resSaveObj = this.getResponse(data)
          if (this.resSaveObj.success) {
            this.showSuccess("عملیات با موفقیت انجام گردید.")
            await this.log({
              action: this.logActions.save,
              bizCode: this.identityCode,
              bizCodeTitle: "کد مهندس"
            })
            this.isEditable = false
          }
        })
        .catch((e) => {
          console.error(e)
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
