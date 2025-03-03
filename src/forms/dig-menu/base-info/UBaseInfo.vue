<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="375C0F92-A167-4AA4-BFD4-FD32D9A93902"
  >
    <form-wrapper :title="title" :padding="false">
      <template #header>
        <safa-status :result="serviceResultLoad" />
        <safa-status :result="serviceResultSave" />
      </template>
      <fit>
        <safa-splitter v-model="splitterModel" margin="0">
          <template v-slot:before>
            <fit>
              <q-list dense bordered class="rounded-borders">
                <q-item
                  clickable
                  v-for="(node, _i) in treeView"
                  :key="_i"
                  @click="itemListSelectionChanged(node)"
                  class="q-flex items-center"
                  :active="node.key === selectedLists.currentSelectedKey"
                >
                  <safa-label>
                    {{ node.header }}
                  </safa-label>
                </q-item>
              </q-list>
            </fit>
          </template>
          <template
            v-slot:after
            v-if="
              selectedLists.list.length > 0 && selectedLists.currentSelectedKey
            "
          >
            <safa-tabs
              v-model="selectedLists.currentSelectedKey"
              class="fit"
              :padding="false"
              @input="changeTab"
            >
              <template v-slot:tabs>
                <tab-menu
                  v-for="tab in selectedLists.list"
                  :label="tab.header"
                  :key="`menu_${tab.key}`"
                  :name="tab.key"
                  closable
                  @close="closeTab(tab)"
                />
              </template>
              <safa-grid
                pagination
                v-model="gridData"
                :title="dynamicTitle"
                :columns="gridColumns"
                fit
                :m="mode"
                :bordered="false"
                height="100%"
                min-height="200px"
                max-height="100%"
                filterable
                :addRow="true"
                :deleteRow="true"
                :allowCopy="false"
              />
            </safa-tabs>
          </template>
        </safa-splitter>
      </fit>
      <template
        v-slot:footer
        v-if="selectedLists.list.length > 0 && selectedLists.currentSelectedKey"
      >
        <FormActions
          :m="mode"
          @edit="isEditable = true"
          @save="saveTabService"
          @cancel="isEditable = false"
        />
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  name: "UBaseInfo",
  mixins: [baseFormMixin],

  computed: {
    gridColumns: {
      get () {
        const result = [
          {
            field: "ID",
            title: "کد"
          },
          {
            field: "Title",
            title: "عنوان"
          }
        ]

        if (!this.selectedLists.currentSelectedKey) return result
        if (
          [
            "UCrossType",
            "URegion",
            "UDigType",
            "UDigTime",
            "UTexttureType",
            "UCoefficientA",
            "UAsphaltType",
            "UOverheadCoefficient",
            "UCrossType",
            "UAsphaltQuality",
            "UDigRepeat"
          ].includes(this.selectedLists.currentSelectedKey)
        ) {
          result.push({
            field: "Coefficient",
            title: "ضریب"
          })
        }

        if (
          ["UOperationLevel"].includes(this.selectedLists.currentSelectedKey)
        ) {
          result.push(
            {
              field: "IsApplicant",
              title: "دستگاه متقاضی(اجرائی)",
              editor: "checkbox"
            },
            {
              field: "IsUrban",
              title: "شهرداری(کنترل و نظارت)",
              editor: "checkbox"
            }
          )
        }
        if (["UBaseCost"].includes(this.selectedLists.currentSelectedKey)) {
          result.push({
            field: "CI_MaterialsType",
            title: "نوع مصالح مسیر حفاری",
            editor: "combo",
            domain: "Dig"
          })
        }
        if (["UBaseCost"].includes(this.selectedLists.currentSelectedKey)) {
          result.push({
            field: "price",
            title: "مبلغ"
          })
        }
        if (
          ["URequesterType", "URedirectName"].includes(
            this.selectedLists.currentSelectedKey
          )
        ) {
          result.push(
            {
              field: "Tel",
              title: "تلفن ضروری"
            },
            {
              field: "ComplaintsTel",
              title: "تلفن رسیدگی به شکایات"
            }
          )
        }
        if (
          ["URequesterType"].includes(this.selectedLists.currentSelectedKey)
        ) {
          result.push(
            {
              field: "InquiryTime",
              title: "مدت اعتبار استعلام  (روز)"
            },
            {
              field: "AreaLicense",
              title: "متراژ مجوز حفاری"
            },
            {
              field: "NumberOfWork",
              title: "تعداد کار"
            },
            {
              field: "AssurancePriority",
              title: "دوره تضمین شده"
            }
          )
        }
        // { # todo
        //   field: "",
        //   title: "نحوه پرداخت"
        // }
        if (["UCompany_Info"].includes(this.selectedLists.currentSelectedKey)) {
          result.push(
            {
              field: "RegisterCode",
              title: "شماره ثبت"
            },
            {
              field: "CompanyName",
              title: "نام شرکت"
            },
            {
              field: "RequesterTitle",
              title: "شرکت خدماتی متقاضی"
            },
            {
              field: "ManagerName",
              title: "نام مدیرعامل"
            },
            {
              field: "ManagerTel",
              title: "تلفن شرکت"
            },
            {
              field: "ManagerMobile",
              title: "همراه مدیرعامل"
            }
          )
        }
        if (
          ["URequesterType", "URedirectName"].includes(
            this.selectedLists.currentSelectedKey
          )
        ) {
          result.push({
            field: "ComplaintsTel",
            title: "تلفن رسیدگی به شکایات"
          })
        }
        if (["URedirectName"].includes(this.selectedLists.currentSelectedKey)) {
          result.push(
            {
              field: "Tel2",
              title: "تلفن ثابت"
            },
            {
              field: "CellNo",
              title: "تلفن همراه"
            },
            {
              field: "CI_RequesterType",
              title: "نوع متقاضی",
              editor: "domain",
              domain: "Dig"
            },
            {
              field: "DefaultUser",
              title: "کاربر برای استعلام"
            }
          )
        }
        if (
          ["UInstrument", "UScouring", "UScouring"].includes(
            this.selectedLists.currentSelectedKey
          )
        ) {
          result.push({
            field: "Price",
            title: "مبلغ"
          })
        }
        // {
        //   field: "AreaCode",
        //   title: "ناحیه"
        // },
        if (["USmsInfo"].includes(this.selectedLists.currentSelectedKey)) {
          result.push(
            {
              field: "CI_Region",
              title: "منطقه",
              editor: "combo",
              domain: "Dig"
            },
            {
              field: "Name",
              title: "نام"
            },
            {
              field: "Family",
              title: "نام خانوادگی"
            },
            {
              field: "CellPhone",
              title: "تلفن همراه"
            },
            {
              field: "CI_Position",
              title: "سمت",
              editor: "combo",
              domain: "Dig"
            }
          )
        }
        if (["URepairCost"].includes(this.selectedLists.currentSelectedKey)) {
          result.push(
            {
              field: "CI_PathType",
              title: "محل حفاری",
              editor: "combo",
              domain: "Dig"
            },
            {
              field: "CI_MaterialsType",
              title: "جنس روسازی معبر",
              editor: "combo",
              domain: "Dig"
            },
            {
              field: "Cost",
              title: "قیمت"
            },
            {
              field: "CI_CrossType",
              title: "نوع معبر",
              editor: "combo",
              domain: "Dig"
            }
          )
        }
        if (
          [
            "UCoefficientA",
            "UTexttureType",
            "UAsphaltType",
            "UOverheadCoefficient",
            "UUnitPriceRequest",
            "UCrossType",
            "UAsphaltQuality",
            "UBaseCost",
            "URepairCost"
          ].includes(this.selectedLists.currentSelectedKey)
        ) {
          result.push({
            field: "CI_Years",
            title: "سال",
            editor: "combo",
            domain: "Dig"
          })
        }
        if (
          ["URunMonitoring"].includes(this.selectedLists.currentSelectedKey)
        ) {
          result.push(
            {
              field: "MonitoringUnit",
              title: "واحد درنظارت"
            },
            {
              field: "BasePriceMonitoring",
              title: "قیمت پایه نظارت"
            },
            {
              field: "MaxScore",
              title: "حداکثر نمره"
            }
          )
        }
        return result
      }
    },

    gridData: {
      get () {
        return Object.values(this.dataContext)[0] ?? {}
      },

      set (values) {
        // Object.assign(Object.values(this.dataContext)[0], values)
        this.dataContext[Object.keys(this.dataContext)[0]] = values
      }
    }
  },

  data () {
    return {
      title: "مدیریت اطلاعات پایه",
      name: "UBaseInfo",
      formKey: "5317529F-7798-4263-B480-2DA9BB436806",
      main: true,

      // Context
      dataContext: {},
      selectedLists: {
        list: [],
        currentSelectedKey: ""
      },
      treeView: [
        {
          header: "مراحل اصلی اجرا",
          key: "UOperationLevel"
        },
        {
          header: "نوع معبر",
          key: "UCrossType"
        },
        {
          header: "منطقه",
          key: "URegion"
        },
        {
          header: "نوع حفاری",
          key: "UDigType"
        },
        {
          header: "مدت حفاری",
          key: "UDigTime"
        },
        // {
        //   header: "ضریب A",
        //   key: "A"
        // },
        {
          header: "قیمت پایه بر اساس فهرست بهای ترمیم ترانشه",
          key: "UBaseCost"
        },
        {
          header: "ضریب بالاسری",
          key: "UOverheadCoefficient"
        },
        {
          header: "بهای واحد یک متر",
          key: "UUnitPriceRequest"
        },
        {
          header: "نوع مصالح مسیر حفاری",
          key: "UMaterialsType"
        },
        {
          header: "نوع خسارت و اقدام",
          key: "UPossibledamage"
        },
        {
          header: "خاکبرداری",
          key: "UDiggings"
        },
        {
          header: "انواع شرکت",
          key: "UCompanyType"
        },
        {
          header: "شرکت های خدماتی",
          key: "URequesterType"
        },
        {
          header: "فاز",
          key: "UPhase"
        },
        {
          header: "مقاطع",
          key: "USection"
        },
        {
          header: "سال",
          key: "UYears"
        },
        // {
        //   header: "نوع معبر",
        //   key: "UCrossType"
        // },
        {
          header: "کیفیت آسفالت",
          key: "UAsphaltQuality"
        },
        {
          header: "ضریب تکرار",
          key: "UDigRepeat"
        },
        {
          header: "نام تابعه",
          key: "URedirectName"
        },
        {
          header: "عوامل اجرایی",
          key: "UCompany_Info"
        },
        {
          header: "عنوان پروژه",
          key: "UProject"
        },
        {
          header: "علت ورود به لیست کنترلی",
          key: "UBlackListCause"
        },
        {
          header: "ادوات ترافیکی",
          key: "UInstrument"
        },
        {
          header: "نظافت",
          key: "UScouring"
        },
        {
          header: "سمت",
          key: "UPosition"
        },
        {
          header: "اطلاعات ارسال پیامک",
          key: "USmsInfo"
        },
        {
          header: "بهای ترمیم ",
          key: "URepairCost"
        },
        {
          header: "شرح چک لیست ",
          key: "URunMonitoring"
        },
        {
          header: "واحد در نظارت",
          key: "URunMonitoringType"
        },
        {
          header: "وضعیت در نظارت ",
          key: "URunMonitoringStatus"
        },
        {
          header: "تاسیسات ",
          key: "UInstallation"
        },
        {
          header: "علت تمدید ",
          key: "UCauseRenewal"
        },
        {
          header: "اقدامات و خسارت واردشده به شهرداری ",
          key: "UDelivery_InstallationsType"
        },
        {
          header: "اعلام نواقص",
          key: "UDefectsSubject"
        }
      ],
      splitterModel: 30,

      // Responses
      serviceResultLoad: null,
      serviceResultSave: null
    }
  },

  methods: {
    itemListSelectionChanged (node) {
      this.selectedLists.list.push(node)
      this.selectedLists.list = [
        ...new Map(
          this.selectedLists.list.map((item) => [item["key"], item])
        ).values()
      ]

      Object.assign(this.selectedLists, {
        list: [...this.selectedLists.list],
        currentSelectedKey: node.key
      })
      this.changeTab(node.key)
    },

    closeTab (tab) {
      this.selectedLists.list.splice(
        this.selectedLists.list.findIndex((e) => e.key === tab.key),
        1
      )

      if (
        this.selectedLists.list.findIndex(
          (e) => e.key === this.selectedLists.currentSelectedKey
        ) <= 0
      ) {
        this.selectedLists.currentSelectedKey =
          this.selectedLists.list.findLast(({ key }) => key).key || ""
      }
    },

    getTabServiceName (tabKey) {
      switch (tabKey) {
        // case "UCrossType":
        //   this.dynamicTitle = "ضریب A"
        //   return "CIPathType"
        case "URegion":
          this.dynamicTitle = "منطقه"
          return "CIRegion"
        case "UDigType":
          this.dynamicTitle = "نوع حفاری"
          return "CIDigType"
        case "UDigTime":
          this.dynamicTitle = "مدت حفاری"
          return "CIDigTime"
        case "UOperationLevel":
          this.dynamicTitle = "مراحل اصلی اجرا"
          return "CIOperationLevel"
        case "UCoefficientA":
          this.dynamicTitle = "ضریب A"
          return "CICoefficientA"
        case "UTexttureType":
          this.dynamicTitle = "نوع بافت"
          return "CITextureType"
        case "UAsphaltType":
          this.dynamicTitle = "نوع آسفالت"
          return "CIAsphaltType"
        case "UBaseCost":
          this.dynamicTitle = ""
          return "CIBaseCost"
        case "UOverheadCoefficient":
          this.dynamicTitle = "ضریب بالاسری"
          return "CIOverheadCoefficient"
        case "UUnitPriceRequest":
          this.dynamicTitle = "بهای واحد یک متر"
          return "CIUnitPriceRequest"
        case "UMaterialsType":
          this.dynamicTitle = "نوع مصالح مسیر حفاری"
          return "ClsCIMaterialsType"
        case "UPossibledamage":
          this.dynamicTitle = "نوع خسارت و اقدام"
          return "ClsCIPossibledamage"
        case "UDiggings":
          this.dynamicTitle = "خاکبرداری"
          return "ClsCIDiggings"
        case "UCompanyType":
          this.dynamicTitle = "انواع شرکت"
          return "ClsCICompanyType"
        case "URequesterType":
          this.dynamicTitle = "نوغ درخواست"
          return "ClsCIRequesterType"
        case "UPhase":
          this.dynamicTitle = "فاز"
          return "ClsCIPhase"
        case "UYears":
          this.dynamicTitle = "معرفی سال"
          return "ClsCIYears"
        case "UCrossType":
          this.dynamicTitle = "نوع معبر"
          return "ClsCICrossType"
        case "UAsphaltQuality":
          this.dynamicTitle = "کیفیت آسفالت"
          return "ClsCIAsphaltQuality"
        case "UDigRepeat":
          this.dynamicTitle = "ضریب تکرار"
          return "ClsCIDigRepeat"
        case "Company_Info":
          this.dynamicTitle = "معرفی شرکت"
          return "AllCompanyInfo"
        case "URedirectName":
          this.dynamicTitle = "نام تابعه"
          return "ClsCIRedirectName"
        case "UCompany_Info":
          this.dynamicTitle = "عملیات اجرایی"
          return "ClsCICompanyType"
        case "USection":
          this.dynamicTitle = "مقاطع"
          return "ClsCISection"
        case "UProject":
          this.dynamicTitle = "عنوان پروژه"
          return "ClsCIProject"
        case "UBlackListCause":
          this.dynamicTitle = "ورود به لیست کنترلی"
          return "ClsCIBlackListCause"
        case "UInstrument":
          this.dynamicTitle = "ادوات ترافیکی"
          return "CIInstrument"
        case "UScouring":
          this.dynamicTitle = "نظافت"
          return "ClsCIScouring"
        case "UPosition":
          this.dynamicTitle = "سمت"
          return "ClsCIPosition"
        case "USmsInfo":
          this.dynamicTitle = "اطلاعات ارسال SMS"
          return "ClsSmsInfo"
        case "URepairCost":
          this.dynamicTitle = "بهای ترمیم"
          return "ClsRepairCost"
        case "URunMonitoring":
          this.dynamicTitle = "شرح چک لیست"
          return "ClsCIRunMonitoring"
        case "URunMonitoringType":
          this.dynamicTitle = "واحد نظارت"
          return "ClsCIRunMonitoringType"
        case "URunMonitoringStatus":
          this.dynamicTitle = "وضعیت نظارت"
          return "ClsCIRunMonitoringStatus"
        case "UInstallation":
          this.dynamicTitle = "تاسیسات"
          return "ClsCIInstallation"
        case "UCauseRenewal":
          this.dynamicTitle = "علت تمدید"
          return "ClsCICauseRenewal"
        case "UDelivery_InstallationsType":
          this.dynamicTitle = "اقدامات و خسارت واردشده"
          return "ClsCIDeliveryInstallationsType"
        case "UDefectsSubject":
          this.dynamicTitle = "اعلام نواقص"
          return "ClsCIDefectsSubject"

        default:
          this.dynamicTitle = ""
          return ""
      }
    },

    changeTab (tab) {
      this.loadTabService(this.getTabServiceName(tab))
    },

    loadTabService (serviceName) {
      let convertToServicePath =
        serviceName.replace("CI", "CI_") || undefined
      if (!serviceName || !convertToServicePath) return
      this.showLoading()

      this.$services.excavation[`get${serviceName}`]({})
        .then(({ data }) => {
          this.serviceResultLoad = this.getResponse(data)

          if (this.serviceResultLoad.success) {
            if (convertToServicePath === "ClsCI_DeliveryInstallationsType") {
              convertToServicePath = "ClsCI_Delivery_InstallationsType"
            }
            this.dataContext =
              this.serviceResultLoad.data[`Get${convertToServicePath}Result`] ||
              []
            this.log({
              action: this.logActions.view,
              bizCode: "",
              bizCodeTitle: "",
              saveDesc: `loading ${this.serviceName}`
            })
          }
        })
        .catch((ex) => {
          console.error(ex)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    async saveTabService () {
      let serviceName = this.getTabServiceName(
        this.selectedLists.currentSelectedKey
      )
      let keyInPayload = ""
      let masterKeyInPayload = ""
      if (!serviceName) return
      this.showLoading()
      if (serviceName.includes("ClsCI")) {
        masterKeyInPayload = serviceName.replace("ClsCI", "ClsCI_")
        keyInPayload = serviceName.replace("ClsCI", "CI_")
      } else if (serviceName.includes("CI")) {
        masterKeyInPayload = serviceName.replace("CI", "ClsCI_")
        keyInPayload = serviceName.replace("CI", "CI_")
      } else if (serviceName.includes("Cls")) {
        masterKeyInPayload = serviceName.replace("Cls", "Cls")
        keyInPayload = serviceName
      }
      try {
        switch (keyInPayload) {
          case "CI_DigType":
            keyInPayload = "DigType"
            break
          case "CI_DigTime":
            keyInPayload = "DigTime"
            break
          case "CI_BlackListCause":
            keyInPayload = "BlackListCause"
            break
          case "CI_Region":
            keyInPayload = "ClRegion"
            break
          case "ClsRepairCost":
            keyInPayload = "RepairCost"
            break
          case "CI_Installation":
            keyInPayload = "CI_Installations"
            break
          case "ClsSmsInfo":
            keyInPayload = "SmsInfo"
            break
          case "CI_DeliveryInstallationsType":
            masterKeyInPayload = "ClsCI_Delivery_InstallationsType"
            keyInPayload = "CI_Delivery_InstallationsType"
            break
          default:
            break
        }
        const helpdataContext = this.dataContext[Object.keys(this.dataContext)[0]]
        let valueInPayload = []
        if (keyInPayload === "SmsInfo") {
          valueInPayload = helpdataContext.map((i) => {
            return {
              ...i,
              "AreaCode": "test"
            }
          })
        } else if (keyInPayload === "RepairCost") {
          valueInPayload = helpdataContext.map((i) => {
            return {
              ...i,
              "NIdRepairCost": "1"
            }
          })
        } else {
          valueInPayload = helpdataContext
        }
        const payload = {
          [masterKeyInPayload]: {
            [keyInPayload]: valueInPayload
          }
        }
        const { data } = await this.$services.excavation[`save${serviceName}`](payload)
        this.serviceResultSave = this.getResponse(data)
        if (this.serviceResultSave.success) {
          this.showSuccess("عملیات با موفقیت انجام شد!")
          this.isEditable = false
          this.log({
            action: this.logActions.save,
            bizCode: "",
            bizCodeTitle: "",
            saveDesc: `saving`
          })
        }
      } catch (error) {
        console.error(error)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    }
  }
}
</script>
