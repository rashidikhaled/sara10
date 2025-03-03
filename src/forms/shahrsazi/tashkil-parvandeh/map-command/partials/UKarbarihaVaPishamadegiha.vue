<template>
  <fit>
    <safa-splitter v-model="splitterModel" vertical class="fit" margin="0">
      <!-- helper="karbarihaInMapCommand" -->
      <template v-slot:before>
        <fit>
          <safa-grid
            title="کاربری ها"
            v-model="value.Base_Using"
            cdcName="Base_Using"
            helper="agMapCommandUsing"
            :m="m"
            :allowCopy="true"
            :actions="gridAction"
            :copyWithCount="true"
            fit
            selectable
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-grid
            title="پیش آمدگیها و سایر کاربریهای خاص"
            v-model="value.Base_Front"
            cdcName="Base_Front"
            :columns="baseFrontColumns"
            :m="m"
            :allowCopy="true"
            :copyWithCount="true"
            fit
          />
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>
<script>
import { GLOBAL_SETTINGS_GUID } from "src/config/SETTINGS_CONSTs"

const columnGenerateYear = {
  field: "GenerateDate",
  title: "سال احداث کاربری",
  width: "160px",
  editor: "ci",
  ciName: "CI_DutyYear",
  domain: "CI_SaraM1"
}
const columnGenerateDate = {
  field: "GenerateDate",
  title: "تاریخ احداث کاربری",
  editor: "date",
  width: "160px"
}
const columnConversionYear = {
  field: "ConversionDate",
  title: "سال تبدیل",
  width: "160px",
  editor: "ci",
  ciName: "CI_DutyYear",
  domain: "CI_SaraM1"
}
const columnConversionDate = {
  field: "ConversionDate",
  title: "تاریخ تبدیل",
  editor: "date",
  width: "160px"
}
export default {
  data () {
    return {
      karbarihaItems: [],
      pishAmadegihaItems: [],
      splitterModel: 50,
      gridAction: ["copy", "add", "delete"],
      Chk_GenerateYear: false
    }
  },
  props: {
    value: Object,
    m: {
      type: String,
      default: "e"
    }
  },
  computed: {
    baseFrontColumns () {
      return [
        {
          field: "isSelectedNode",
          title: "",
          width: "74px",
          filterable: true,
          headerCheckboxSelection: true,
          lockPosition: true,
          pinned: "right",
          editor: "selection"
        },
        {
          field: "BuildingNo",
          title: "شماره ساختمان ",
          width: "98px",
          editor: "numeric"
        },
        {
          field: "FloorNo",
          title: " شماره طبقه",
          width: "74px",
          editor: "numeric"
        },
        {
          field: "FrontArea",
          title: "مساحت پيش آمدگي",
          width: "116px",
          cell: "decimal"
        },
        {
          field: "FrontHeight",
          title: "ارتفاع",
          width: "70px",
          editor: "numeric"
        },
        {
          field: "FrontWidth",
          title: "عرض",
          width: "70px",
          editor: "numeric"
        },
        {
          field: "FrontLength",
          title: "طول",
          width: "70px",
          editor: "numeric"
        },
        {
          field: "FrontDepth",
          title: "عمق",
          width: "70px",
          editor: "numeric"
        },
        {
          field: "CI_SideCode",
          title: "جهت معبر",
          domain: "CI_SaraM1",
          width: "119px",
          editor: "combo"
        },
        // {
        //   field: "CI_UsingGroup",
        //   title: "کاربری اصلی / نوع استفاده فرعی",
        //   label: "کاربری اصلی / نوع استفاده فرعی",
        //   cell: "UsingGroupTemplate",
        //   width: "260px",
        //   options: {
        //     serviceUrl: "GetCI_UsingType_FromCI_UsingGroup",
        //     responseKey: "CI_UsingType_FromCI_UsingGroup",
        //     paramName: "pCI_UsingGroup",
        //     from: {
        //       domainName: "CI_SaraM1",
        //       ciName: "CI_UsingGroup",
        //       field: "CI_UsingGroup"
        //     },
        //     to: {
        //       field: "CI_UsingType"
        //     }
        //   }
        // },
        {
          field: "CI_UsingGroup",
          domain: "CI_SaraM1",
          title: "کاربری اصلی",
          width: 140,
          triggerCells: [["CI_UsingType"]],
          filter: "agMultiColumnFilter"
        },
        {
          field: "CI_UsingType",
          title: "نوع استفاده فرعی",
          width: 150,
          ignoreCi: true,
          editor: "ADPGridTemplate",
          params: {
            serviceUrl: "GetCI_UsingType_FromCI_UsingGroup",
            responseKey: "CI_UsingType_FromCI_UsingGroup",
            paramName: "pCI_UsingGroup",
            groupField: "CI_UsingGroup"
          },
          filter: "agMultiColumnFilter"
        },
        {
          field: "CI_FrontIs",
          title: "چگونگي پيش آمدگي",
          domain: "CI_SaraM1",
          editor: "combo",
          width: "120px"
        },
        {
          field: "CI_FrontPlace",
          title: "محل وقوع پيش آمدگي",
          domain: "CI_SaraM1",
          editor: "combo",
          width: "130px"
        },
        {
          field: "CI_RoofType",
          title: "نوع سقف",
          domain: "CI_SaraM1",
          editor: "combo",
          width: "116px"
        },
        {
          field: "CI_FrontRoofStatus",
          title: "وضعيت سقف پيش آمدگي",
          domain: "CI_SaraM1",
          editor: "combo",
          width: "154px"
        },
        {
          field: "CI_FrontType",
          title: "نوع پيش آمدگي",
          domain: "CI_SaraM1",
          editor: "combo",
          width: "120px"
        },
        {
          field: "CI_FrontStatus",
          title: "وضعیت پيش آمدگي",
          domain: "CI_SaraM1",
          editor: "combo",
          width: "121px"
        },
        {
          field: "CI_BuildingStep",
          title: "مرحله ساختماني",
          domain: "CI_SaraM1",
          editor: "combo",
          width: "124px"
        },
        {
          field: "UnitNo",
          title: "شماره واحد",
          width: "73px",
          editor: "numeric"
        },
        {
          ...(this.Chk_GenerateYear ? columnGenerateYear : columnGenerateDate)
        },
        {
          ...(this.Chk_GenerateYear
            ? columnConversionYear
            : columnConversionDate)
        }
      ]
    }
  },
  created () {
    this.reloadSettings()
  },

  methods: {
    async reloadSettings () {
      try {
        const settings = await this.$stKartable.dispatch(
          "formSettings/getSettings",
          {
            key: "BuildingSettings",
            defaultValue: { ShahrsaziSettings: { Chk_GenerateYear: false } },
            nidProc: GLOBAL_SETTINGS_GUID // unique guid for global settings
          }
        )
        this.Chk_GenerateYear =
          (settings &&
            settings.ShahrsaziSettings &&
            settings.ShahrsaziSettings.Chk_GenerateYear) ||
          false
        this.$nextTick().then(() => {
          if (this.$refs.karbariha && this.$refs.karbariha.fetchColumns)
          { this.$refs.karbariha.fetchColumns() }
        })
      } catch (e) {
        this.showError("خطا در سرویس توضیحات رخ داده است.")
      }
    }
  }
}
</script>
