<template>
  <fit>
    <safa-splitter v-model="splitterValueHorizontalOuter" horizontal>
      <template v-slot:before>
        <fit>
          <safa-splitter v-model="splitterVertical" vertical>
            <template v-slot:before>
              <fit>
                <safa-splitter
                  v-model="splitterValueHorizontalInner"
                  horizontal
                >
                  <template v-slot:before>
                      <safa-grid
                        title="طرح و کاربری مصوب"
                        v-model="value.Base_PlanMosavab"
                        :columns="patternAndRegisterdUsingColumn"
                        fit
                        min-height="150px"
                        height="100%"
                        max-height="100%"
                        :m="m"
                        :showRowNumber="false"
                        :show-selected-checkbox="false"
                        :allowMultipleSelection="false"
                      />
                  </template>
                  <template v-slot:after>
                      <safa-grid
                        title="طرح و کاربری مجاز"
                        v-model="value.Base_PlanMojaz"
                        :columns="patternAndAllowedUsingColumn"
                        fit
                        min-height="150px"
                        height="100%"
                        max-height="100%"
                        :m="m"
                        :showRowNumber="false"
                        :show-selected-checkbox="false"
                        :allowMultipleSelection="false"
                      />
                  </template>
                </safa-splitter>
              </fit>
            </template>
            <template v-slot:after>
              <fit>
                <safa-sketch
                  class="fit"
                  :readonly="m == 'r'"
                  :sketch-id="croqieGuid"
                />
              </fit>
            </template>
          </safa-splitter>
        </fit>
      </template>
      <template v-slot:after>
          <safa-grid
            title="مشخصات درها"
            v-model="value.Base_Door"
            :columns="doorPropertyColumn"
            fit
            min-height="150px"
            height="100%"
            max-height="100%"
            :m="m"
            :showRowNumber="false"
            :show-selected-checkbox="false"
            :allowMultipleSelection="false"
          />
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
    },
    croqieGuid: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      splitterValueHorizontalOuter: 70,
      splitterVertical: 50,
      splitterValueHorizontalInner: 50,

      doorPropertyColumn: [
        {
          field: "CI_DoorType",
          editor: "combo",
          domain: "Estate",
          title: "نوع",
          width: ""
        },
        {
          field: "CI_SideCode",
          editor: "combo",
          domain: "Estate",
          title: "جهت",
          width: ""
        },
        { field: "DoorCount", title: "تعداد", width: "" },
        { field: "DoorWidth", title: "عرض", width: "" },
        { field: "DoorDepth", title: "عمق", width: "" }
      ],
      patternAndRegisterdUsingColumn: [
        {
          field: "CI_PlanType",
          editor: "combo",
          domain: "Estate",
          title: "نوع طرح",
          width: ""
        },
        {
          field: "CI_PlanUsingType",
          editor: "combo",
          domain: "Estate",
          title: "کاربری طرح",
          width: ""
        },
        {
          field: "CI_PlanUsingMojaz",
          editor: "combo",
          domain: "Estate",
          title: "استفاده مجاز",
          width: ""
        },
        {
          field: "CI_BuildingPosition",
          editor: "combo",
          domain: "Estate",
          title: "موقعیت ساختمان",
          width: ""
        },
        { field: "DensityPercent", title: "درصد تراکم", width: "" }
      ],
      patternAndAllowedUsingColumn: [
        {
          field: "CI_PlanType",
          editor: "combo",
          domain: "Estate",
          title: "نوع طرح",
          width: ""
        },
        {
          field: "CI_PlanUsingType",
          editor: "combo",
          domain: "Estate",
          title: "کاربری طرح",
          width: ""
        },
        {
          field: "CI_PlanUsingMojaz",
          editor: "combo",
          domain: "Estate",
          title: "استفاده مجاز",
          width: ""
        },
        {
          field: "CI_BuildingPosition",
          editor: "combo",
          domain: "Estate",
          title: "موقعیت ساختمان",
          width: ""
        },
        { field: "DensityPercent", title: "درصد تراکم", width: "" }
      ]
    }
  }
}
</script>
