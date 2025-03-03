<template>
    <fit>
      <safa-splitter v-model="horizontalSplitterModel" horizontal>
        <template v-slot:before>
          <fit>
            <safa-datatable
              title="طرح و کاربری منصوب"
              fit
              min-height="100px"
              height="100%"
              max-height="100%"
              v-model="placedUsingAndDesign"
              helper="placedUsingAndDesignColumns"
              :m="mode"
              :take="20"
              :addRow="false"
              :allowCopy="false"
              :deleteRow="false"
              :isEditable="true"
              class="q-mb-sm"
            />
          </fit>
        </template>

        <template v-slot:after>
          <fit>
            <safa-datatable
              title="طرح و کاربری مجاز"
              fit
              min-height="100px"
              height="100%"
              max-height="100%"
              v-model="mojazUsingAndDesign"
              helper="mojazUsingAndDesignColumns"
              :m="mode"
              :take="20"
              :addRow="false"
              :allowCopy="false"
              :deleteRow="false"
              :isEditable="true"
              class="q-mb-sm"
            />
          </fit>
        </template>

        <safa-text
          type="textarea"
          label="کروکی"
          label-width="53px"
          v-model="address"
          m="r"
          class="q-mb-sm"
        />

        <div>
          <btn-default label="مشاهده" @click="showDrawingPatern = true" />
        </div>

        <safa-popup
          v-model="showDrawingPatern"
          width="800px"
          height="600px"
          title="رسم کروکی"
        ></safa-popup>
      </safa-splitter>
    </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],

  data () {
    return {
      name: "Patern",
      showDrawingPatern: false,
      horizontalSplitterModel: 50,

      placedUsingAndDesign: [],
      // placedUsingAndDesignColumns: [
      //   {
      //     field: "CI_PlanType",
      //     title: "نوع طرح",
      //     editor: "combo",
      //     domain: "estate",
      //     cell: "grid-combo",
      //   },
      //   {
      //     field: "CI_PlanUsingType",
      //     title: " کاربری طرح",
      //     editor: "combo",
      //     domain: "estate",
      //     cell: "grid-combo",
      //   },
      //   {
      //     field: "CI_PlanUsingMojaz",
      //     title: " استفاده مجاز",
      //     editor: "combo",
      //     domain: "estate",
      //     cell: "grid-combo",
      //   },
      //   {
      //     field: "CI_BuildingPosition",
      //     title: " موقعیت ساختمان",
      //     editor: "combo",
      //     domain: "estate",
      //     cell: "grid-combo",
      //   },
      //   { field: "DensityPercent", title: "درصد تراکم" },
      // ],

      mojazUsingAndDesign: []
      // mojazUsingAndDesignColumns: [
      //   {
      //     field: "CI_PlanType",
      //     title: "نوع طرح",
      //     editor: "combo",
      //     domain: "estate",
      //     cell: "grid-combo",
      //   },
      //   {
      //     field: "CI_PlanUsingType",
      //     title: " کاربری طرح",
      //     editor: "combo",
      //     domain: "estate",
      //     cell: "grid-combo",
      //   },
      //   {
      //     field: "CI_PlanUsingMojaz",
      //     title: " استفاده مجاز",
      //     editor: "combo",
      //     domain: "estate",
      //     cell: "grid-combo",
      //   },
      //   {
      //     field: "CI_BuildingPosition",
      //     title: " موقعیت ساختمان",
      //     editor: "combo",
      //     domain: "estate",
      //     cell: "grid-combo",
      //   },
      //   { field: "DensityPercent", title: "درصد تراکم" },
      // ],
    }
  }
}
</script>
