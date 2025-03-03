<template>
  <form-wrapper :title="title">
    <fit>
      <FormRow class="q-mb-sm">
        <FormControl>
          <safa-radio
            v-model="dataContext.IsWholeDay"
            :val="true"
            color="teal"
            label="مرخصی روزانه"
            size="xs"
          />
        </FormControl>
      </FormRow>

      <FormRow class="q-mb-sm">
        <FormControl>
          <safa-datepicker
            v-model="dataContext.dtVacation"
            label="تاریخ مرخصی"
            label-width="90px"
            required
          />
        </FormControl>
      </FormRow>
      <FormRow class="q-mb-sm">
        <FormControl>
          <safa-securityPanel
            id="4629ce90-43f1-4dd2-8fdc-ef422745c00e"
            caption="مرخصی ساعتی"
          >
            <safa-radio
              v-model="dataContext.IsWholeDay"
              :val="false"
              color="orange"
              label="مرخصی ساعتی"
              size="xs"
            />
          </safa-securityPanel>
        </FormControl>
      </FormRow>

      <div v-if="!dataContext.IsWholeDay">
        <div class="flex items-center q-gutter-x-sm q-mb-sm">
          <safa-label style="min-width: 80px">ساعت شروع</safa-label>
          <safa-combo
            ref="selectstartMinute"
            v-model="dataContext.spHours"
            :options="startMinute"
            class="col"
            source-type="local"
          />
          <safa-combo
            ref="selectstarthour"
            v-model="selectedStartHour"
            :options="startHour"
            class="col"
            source-type="local"
          />
        </div>

        <div class="flex items-center q-gutter-x-sm q-mb-sm">
          <safa-label style="min-width: 80px">ساعت پایان</safa-label>
          <safa-combo
            ref="selectendMinute"
            v-model="selectedEndMinute"
            :options="startMinute"
            class="col"
            source-type="local"
          />
          <safa-combo
            ref="selectendhour"
            v-model="selectedEndHour"
            :options="startHour"
            class="col"
            source-type="local"
          />
        </div>
      </div>
    </fit>

    <template #footer>
      <form-actions :showEditButton="false">
        <template #before>
          <btn-new label="اضافه" @click="btnSaveClick" />
          <btn-cancel label="انصراف" @click="$emit('hide')" />
        </template>
      </form-actions>
    </template>
  </form-wrapper>
</template>

<script>
import shRevisitAgentDateModel from "../models/shRevisitAgentVacation"
export default {
  components: {},
  name: "URevisitAgentVacationNew",

  data () {
    return {
      title: "اضاقه کردن تعطیلی مامور بازدید",
      formKey: "3E8DA484-6433-46CD-9F62-F84DD251D46B",

      dataContext: { ...shRevisitAgentDateModel },
      startMinute: [
        { Id: 0, Title: "00" },
        { Id: 1, Title: "15" },
        { Id: 2, Title: "30" },
        { Id: 3, Title: "45" }
      ],
      startHour: [
        { Id: 0, Title: "08" },
        { Id: 1, Title: "09" },
        { Id: 2, Title: "10" },
        { Id: 3, Title: "11" },
        { Id: 4, Title: "12" },
        { Id: 5, Title: "13" },
        { Id: 6, Title: "14" },
        { Id: 7, Title: "15" },
        { Id: 8, Title: "16" },
        { Id: 9, Title: "17" },
        { Id: 10, Title: "18" },
        { Id: 11, Title: "19" },
        { Id: 12, Title: "20" },
        { Id: 13, Title: "21" },
        { Id: 14, Title: "22" },
        { Id: 15, Title: "23" },
        { Id: 16, Title: "24" }
      ],
      selectedStartMinute: null,
      selectedStartHour: null,
      selectedEndMinute: null,
      selectedEndHour: null
    }
  },

  methods: {
    btnSaveClick () {
      if (!this.dataContext.dtVacation) {
        this.showError("لطفا تاریخ را انتخاب کنید")
        return false
      }

      if (this.dataContext.dtVacation.length < 10) {
        this.showError("لطفا تاریخ به صورت صحیح وارد کنید")
        return false
      }

      const revisitAgentVacation = { ...shRevisitAgentDateModel }
      revisitAgentVacation.VacationDate = this.dataContext.dtVacation
      revisitAgentVacation.IsDeleted = false
      if (this.dataContext.IsWholeDay) {
        revisitAgentVacation.IsWholeDay = true
      } else {
        revisitAgentVacation.IsWholeDay = false
        revisitAgentVacation.FromTime = `${this.$refs.selectstarthour.selectedItem.Title.toString()}:${this.$refs.selectstartMinute.selectedItem.Title.toString()}:00`
        revisitAgentVacation.ToTime = `${this.$refs.selectendhour.selectedItem.Title.toString()}:${this.$refs.selectendMinute.selectedItem.Title.toString()}:00`
      }

      this.$emit("input", revisitAgentVacation)
    }
  }
}
</script>
