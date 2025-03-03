<template>
  <fit>
    <form-row>
      <form-control>
        <safa-combo
          label="نوع نمودار"
          label-width="100px"
          ciName=""
          domainName=""
        />
      </form-control>
      <form-control>
        <safa-combo
          label="بر اساس"
          label-width="100px"
          ciName=""
          domainName=""
        />
      </form-control>
      <form-control>
        <safa-combo label="Count" label-width="100px" ciName="" domainName="" />
      </form-control>
      <form-control>
        <safa-combo label="ذخیره" label-width="100px" ciName="" domainName="" />
      </form-control>
    </form-row>
  </fit>
</template>

<script>
export default {
  data () {
    return {
      name: "Chart"
    }
  }
}
</script>
