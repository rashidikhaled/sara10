<template>
  <fit>
    <safa-splitter v-model="horizontalSplitterModel" horizontal>
      <template v-slot:before>
        <safa-grid
          title="مصوبه"
          v-model="value.Session_Decision"
          helper="Session_Decision_Col"
          :suppressRowClickSelection="false"
          fit
          paginate
          cdcName="Session_Decision"
          :m="m"
          spId="1E98AF9C-734B-4EBB-9092-7ECF603E056A"
        />
      </template>
      <template v-slot:after>
        <fit>
          <safa-grid
            title="پیگیری های مصوبه"
            v-model="value.Session_DecisionPursuit"
            helper="Session_DecisionPursuit_Col"
            :suppressRowClickSelection="false"
            fit
            paginate
            cdcName="Session_DecisionPursuit"
            :m="m"
            spId="D2D044BB-678F-4FC7-9D15-D42DF0C96CD1"
          />
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
export default {
  props: {
    m: { type: String },
    value: { type: Object, default: () => {} }
  },
  data () {
    return {
      name: "Approvals",
      horizontalSplitterModel: 50,
      Session_DecisionPursuit_Col: [
        {
          field: "PersonName",
          title: "نام شخص پیگیری کننده",
          width: "100px"
        },
        {
          field: "DecisionPursuitDate",
          title: "تاریخ پیگیری",
          editor: "date",
          width: "100px"
        },
        {
          field: "Summary",
          title: "خلاصه پیگیری",
          width: "100px"
        },
        {
          field: "CI_DecisionPursuitResult",
          title: " نتیجه پیگیری",
          domain: "Estate",
          editor: "combo",
          width: "100px"
        },
        {
          field: "Description",
          title: " شرح پیگیری",
          width: "auto"
        }
      ]
    }
  },
  methods: {}
}
</script>
