<template>
  <fit>
    <FormRow :lg="3" :md="3">
      <FormControl>
        <ImageUploader
          title="نمونه عکس"
          v-model="value.Picture"
          :m="m"
          accept=".png,.jpg"
          extension="jpg"
          :maxFileSize="0.2"
          :allowEditImage="true"
        />
      </FormControl>
      <FormControl>
        <ImageUploader
          title="کارت ملی"
          v-model="value.PicNationalCode"
          :m="m"
          accept=".png,.jpg"
          extension="jpg"
          :maxFileSize="0.2"
          :allowEditImage="true"
        />
      </FormControl>
      <FormControl>
        <ImageUploader
          title="شناسنامه"
          v-model="value.PicShenasname"
          :m="m"
          accept=".png,.jpg"
          extension="jpg"
          :maxFileSize="0.2"
          :allowEditImage="true"
        />
      </FormControl>
      <FormControl>
        <ImageUploader
          title="امضاء"
          v-model="value.PicSignature"
          :m="m"
          accept=".png,.jpg"
          extension="jpg"
          :maxFileSize="0.2"
          :allowEditImage="true"
        />
      </FormControl>
      <FormControl>
        <ImageUploader
          title="پروانه اشتغال"
          v-model="value.PicJobAgreement"
          :m="m"
          accept=".png,.jpg"
          extension="jpg"
          :maxFileSize="0.2"
          :allowEditImage="true"
        />
      </FormControl>
      <FormControl>
        <ImageUploader
          title="پشت پروانه اشتغال"
          v-model="value.PicJobAgreementBack"
          :m="m"
          accept=".png,.jpg"
          extension="jpg"
          :maxFileSize="0.2"
          :allowEditImage="true"
        />
      </FormControl>
      <FormControl>
        <ImageUploader
          title="آخرین مدرک تحصیلی"
          v-model="value.PicVoucher"
          :m="m"
          accept=".png,.jpg"
          extension="jpg"
          :maxFileSize="0.2"
          :allowEditImage="true"
        />
      </FormControl>
      <FormControl>
        <ImageUploader
          title="نمونه مهر"
          v-model="value.PicMohr"
          :m="m"
          :allowEditImage="true"
          accept=".png,.jpg"
          extension="jpg"
          :maxFileSize="0.2"
        />
      </FormControl>
      <FormControl>
        <ImageUploader
          title="نمونه مهر طراحی"
          v-model="value.PicMohr2"
          :m="m"
          accept=".png,.jpg"
          extension="jpg"
          :maxFileSize="0.2"
          :allowEditImage="true"
        />
      </FormControl>
    </FormRow>
    <div class="fit" />
    <div>
      <ul class="listAttention">
        <li>
          <q-icon name="done" class="icon" />
          حجم عکس شخص باید کمتر از 200 کیلوبایت باشد.
        </li>
        <li>
          <q-icon name="done" class="icon" />
          عکس دارای ضمینه سفید و بدون کلاه و عینک و کراوات باشد.
        </li>
        <li>
          <q-icon name="done" class="icon" />
          دقت تصاویر 150 Dimensions و فرمت آن JPG یا PNG باشد.
        </li>
        <li>
          <q-icon name="done" class="icon" />
          نمونه مهر و اسکن مهر به شهرداری آورده شود.
        </li>
      </ul>
    </div>
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  props: {
    value: {
      type: Object,
      default: () => ({})
    },
    m: {
      type: String,
      default: "r"
    }
  }
}
</script>
