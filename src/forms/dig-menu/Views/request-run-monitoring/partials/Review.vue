<template>
  <fit>
    <safa-splitter v-model="spliterModel">
      <template v-slot:before>
        <safa-list
          :items="priceTitles"
          actions
          cdcName="priceTitles"
          titleField="CITableNameTitle"
        />
      </template>
      <template v-slot:after>
        <fit>
          <form-row :xs="1" :sm="1" :md="4" :lg="4" :xl="4">
            <form-control>
              <safa-text
                label="نام کاربری"
                label-width="120px"
                v-model="UserName"
                cdcName="UserName"
                :m="'r'"
              />
            </form-control>
            <form-control>
              <safa-datepicker
                label="تاریخ"
                label-width="120px"
                v-model="Date"
                cdcName="Date"
                :m="'r'"
              />
            </form-control>
            <form-control>
              <safa-datepicker
                label="تاریخ واقعی اتمام"
                label-width="120px"
                v-model="ActualCompletionDate"
                cdcName="ActualCompletionDate"
                :m="'r'"
              />
            </form-control>
            <form-control>
              <safa-datepicker
                label="تاریخ دوره تضمین"
                v-model="GuaranteePeriodEndDate"
                cdcName="GuaranteePeriodEndDate"
                label-width="120px"
                :m="'r'"
              />
            </form-control>
          </form-row>
          <safa-grid
            title="نظارت و اجرا"
            v-model="Review"
            :columns="columns"
            height="99%"
            max-height="100%"
            min-height="100px"
            m="r"
            fit
            class="q-mt-sm"
          />
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      Review: [],
      spliterModel: 15,
      priceTitles: [],
      tozihatTasmim: "",
      columns: [
        {
          field: "isSelectedNode",
          title: "ردیف",
          width: "74px",
          filterable: true,
          lockPosition: true
        },
        {
          field: "CI_RunMonitoring",
          title: "شرح",
          editor: "combo",
          domain: "Dig",
          width: "110px"
        },
        {
          field: "CI_RunMonitoringType",
          title: "نوع",
          editor: "combo",
          domain: "Dig",
          width: "110px"
        },
        {
          field: "Value",
          title: "مقدار",
          width: "110px"
        },
        {
          field: "CI_RunMonitoringStatus",
          title: "وضعیت",
          editor: "combo",
          domain: "Dig",
          width: "110px"
        },
        {
          field: "Score",
          title: "کارهای انجام شده (درصد) ",
          width: "170px"
        },
        {
          field: "ScoreValue",
          title: "جریمه ( ریال)",
          width: "150px"
        },
        {
          field: "Desc",
          title: "توضیحات",
          width: "400px"
        }
      ]
    }
  },
  methods: {}
}
</script>
