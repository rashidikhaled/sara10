<template>
  <fit>
    <div class="fit">
      <safa-splitter v-model="splitterModel" horizontal class="fit" margin="0">
        <template v-slot:before>
          <safa-splitter
            v-model="verticalSplitterModel"
            cdcName="verticalSplitterModel"
            vertical
            class="fit"
            margin="0"
          >
            <template v-slot:before>
              <fit>
                <text-template
                  label="توضیحات بروکف"
                  label-width="100px"
                  formKey="9A84721F-6B52-42FC-8679-468E4AE120E8"
                  v-model="value.Sh_BaroKaf.BarKafComments"
                  fit
                  height="100%"
                  max-height="100%"
                  m="r"
                />
              </fit>
            </template>
            <template v-slot:after>
              <fit>
                <text-template
                  label="توضیحات پایانکار"
                  label-width="100px"
                  formKey="9A84721F-6B52-42FC-8679-468E4AE120E8"
                  v-model="value.Sh_ExportPayankar.Comments"
                  :m="m"
                  fit
                  height="100%"
                  max-height="100%"
                  min-height="100%"
                 type="textarea"
                />
              </fit>
            </template>
          </safa-splitter>
        </template>
        <template v-slot:after>
          <safa-grid
            v-model="value.Base_Letter"
            helper="payankarComment"
            title="نامه ها"
            fit
            height="100%"
            max-height="100%"
            paginate
            :pageSize="20"
          />
        </template>
      </safa-splitter>
    </div>
  </fit>
</template>
<script>
export default {
  props: {
    value: Object,
    m: String
  },
  data () {
    return {
      verticalSplitterModel: 50,
      splitterModel: 65
    }
  }
}
</script>
