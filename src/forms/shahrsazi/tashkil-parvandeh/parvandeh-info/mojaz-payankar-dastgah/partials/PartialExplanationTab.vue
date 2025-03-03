 <template>
  <fit>
    <div class="fit">
      <safa-datatable
        :m="m"
        title="ضمائم"
        helper="baseAttachment"
        height="100%"
        max-height="100%"
        fit
        class="q-pa-sm"
        v-model="value.Base_Attachment"
      />
    </div>
    <text-template
      label="توضیحات مجاز پایانکار دستگاه"
      identifier="c986d816-4e4e-46fb-a183-6303352c1341"
      formKey="3f05d8ea-a8c3-4532-b069-2c459b23fca5"
      :m="m"
      :rows="5"
      type="textarea"
      class="q-px-sm"
      v-model="value.Base_CommonEstate.Comments"
    />
  </fit>
</template>

<script>
export default {
  name: 'PartialExplanationTab',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
