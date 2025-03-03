<template>
    <fit>
      <div class="row q-col-gutter-sm q-mb-sm">
        <form-control>
          <safa-text
            label="مساحت طبق سند"
            type="decimal"
            v-model="DocArea"
            label-width="100px"
          ></safa-text>
        </form-control>

        <form-control>
          <safa-text
            label="مساحت وضع موجود"
            type="decimal"
            v-model="CurrentArea"
            label-width="100px"
          ></safa-text>
        </form-control>

        <form-control>
          <safa-text
            label="مساحت پس از رعایت بر اصلاحی"
            type="decimal"
            v-model="AreaAfterEdit"
            label-width="100px"
          ></safa-text>
        </form-control>
      </div>

      <div class="row q-col-gutter-sm q-mb-sm">
        <form-control>
          <safa-text
            label="مساحت باقیمانده"
            type="decimal"
            v-model="RemainArea"
            label-width="100px"
          ></safa-text>
        </form-control>

        <form-control>
          <safa-text
            label="حق ممر"
            v-model="MamarArea"
            label-width="100px"
          ></safa-text>
        </form-control>

        <form-control>
          <safa-text
            label="بخش ثبتی"
            v-model="RegisterSection"
            label-width="100px"
          ></safa-text>
        </form-control>
      </div>

      <div class="row q-col-gutter-sm q-mb-sm">
        <form-control>
          <safa-text
            label="طول دیوار"
            v-model="WallLen"
            label-width="100px"
          ></safa-text>
        </form-control>

        <form-control>
          <safa-combo
            label="نوع سند"
            label-width="100px"
            ciName="CI_DocType"
            domainName="CI_SaraM1"
            v-model="DocType"
            m="e"
          ></safa-combo>
        </form-control>

        <form-control>
          <safa-combo
            label="وضعیت سند"
            label-width="100px"
            ciName="CI_DocStatus"
            domainName="CI_SaraM1"
            v-model="DocStatus"
            m="e"
          ></safa-combo>
        </form-control>

        <form-control>
          <safa-combo
            label="وضعیت ملک"
            label-width="100px"
            ciName="CI_HouseStatus"
            domainName="CI_SaraM1"
            v-model="HouseStatus"
            m="e"
          ></safa-combo>
        </form-control>

        <form-control>
          <safa-combo
            label="موقعیت زمین"
            label-width="100px"
            ciName="CI_GeoStatus"
            domainName="CI_SaraM1"
            v-model="GeoStatus"
            m="e"
          ></safa-combo>
        </form-control>

        <form-control>
          <safa-combo
            label="نوع مالکیت"
            label-width="100px"
            v-model="OwnerType"
            m="e"
            ciName="CI_OwnerType"
            domainName="CI_SaraM1"
          ></safa-combo>
        </form-control>

        <form-control>
          <safa-combo
            label="مرحله ساختمانی"
            label-width="100px"
            ciName="CI_BuildingStep"
            domainName="CI_SaraM1"
            v-model="BuildingStep"
            m="e"
          ></safa-combo>
        </form-control>

        <form-control>
          <safa-combo
            label="نوع استخر"
            label-width="100px"
            ciName="CI_PoolType"
            domainName="CI_SaraM1"
            v-model="PoolType"
            m="e"
          ></safa-combo>
        </form-control>

        <form-control>
          <safa-combo
            label="نوع گلخانه"
            label-width="100px"
            ciName="CI_GlasshouseType"
            domainName="CI_SaraM1"
            v-model="GlasshouseType"
            m="e"
          ></safa-combo>
        </form-control>

        <form-control>
          <safa-text
            label="مساحت استخر"
            v-model="PoolArea"
            label-width="100px"
          ></safa-text>
        </form-control>

        <form-control>
          <safa-text
            label="حجم استخر"
            v-model="PoolCubature"
            label-width="100px"
          ></safa-text>
        </form-control>

        <form-control>
          <safa-text
            label="مساحت گلخانه"
            v-model="GlasshouseArea"
            label-width="100px"
          ></safa-text>
        </form-control>

        <form-control>
          <safa-combo
            label="نوع چاه"
            label-width="100px"
            ciName="CI_ShaftType"
            domainName="CI_SaraM1"
            v-model="ShaftType"
            m="e"
          ></safa-combo>
        </form-control>

        <form-control>
          <safa-text
            label="تعداد چاه"
            v-model="DeepShaftCount"
            label-width="100px"
          ></safa-text>
        </form-control>

        <form-control>
          <safa-text
            label="مساحت اعیان"
            v-model="AyanArea"
            label-width="100px"
          ></safa-text>
        </form-control>

        <form-control>
          <safa-combo
            label="نوع کاربری"
            label-width="100px"
            ciName="CI_UsingType"
            domainName="CI_SaraM1"
            v-model="UsingType"
            m="e"
          ></safa-combo>
        </form-control>

        <form-control>
          <safa-combo
            label="نوع اولویت صلح نامه"
            label-width="100px"
            ciName="CI_ContractPriorityType"
            domainName="CI_SaraM1"
            v-model="ContractPriorityType"
            m="e"
          ></safa-combo>
        </form-control>
      </div>

      <safa-datatable
        title="پلاک ثبتی"
        fit
        min-height="100px"
        height="100%"
        max-height="100%"
        v-model="registeredPlack"
        helper="registeredPlackColumns"
        :m="mode"
        :take="20"
        :addRow="false"
        :allowCopy="false"
        :deleteRow="false"
        :isEditable="true"
      />
    </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],

  data () {
    return {
      name: "Specifications",
      GlasshouseArea: "",
      MamarArea: "",
      CurrentArea: "",
      AyanArea: "",
      RemainArea: "",
      PoolArea: "",
      DocArea: "",
      AreaAfterEdit: "",
      RegisterSection: "",
      WallLen: "",
      DocType: "",
      DocStatus: "",
      HouseStatus: "",
      GeoStatus: "",
      OwnerType: "",
      BuildingStep: "",
      PoolCubature: "",
      ShaftType: "",
      DeepShaftCount: "",
      UsingType: "",
      ContractPriorityType: "",
      PoolType: "",
      GlasshouseType: "",

      registeredPlack: []
      // registeredPlackColumns: [
      //   {
      //     field: "CI_RegisterPlackTypeGroup",
      //     title: " گروه نوع پلاک ثبتی",
      //     editor: "combo",
      //     domain: "Estate",
      //     cell: "grid-combo",
      //   },
      //   {
      //     field: "CI_RegisterPlackType",
      //     title: "نوع پلاک ثبتی",
      //     editor: "combo",
      //     domain: "Estate",
      //     cell: "grid-combo",
      //   },
      //   { field: "Priority", title: " اولویت" },
      //   { field: "RegisterPlackTypeValue", title: "مقدار" },
      // ],
    }
  }
}
</script>
