<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="375C0F92-A167-4AA4-BFD4-FD32D9A93902"
  >
    <form-wrapper :title="title" :padding="false">
      <template #header>
        <safa-status :result="loadObjRes" />
        <safa-status :result="saveObjRes" />
      </template>
      <fit>
        <div
          :class="$q.dark.isActive ? 'bg-lighten4' : 'bg-grey-2'"
          class="duty-calculation-wrapper q-py-sm rounded-borders overflow-hidden fit"
        >
          <div class="duty-calculation-list full-height overflow-auto">
            <q-intersection
              v-for="(item, i) in count"
              :key="i"
              :class="
                'duty-status-' +
                (item.selected ||
                (item.details && item.details.some((x) => x.selected))
                  ? ' selected '
                  : '') +
                (item.expanded ? ' expanded ' : '')
              "
              class="duty-c-item"
              once
              style="min-height: 56px"
              transition="slide-down"
            >
              <div class="duty-row">
                <div class="duty__expand q-ml-md">
                  <q-btn
                    :icon="item.expanded ? 'expand_less' : 'expand_more'"
                    color="grey"
                    flat
                    round
                    @click="item.expanded = !item.expanded"
                  />
                </div>
                <!-- <div class="duty__check text-center" style="min-width: 50px">
                  <q-spinner-ios
                    v-if="item.loading"
                    color="green"
                    size="18px"
                  />
                  <q-checkbox
                    v-else
                    :value="item.selected"
                    class="q-ma-none"
                    indeterminate-value="(item.details && item.details.some(x=> x.selected))"
                    @input="selectItemDetails($event, item)"
                  />
                </div> -->
                <div class="duty__rownumber" style="min-width: 40px">
                  <span v-if="item.details">{{ item.details.length }}</span>
                </div>
                <div class="duty-c-i-inner q-gutter-x-md">
                  <div class="duty-workitem text-dark" title="شرکت خدماتی">
                    {{ item.RequesterName }}
                  </div>
                  <div class="duty-workitem text-dark" title="تعداد">
                    تعداد: {{ item.number }}
                  </div>
                </div>
              </div>
              <q-slide-transition>
                <InqueryList
                  v-if="item.expanded"
                  :item="item"
                  :gridValue="gridValue"
                  :title="title"
                  :formKey="formKey"
                  :name="name"
                  :ref="`InqueryList${i}`"
                  @selectedRow="selectedRowHandler"
                />
              </q-slide-transition>
            </q-intersection>
          </div>
        </div>
      </fit>
      <template #footer>
        <btn-save label="تأیید" class="q-mr-sm" @click="saveObj" />
        <btn-cancel label="انصراف" class="q-mr-sm" @click="cancleHandler" />
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import InqueryList from "./partials/InqueryList"

export default {
  components: { InqueryList },
  mixins: [baseFormMixin],

  data () {
    return {
      title: "استعلام",
      formKey: "A9B628D7-7E37-4CDA-B9ED-5D96F44BF194",
      name: "UInquiry",
      main: true,
      sidebarCompatible: true,
      workflowCompatible: true,
      model: null,
      gridValue: [
        // {
        //   CI_RedirectName: 102,
        //   CI_RequesterName: 1,
        //   DefaultUser: "",
        //   IsReadOnly: false,
        //   IsSelected: false,
        //   RedirectName: "مديريت بهره برداري آب و فاضلاب",
        //   RequesterName: "شرکت آب و فاضلاب"
        // },
        // {
        //   CI_RedirectName: 103,
        //   CI_RequesterName: 2,
        //   DefaultUser: "",
        //   IsReadOnly: false,
        //   IsSelected: false,
        //   RedirectName: "مديريت بهره برداري برق",
        //   RequesterName: "شرکت توزيع برق"
        // },
        // {
        //   CI_RedirectName: 104,
        //   CI_RequesterName: 1,
        //   DefaultUser: "",
        //   IsReadOnly: false,
        //   IsSelected: false,
        //   RedirectName: "امور اجرائي طرح هاي توزيع آب شهري",
        //   RequesterName: "شرکت آب و فاضلاب"
        // },
        // {
        //   CI_RedirectName: 104,
        //   CI_RequesterName: 1,
        //   DefaultUser: "",
        //   IsReadOnly: false,
        //   IsSelected: false,
        //   RedirectName: "امور اجرائي طرح هاي توزيع آب شهري",
        //   RequesterName: "شرکت آب و فاضلاب"
        // },
        // {
        //   CI_RedirectName: 105,
        //   CI_RequesterName: 1,
        //   DefaultUser: "",
        //   IsReadOnly: false,
        //   IsSelected: false,
        //   RedirectName: "امور اجرائي طرح هاي فاضلاب شهري",
        //   RequesterName: "شرکت آب و فاضلاب"
        // }
      ],
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      InquiryColumn: [
        { field: "RequesterName", title: "شرکت خدماتی" },
        { field: "RedirectName", title: "نام تابعه" }
      ],
      loadObjRes: null,
      saveObjRes: null,
      count: [],
      InquiryItems: []
    }
  },
  created () {
    if (this.selectedRequest) {
      this.loadObj()
    } else {
      this.showError("لطفا یک ردیف از کارتابل انتخاب نمائید")
      this.$nextTick(() => {
        this.hideSidebar(this.name)
      })
    }
  },
  mounted () {
    this.groupHandler()
  },
  methods: {
    loadObj () {
      this.showLoading()
      const payload = {
        pRequest: {
          NidProc: this.selectedRequest.NidProc
          // NidProc: "9952c297-1d32-4d56-811f-8827f5f2ada8"
        }
      }
      this.$services.excavation
        .getInquiry(payload)
        .then(({ data }) => {
          this.loadObjRes = this.getResponse(data)
          if (this.loadObjRes.success) {
            this.gridValue =
              this.loadObjRes.data.GetInquiryResult.Inquiry.InquiryItems
            this.groupHandler()
            this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc"
            })
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    groupHandler () {
      const counts = {}
      this.gridValue.forEach(function (x) {
        counts[x.RequesterName] = (counts[x.RequesterName] || 0) + 1
      })
      this.count = Object.keys(counts).map((k) => ({
        RequesterName: k,
        number: counts[k],
        expanded: false
      }))
    },
    saveObj () {
      this.showLoading()
      const payload = {
        pRequest: {
          Inquiry: {
            InquiryItems: this.InquiryItems,
            NidProc: this.selectedRequest.NidProc
            // NIdProc: "9591823d-4809-4d01-806d-95d02ad5940b",
          },
          IsSara10: true
        }
      }
      console.log('count', this.InquiryItems)
      this.$services.excavation
        .saveInquiry(payload)
        .then(({ data }) => {
          this.saveObjRes = this.getResponse(data)
          if (this.saveObjRes.success) {
            this.hideSidebar(this.name)
            this.log({
              action: this.logActions.save,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc"
            })
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    cancleHandler () {
      this.hideSidebar(this.name)
    },
    selectedRowHandler (value) {
      this.InquiryItems = Object.entries(this.$refs).reduce((acc, [condition, property]) => {
        if (condition.includes("InqueryList") && Array.isArray(property) && property.length > 0) {
          acc.push(...property[0].$refs.grid.selectedRows)
        }
        return acc
      }, [])
    }
  }
}
</script>
