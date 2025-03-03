<template>
  <safa-splitter
    v-model="horizontalSplitterModel"
    horizontal
    v-if="value && value.ClsRequest_Info"
  >
    <template v-slot:before>
      <fit>
        <!-- helper="listFicheInVoteColumns77" -->
        <safa-grid
          pagination
          v-model="value.ClsRequest_Info.Request_FicheDetail"
          cdcName="ficheCalculates"
          helper="listFicheInVoteColumns77"
          fit
          m="r"
          height="100%"
          min-height="200px"
          max-height="100%"
          :addRow="false"
          :deleteRow="false"
          :allowCopy="false"
          title="محاسبات فیش"
          :allowMultipleSelection="false"
          :suppressRowClickSelection="false"
        />
      </fit>
    </template>
    <template v-slot:after>
      <fit>
        <safa-splitter v-model="verticalSplitterModel" vertical>
          <template v-slot:before>
            <fit>
              <safa-grid
                pagination
                v-model="value.ClsRequest_Info.SubFicheDetail"
                cdcName="SubFicheDetail"
                helper="subCalculateColumns77"
                fit
                m="r"
                height="100%"
                min-height="200px"
                max-height="100%"
                :addRow="false"
                :deleteRow="false"
                :allowCopy="false"
                title="ریز محاسبات فیش"
                :allowMultipleSelection="false"
                :suppressRowClickSelection="false"
              />
            </fit>
          </template>
          <template v-slot:after>
            <fit>
              <safa-grid
                pagination
                v-model="dutyFicheOtherFiled"
                cdcName="ficheDetails"
                helper="ficheDetailsColumns77"
                fit
                m="r"
                height="100%"
                min-height="200px"
                max-height="100%"
                :addRow="false"
                :deleteRow="false"
                :allowCopy="false"
                title="جزئیات فیش"
                :allowMultipleSelection="false"
                :suppressRowClickSelection="false"
              />
            </fit>
          </template>
        </safa-splitter>
      </fit>
    </template>
  </safa-splitter>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import converter from "xml-js"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      horizontalSplitterModel: 50,
      verticalSplitterModel: 50,
      dutyFicheOtherFiled: []
    }
  },
  props: {
    value: Object,
    m: String
  },
  mounted () {
    this.getRowDetails()
    debugger
    // this.getRowDetail(this.value.ClsRequest_Info.SubFicheDetail[0])
  },
  methods: {
    getRowDetails () {
      debugger
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
        debugger
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
