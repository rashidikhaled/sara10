<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ACE63A06-E835-457D-A1EA-3B477DD9E69B"
  >
    <form-wrapper vertical title=" تغییر کد نوسازی">
      <template #header>
        <safa-status :result="getBaseLibResult" />
        <safa-status :result="isAnyCommisionInNosaziCodeRes" />
        <safa-status :result="changeNosaziCodeResult" />
        <safa-status :result="deleteResult" />
      </template>

      <FormRow>
        <nosazi-code-input
          label="کد نوسازی"
          label-width="95px"
          v-model="baseNosaziCode"
          cdcName="baseNosaziCode"
          @enter="load"
        />
        <q-separator class="q-mx-sm q-pa-none q-mt-sm" vertical />
        <nosazi-code-input
          label="کد نوسازی جدید"
          label-width="95px"
          v-model="newNosaziCode"
          cdcName="newNosaziCode"
        />
        <FormControl>
          <safa-combo
            input-debounce="0"
            label="نوع دسته اطلاعاتی"
            label-width="95px"
            sourceType="local"
            :options="infoGroup"
            v-model="selectedEnumNosaziCodeGroup"
            cdcName="EumNosaziCodeGroup"
          />
        </FormControl>
      </FormRow>

      <q-separator class="q-mt-sm" />

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
        <!-- :selected.sync="selectedNosaziCode" -->
      </div>
      <template v-slot:footer>
        <div class="flex wrap q-gutter-sm">
          <btn-default
            spId="f83ae976-f845-492d-962e-0fb55e9bc6c8"
            spCaption="تغییر"
            label="تغییر کد نوسازی"
            @click="isAnyCommisionInNosaziCode"
          />
          <btn-delete
            spCaption="حذف"
            spId="30ef5111-c1dd-43a3-8fec-2f5f10a1e226"
            label="حذف کد نوسازی"
            @click="deleteNosaziCode"
          />
        </div>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"

export default {
  mixins: [baseFormMixin],
  computed: {
    config () {
      return {
        District: this.baseNosaziCode.District
      }
    }
  },
  data () {
    return {
      title: "تغییر کد نوسازی",
      formKey: "7be96c21-974b-467d-874a-0a15b7aeb6ca",
      name: "UChangeRefreshCode",
      main: true,
      // value: {
      //   refreshCodeArray: [0, 0, 0, 0, 0, 0, 0]
      // },
      // isReadOnlyNosaziCode: ["e", "e", "e", "e", "e", "e", "e"],
      treeFilter: "",
      selectedEnumNosaziCodeGroup: 0,
      getBaseLibResult: null,
      changeNosaziCodeResult: {},
      isAnyCommisionInNosaziCodeRes: {},
      deleteResult: {},
      infoGroup: [
        {
          ID: "0",
          Title: "تشکیل پرونده"
        },
        {
          ID: "1",
          Title: "ممیزی"
        }
      ],
      // nosaziArray: [],
      // selectedNosaziCode: "1-2-3-4-0-0-0",
      nosaziCodeTrees: [],
      childTree: [],
      baseNosaziCode: {
        EumNosaziCodeGroup: "0",
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      newNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      options: {
        CI_City: 0,
        EumRevisitGroup: 0,
        EumBaseInfoGroup: 0,
        EumNosaziCodeGroup: 0,
        IsRoot: false
      }
    }
  },
  methods: {
    async load () {
      debugger
      await this.getBaseLibInNosaziCodeFirst()
      let nosaziCode = { ...this.baseNosaziCode }
      await this.getBaseLibInNosaziCodeSecond(nosaziCode)
    },
    async getBaseLibInNosaziCodeFirst () {
      try {
        this.showLoading()
        this.baseNosaziCode.EumNosaziCodeGroup = this.selectedEnumNosaziCodeGroup
        const payload = {
          pNosaziCode: this.baseNosaziCode,
          pLoadFunc:
            "Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str,Base_AddressPostCode,Base_PreCodeInfo",
          pIsLoadDeletedNosaziCode: false
        }
        const { data } = await this.$services.SA.getBaseLibInNosaziCode(
          payload,
          this.config
        )
        this.getBaseLibResult = this.getResponse(data)
        this.childTree = this.getBaseLibResult.data["ChildTree"] || []
        const isValid = !!this.childTree.length
        if (isValid) {
          this.buildTree(this.childTree)
        }
        const strNosaziCode = convertNosaziCodeObjectToString(
          payload.pNosaziCode
        )
        const code = strNosaziCode.split("-").reverse().join("-")
        await this.log({
          action: this.logActions.view,
          bizCode: strNosaziCode,
          bizCodeTitle: "کد نوسازی",
          nosaziCode: strNosaziCode,
          saveDesc: `بارگذاری اطلاعات کد نوسازی مبدا با کد نوسازی ${code} انجام گردید.`
        })
      } catch (err) {
        this.serverError()
        console.error(err)
      } finally {
        this.hideLoading()
      }
    },
    async getBaseLibInNosaziCodeSecond (nosaziCode) {
      const first = {
        Apartment: this.baseNosaziCode.Apartment,
        Block: this.baseNosaziCode.Block,
        Building: this.baseNosaziCode.Building,
        CI_City: 0,
        District: this.baseNosaziCode.District,
        EumBaseInfoGroup: 0,
        EumNosaziCodeGroup: this.selectedEnumNosaziCodeGroup,
        EumNosaziCodeObjType: 0,
        EumRevisitGroup: 0,
        House: this.baseNosaziCode.House,
        IsRoot: false,
        NidBase: "00000000-0000-0000-0000-000000000000",
        NidNosaziCode: "00000000-0000-0000-0000-000000000000",
        Region: this.baseNosaziCode.Region,
        Shop: this.baseNosaziCode.Shop
      }
      const second = {
        Apartment: this.newNosaziCode.Apartment,
        Block: this.newNosaziCode.Block,
        Building: this.newNosaziCode.Building,
        CI_City: 0,
        District: this.newNosaziCode.District,
        EumBaseInfoGroup: 0,
        EumNosaziCodeGroup: this.selectedEnumNosaziCodeGroup,
        EumNosaziCodeObjType: 0,
        EumRevisitGroup: 0,
        House: this.newNosaziCode.House,
        IsRoot: false,
        NidBase: "00000000-0000-0000-0000-000000000000",
        NidNosaziCode: "00000000-0000-0000-0000-000000000000",
        Region: this.newNosaziCode.Region,
        Shop: this.newNosaziCode.Shop
      }
      try {
        this.showLoading()
        const payload = {
          pNosaziCode: nosaziCode === this.newNosaziCode ? second : first,
          pLoadFunc: "ChildTree",
          pIsLoadDeletedNosaziCode: false
        }
        const { data } = await this.$services.SA.getBaseLibInNosaziCode(
          payload,
          this.config
        )
        this.getBaseLibResult = this.getResponse(data)
        this.childTree = this.getBaseLibResult.data["ChildTree"] || []
        const isValid = !!this.childTree.length
        if (isValid) {
          this.buildTree(this.childTree)
        }
      } catch (err) {
        this.serverError()
        console.error(err)
      } finally {
        this.hideLoading()
      }
    },
    async isAnyCommisionInNosaziCode () {
      try {
        this.showLoading()
        const payload = {
          pNosaziCode: this.getBaseLibResult.data.MainObj
        }
        const { data } = await this.$services.SC.isAnyCommisionInNosaziCode(
          payload,
          this.config
        )
        this.isAnyCommisionInNosaziCodeRes = this.getResponse(data)
        if (this.isAnyCommisionInNosaziCodeRes.success) {
          this.changeNosaziCode()
        }
      } catch (err) {
        this.serverError()
        console.error(err)
      } finally {
        this.hideSending()
      }
    },
    changeNosaziCode () {
      const handler = async () => {
        try {
          const payload = {
            pFromNosaziCode: this.getBaseLibResult.data.MainObj,
            pToNosaziCode: this.newNosaziCode,
            UserInfo: this.currentUser,
            pIsChangeNosaziCodeInSubSystems: true,
            pIsCheckRegionInChange: true
          }
          this.showLoading()
          const { data } = await this.$services.SC.changeNosaziCode(
            payload,
            this.config
          )
          this.changeNosaziCodeResult = this.getResponse(data)
          this.getBaseLibInNosaziCodeSecond(this.newNosaziCode)

          if (this.changeNosaziCodeResult.success) {
            this.showSuccess("عملیات با موفقیت انجام شد")
            const strNosaziCode = convertNosaziCodeObjectToString(payload.pFromNosaziCode)
            const strToNosaziCode = convertNosaziCodeObjectToString(payload.pToNosaziCode)
            const fromCode = strNosaziCode.split("-").reverse().join("-")
            const toCode = strToNosaziCode.split("-").reverse().join("-")
            await this.log({
              action: this.logActions.save,
              bizCode: strNosaziCode,
              bizCodeTitle: "کد نوسازی",
              nosaziCode: strNosaziCode,
              saveDesc: `تغییر کد نوسازی از کد نوسازی مبدا ${fromCode} به کد نوسازی مقصد ${toCode} انجام گردید.`
            })
          }
        } catch (e) {
          console.error(e)
          this.serverError()
        } finally {
          this.hideLoading()
        }
      }
      this.showConfirm("آیا از تغییر کد نوسازی اطمینان  دارید؟").onOk(handler)
    },

    deleteNosaziCode () {
      this.showConfirm("آیا از حذف کد نوسازی اطمینان  دارید؟").onOk(() => {
        try {
          let payload = {
            pNosaziCode: this.getBaseLibResult.data.MainObj,
            pNidUser: this.getNidUser(),
            pUserName: this.getUserDisplayName(),
            pToCurrentObject: false,
            ControlBlackListForRemovingNosaziCode: false
          }
          payload.pNosaziCode.EumNosaziCodeGroup = parseInt(this.selectedEnumNosaziCodeGroup)
          this.showLoading()
          this.$services.SC.deleteNosaziCode(payload, this.config)
            .then(async ({ data }) => {
              this.deleteResult = this.getResponse(data)
              if (this.deleteResult.success) {
                this.showSuccess("عملیات حذف کدنوسازی با موفقیت انجام شد")
                this.nosaziCodeTrees = []
                this.baseNosaziCode = {
                  District: 0,
                  Region: 0,
                  Block: 0,
                  House: 0,
                  Building: 0,
                  Apartment: 0,
                  Shop: 0
                }
                this.newNosaziCode = {
                  District: 0,
                  Region: 0,
                  Block: 0,
                  House: 0,
                  Building: 0,
                  Apartment: 0,
                  Shop: 0
                }

                const strNosaziCode = convertNosaziCodeObjectToString(payload.pNosaziCode)
                const code = strNosaziCode.split("-").reverse().join("-")
                await this.log({
                  action: this.logActions.delete,
                  bizCode: strNosaziCode,
                  bizCodeTitle: "کد نوسازی",
                  nosaziCode: strNosaziCode,
                  saveDesc: `حذف کد نوسازی ${code} انجام گردید.`
                })
              }
            })
        } catch (e) {
          console.error(e)
          this.serverError()
        } finally {
          this.hideLoading()
        }
      })
    },
    buildTree (childTree) {
      debugger
      if (!childTree || !Array.isArray(childTree)) {
        return
      }

      const parentCode = childTree
        .filter((x) => x.EumNosaziCodeObjType > 0) // Some error found here that object type is zer0
        .reduce((state, x) =>
          x.EumNosaziCodeObjType < state.EumNosaziCodeObjType ? x : state
        )

      const convert = (nosaziCode) => {
        return `${nosaziCode.District}-${nosaziCode.Region}-${nosaziCode.Block}-${nosaziCode.House}-${nosaziCode.Building}-${nosaziCode.Apartment}-${nosaziCode.Shop}`
      }

      const icons = [
        "home",
        "home",
        "home",
        "home_work",
        "apartment",
        "account_balance",
        "shopping_cart"
      ]
      const names = [
        "ناحیه",
        "بلوک",
        "زمین",
        "ساختمان",
        "آپارتمان",
        "دستگاه",
        "صنف"
      ]

      function getChildren (nosaziCode) {
        debugger
        if (!nosaziCode) {
          return
        }
        nosaziCode.name = names[nosaziCode.EumNosaziCodeObjType]
        nosaziCode.icon = icons[nosaziCode.EumNosaziCodeObjType]
        nosaziCode.nosaziCodeString = convert(nosaziCode)
        nosaziCode.children = childTree.filter(
          (x) => nosaziCode.Id === x.ParentId
        )
        nosaziCode.children.forEach((child) => getChildren(child))
      }
      getChildren(parentCode)
      this.nosaziCodeTrees = [parentCode]
    }
  }
}
</script>

<style scoped>
.lbl {
  margin: 10px;
}
</style>
