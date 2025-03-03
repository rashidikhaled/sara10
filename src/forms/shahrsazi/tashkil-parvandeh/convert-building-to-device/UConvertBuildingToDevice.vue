<template>
  <safa-form
    app-id="ACE63A06-E835-457D-A1EA-3B477DD9E69B"
    :id="formKey"
    :caption="title"
  >
    <form-wrapper vertical :title="title">
      <template #header>
        <safa-status :result="getBaseLibRes" />
        <safa-status :result="getNosaziCodeTreeChildRes" />
        <safa-status :result="convertRes" />
      </template>
      <div class="row">
        <nosazi-code-input
          v-model="baseNosaziCode"
          cdcName="baseNosaziCode"
          label="کدنوسازی ساختمان"
          label-width="100px"
          @enter="loadObj"
        />
      </div>
      <q-separator class="q-my-sm" />
      <div class="custom-scroll">
        <q-toolbar
          :class="[
            'items-center q-px-sm q-py-xs',
            $q.dark.isActive ? 'bg-dark' : 'bg-grey-3',
          ]"
          style="min-height: 34px; border-radius: 3px"
        >
          <q-toolbar-title class="text-body2">ساختار درختی</q-toolbar-title>
          <div class="flex q-gutter-x-sm items-center">
            <safa-text
              v-model="treeFilter"
              dir="ltr"
              class="text-right"
              label="فیلتر"
              autocomplete="off"
            />
            <btn-default
              label="جمع کردن گره ها"
              @click="$refs.tree.collapseAll()"
            />
            <btn-default
              label="باز کردن گره ها"
              @click="$refs.tree.expandAll()"
            />
          </div>
        </q-toolbar>
        <q-tree
          :filter="treeFilter"
          ref="tree"
          default-expand-all
          selected-color="primary"
          node-key="nosaziCodeString"
          label-key="nosaziCodeString"
          :nodes="nosaziCodeTrees"
        />
      </div>
      <template v-slot:footer>
        <btn-default
          label="تبدیل"
          :disable="lockBtn"
          spId="c7328dff-7b10-4168-b0ef-ef2efed280d8"
          spCaption="ویرایش"
          @click="saveObj"
        />
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      name: "UConvertBuildingToDevice",
      title: "تبدیل ساختمان به دستگاه",
      formKey: "4d9d53de-da85-4ce2-be48-7cadf6ae6b7e",
      main: true,
      sidebarCompatible: true,

      getBaseLibRes: null,
      getNosaziCodeTreeChildRes: null,
      convertRes: null,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      treeFilter: "",
      nosaziCodeTrees: []
    }
  },
  methods: {
    async getBaseLibInNosaziCode () {
      if (this.baseNosaziCode.District === 0) {
        this.showError("منطقه صفر برای کدنوسازی وارد شده معتبر نمی باشد.")
        this.getBaseLibRes = null
        this.nosaziCodeTrees = []
        return
      }
      try {
        const { data } = await this.$services.SA.getBaseLibInNosaziCode(
          this.model,
          this.config
        )
        this.getBaseLibRes = this.getResponse(data)
      } catch (e) {
        console.error(e)
        this.serverError()
      }
    },

    async loadObj () {
      await this.getBaseLibInNosaziCode()
      if (!this.getBaseLibRes) return
      try {
        this.showLoading()
        const { data } = await this.$services.SA.getNosaziCodeTreeChild(
          this.model,
          this.config
        )
        this.getNosaziCodeTreeChildRes = this.getResponse(data)
        this.childTree = this.getNosaziCodeTreeChildRes.data["ChildTree"] || []
        const isValid = !!this.childTree.length
        if (isValid) {
          this.nosaziCodeTrees = this.createNosaziCodeTree(this.childTree)
          const strNosaziCode = convertNosaziCodeObjectToString(
            this.baseNosaziCode
          )
          await this.log({
            action: this.logActions.view,
            bizCode: strNosaziCode,
            bizCodeTitle: "کد نوسازی",
            nosaziCode: strNosaziCode
          })
        } else this.showError("کد نوسازی معتبر نمی باشد.")
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    saveObj () {
      this.showConfirm(
        "آیا از تبدیل کد نوسازی ساختمان به کد دستگاه اطمینان دارید؟"
      ).onOk(() => {
        this.showLoading()
        const payload = {
          pBuildingNosaziCode: this.getBaseLibRes?.data?.MainObj,
          pNewHouseSharingNosaziCode: null,
          UserInfo: this.currentUser,
          pIsCheckRequest: false
        }
        this.$services.SC.ConvertBuildingToHouseSharing(payload, {
          config: { District: this.baseNosaziCode.District }
        })
          .then(async (data) => {
            this.convertRes = this.getResponse(data)
            if (this.convertRes.success) {
              this.showSuccess(
                "عملیات تبدیل کد نوسازی ساختمان به کد دستگاه با موفقیت انجام شد."
              )
              const strNosaziCode = convertNosaziCodeObjectToString(
                this.baseNosaziCode
              )
              await this.log({
                action: this.logActions.transfer,
                bizCode: strNosaziCode,
                bizCodeTitle: "کد نوسازی",
                nosaziCode: strNosaziCode
              })
              this.loadObj()
            }
          })
          .catch((e) => {
            console.error(e)
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      })
    }
  },
  computed: {
    config () {
      return { config: { District: this.baseNosaziCode.District } }
    },
    model () {
      return {
        pNosaziCode: {
          Apartment: this.baseNosaziCode.Apartment,
          Block: this.baseNosaziCode.Block,
          Building: this.baseNosaziCode.Building,
          CI_City: 0,
          District: this.baseNosaziCode.District,
          EumBaseInfoGroup: 0,
          EumNosaziCodeGroup: 0,
          EumNosaziCodeObjType: 0,
          EumRevisitGroup: 0,
          House: this.baseNosaziCode.House,
          IsRoot: false,
          NidBase: "00000000-0000-0000-0000-000000000000",
          NidNosaziCode: "00000000-0000-0000-0000-000000000000",
          Region: this.baseNosaziCode.Region,
          Shop: this.baseNosaziCode.Shop
        },
        pLoadFunc:
          "Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str,Base_AddressPostCode,Base_PreCodeInfo",
        pIsLoadDeletedNosaziCode: false
      }
    },
    lockBtn () {
      return !this.getBaseLibRes?.data?.MainObj
    }
  }
}
</script>
