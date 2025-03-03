<template>
  <safa-form :id="formKey" :caption="title">
    <safa-status :result="result" />
    <safa-status :result="resultSave" />
    <fit>
      <safa-tabs
        v-model="currentTab"
        class="fit"
        height="100%"
        :bordered="false"
      >
        <template v-slot:tabs>
          <tab-menu
            v-for="{ name, title } in tabs"
            :key="name"
            :name="name"
            :label="title"
          />
        </template>
        <tab-content name="address" title="مشخصات و جهات اربعه">
          <TabAddress v-model="currentData" v-bind="passedProps" />
        </tab-content>
        <tab-content
          name="registerPlaque"
          title="مالک و پلاک ثبتی"
          :padding="false"
        >
          <TabRegisterPlaque v-model="currentData" v-bind="passedProps" />
        </tab-content>
      </safa-tabs>

      <form-actions
        :m="mode"
        @edit="handleEdit"
        @save="handleSaveAction"
        editSPId="6794522f-892a-4672-b8e9-6fe3f7eaae71"
        @cancel="load"
        class="q-pb-sm q-pl-sm"
      >
        <btn-default
          spId="b9fb9045-e221-48b0-8640-fca7699c4cb6"
          spCaption="کپی به مجاز پایانکار"
          label="کپی به مجاز پایانکار"
        />
        <btn-default
          spId="8a53a53a-a3b6-4fa9-8bd7-7b29808673b8"
          spCaption="کپی به مجاز پایانکار"
          label="کپی به مجاز پایانکار"
        ></btn-default>
      </form-actions>
    </fit>
  </safa-form>
</template>

<script>
import requestModel from "./config/requestModel"
import TabAddress from "./partials/TabAddress"
import TabRegisterPlaque from "./partials/TabRegisterPlaque"
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  components: {
    TabAddress,
    TabRegisterPlaque
  },
  props: {
    value: Object,
    selectedNosaziCode: String
  },
  data () {
    return {
      formKey: "a7d36c46-9d64-4494-a7a1-9e60853a651c",
      title: "شهرسازی- تشکیل پرونده عرصه ساده",
      name: "BaseHouseInfoParvandeh",
      isView: false,
      result: null,
      resultSave: null,
      currentTab: "address",
      currentData: { ...requestModel },
      tabs: [
        {
          name: "address",
          title: " مشخصات و جهات اربعه"
        },
        {
          name: "registerPlaque",
          title: "مالک و پلاک ثبتی"
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
    normalizeBaseEdge () {
      return this.currentData.Base_Edge.map((m) => {
        return {
          ...m,
          ActDate: m.ActDate || null,
          AddLen: m.AddLen || 0,
          AfterEditBarLen: m.AfterEditBarLen || null,
          AfterEditSideLen: m.AfterEditSideLen || null,
          AfterEditWidth: m.AfterEditWidth || 0,
          BackwardLen: m.BackwardLen || null,
          BarLenEffective: m.BarLenEffective || null,
          CI_Moshrefiat: m.CI_Moshrefiat || null,
          CI_Privacy: m.CI_Privacy || null,
          CI_ValBlockFord: m.CI_ValBlockFord || null,
          CI_ViewCode: m.CI_ViewCode || null,
          Comments: m.Comments || null,
          Depth1: m.Depth1 || 0,
          Depth2: m.Depth2 || 0,
          Depth3: m.Depth3 || 0,
          DesignLen: m.DesignLen || 0,
          EdgeAndSideCurrent: m.EdgeAndSideCurrent || null,
          EdgeAndSideDoc: m.EdgeAndSideDoc || null,
          EdgeBarCurrent: m.EdgeBarCurrent || null,
          EdgeBarDoc: m.EdgeBarDoc || null,
          EdgeLenCurrent: m.EdgeLenCurrent || null,
          EntranceWith: m.EntranceWith || null,
          GoFrontLen: m.GoFrontLen || 0,
          GoFrontLenAllow: m.GoFrontLenAllow || 0,
          GoFrontLenOther: m.GoFrontLenOther || 0,
          GoFrontLenOtherAllow: m.GoFrontLenOtherAllow || 0,
          PathKaf: m.PathKaf || 0,
          PathName: m.PathName || null,
          PathWidth: m.PathWidth || 0,
          RegisterPlack: m.RegisterPlack || null,
          Remain: m.Remain || null,
          RemainBarLen: m.RemainBarLen || null,
          RemainSideLen: m.RemainSideLen || null,
          SideWalkWidth: m.SideWalkWidth || null,
          ValBlockRowNo: m.ValBlockRowNo || null,
          NidBase: m.NidBase || "00000000-0000-0000-0000-000000000000",
          NidEdge: m.NidEdge || "00000000-0000-0000-0000-000000000000"
        }
      })
    },
    normalizeBaseOwner () {
      return this.currentData.Base_Owner.map((m) => {
        return {
          ...m,
          ActDate: m.ActDate || null,
          Address: m.Address || null,
          AyanSir: m.AyanSir || null,
          BirthDate: m.BirthDate || null,
          BuildingNo: m.BuildingNo || null,
          CellPhone: m.CellPhone || null,
          Comments: m.Comments || null,
          DocNo: m.DocNo || null,
          EmissionPlace: m.EmissionPlace || null,
          NationalCode: m.NationalCode || null,
          NidOwnerBank: m.NidOwnerBank || null,
          PostCode: m.PostCode || null,
          ToftSir: m.ToftSir || null,
          AyanHabeh: m.AyanHabeh || 0,
          AyanImpart: m.AyanImpart || 0,
          IDCardNo: m.IDCardNo || 0,
          ToftHabeh: m.ToftHabeh || 0,
          ToftImpart: m.ToftImpart || 0
        }
      })
    },
    handleSaveAction () {
      this.hideSending()
      const houseInfo = this.currentData.Base_HouseInfo
      houseInfo.CurrentArea = houseInfo.CurrentArea || 0
      this.currentData.Base_Edge = this.normalizeBaseEdge()
      this.currentData.Base_Owner = this.normalizeBaseOwner()
      this.$services.SC.saveParvandehHouse(
        {
          PObj: this.currentData,
          pUser: this.currentUser,
          pDtoWorkflowData: {
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

            this.showSuccess("ذخیره انجام با موفقیت انجام شد")
            this.load(true)
          }
        })
        .catch((response) => {
          console.log("error", response)
          this.serverError()
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
      return this.$services.SC.getParvandehHouse(
        {
          PNidBase: this.value.NidBase,
          PLoadFun:
            "Base_NosaziCode,Base_Owner,Base_Edge,Base_RegisterPlack,Base_Scuttle,Base_HouseInfo,Base_CommonEstate,Base_ShahrsaziArchive"
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
          } else {
            this.showError(" انجام نشد")
          }
        })
        .catch((e) => {
          console.error(e)
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
