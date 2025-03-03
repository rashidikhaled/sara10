<template>
    <fit>
      <FormRow class="q-my-sm">
        <FormControl>
          <safa-combo
            label="محل وقوع ساختمان"
            label-width="90px"
            v-model="value.Base_BuildingInfo.CI_BuildingPosition"
            :m="m"
            ciName="CI_BuildingPosition"
            domainName="Estate"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            label="الگوی ساخت"
            label-width="90px"
            v-model="value.Base_BuildingInfo.CI_CreateDesign"
            :m="m"
            ciName="CI_CreateDesign"
            domainName="Estate"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            label="نوع نما"
            label-width="90px"
            v-model="value.Base_BuildingInfo.CI_ViewCode"
            :m="m"
            ciName="CI_ViewCode"
            domainName="Estate"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="مساحت نما"
            label-width="90px"
            v-model="value.Base_BuildingInfo.ViewArea"
            :m="m"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            label="نوع سقف"
            label-width="90px"
            v-model="value.Base_BuildingInfo.CI_RoofType"
            :m="m"
            ciName="CI_RoofType"
            domainName="Estate"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            label="وضعیت تاریخی بنا"
            label-width="90px"
            v-model="value.Base_BuildingInfo.CI_HistoricalStatus"
            :m="m"
            ciName="CI_HistoricalStatus"
            domainName="Estate"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="ارتفاع تا کف معبر بالا"
            label-width="90px"
            v-model="value.Base_BuildingInfo.UpperHeight"
            :m="m"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="قدمت ساختمان بعد از"
            label-width="90px"
            v-model="value.Base_BuildingInfo.CreateYearFrom"
            :m="m"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="مساحت کل زیربنا"
            label-width="90px"
            v-model="value.Base_BuildingInfo.InfrastructureArea"
            :m="m"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="ارتفاع تا کف معبر پایین"
            label-width="90px"
            v-model="value.Base_BuildingInfo.DownerHeight"
            :m="m"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="قدمت ساختمان قبل از"
            label-width="90px"
            v-model="value.Base_BuildingInfo.CreateYearTo"
            :m="m"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="تراکم مجاز در پروانه ساختمانی"
            label-width="90px"
            v-model="value.Base_BuildingInfo.AllowableDensityLicence"
            :m="m"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            label="وضعیت استحکام بنا"
            label-width="90px"
            v-model="value.Base_BuildingInfo.CI_StableStatus"
            :m="m"
            ciName="CI_StableStatus"
            domainName="Estate"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="سطح اشغال"
            label-width="90px"
            v-model="value.Base_BuildingInfo.BusyArea"
            :m="m"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="مساحت نورگیر"
            label-width="90px"
            v-model="value.Base_BuildingInfo.LightfastArea"
            :m="m"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            label="تاریخ شروع عملیات ساختمانی"
            label-width="90px"
            v-model="value.Base_BuildingInfo.StartDate"
            :m="m"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="ارتفاع نهایی"
            label-width="90px"
            v-model="value.Base_BuildingInfo.Height"
            :m="m"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            label="بهره بردار"
            label-width="90px"
            v-model="value.Base_BuildingInfo.CI_HouseUser"
            :m="m"
            ciName="CI_HouseUser"
            domainName="Estate"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            label="تاریخ اتمام عملیات ساختمانی"
            label-width="90px"
            v-model="value.Base_BuildingInfo.EndDate"
            :m="m"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="جان پناه"
            label-width="90px"
            v-model="value.Base_BuildingInfo.Defilade"
            :m="m"
          />
        </FormControl>
      </FormRow>
      <safa-splitter v-model="splitterValue" vertical>
        <template v-slot:before>
          <fit>
            <safa-grid
              v-model="value.Base_Installation"
              :columns="utilityColumn"
              fit
              title="تاسیسات"
              min-height="150px"
              height="100%"
              max-height="100%"
              :m="m"
              :showRowNumber="false"
              :show-selected-checkbox="false"
              :allowMultipleSelection="false"
            />
          </fit>
        </template>
        <template v-slot:after>
          <fit>
            <safa-grid
              v-model="value.Base_SupplyParking"
              :columns="providingParckingWayColumn"
              fit
              title="نحوه تامین پارکینگ"
              min-height="150px"
              height="100%"
              max-height="100%"
              :m="m"
              :showRowNumber="false"
              :show-selected-checkbox="false"
              :allowMultipleSelection="false"
            />
          </fit>
        </template>
      </safa-splitter>
    </fit>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      required: true
    },
    m: {
      type: String,
      default: "r"
    }
  },

  data () {
    return {
      splitterValue: 50,

      utilityColumn: [
        { field: "InstallationValue", title: "کد نوع تاسیسات", width: "" },
        { field: "InstallationValue", title: "مقدار", width: "" }
      ],
      utilityList: [],
      providingParckingWayColumn: [
        {
          field: "CI_SupplyParkingType",
          editor: "combo",
          domain: "Estate",
          title: "کد نوع تامین پارکینگ",
          width: ""
        },
        {
          field: "CI_SupplyParkingHow",
          editor: "combo",
          domain: "Estate",
          title: "کد نحوه تامین پارکینگ",
          width: ""
        },
        {
          field: "CI_OwnerParkingType",
          editor: "combo",
          domain: "Estate",
          title: "کد نوع مالکیت پارکینگ",
          width: ""
        },
        { field: "FloorNo", title: "شماره طبقه", editor: "numeric", width: "" },
        { field: "DoorCount", title: "تعداد درب", width: "" },
        { field: "Area", title: "مساحت", width: "" }
      ],
      providingParckingWayList: []
    }
  }
}
</script>
