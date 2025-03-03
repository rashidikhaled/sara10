<template>
  <fit>
    <safa-splitter v-model="horizontalSplitterModel" horizontal>
      <template v-slot:before>
        <fit>
          <safa-grid
            title="امضا داخلی شرکت کننده در جلسه"
            v-model="value.Session_InnerPerson"
            helper="Session_InnerPerson_Col"
            spId="43378A53-8392-46E7-931B-BE3330DD6B5E"
            :suppressRowClickSelection="false"
            fit
            paginate
            cdcName="Session_InnerPerson"
            :m="m"
        /></fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-grid
            title="اعضای شرکت کننده در جلسه از خارج از سازمان"
            v-model="value.Session_Person"
            helper="Session_Person_Col"
            :suppressRowClickSelection="false"
            fit
            paginate
            cdcName="Session_Person"
            :m="m"
            spId="332EBE1D-399D-4173-A65D-85CCF8B4C66B"
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
      name: "PresentSession",
      horizontalSplitterModel: 50
    }
  },
  methods: {}
}
</script>
