<template>
  <safa-splitter v-model="horizontalSplitterModel" horizontal>
    <template v-slot:before>
      <fit>
        <safa-grid
          paginate
          title="محاسبات فیش"
          v-model="gridContext.grdFicheDetails1"
          cdcName="ficheCalculatesColumn"
          helper="ficheCalculatesColumn"
          fit
          m="r"
          height="100%"
          min-height="200px"
          max-height="100%"
          :addRow="false"
          :deleteRow="false"
          :allowCopy="false"
          @selection:changed="$emit('grdCommissionVoteSelectionChanged')"
        />
      </fit>
    </template>
    <template v-slot:after>
      <fit>
        <safa-splitter v-model="verticalSplitterModel" vertical>
          <template v-slot:before>
            <fit>
              <!-- v-model="value.ClsRequest_Info.ListFicheInVote.SubFicheDetail" -->
              <safa-grid
              title="ریز محاسبات فیش"
              paginate
              cdcName="microcalculationsColumn"
              helper="microcalculationsColumn"
              fit
              v-model="gridContext.grdFicheSub"
              m="r"
              height="100%"
              min-height="200px"
              max-height="100%"
              :addRow="false"
              :deleteRow="false"
              :allowCopy="false"
              />
            </fit>
          </template>
          <template v-slot:after>
            <fit>
              <safa-grid
                title="جزئیات فیش"
                paginate
                v-model="gridContext.gridLog"
                cdcName="ficheDetailsColumn"
                helper="ficheDetailsColumn"
                fit
                m="r"
                height="100%"
                min-height="200px"
                max-height="100%"
                :addRow="false"
                :deleteRow="false"
                :allowCopy="false"
              /> </fit
          ></template>
        </safa-splitter> </fit
    ></template>
  </safa-splitter>
</template>
<script>
export default {
  data () {
    return {
      horizontalSplitterModel: 35,
      verticalSplitterModel: 50
    }
  },
  props: {
    value: Object,
    FicheNo: String,
    mode: String,
    formKey: String,
    name: String,
    title: String,
    gridContext: Object
  }
}
</script>
