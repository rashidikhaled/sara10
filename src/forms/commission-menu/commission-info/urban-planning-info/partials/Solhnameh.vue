<template>
  <fit>
    <safa-tabs v-model="activeTab">
      <template v-slot:tabs>
        <tab-menu name="peacefulUses" label="کاربری های صلح شده" />
        <tab-menu name="determiningPeace" label="تعیین صلح" />
        <tab-menu name="parameters" label="پارامتر ها" />
        <tab-menu name="description" label="توضیحات" />
      </template>

      <tab-content name="peacefulUses" :padding="false">
        <fit>
          <safa-splitter class="fit" horizontal v-model="gridSplitter">
            <template v-slot:before>
              <fit>
                <safa-datatable
                  :columns="karbariha"
                  v-model="model.Base_Using"
                  cdcName="Base_Using"
                  title="کاربری ها"
                  fit
                  height="100%"
                  min-height="200px"
                  max-height="100%"
                  m="r"
                  class="q-mb-sm"
                  :show-selected-checkbox="true"
                  :allowMultipleSelection="false"
                  :addRow="false"
                  :deleteRow="false"
                  :allowCopy="false"
                />
              </fit>
            </template>
            <template v-slot:after>
              <fit>
                <safa-datatable
                  :columns="pishamadegiAndOther"
                  title="پیشامدگی ها و سایر کاربری های خاص"
                  v-model="model.Base_Front"
                  cdcName="Base_Front"
                  fit
                  height="100%"
                  min-height="200px"
                  max-height="100%"
                  m="r"
                  class="q-mb-sm"
                  :show-selected-checkbox="true"
                  :allowMultipleSelection="false"
                  :addRow="false"
                  :deleteRow="false"
                  :allowCopy="false"
                />
              </fit>
            </template>
          </safa-splitter>
        </fit>
      </tab-content>
      <tab-content name="determiningPeace" :padding="false">
        <fit>
          <safa-datatable
            :columns="solhOntheRoot"
            title="صلح مقدار در مسیر"
            v-model="model.Base_PlanForWork"
            cdcName="Base_PlanForWork"
            fit
            height="100%"
            min-height="200px"
            max-height="100%"
            m="r"
            class="q-mb-sm"
            :show-selected-checkbox="true"
            :allowMultipleSelection="false"
            :addRow="false"
            :deleteRow="false"
            :allowCopy="false"
          />
        </fit>
      </tab-content>
      <tab-content name="parameters" :padding="false">
        <fit>
          <safa-datatable
            :columns="parametersColumns"
            v-model="model.PeaceParameters"
            cdcName="PeaceParameters"
            title="پارامتر ها"
            fit
            height="100%"
            min-height="200px"
            max-height="100%"
            m="r"
            class="q-mb-sm"
            :show-selected-checkbox="true"
            :allowMultipleSelection="false"
            :addRow="false"
            :deleteRow="false"
            :allowCopy="false"
          />
        </fit>
      </tab-content>
      <tab-content name="description">
        <FormRow>
          <FormControl>
            <safa-combo
              ciName="CI_UsingConfirmRefrence"
              domainName="Commission100"
              label="مرجع تایید کاربری"
              v-model="model.Sh_Peace.CI_UsingConfirmRefrence"
              cdcName="CI_UsingConfirmRefrence"
              label-width="90px"
              m="r"
            />
          </FormControl>
          <text-template
            label="توضیحات صلحنامه"
            v-model="model.Sh_Peace.Comments"
            cdcName="Comments"
            label-width="90px"
            m="r"
          />
        </FormRow>
      </tab-content>
    </safa-tabs>
  </fit>
</template>

<script>
export default {
  props: {
    model: Object,
    default: () => {}
  },
  data () {
    return {
      name: "Solhnameh",
      activeTab: "peacefulUses",
      gridSplitter: 50,
      karbariha: [
        { field: "BuildingNo", title: "شماره ساختمان", width: "102px" },
        { field: "FloorNo", title: "شماره طبقه", width: "80px" },
        {
          field: "CI_UsingGroup",
          title: "کاربری اصلی / نوع استفاده فرعی",
          label: "کاربری اصلی / نوع استفاده فرعی",
          cell: "UsingGroupTemplate",
          width: "320px",
          options: {
            serviceUrl: "GetCI_UsingType_FromCI_UsingGroup",
            responseKey: "CI_UsingType_FromCI_UsingGroup",
            paramName: "pCI_UsingGroup",
            from: {
              domainName: "Commission100",
              ciName: "CI_UsingGroup",
              field: "CI_UsingGroup"
            },
            to: {
              field: "CI_UsingType"
            }
          }
        },
        { field: "UnitCount", title: "تعداد واحد", width: "70px" },
        {
          field: "UsingArea",
          title: "مساحت کاربری",
          width: "92px",
          cell: "grid-area-format"
        },
        { field: "UsefulHeight", title: "اتفاع مفید", width: "70px" },
        {
          field: "UnUsefulHeight",
          title: "ارتفاع کف تا کف",
          editor: "numeric",
          width: "150px"
        },
        { field: "GenerateDate", title: "تاریخ احداث کاربری", width: "110px" },
        {
          field: "CI_RoofType",
          title: "نوع سقف",
          domain: "Commission100",
          width: "150px"
        },
        { field: "CreateYearFrom", title: "قدمت ساختمان از", width: "101px" },
        { field: "CreateYearTo", title: "قدمت ساختمان تا", width: "98px" },
        { field: "RoofThickness", title: "ضخامت سقف", width: "80px" },
        { field: "Dahaneh", title: "دهنه متوسط", width: "75px" },
        {
          field: "CI_BuildingKind",
          title: "نوع ساختمان",
          domain: "Commission100",
          width: "150px"
        },
        {
          field: "CI_SazehType",
          title: "نوع سازه",
          domain: "Commission100",
          width: "150px"
        },
        {
          field: "CI_WallType",
          title: "جنس دیوار",
          domain: "Commission100",
          width: "150px"
        },
        {
          field: "CI_BuildingStep",
          title: "مرحله ساختمانی",
          domain: "Commission100",
          width: "170px"
        },
        { field: "ProgressPercent", title: "درصد پیشرفت", width: "80px" },
        {
          field: "EditUsingArea",
          title: "مساحت تغییر کاربری",
          width: "114px",
          cell: "grid-area-format"
        },
        { field: "UnitNo", title: "شماره واحد", width: "70px" },
        {
          field: "CI_HowChangeBuilding",
          title: "وضعیت زیربنا",
          domain: "Commission100",
          width: "150px"
        },
        {
          field: "BusyArea",
          title: "سطح اشغال",
          cell: "grid-area-format",
          width: "75px"
        },
        { field: "OverOnArea", title: "احداث مازاد بر سطح", width: "115px" },
        {
          field: "OverOnTarakom",
          title: "احداث مازاد بر تراکم",
          width: "111px"
        },
        {
          field: "OverOnLengthNear",
          title: "احداث مازاد بر طول مجاورین",
          width: "155px"
        },
        {
          field: "OverOrNoParvaneh",
          title: "احداث مازاد یا بدون پروانه",
          width: "140px"
        },
        {
          field: "IllegalInfrastructure",
          title: "زیربنای غیر مجاز در معبر",
          width: "140px"
        }
      ],
      pishamadegiAndOther: [
        {
          field: "BuildingNo",
          title: "شماره ساختمان",
          editor: "numeric"
        },
        {
          field: "FloorNo",
          title: "شماره طبقه",
          editor: "numeric"
        },
        {
          field: "FrontArea",
          title: "مساحت پيش آمدگي",
          editor: "numeric"
        },
        {
          field: "FrontHeight",
          title: "ارتفاع",
          editor: "numeric"
        },
        {
          field: "FrontWidth",
          title: "عرض",
          editor: "numeric"
        },
        {
          field: "FrontLength",
          title: "طول",
          editor: "numeric"
        },
        {
          field: "CI_SideCode",
          title: "جهت معبر",
          domain: "Commission100",
          editor: "combo"
        },
        {
          field: "CI_UsingGroup",
          title: "کاربری اصلی / نوع استفاده فرعی",
          label: "کاربری اصلی / نوع استفاده فرعی",
          cell: "UsingGroupTemplate",
          options: {
            serviceUrl: "GetCI_UsingType_FromCI_UsingGroup",
            responseKey: "CI_UsingType_FromCI_UsingGroup",
            paramName: "pCI_UsingGroup",
            from: {
              domainName: "Commission100",
              ciName: "CI_UsingGroup",
              field: "CI_UsingGroup"
            },
            to: {
              field: "CI_UsingType"
            }
          }
        },
        {
          field: "CI_FrontIs",
          title: "چگونگي پيش آمدگي",
          domain: "Commission100",
          editor: "combo"
        },
        {
          field: "CI_FrontPlace",
          title: "محل وقوع پيش آمدگي",
          domain: "Commission100",
          editor: "combo"
        },
        {
          field: "CI_FrontRoofStatus",
          title: "وضعيت سقف پيش آمدگي",
          domain: "Commission100",
          editor: "combo"
        },

        {
          field: "CI_FrontType",
          title: "نوع پيش آمدگي",
          domain: "Commission100",
          editor: "combo"
        },
        {
          field: "CI_FrontStatus",
          title: "وضعیت پيش آمدگي",
          domain: "Commission100",
          editor: "combo"
        },
        {
          field: "CI_BuildingStep",
          title: "مرحله ساختماني",
          domain: "Commission100",
          editor: "combo"
        },
        {
          field: "UnitNo",
          title: "شماره واحد"
        },
        {
          field: "GenerateDate",
          title: "تاریخ احداث کاربری",
          editor: "date"
        }
      ],
      solhOntheRoot: [
        {
          field: "CI_PeaceType",
          title: "نوع صلح",
          width: "120px",
          domain: "Commission100",
          editor: "combo"
        },
        {
          field: "Price",
          title: "  ریال- مجموع ارزش کارشناسی برآورد شده",
          width: "162px",
          editor: "numeric"
        },
        {
          field: "LetterNo",
          title: "شماره دبیرخانه",
          width: "82px",
          editor: "numeric"
        },
        { field: "LetterDate", title: "تاریخ دبیرخانه", width: "80px" },
        { field: "Confirms", title: "تأیید کنندگان", width: "auto" }
      ],
      parametersColumns: [
        {
          field: "Caption",
          title: "عنوان",
          width: "100px"
        },
        {
          field: "Value",
          title: "مقدار",
          width: "auto"
        }
      ]
    }
  }
}
</script>
