<template>
  <div>
    <div :class="$q.dark.isActive?'bg-lighten4':'bg-grey-2'"
         class="
        duty-calculation-wrapper
        q-py-sm
        rounded-borders
        overflow-hidden
        fit
      ">
      <div class="duty-calculation-list full-height overflow-auto">
        <q-intersection
          v-for="(detail, i) in model"
          :key="i"
          :class="detail.expanded ? ' expanded ' : ''"
          class="duty-c-item"
          once
          style="min-height: 56px"
          transition="slide-down"
        >
          <!-- {{detail.expanded}} -->
          <div class="duty-row">

            <div class="duty__expand">
              <q-btn
                :icon="detail.expanded ? 'expand_less' : 'expand_more'"
                color="grey"
                flat
                round
                @click="handelClick(detail);"
              />
            </div>
            <div style="min-width: 150px">
              <safa-combo
                v-model="detail.CI_DutyFormula"
                ciName="CI_DutyFormula"
                domain="CI_SaraM1"
                label="فرمول"
                m="r"
              />
            </div>
            <div
              class="q-ml-sm"
              style="min-width: 190px"
            >
              <safa-combo
                v-model="detail.EumDutyInfoGroup"
                :options="infoCategoryList"
                label="دسته اطلاعاتی"
                m="r"
                source-type="local"
              />
            </div>
            <div
              style="min-width: 110px; text-align: center"
              title="مبلغ"
            >
              <q-badge
                color="green"
                outline
              >مبلغ: {{ detail.Price }}
              </q-badge>
            </div>
            <div class="duty-datetime text-grey"
                 style="min-width: 150px">
              <p
                class="q-mb-none"
                style="font-size: 11px"
              >
                <q-icon
                  name="event"
                  size="14px"
                />&nbsp;تاریخ محاسبه:
                {{ detail.DateCalc }}
              </p>
              <p
                class="q-mb-none"
                style="font-size: 11px"
              >
                <q-icon
                  name="schedule"
                  size="14px"
                />&nbsp;زمان محاسبه:
                {{ detail.TimeCalc }}
              </p>
            </div>
            <div
              class="duty-user text-grey q-mb-xs q-mx-md"
              style="min-width: 150px"
              title="کاربر"
            >
              <q-icon
                name="person"
                size="xs"
              />&nbsp;کاربر:
              {{ detail.UserName }}
            </div>

            <div
              class="duty-workitem text-grey"
              title="شماره بازدید"
            >
              شماره بازدید: {{ detail.NidWorkItem }}
            </div>
          </div>
          <q-slide-transition>
            <div
              v-if="detail.expanded"
              class="q-mt-sm"
            >
              <safa-datatable
                v-model="detail.logDetail"
                :hideHeader="true"
                :selectable="false"
                height="100%"
                helper="dutyAllCalculationComments"
                m="r"
                max-height="100%"
                minHeight="100%"
              ></safa-datatable>
            </div>
          </q-slide-transition>
        </q-intersection>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  props: {
    model: Array
  },
  data () {
    return {
      infoCategoryList: [
        { ID: 0, Title: 'تشکیل پرونده' },
        { ID: 1, Title: 'بازدید' },
        { ID: 2, Title: 'مجاز پروانه' },
        { ID: 3, Title: 'مجاز پایانکار' },
        { ID: 4, Title: 'آخرین بروکف' },
        { ID: 6, Title: 'اطلاعات مالک' },
        { ID: 100, Title: 'نوسازی اصفهان' },
        { ID: 200, Title: 'ممیزی' }
      ],
      showLog: false,
      columns: []
    }
  },
  methods: {
    handelClick (e) {
      e.expanded = !e.expanded
    }
  }
}
</script>
