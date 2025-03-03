<template>
  <safa-form
    appId="375C0F92-A167-4AA4-BFD4-FD32D9A93902"
    :id="formKey"
    :caption="title"
  >
    <form-wrapper :title="title" :padding="false">
      <template>
        <safa-status :result="getAllBlackListRes" />
        <safa-status :result="getBlackListRes" />
        <safa-status :result="deleteBlackListInfoRes" />
        <safa-status :result="saveBlackListRes" />
      </template>

      <safa-tabs v-model="activeTab">
        <template v-slot:tabs>
          <tab-menu name="controlList" label="لیست کنترلی" />
          <tab-menu name="editInfo" label="ویرایش اطلاعات" />
        </template>
        <tab-content name="controlList" title="لیست کنترلی" :padding="false">
          <ControlList
            v-model="blackListResult"
            @deleteBlackList="deleteBlackList"
            @editBlackList="editBlackList"
            @reload="loadObj"
          />
        </tab-content>
        <tab-content name="editInfo" title="ویرایش اطلاعات">
          <ControlDigInfo
            v-model="model.blackList"
            :gridsModel="gridsModel"
            :ListCI_Region="blackListResult.ListCI_Region"
            :m="mode"
          />
        </tab-content>
      </safa-tabs>
      <template #footer>
        <form-actions
          :m="mode"
          showNewButton
          :showEditButton="false"
          @cancel="isEditable = false"
          @newInfo="newObj"
          @save="saveObj"
        />
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import ControlList from "./partials/ControlList.vue"
import ControlDigInfo from "./partials/ControlDigInfo.vue"

import { currentDate, currentTime } from "src/utils/index"

const defaultModel = {
  // ClsBlackList.BlackList_Info
  BlackList_Info: {
    BL_Comments: null,
    BL_StartDate: "",
    BlackListCode: "",
    BlackListSubject: "",
    CI_BlackList: 0,
    CI_BlackListCause: 0,
    CI_DigRequestType: 0,
    ExpireDate: "",
    InBL_Date: "",
    InBL_Time: "",
    InNIdUser: null,
    InUserName: "",
    IsDisable: false,
    NIdBlackList: null,
    OutBL_Date: null,
    OutBL_Time: null,
    OutNIdUser: null,
    OutUserName: null,
    Region: "",
    UpBL_Date: null
  },
  BlackList_Company: [],
  BlackList_Polygon: [],
  BlackList_Redirect: [],
  BlackList_Region: [], // لیست مناطق انتخاب شده
  CI_Region: [],
  _NidBlackList: null
}

export default {
  mixins: [baseFormMixin],
  components: { ControlList, ControlDigInfo },
  data () {
    return {
      title: "لیست کنترلی",
      formKey: "F0A85890-2543-4421-BE92-8DA056A42AC3",
      name: "UControlListDig",
      main: true,
      sidebarCompatible: true,

      // #reguin variables
      getAllBlackListRes: null,
      getBlackListRes: null,
      deleteBlackListInfoRes: null,
      saveBlackListRes: null,

      // #reguin variables
      allVBlackList: null,
      activeTab: "controlList",
      isView: false,
      model: { blackList: { ...defaultModel } },

      blackListResult: {
        ClsBlackList: null,
        ListCI_Region: [],
        ListConfrimFiche: [],
        VBlackList_Ifo: [],
        IncomeFicheList: [],
        VRequester_RedirectName: []
      },

      gridsModel: {
        BlackListRegion: [],
        BlackListCompany1: [],
        BlackListRedirect: [],
        BlackListCompany2: [],
        BlackListPolygon: []
      }
    }
  },
  mounted () {
    this.loadObj()
  },
  methods: {
    randColor () {
      return (
        "#" +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(4, "0")
          .toUpperCase() +
        "2e"
      )
    },
    sortAndSetColors () {
      const sortList =
        this.blackListResult.VRequester_RedirectName.sort(
          (a, b) => a.ReQuestTypeID - b.ReQuestTypeID
        ) ?? []
      const _reQuestTypeIDList = sortList.map((m) => m.ReQuestTypeID) ?? []
      const reQuestTypeIDList =
        _reQuestTypeIDList.filter(
          (item, index) => _reQuestTypeIDList.indexOf(item) === index
        ) ?? []
      const reQuestTypeIDListWithColor = reQuestTypeIDList.map((m) => {
        return { ID: m, Color: this.randColor() }
      })

      for (let i = 0; i < sortList.length; i++) {
        for (let j = 0; j < reQuestTypeIDListWithColor.length; j++) {
          if (sortList[i].ReQuestTypeID === reQuestTypeIDListWithColor[j].ID) {
            sortList[i].Color = reQuestTypeIDListWithColor[j].Color
          }
        }
      }
      return sortList
    },
    async loadObj () {
      if (this.isEditable) {
        this.showError("فرم در حالت ویرایش می باشد.")
        this.activeTab = "editInfo"
        return
      }
      try {
        this.showLoading()
        const { data } = await this.$services.excavation.getAllBlackList()
        this.getAllBlackListRes = this.getResponse(data)
        if (this.getAllBlackListRes.success) {
          const res = this.getAllBlackListRes.data.GetAllBlackListResult
          this.blackListResult = {
            ...res,
            VBlackList_Ifo: res.VBlackList_Ifo ?? [], // لیست همه ی لیست سیاه

            VCompany_Info: res.VCompany_Info ?? [],
            VRequester_RedirectName: res.VRequester_RedirectName ?? []
          }
          const company = this.sortAndSetColors().map((m) => {
            return { ...m, isSelectedNode: false }
          }) // this.blackListResult.VRequester_RedirectName

          const tavabe = this.blackListResult.VCompany_Info.map((m) => {
            return { ...m, isSelectedNode: false }
          })
          this.gridsModel = {
            BlackListRegion: [],
            BlackListCompany1: tavabe,
            BlackListRedirect: company, // کد لیست کنترلی: محدوده از نقشه - شرکت خدمانی
            BlackListCompany2: tavabe,
            BlackListPolygon: company
          }
          if (!this.isView) {
            await this.log({
              action: this.logActions.view,
              bizCode: "",
              bizCodeTitle: "",
              saveDesc: `نمایش لیست سیاه در فرم لیست کنترلی زیر سیستم حفاری`
            })
          }
          this.isView = true
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    async getBlackList (payload) {
      try {
        this.showLoading()
        const { data } = await this.$services.excavation.getBlackList(payload)
        this.getBlackListRes = this.getResponse(data)
        if (this.getBlackListRes.success) {
          if (this.getBlackListRes.data.GetBlackListResult.ClsBlackList) {
            this.model.blackList =
              this.getBlackListRes.data.GetBlackListResult.ClsBlackList
          }
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    normalizedSaveModel (e) {
      return {
        ...e,
        BlackList_Info: {
          ...e.BlackList_Info,
          InBL_Date: e.BlackList_Info.InBL_Date || currentDate(),
          InBL_Time: e.BlackList_Info.InBL_Time || currentTime(),
          InNIdUser: e.BlackList_Info.InNIdUser || this.getNidUser(),
          InUserName: e.BlackList_Info.InUserName || this.getUserDisplayName(),
          IsDisable: e.BlackList_Info.IsDisable || false,
          NIdBlackList:
            e.BlackList_Info.NIdBlackList ||
            "00000000-0000-0000-0000-000000000000",
          OutBL_Date: e.BlackList_Info.OutBL_Date || null,
          OutBL_Time: e.BlackList_Info.OutBL_Time || null,
          OutNIdUser: e.BlackList_Info.OutNIdUser || null,
          OutUserName: e.BlackList_Info.OutUserName || null,
          UpBL_Date: e.BlackList_Info.UpBL_Date || null
        },

        BlackList_Region:
          this.model.blackList.BlackList_Info.CI_BlackList === 0
            ? this.selectedBlackListRegion(e)
            : null, // لیست مناطق انتخاب شده
        BlackList_Company:
          this.model.blackList.BlackList_Info.CI_BlackList === 1
            ? this.selectedBlackListCompany(e)
            : null,
        BlackList_Redirect:
          this.model.blackList.BlackList_Info.CI_BlackList === 2
            ? this.selectedBlackListRedirect(e)
            : null,
        BlackList_Polygon:
          this.model.blackList.BlackList_Info.CI_BlackList === 3
            ? this.selectedBlackListPolygon(e)
            : null,

        CI_Region:
          this.model.blackList.BlackList_Info.CI_BlackList === 0 &&
          this.gridsModel.BlackListRegion.length > 0
            ? this.blackListResult?.ListCI_Region
            : null,
        _NidBlackList:
          e._NidBlackList ?? "00000000-0000-0000-0000-000000000000"
      }
    },
    async saveObj () {
      if (!this.isValidForm()) return
      try {
        this.model.blackList = this.normalizedSaveModel(this.model.blackList)
        this.showLoading()
        const { data } = await this.$services.excavation.saveBlackList({
          pRequest: {
            ClsBlackList: this.model.blackList,

            NIdRequest: "00000000-0000-0000-0000-000000000000",
            NIdRequestInfoService: "00000000-0000-0000-0000-000000000000",
            NidProc: "00000000-0000-0000-0000-000000000000",

            NIdBlackList: "00000000-0000-0000-0000-000000000000",
            NIdFiche: "00000000-0000-0000-0000-000000000000",
            NIdRunMonitoringHeader: "00000000-0000-0000-0000-000000000000",
            NIdTask: "00000000-0000-0000-0000-000000000000",
            NidBaygani: "00000000-0000-0000-0000-000000000000",
            NidCompany: "00000000-0000-0000-0000-000000000000",
            NidUser: "00000000-0000-0000-0000-000000000000"
          }
        })
        this.saveBlackListRes = this.getResponse(data)
        if (this.saveBlackListRes.success) {
          // const res = this.saveBlackListRes.data.SaveBlackListResult
          // await this.log({
          //   action: this.logActions.save,
          //   bizCode: "",
          //   bizCodeTitle: ""
          // })
          this.isEditable = false
          this.activeTab = "controlList"
          await this.loadObj()
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    newObj () {
      this.isEditable = true
      this.activeTab = "editInfo"
      this.model = { blackList: { ...defaultModel } }
    },
    async editBlackList (params) {
      if (params.IsDisable === true) {
        return this.showError("این مورد قبلا ابطال شده است.")
      }
      await this.getBlackList({
        pRequest: { NIdBlackList: params.NIdBlackList }
      })
      this.isEditable = true
      this.activeTab = "editInfo"

      // /////////////////////

      // if (this.model.blackList.BlackList_Info.CI_BlackList === 0) {
      //   ViewModels.ClsMap.ShowRegionBox(
      //     this.model.blackList.BlackList_Region.Select(
      //       (f) => f.CI_Region
      //     ).ToList()
      //   )
      // } else if (this.model.blackList.BlackList_Info.CI_BlackList === 1) {
      //   var TmpCompany = this.model.blackList.BlackList_Company.Join(
      //     this.blackListResult.VCompany_Info,
      //     (i) => i.NIdCompany,
      //     (j) => j.NIdCompany,
      //     (i, j) => j
      //   )
      //   if (TmpCompany !== null) {
      //     TmpCompany.forEach((i) => (i.IsSelected = true))
      //     this.model.blackList.BlackList_Company.FirstOrDefault()
      //       .Region.Split(",")
      //       .ToList()
      //       .forEach((i) => {
      //         this.model.blackList.CI_Region.FirstOrDefault(
      //           (j) => j.ID === Number(i)
      //         ).IsSelected = true
      //       })
      //   }
      // } else if (this.model.blackList.BlackList_Info.CI_BlackList === 2) {
      //   if (this.model.blackList.BlackList_Polygon.HasValues()) {
      //     ViewModels.ClsMap.ShowShapeOnMap(
      //       this.model.blackList.BlackList_Polygon.Select((f) => f.Polygon)
      //     )
      //   }
      //   this.model.blackList.BlackList_Polygon.FirstOrDefault()
      //     .Company.split(",").forEach(i => {
      //       this.blackListResult.VCompany_Info.FirstOrDefault(
      //         (j) => j.NIdCompany === parseInt(i)
      //       ).IsSelected = true
      //     })
      //   this.model.blackList.BlackList_Polygon.FirstOrDefault()
      //     .Redirect.Split(",")
      //     .forEach((i) => {
      //       this.blackListResult.VRequester_RedirectName.FirstOrDefault(
      //         (j) => j.RedirectNameID === Convert.ToByte(i)
      //       ).IsSelected = true
      //     })
      // } else if (this.model.blackList.BlackList_Info.CI_BlackList === 3) {
      //   this.blackListResult.VRequester_RedirectName.join(
      //     this.model.blackList.BlackList_Redirect,
      //     (a) => a.RedirectNameID,
      //     (b) => b.CI_RedirectName,
      //     (a, b) => a
      //   )
      //     .forEach((i) => (i.IsSelected = true))
      //   this.model.blackList.BlackList_Redirect.FirstOrDefault()
      //     .Region.Split(",")
      //     .ToList()
      //     .forEach((i) => {
      //       this.model.blackList.CI_Region.FirstOrDefault(
      //         (j) => j.ID === Convert.ToByte(i)
      //       ).IsSelected = true
      //     })
      // }
    },

    deleteBlackList (params) {
      if (params.IsDisable === true) {
        return this.showError("این مورد قبلا ابطال شده است.")
      }
      this.showConfirm("آیا برای ابطال اطمینان دارید ؟").onOk(() => {
        this.showLoading()
        this.$services.excavation
          .deleteBlackListInfo({
            pRequest: {
              // UserName: "SalehiA",
              // NIdBlackList: "bbebac92-87c9-4076-ad36-0f7205c4084f",
              // NidUser: "8b7e86af-0172-4917-853b-4397c10356f9"
              NIdBlackList: params.NIdBlackList,
              UserName: this.getUserDisplayName(),
              NidUser: this.getNidUser()
            }
          })
          .then(async ({ data }) => {
            this.deleteBlackListInfoRes = this.getResponse(data)
            if (this.deleteBlackListInfoRes.success) {
              await this.log({
                action: this.logActions.cancel,
                bizCode: params.NIdBlackList,
                bizCodeTitle: "NIdBlackList",
                saveDesc: `لیست کنترلی با عنوان ${params.BlackListSubject} ابطال شد.`
              })
              await this.loadObj()
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
    },

    selectedBlackListRegion (e) {
      const list =
        this.gridsModel.BlackListRegion.map(m => {
          return {
            CI_Region: m.Title,
            NIdBlackList: e._NidBlackList,
            NIdRegion: '00000000-0000-0000-0000-000000000000'
          }
        }) ?? []
      return list.length > 0 ? list : null
    },
    selectedBlackListCompany (e) {
      const list =
        this.gridsModel.BlackListCompany1.filter(
          (f) => f.isSelectedNode === true
        ) ?? []
      return list.length > 0 ? list : null
    },
    selectedBlackListRedirect (e) {
      const list =
        this.gridsModel.BlackListRedirect.filter(
          (f) => f.isSelectedNode === true
        ) ?? []
      return list.length > 0 ? list : null
    },
    selectedBlackListPolygon (e) {
      const list =
        this.gridsModel.BlackListPolygon.filter(
          (f) => f.isSelectedNode === true
        ) ?? []
      return list.length > 0 ? list : null
    }
  }
}
</script>
