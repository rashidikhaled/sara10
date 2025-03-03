<template>
<div></div>
  <!-- <fit>
    <div class="fit relative-position" id="responder-forms">
      <fit>
        <div class="responder-header q-mb-sm">
          <div class="search-wrapper q-mb-sm">
            <div class="searchbox flex items-center">
              <input placeholder="جستجو ..." type="text" v-model="searchTerm" />
              <transition name="fade">
                <q-icon
                  @click="searchTerm = ''"
                  class="s-close cursor-pointer"
                  v-show="searchTerm.trim().length > 0"
                  name="close"
                  size="22px"
                />
              </transition>
              <q-icon class="s-search" name="search" size="22px" />
            </div>
          </div>
          <button-group height="60px">
            <template>
              <ribbon-button
                :key="index"
                :label="form.title"
                @click="selectForm(form)"
                class="form-button"
                v-for="(form, index) in formList"
              >
                <template #icon>
                  <q-icon
                    color="primary"
                    size="20px"
                    style="transform: scaleX(-1); -ms-transform: scaleX(-1)"
                  >
                    <svg
                      height="300px"
                      viewBox="0 0 64 64"
                      width="300px"
                      x="0px"
                      xmlns="http://www.w3.org/2000/svg"
                      y="0px"
                    >
                      <g data-name="Page Layout">
                        <path
                          d="M57,7H7a5,5,0,0,0-5,5V52a5,5,0,0,0,5,5H57a5,5,0,0,0,5-5V12A5,5,0,0,0,57,7ZM29,12a2,2,0,1,1-2,2A2,2,0,0,1,29,12Zm-9,0a2,2,0,1,1-2,2A2,2,0,0,1,20,12Zm-9,0a2,2,0,1,1-2,2A2,2,0,0,1,11,12ZM60,52a3,3,0,0,1-3,3H7a3,3,0,0,1-3-3V20H60Z"
                        />
                        <rect
                          height="14"
                          rx="1"
                          ry="1"
                          width="14"
                          x="8"
                          y="37"
                        />
                        <rect
                          height="10"
                          rx="1"
                          ry="1"
                          width="48"
                          x="8"
                          y="25"
                        />
                        <rect
                          height="14"
                          rx="1"
                          ry="1"
                          width="32"
                          x="24"
                          y="37"
                        />
                      </g>
                    </svg>
                  </q-icon>
                </template>
              </ribbon-button>
            </template>
          </button-group>
        </div>
        <div class="responder-form fit" v-if="selectedForm">
          <component
            :isSelectFromWorkflow="false"
            :isSelectFromMenu="false"
            :isSelectFromResponder="true"
            :is="formName"
            :taskInfo="selectedTaskInfo"
            @load="fixFormWrapper"
            v-if="formName"
            style="border: 1px solid #ddd"
          />
        </div>
        <div
          :class="[
            'fit flex items-center justify-center',
            $q.dark.isActive ? 'bg-dark text-light' : 'bg-grey-2 text-grey',
          ]"
          v-else
        >
          <q-icon color="blue" name="warning" size="md" />&nbsp; هنوز فرمی
          انتخاب نشده است.
        </div>
      </fit>
    </div>
  </fit> -->
</template>

<script>
// import baseFormMixin from "src/mixins/baseFormMixin"
// import RequestForBranches from "../../register-request/request/URequest.vue"
// import RequestExtension from "./requestExtension/RequestExtension"
// import URequestVisit from "./requestVisit/URequestVisit"
// import ExtensionOfVisit from "./extensionOfVisit/ExtensionOfVisit"
// import UIssuingPermit from "./issuingPermit/UIssuingPermit"

// import URequest from 'forms/dig-menu/register-request/request/URequest.vue'
// import URequestService from 'forms/dig-menu/register-request/request-events/URequestService.vue'
// import URequestEvents from 'forms/dig-menu/register-request/request-events/URequestEvents.vue'

export default {
  name: "ResponderForms",
  // mixins: [baseFormMixin],
  // components: {
  //   RequestForBranches,
  //   RequestExtension,
  //   URequestVisit,
  //   ExtensionOfVisit,
  //   UIssuingPermit,

  //   URequest,
  //   URequestService,
  //   URequestEvents
  // },
  props: {
    selectedResponse: Object,
    loadObjResponse: Object,
    filter: Object,

    title: String,
    formKey: String,
    name: String
  },
  computed: {
    responderForms () {
      return []
      // if (this.selectedResponse.NosaziCode.indexOf("-") > -1) {
      //   // "درخواست انشعابات"
      //   this.tmpRequest = "URequest"
      // } else {
      //   if (
      //     // eslint-disable-next-line eqeqeq
      //     this.loadObjResponse.ClsSearchEngine.AllRequestTypeSelected.Filed ==
      //     "1"
      //   ) {
      //     // "درخواست طرح های توسعه"
      //     // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      //     this.tmpRequest = "URequestService" // URequest_Service
      //   } else {
      //     // "درخواست اتفاقات"
      //     // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      //     this.tmpRequest = "URequestEvents" // URequest_Events
      //   }
      // }
      // return [
      //   {
      //     title: "ثبت درخواست",
      //     name: this.tmpRequest
      //   },
      //   {
      //     title: "تمدید درخواست",
      //     name: tmpRequestTamdid
      //   },
      //   {
      //     title: " بازدید درخواست",
      //     name: this.setSelectedForm("Revisit")
      //   },
      //   {
      //     title: " تمدید بازدید",
      //     name: this.setSelectedForm("RevisitTamdid")
      //   },
      //   {
      //     title: "صدور مجوز",
      //     name: this.setSelectedForm("UExportLicense")
      //   }
      // ]
    }
    // formName () {
    //   debugger
    //   if (!this.selectedForm || !this.selectedForm.name) return ""
    //   return this.selectedForm.name
    // },
    // selectedTaskInfo () {
    //   debugger
    //   if (!this.selectedResponse) return {}
    //   return {
    //     ...this.selectedResponse,
    //     BizCode: this.selectedResponse.NosaziCode
    //   }
    // }
  },
  data () {
    return {
      // formList: this.responderForms,
      tmpRequest: "",
      searchTerm: "",
      tmpForms: [],
      // responderForms: null,
      selectedForm: null
    }
  },

  methods: {
    // setSelectedForm (val) {
    //   switch (val) {
    //     case "Request":
    //       if (this.selectedResponse.NosaziCode.indexOf("-") > -1) {
    //         // "درخواست انشعابات"
    //         return "URequest"
    //       } else {
    //         // eslint-disable-next-line eqeqeq
    //         if (
    //           this.loadObjResponse.ClsSearchEngine.AllRequestTypeSelected
    //             .Filed === "1"
    //         ) {
    //           // "درخواست طرح های توسعه"
    //           return "URequest_Service"
    //         } else {
    //           // "درخواست اتفاقات"
    //           return "URequestEvents" // URequest_Events
    //         }
    //       }

    //     case "RequestTamdid":
    //       return ""
    //     case "Revisit":
    //       return ""
    //     case "RevisitTamdid":
    //       return ""
    //     case "UExportLicense":
    //       return ""
    //   }
    // },
    // async selectForm (form) {
    //   debugger
    //   this.selectedForm = form
    //   this.$nextTick(() => {
    //     this.fixFormWrapper()
    //   })
    // },
    // fixFormWrapper () {
    //   try {
    //     const formWrapper = document.querySelector(
    //       ".responder-form .form-wrapper"
    //     )
    //     if (!formWrapper) return
    //     formWrapper.firstElementChild.style.minHeight = `calc(100vh - ${
    //       formWrapper.getBoundingClientRect().top
    //     }px)`
    //   } catch (ex) {
    //     console.log(ex)
    //   }
    // },
    // async load () {}
  },
  watch: {
    // searchTerm () {
    //   if (this.searchTerm === "") {
    //     this.formList = { ...this.responderForms }
    //   } else {
    //     this.formList = this.responderForms.filter((x) =>
    //       x.title.normalizeText().includes(this.searchTerm)
    //     )
    //   }
    // }
  }
}
</script>

<style lang="scss">
button.ribbon-button.form-button {
  min-width: 78px;
  width: 78px;

  .rb--label {
    white-space: pre-wrap;
    line-height: 12px;
    display: block;
    width: 100%;
    min-height: 20px;
  }
}

.thumbnail-item {
  padding: 10px 5px 0;
  background-color: rgba(255, 255, 255, 0.8);
  transition: 0.2s all ease;
  width: 90px;
  height: 80px;
  font-size: 11px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 3px;
  cursor: pointer;
  flex-wrap: nowrap;

  &:hover {
    background-color: #fff;
    border-color: var(--q-color-primary);
    transition: 0.2s all ease;
  }

  .th-icon {
    display: block;
    width: 100%;
  }

  .th-title {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    min-height: 40px;
    width: 100%;
    margin-top: 5px;
  }
}

.search-wrapper {
  .searchbox {
    position: relative;
    border: 1px solid #bbb;
    border-radius: 3px;
    background: #fff;
    padding: 4px;

    body.body--dark & {
      background: var(--dark);
      border-color: var(--dark-border);
    }

    input {
      flex-grow: 1;
      background-color: transparent;
      border: none;

      body.body--dark & {
        background-color: var(--dark);
        color: var(--dark-text-color);
      }
    }
  }
}
</style>
