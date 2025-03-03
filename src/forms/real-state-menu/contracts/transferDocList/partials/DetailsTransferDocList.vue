<template>
  <fit>
    <safa-splitter v-model="horizontalSplitterModel" horizontal>
      <template v-slot:before>
        <fit>
          <safa-grid
            title="مشخصات انتقال دهنده"
            v-model="value.TransferDoc_Person_1"
            :columns="colGirid1"
            :suppressRowClickSelection="false"
            fit
            paginate
            cdcName="TransferDoc_Person_1"
            :m="m"
        /></fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-grid
            title="مشخصات انتقال گیرنده"
            v-model="value.TransferDoc_Person_2"
            :columns="colGirid2"
            :suppressRowClickSelection="false"
            fit
            paginate
            cdcName="TransferDoc_Person_2"
            :m="m"
          />
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
export default {
  props: {
    m: String,
    value: Object
  },
  data () {
    return {
      name: "PresentSession",
      horizontalSplitterModel: 50,
      colGirid1: [
        {
          field: "CI_TransferPersonType",
          title: "نوع اشخاص انتقال دهنده",
          domain: "Estate",
          editor: "combo",
          width: "200px"
        },
        { field: "Name", title: "نام", width: "100px" },
        { field: "AgentName", title: " نام نماینده", width: "200px" },
        { field: "Description", title: "توضیحات", width: "300px" }
      ],
      colGirid2: [
        {
          field: "CI_TransferPersonType",
          title: "نوع اشخاص انتقال گیرنده",
          domain: "Estate",
          editor: "combo",
          width: "200px"
        },
        {
          field: "Name",
          title: "نام",
          width: "100px"
        },
        { field: "AgentName", title: " نام نماینده", width: "200px" },
        { field: "Description", title: "توضیحات", width: "300px" }
      ]
    }
  },
  methods: {}
}
</script>
