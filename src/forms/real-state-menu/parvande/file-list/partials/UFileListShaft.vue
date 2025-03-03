<template>
  <fit>
    <safa-status :result="shaftInfoRes" />
    <safa-status :result="saveShaftInfoRes" />
    <safa-status :result="delShaftInfoRes" />

    <safa-tabs v-model="activeTab">
      <template v-slot:tabs>
        <tab-menu name="specifications" label="مشخصات" />
        <tab-menu name="location" label="موقعیت" />
      </template>
      <tab-content name="specifications">
        <fit>
          <UFileListShaftSpecifications
            v-model="dataContext"
            :form-key="formKey"
            :m="mode"
            @btnDeleteClick="btnDeleteClick"
          />
        </fit>
      </tab-content>
      <tab-content name="location">
        <fit>
          <UFileListShaftLocation
            v-model="dataContext"
            :form-key="formKey"
            :m="mode"
            @btnDeleteClick="btnDeleteClick"
          />
        </fit>
      </tab-content>
    </safa-tabs>
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

import UFileListShaftSpecifications from "./ufile-list-shaft-partials/UFileListShaftSpecifications.vue"
import UFileListShaftLocation from "./ufile-list-shaft-partials/UFileListShaftLocation.vue"

export default {
  mixins: [baseFormMixin],

  components: {
    UFileListShaftSpecifications,
    UFileListShaftLocation
  },

  props: {
    formKey: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      activeTab: "specifications",

      dataContext: {
        IsConfirmContractBuy: null,
        Shaft_Info: {},
        Shaft_Owner: [],
        _NIdRequest: null,
        _NIdShaft: null
      },

      shaftInfoRes: null,
      saveShaftInfoRes: null,
      delShaftInfoRes: null,
      nidProc: "00000000-0000-0000-0000-000000000000",
      nIdShaft: "00000000-0000-0000-0000-000000000000",

      // CF
      loadCompleted: null,
      SaveCompleted: null
    }
  },

  methods: {
    uShaft (pNIdProc) {
      this.nidProc = pNIdProc
      this.loadObj()
    },

    loadObj () {
      this.showLoading()

      const payload = {
        pNIdProc: this.nidProc
      }

      this.$services.ES.getShaftInfo(payload)
        .then(({ data }) => {
          this.shaftInfoRes = this.getResponse(data)

          if (this.shaftInfoRes.success) {
            this.dataContext = this.shaftInfoRes.data.GetShaft_InfoResult

            this.nIdShaft = this.shaftInfoRes.data.GetShaft_InfoResult.NIdShaft
            if (this.loadCompleted != null) {
              this.loadCompleted(true)
            }
          }
        })
        .catch((error) => {
          this.showError(error.message)
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    save () {
      if (this.dataContext.IsConfirmContractBuy) {
        this.hideLoading()
        this.showError("پس از تایید صلح نامه امکان تغییر اطلاعات نمی باشد")
        return false
      }

      this.showLoading()

      const payload = {
        PObj: {
          ...this.dataContext
        }
      }

      this.$services.ES.saveShaftInfo(payload)
        .then(({ data }) => {
          this.saveShaftInfoRes = this.getResponse(data)
          if (this.saveCompleted != null) {
            this.saveCompleted(this.saveShaftInfoRes.success)
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

    btnDeleteClick () {
      this.showConfirm("آیا اطلاعات موردنظر حذف شود؟").onOk(() => {
        this.showLoading()

        const payload = {
          pNIdProc: this.nidProc
        }

        this.$services.ES.delShaftInfo(payload)
          .then(({ data: args }) => {
            this.delShaftInfoRes = this.getResponse(args)

            if (this.delShaftInfoRes.success) {
              this.showSuccess("حذف اطلاعات باموفقیت انجام شد")
              this.loadObj()
            }
          })
          .catch((error) => {
            console.error(error)
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      })
    }
  }
}
</script>
