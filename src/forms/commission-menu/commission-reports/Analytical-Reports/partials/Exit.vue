<template>
  <fit>
    <form-row>
      <form-control>
        <safa-combo label="ذخیره" label-width="100px" ciName="" domainName="" />
      </form-control>
      <form-control>
        <safa-combo
          label="رنگ قلم"
          label-width="100px"
          ciName=""
          domainName=""
        />
      </form-control>
      <div class="col-auto">
        <btn-default label="چاپ" />
      </div>
    </form-row>
  </fit>
</template>

<script>
export default {
  data () {
    return {
      name: "Exit"
    }
  }
}
</script>
