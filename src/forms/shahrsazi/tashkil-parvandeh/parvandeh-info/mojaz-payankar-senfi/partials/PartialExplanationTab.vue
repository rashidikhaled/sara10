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
      label="توضیحات مجاز پایانکار صنفی"
      identifier="c986d816-4e4e-46fb-a183-6303352c1341"
      formKey="bc47d32a-a665-4dd8-92c2-c1e93e858074"
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
