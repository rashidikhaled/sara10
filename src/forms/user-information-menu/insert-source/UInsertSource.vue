<template>
  <safa-form :id="formKey"
    appId="b65fe692-0000-40c9-0014-66b8eb0e9e77">
    <form-wrapper :title="title">
      <fit>
        <safa-splitter class="fit" vertical v-model="gridSplitter">
          <template v-slot:before>
            <fit>
              <safa-grid
                title="منابع اصلی"
                :columns="majorSorceColumn"
                :suppressRowClickSelection="false"
                v-model="majorSource"
                fit
                min-height="50px"
                max-height="100%"
                height="100%"
                paginate
                m="e"
              />
            </fit>
          </template>

          <template v-slot:after>
            <fit>
              <safa-grid
                title="منابع زیر مجموعه"
                :columns="subsetSorceColumn"
                :suppressRowClickSelection="false"
                v-model="subsetSource"
                fit
                min-height="50px"
                max-height="100%"
                height="100%"
                paginate
                m="e"
              />
            </fit>
          </template>
        </safa-splitter>
      </fit>
      <template #footer>
        <btn-save label="ذخیره" @click="saveObj"/>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "ایجاد منابع جدید",
      formKey: 'B65FE692-36EA-0001-0016-66B8EB0E9E77',
      name: "UInsertSource",
      main: true,
      majorSorceColumn: [
        {
          field: "sourceName",
          title: "نام منبع"
        }
      ],
      subsetSorceColumn: [
        {
          field: "sourceName",
          title: "نام منبع"
        }
      ],
      majorSource: [],
      subsetSource: [],
      gridSplitter: 50
    }
  },
  methods: {
    saveObj () {}
  }
}
</script>
