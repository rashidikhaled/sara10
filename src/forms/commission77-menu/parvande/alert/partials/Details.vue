<template>
  <fit>
    <safa-grid
      title=" محاسبات فیش"
      v-model="value.ClsRequest_Info.ListFicheInVote"
      cdcName="ListFicheInVote"
      helper="listFicheInVoteColumns77"
      class="q-mb-sm"
      fit
      height="100%"
      max-height="100%"
      min-height="200px"
      :show-selected-checkbox="true"
      :allowMultipleSelection="false"
      :addRow="false"
      :deleteRow="false"
      :allowCopy="false"
      />
    <safa-splitter v-model="splitterModel">
      <template #before>
        <safa-grid
          title="ریز محاسبات فیش"
          v-model="value.ClsRequest_Info.SubFicheDetail"
          cdcName="SubFicheDetail"
          m="r"
          fit
          helper="subCalculateColumns77"
          height="100%"
          max-height="100%"
          min-height="200px"
          :show-selected-checkbox="true"
          :allowMultipleSelection="false"
          :addRow="false"
          :deleteRow="false"
          :allowCopy="false"
          />
        <!-- @row-click="getRowDetail" -->
      </template>
      <template #after>
        <safa-grid
          title="جزئیات فیش"
          v-model="dutyFicheOtherFiled"
          cdcName="dutyFicheOtherFiled"
          helper="ficheDetailsColumns77"
          m="r"
          fit
          height="100%"
          max-height="100%"
          min-height="200px"
          :show-selected-checkbox="true"
          :allowMultipleSelection="false"
          :addRow="false"
          :deleteRow="false"
          :allowCopy="false"
        />
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
import converter from "xml-js"
export default {
  data () {
    return {
      dutyFicheOtherFiled: [],
      splitterModel: 50
    }
  },
  props: {
    value: {
      type: Object,
      default: () => {}
    },
    m: String
  },
  mounted () {
    this.getRowDetails()
    // this.getRowDetail(this.value.ClsRequest_Info.SubFicheDetail[0])
  },
  methods: {
    getRowDetails () {
      if (
        !this.value.ClsRequest_Info.SubFicheDetail &&
        this.value.ClsRequest_Info.SubFicheDetail.length === 0
      )
      { return }

      const logDetails = this.value.ClsRequest_Info.SubFicheDetail.map(
        (e) => e.DutyFicheOtherFiled
      ).filter(Boolean)

      if (logDetails.length > 0) {
        this.dutyFicheOtherFiled = logDetails
          .reduce((acc, item) => {
            if (!item) return acc

            const data = converter.xml2js(item, {
              compact: true,
              ignoreDoctype: true,
              ignoreCdata: true
            })

            if (data && data.ArrayOfClsLog && data.ArrayOfClsLog.ClsLog) {
              acc.push(...data.ArrayOfClsLog.ClsLog)
            }

            return acc
          }, [])
          .map((x) => {
            return {
              ...x,
              Subject: x.Subject._text,
              Value: x.Value._text,
              Comment: x.Comment._text
            }
          })
      } else {
        this.dutyFicheOtherFiled = []
      }
      // getRowDetail (e) {
      //   let logDetail = e.DutyFicheOtherFiled
      //   if (logDetail) {
      //     let arrayOfClsLog = converter.xml2js(logDetail, {
      //       compact: true,
      //       ignoreDoctype: true,
      //       ignoreCdata: true
      //     })
      //     if (arrayOfClsLog.ArrayOfClsLog && arrayOfClsLog.ArrayOfClsLog.ClsLog) {
      //       const list = arrayOfClsLog.ArrayOfClsLog.ClsLog
      //       this.dutyFicheOtherFiled = list.map((x) => {
      //         return {
      //           ...x,
      //           Subject: x.Subject._text,
      //           Value: x.Value._text,
      //           Comment: x.Comment._text
      //         }
      //       })
      //     }
      //   } else this.dutyFicheOtherFiled = []
      // }
    }
  }
}
</script>
