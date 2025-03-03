<template>
  <fit>
    <internal-section title="مشخصات جغرافیایی">
      <FormRow :sm="3" :md="3" :lg="3" :xl="3">
        <FormControl>
          <safa-custom-text
            v-model="value.Shaft_Info.PosLength"
            :m="m"
            label="طول"
            label-width="150px"
            type="money"
          />
        </FormControl>
        <FormControl>
          <safa-custom-text
            v-model="value.Shaft_Info.PosWidth"
            :m="m"
            label="عرض"
            label-width="150px"
            type="money"
          />
        </FormControl>
        <FormControl>
          <safa-custom-text
            v-model="value.Shaft_Info.PosHeight"
            :m="m"
            label="ارتفاع"
            label-width="150px"
            type="money"
          />
        </FormControl>
      </FormRow>
    </internal-section>
    <internal-section title="مشخصات محل مصرف آب">
      <FormRow :sm="3" :md="3" :lg="3" :xl="3">
        <FormControl>
          <safa-custom-text
            v-model="value.Shaft_Info.PropShaftDepth"
            :m="m"
            label="عمق"
            label-width="150px"
            type="money"
          />
        </FormControl>
        <FormControl>
          <safa-custom-text
            v-model="value.Shaft_Info.PropDiameterPipeWall"
            :m="m"
            label="قطر لوله جدار"
            label-width="150px"
            type="money"
          />
        </FormControl>
        <FormControl>
          <safa-custom-text
            v-model="value.Shaft_Info.PropDiameterPipeDischarge"
            :m="m"
            label="قطر لوله آبده"
            label-width="150px"
            type="money"
          />
        </FormControl>
      </FormRow>
      <FormRow :sm="2" :md="2" :lg="2" :xl="2" class="q-my-sm">
        <FormControl>
          <safa-custom-text
            v-model="value.Shaft_Info.PropMaxPower"
            :m="m"
            label="حداکثر قدرت مجاز(اسب بخار)"
            label-width="150px"
            type="money"
          />
        </FormControl>
        <FormControl>
          <safa-custom-text
            v-model="value.Shaft_Info.PropMaxPowerK"
            :m="m"
            label="حداکثر قدرت مجاز(کیلو وات ساعت)"
            label-width="180px"
            type="money"
          />
        </FormControl>
      </FormRow>
      <FormRow :sm="3" :md="3" :lg="3" :xl="3">
        <FormControl>
          <safa-text
            v-model="value.Shaft_Info.PropNorth"
            :m="m"
            label="شمال"
            label-width="150px"
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-model="value.Shaft_Info.PropSouth"
            :m="m"
            label="جنوب"
            label-width="150px"
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-model="value.Shaft_Info.PropEast"
            :m="m"
            label="شرق"
            label-width="150px"
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-model="value.Shaft_Info.PropArea"
            :m="m"
            label="مساحت اراضی تحت شرب"
            label-width="150px"
            type="number"
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-model="value.Shaft_Info.BeneficiaryName"
            :m="m"
            label="نام بهره بردار"
            label-width="150px"
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-model="value.Shaft_Info.PropWest"
            :m="m"
            label="غرب"
            label-width="150px"
          />
        </FormControl>
      </FormRow>
    </internal-section>
    <internal-section title="طبق پروانه">
      <FormRow :sm="3" :md="3" :lg="3" :xl="3">
        <FormControl>
          <safa-custom-text
            v-model="value.Shaft_Info.P_UtilizationRate"
            :m="m"
            label="میزان بهره برداری"
            label-width="150px"
            type="money"
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-model="value.Shaft_Info.P_PompWorkingS"
            :m="m"
            label="کارکرد پمپ(س)"
            label-width="150px"
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-model="value.Shaft_Info.P_PompWorkingM"
            :m="m"
            label="کارکرد پمپ(م)"
            label-width="150px"
          />
        </FormControl>
      </FormRow>
    </internal-section>
    <internal-section title="موجود">
      <FormRow :sm="3" :md="3" :lg="3" :xl="3">
        <FormControl>
          <safa-custom-text
            v-model="value.Shaft_Info.M_UtilizationRate"
            :m="m"
            label="میزان بهره برداری"
            label-width="150px"
            type="money"
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-model="value.Shaft_Info.M_PompWorkingS"
            :m="m"
            label="کارکرد پمپ(س)"
            label-width="150px"
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-model="value.Shaft_Info.M_PompWorkingM"
            :m="m"
            label="کارکرد پمپ(م)"
            label-width="150px"
          />
        </FormControl>
      </FormRow>
    </internal-section>
    <internal-section>
      <btn-delete label="حذف" @click="$emit('btnDeleteClick')" />
    </internal-section>
  </fit>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      required: true
    },
    formKey: {
      type: String,
      required: true
    },
    m: {
      type: String,
      default: "r"
    }
  }
}
</script>
