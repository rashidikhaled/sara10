<template>
  <div id="task-header">
    <safa-ribbon
      :items="[{name: 'file',label: 'پرونده'},{name: 'reports',label: 'گزارش ها'},{name: 'revoke',label: 'ابطال'}]"
      @change:expanded="changeExpanded"
      v-model="activeTab"
    >
      <template #actions>
        <div
          class="flex items-center q-gutter-x-sm"
          v-if="taskInfo"
        >
          <div>
            <!-- <input placeholder="جستجوی سریع ..." type="text" v-model="quickSearch" ref="input" autofocus :tabindex="0"/> -->
            <safa-text placeholder="جستجوی سریع ..." v-model="quickSearch" ref="input" :control-height="24" autofocus/>
          </div>
          <div>
            مرحله:&nbsp;<span dir="rtl">{{ taskInfo.TaskTitel }}</span>
          </div>
          <div style="min-height: 12px">
            <q-separator style="height: 12px" vertical/>
          </div>
          <div>
            تاریخ تشکیل:&nbsp;<span dir="ltr">{{ taskInfo.StartDate + ' - ' + taskInfo.StartTime }}</span>
          </div>
          <div style="min-height: 12px">
            <q-separator style="height: 12px" vertical/>
          </div>
          <div v-if="blacklistState.exists">
            <q-icon :name="blacklistState.stop?'block':'warning'" size="22px"
                    :color="blacklistState.stop?'red':'orange'"/>&nbsp;
            {{ `کد مورد نظر در لیست سیاه${blacklistState.stop ? ' در وضعیت توقف' : ''} قرار دارد.` }}
          </div>
          <span v-if="blacklistState.exists" style="min-height: 12px"><q-separator style="height: 12px"
                                                                                   vertical/></span>
          <div style="line-height: 1;">
            <img
              :src="require('../static/back.svg')"
              height="20px"
              width="20px"
              title="بازگشت پرونده"
              v-if="taskInfo.TaskSide===2"
            />
            <img
              :src="require('../static/reference.svg')"
              height="20px"
              width="20px"
              title="ارجاع پرونده"
              v-else-if="taskInfo.TaskSide===1"
            />
            <img
              :src="require('../static/send.svg')"
              height="20px"
              width="20px"
              v-else
            />
            <q-tooltip
              anchor="bottom middle"
              self="top middle"
            >
              {{ taskInfo.TaskSide === 2 ? 'بازگشت' : (taskInfo.TaskSide === 1 ? 'ارجاع' : 'روبه جلو') }}
            </q-tooltip>
          </div>
          <!--<span><q-icon name="chevron_left" />&nbsp;بازگشت به کارتابل</span>-->
          <span>
            <q-btn
              @click="returnToKartable"
              class="q-px-sm"
              dense
              flat
              icon="close"
              label="بستن"
              size="sm"
              style="align-self: center"
            ></q-btn>
          </span>
        </div>
      </template>
      <ribbon-section name="file">
        <ribbon-column>
          <div
            style="min-width: 440px; max-width: 440px"
            v-if="taskInfo"
          >
            <div
              class="col"
              style="height: 34px;"
            >
              <div class="col-12">
                <div class="row items-center q-col-gutter-x-sm">
                  <!--<p class="q-mb-none">نوع پرونده: {{taskInfo.WorkflowTitel}}</p>
                  <p class="q-mb-none">مرحله: <span>{{taskInfo.TaskTitel}}</span></p>-->
                  <div class="col-6">
                    <div class=" row q-col-gutter-sm items-center">
                      <span
                        class="col-auto"
                        style="min-width: 72px;"
                      >نوع فرآیند:</span><span class="col"><input
                      :value="taskInfo.WorkflowTitel"
                      onclick="this.select()"
                      readonly
                      style="width: 100%; border: 1px solid rgba(0,0,0,.4)"
                    /></span>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="row q-col-gutter-sm items-center"><span class="col-auto" style="min-width: 72px;">شماره فرآیند:</span><span
                      class="col "><input
                      :value="taskInfo.NidWorkItem"
                      @click="copyNidWorkItem"
                      readonly
                      dir="ltr"
                      style="width: 100%; cursor: pointer; border: 1px solid rgba(0,0,0,.4)"
                    /></span></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-auto">
              <div class="row items-center q-col-gutter-x-sm">
                <div class="col-6">
                  <div class=" row q-col-gutter-sm items-center">
                      <span
                        class="col-auto"
                        style="min-width: 72px;"
                      >نام متقاضی:</span><span class="col"><input
                    :value="taskInfo.ProcRequester"
                    onclick="this.select()"
                    readonly
                    style="width: 100%; border: 1px solid rgba(0,0,0,.4)"
                  /></span>
                  </div>
                </div>
                <div class="col-6">
                  <div class="row q-col-gutter-sm items-center"><span class="col-auto"
                                                                      style="min-width: 72px;">کد:</span><span
                    class="col"><input
                    :value="taskInfo.BizCode"
                    @click="copyBizcode"
                    readonly
                    dir="ltr"
                    style="width: 100%; border: 1px solid rgba(0,0,0,.4)"
                  /></span></div>
                </div>
              </div>
            </div>
          </div>
          <div
            style="max-width: 100%;min-width: 440px;"
            v-else
          >
            <div class="column q-col-gutter-sm">
              <div class="col-6">
                <div class="row q-col-gutter-md">
                  <div class="col">
                    <q-skeleton
                      bordered
                      height="20px"
                      type="rect"
                    />
                  </div>
                  <div class="col">
                    <q-skeleton
                      bordered
                      height="20px"
                      type="rect"
                    />
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div class="row q-col-gutter-md">
                  <div class="col">
                    <q-skeleton
                      bordered
                      height="20px"
                      type="rect"
                    />
                  </div>
                  <div class="col">
                    <q-skeleton
                      bordered
                      height="20px"
                      type="rect"
                    />
                  </div>
                  <div class="col">
                    <q-skeleton
                      bordered
                      height="20px"
                      type="rect"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ribbon-column>
        <ribbon-column v-if="enableBackButton">
          <ribbon-button
            @click="returnFile"
            class="back-button"
            label="بازگشت"
          >
            <template #icon>
              <q-icon color="red-5">
                <svg
                  data-name="Layer 1"
                  height='300px'
                  viewBox="0 0 100 100"
                  width='300px'
                  x="0px"
                  xmlns="http://www.w3.org/2000/svg"
                  y="0px"
                >
                  <path
                    d="M67.85,2.5H32.15A29.64,29.64,0,0,0,2.5,32.15v35.7A29.64,29.64,0,0,0,32.15,97.5h35.7A29.64,29.64,0,0,0,97.5,67.85V32.15A29.64,29.64,0,0,0,67.85,2.5ZM50,75l-7.09-7.09L56.26,54.56H25V45.44H56.26L42.91,32.09,50,25,75,50Z"></path>
                </svg>
              </q-icon>
            </template>
          </ribbon-button>
        </ribbon-column>
        <ribbon-column v-if="!taskMention">
          <ribbon-button
            :disabled="disableAcceptAndSend"
            @click="doneTask"
            class="simple-task"
            label="تایید و اتمام"
            v-if="isSimpleTaskType"
          >
            <template #icon>
              <q-icon color="blue">
                <svg
                  id="Layer_1"
                  style="enable-background:new 0 0 300 300;"
                  version="1.1"
                  viewBox="0 0 300 300"
                  x="0px"
                  xml:space="preserve"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  y="0px"
                >
                  <path
                    class="st0"
                    d="M96.4,7.5c-49.1,0-88.9,39.8-88.9,89v107.1c0,0,0,0,0,0.1c0,49.1,39.8,88.9,88.9,88.9h107.1c0,0,0,0,0.1,0 c49.1,0,88.9-39.8,88.9-88.9V96.5c0,0,0,0,0-0.1c0-49.1-39.8-88.9-89-88.9L96.4,7.5C96.4,7.5,96.4,7.5,96.4,7.5z M75,150l75-75 l21.3,21.3l-40.1,40H225v27.4h-93.8l40.1,40.1L150,225L75,150z"
                  /></svg>
              </q-icon>
            </template>
          </ribbon-button>
          <ribbon-button
            @click="showArchiveRequest = true"
            class="archive-button"
            label="بایگانی"
            v-else-if="NotAllowSend"
          >
            <template #icon>
              <q-icon color="blue" name="archive" class="material-icons-round" size="26px"/>
            </template>
          </ribbon-button>
          <ribbon-button
            :disabled="disableAcceptAndSend"
            @click="acceptAndSend"
            class="accept-send"
            label="تایید و ارسال"
            v-else
          >
            <template #icon>
              <q-icon style="color: #00b22d">
                <svg
                  id="Layer_1"
                  style="enable-background:new 0 0 300 300;"
                  version="1.1"
                  viewBox="0 0 300 300"
                  x="0px"
                  xml:space="preserve"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  y="0px"
                >
                  <path
                    class="st0"
                    d="M96.4,7.5c-49.1,0-88.9,39.8-88.9,89v107.1c0,0,0,0,0,0.1c0,49.1,39.8,88.9,88.9,88.9h107.1c0,0,0,0,0.1,0 c49.1,0,88.9-39.8,88.9-88.9V96.5c0,0,0,0,0-0.1c0-49.1-39.8-88.9-89-88.9L96.4,7.5C96.4,7.5,96.4,7.5,96.4,7.5z M75,150l75-75 l21.3,21.3l-40.1,40H225v27.4h-93.8l40.1,40.1L150,225L75,150z"
                  /></svg>
              </q-icon>
            </template>
          </ribbon-button>

        </ribbon-column>
        <!--        <ribbon-column>
                  <ribbon-button
                    @click="revoke"
                    class="revoke"
                    label="ابطال"
                  >
                    <template #icon>
                      <q-icon>
                        <svg version="1.1" baseProfile="tiny" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                             xmlns:xlink="http://www.w3.org/1999/xlink"
                             x="0px" y="0px" viewBox="0 0 24 24" overflow="visible" xml:space="preserve">
        <path fill="#EFB250" d="M17,24H7c-3.9,0-7-3.1-7-7L0,7c0-3.9,3.1-7,7-7l10,0c3.9,0,7,3.1,7,7v10C24,20.9,20.9,24,17,24z"/>
                          <path fill="#FFFFFF" stroke="#FFFFFF" stroke-miterlimit="10" d="M17.3,7.8l-1.1-1.1L12,10.9L7.8,6.7L6.7,7.8l4.2,4.2l-4.2,4.2
          l1.1,1.1l4.2-4.2l4.2,4.2l1.1-1.1L13.1,12L17.3,7.8z"/>
        </svg>
                      </q-icon>
                    </template>
                  </ribbon-button>
                </ribbon-column>-->
        <ribbon-column v-if="enableReferenceButton">
          <ribbon-button
            @click="referenceFile"
            class="reference-button"
            label="ارجاع"
          >
            <template #icon>
              <q-icon>
                <svg
                  class=""
                  height="512"
                  style="enable-background:new 0 0 512 512"
                  version="1.1"
                  viewBox="0 0 512 512"
                  width="512"
                  x="0"
                  xml:space="preserve"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  y="0"
                >
                  <circle
                    cx="256"
                    cy="256"
                    fill="#ffffff"
                    r="256"
                    shape="circle"
                    transform="matrix(0.5,0,0,0.5,128,128)"
                  />
                  <g transform="matrix(1,0,0,1,0,0)">
                    <path
                      class=""
                      d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M356.416,228.416 c-4.16,4.16-9.621,6.251-15.083,6.251c-5.461,0-10.923-2.091-15.083-6.251l-48.917-48.917V384    c0,11.776-9.536,21.333-21.333,21.333s-21.333-9.557-21.333-21.333V179.499l-48.917,48.917c-8.341,8.341-21.824,8.341-30.165,0    s-8.341-21.824,0-30.165l85.312-85.312c1.963-1.984,4.331-3.541,6.955-4.629c5.205-2.155,11.093-2.155,16.299,0    c2.624,1.088,4.992,2.645,6.955,4.629l85.312,85.312C364.757,206.592,364.757,220.075,356.416,228.416z"
                      data-original="#000000"
                      fill="#007cd1"
                    />
                  </g>
                </svg>
              </q-icon>
            </template>
          </ribbon-button>
        </ribbon-column>
        <ribbon-column>
          <ribbon-button
            :disabled="disableAcceptAndSend"
            @click="backToChecklist"
            label="چک لیست و توضیحات"
            style="min-width: 128px"
            type="list"
          >
            <template #icon>
              <q-icon
                color="indigo-4"
                name="verified"
              />
            </template>
          </ribbon-button>
          <ribbon-button
            @click="selectArchive"
            label="آرشیو الکترونیکی"
            style="min-width: 128px"
            type="list"
          >
            <template #icon>
              <q-icon color="blue-14">
                <svg
                  height='300px'
                  style="enable-background:new 0 0 512 512;"
                  version="1.1"
                  viewBox="0 0 512 512"
                  width='300px'
                  x="0px"
                  xml:space="preserve"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  y="0px"
                >
                  <g>
                    <g>
                      <path
                        d="M208.804,363.956c-9.217,0-16.715,7.485-16.715,16.686c0,9.201,7.498,16.688,16.715,16.688s16.715-7.486,16.715-16.688    C225.52,371.441,218.021,363.956,208.804,363.956z"></path>
                      <path
                        d="M233.562,322.316V152.12h-49.479v170.196H233.562z M204.804,198.772c0-2.209,1.791-4,4-4s4,1.791,4,4v79.38    c0,2.209-1.791,4-4,4s-4-1.791-4-4V198.772z"></path>
                      <path
                        d="M419.848,349.522c-7.981,4.619-10.724,14.857-6.117,22.825c2.982,5.153,8.534,8.355,14.488,8.355    c2.901,0,5.779-0.77,8.321-2.224c3.851-2.228,6.616-5.832,7.77-10.14s0.558-8.808-1.679-12.671    c-2.978-5.175-8.53-8.384-14.494-8.384C425.235,347.285,422.369,348.059,419.848,349.522z"></path>
                      <path
                        d="M68.559,363.956c-9.201,0-16.686,7.485-16.686,16.686c0,9.201,7.485,16.688,16.686,16.688    c9.217,0,16.715-7.486,16.715-16.688C85.274,371.441,77.775,363.956,68.559,363.956z"></path>
                      <path
                        d="M93.31,152.12H43.802v170.196H93.31V152.12z M72.559,278.152c0,2.209-1.791,4-4,4s-4-1.791-4-4v-79.38    c0-2.209,1.791-4,4-4s4,1.791,4,4V278.152z"></path>
                      <path
                        d="M20.938,422.939h95.235V90.004H20.938V422.939z M68.559,405.329c-13.612,0-24.686-11.075-24.686-24.688    c0-13.611,11.074-24.686,24.686-24.686c13.628,0,24.715,11.074,24.715,24.686C93.274,394.254,82.187,405.329,68.559,405.329z     M45.19,107.608h46.73c2.209,0,4,1.791,4,4s-1.791,4-4,4H45.19c-2.209,0-4-1.791-4-4S42.981,107.608,45.19,107.608z     M35.802,148.12c0-2.209,1.791-4,4-4H97.31c2.209,0,4,1.791,4,4v178.196c0,2.209-1.791,4-4,4H39.802c-2.209,0-4-1.791-4-4V148.12z    "></path>
                      <path
                        d="M241.562,326.316c0,2.209-1.791,4-4,4h-57.479c-2.209,0-4-1.791-4-4V148.12c0-2.209,1.791-4,4-4h56.947l-1.357-2.352    l-2.949-5.108c-0.134-0.232-0.243-0.477-0.327-0.727c-0.05-0.149-0.074-0.303-0.105-0.454c-0.022-0.103-0.056-0.203-0.07-0.307    c-0.023-0.18-0.019-0.359-0.018-0.539c0-0.08-0.012-0.16-0.006-0.24c0.016-0.242,0.058-0.481,0.118-0.717    c0.004-0.018,0.004-0.035,0.009-0.053c0.011-0.042,0.033-0.079,0.045-0.12c0.063-0.207,0.133-0.412,0.229-0.607    c0.037-0.076,0.089-0.143,0.131-0.216c0.087-0.152,0.171-0.307,0.279-0.448c0.059-0.076,0.132-0.14,0.196-0.212    c0.108-0.123,0.211-0.249,0.336-0.359c0.161-0.142,0.341-0.263,0.524-0.378c0.042-0.026,0.076-0.061,0.119-0.086l22.24-12.861    V90.004h-95.241v332.936h95.241V177.727l-14.863-25.753V326.316z M185.413,107.608h46.789c2.209,0,4,1.791,4,4s-1.791,4-4,4    h-46.789c-2.209,0-4-1.791-4-4S183.204,107.608,185.413,107.608z M208.804,405.329c-13.628,0-24.715-11.075-24.715-24.688    c0-13.611,11.087-24.686,24.715-24.686s24.715,11.074,24.715,24.686C233.52,394.254,222.432,405.329,208.804,405.329z"></path>
                      <path
                        d="M420.476,301.171l-85.127-147.46l-42.858,24.781l85.103,147.404L420.476,301.171z M373.475,277.224l-39.693-68.72    c-1.104-1.913-0.45-4.359,1.463-5.465c1.913-1.104,4.359-0.448,5.465,1.463l39.693,68.72c1.104,1.913,0.45,4.359-1.463,5.465    c-0.63,0.363-1.318,0.537-1.997,0.537C375.56,279.224,374.216,278.506,373.475,277.224z"></path>
                      <path
                        d="M241.652,136.125l166.406,288.274l82.477-47.587L324.129,88.538L241.652,136.125z M273.419,146.703    c-1.383,0-2.728-0.718-3.468-2.002c-1.105-1.913-0.449-4.359,1.465-5.464l40.497-23.368c1.914-1.105,4.358-0.448,5.464,1.466    c1.104,1.913,0.448,4.359-1.466,5.464l-40.497,23.368C274.785,146.53,274.098,146.703,273.419,146.703z M449.56,351.67    c3.304,5.707,4.185,12.365,2.478,18.74c-1.706,6.369-5.793,11.697-11.508,15.003c-3.766,2.155-8.018,3.29-12.311,3.29    c-8.799,0-17.004-4.732-21.413-12.35c-6.814-11.786-2.764-26.928,9.03-33.753c3.736-2.168,7.991-3.315,12.301-3.315    C436.954,339.285,445.163,344.031,449.56,351.67z M337.846,144.38c1.025,0.274,1.899,0.945,2.43,1.864l89.129,154.393    c0.531,0.919,0.675,2.012,0.399,3.036c-0.274,1.025-0.946,1.899-1.865,2.429l-49.813,28.722c-0.629,0.363-1.316,0.536-1.994,0.536    c-1.383,0-2.728-0.718-3.468-2.001l-89.1-154.328c-1.105-1.912-0.451-4.357,1.461-5.463l49.784-28.786    C335.729,144.25,336.824,144.107,337.846,144.38z"></path>
                    </g>
                  </g>
                </svg>
              </q-icon>
            </template>
          </ribbon-button>
          <!--<ribbon-button :disabled="disableAcceptAndSend" @click="backToComments" label="توضیحات"
                         style="min-width: 85px"
                         type="list">
            <template #icon>
              <q-icon color="purple-4" name="forum"/>
            </template>
          </ribbon-button>-->
        </ribbon-column>
        <!--<ribbon-column>
          <ribbon-button :disabled="cmd!=='form'" @click="formEdit" label="ویرایش" style="min-width: 105px" type="list">
            <template #icon>
              <q-icon color="orange-4" name="edit"/>
            </template>
          </ribbon-button>
        </ribbon-column>-->
        <ribbon-column style="flex-grow: 1;">
          <div class="form__list">
            <button-group height="60px">
              <template v-if="!isLoading">
                <ribbon-button
                  :key="index"
                  :label="form.Caption"
                  @click="selectForm(form)"
                  class="form-button"
                  v-for="(form,index) in filteredForms"
                >
                  <template #icon>
                    <q-icon
                      color="primary"
                      size="20px"
                      style="transform: scaleX(-1); -ms-transform: scaleX(-1);"
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
                            d="M57,7H7a5,5,0,0,0-5,5V52a5,5,0,0,0,5,5H57a5,5,0,0,0,5-5V12A5,5,0,0,0,57,7ZM29,12a2,2,0,1,1-2,2A2,2,0,0,1,29,12Zm-9,0a2,2,0,1,1-2,2A2,2,0,0,1,20,12Zm-9,0a2,2,0,1,1-2,2A2,2,0,0,1,11,12ZM60,52a3,3,0,0,1-3,3H7a3,3,0,0,1-3-3V20H60Z"/>
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
              <div
                :key="findex"
                style="display: inline-block;"
                v-else
                v-for="findex in [0,1,2,3]"
              >
                <q-skeleton
                  height="60px"
                  width="70px"
                />
              </div>
            </button-group>
          </div>
        </ribbon-column>
        <ribbon-column v-if="showFormsPanel">
          <ribbon-button
            @click="showAllForms"
            class="show-forms"
            label="همه فرم ها"
          >
            <template #icon>
              <q-icon
                color="primary"
                name="more_horiz"
              />
            </template>
          </ribbon-button>
        </ribbon-column>
      </ribbon-section>
      <ribbon-section name="reports">
        <ribbon-column style="flex-grow: 1;">
          <div class="report__list">
            <button-group height="60px">
              <ribbon-button
                :key="index"
                :label="report.Caption"
                @click="selectReport(report)"
                class="report-button"
                style="min-width: 80px"
                v-for="(report,index) in filteredReports"
              >
                <template #icon>
                  <q-icon
                    color="primary"
                    size="20px"
                  >
                    <svg
                      height="300px"
                      viewBox="0 0 64 64"
                      width="300px"
                      x="0px"
                      xmlns="http://www.w3.org/2000/svg"
                      y="0px"
                    >
                      <g data-name="Report Page">
                        <path
                          d="M57,7H7a5,5,0,0,0-5,5V52a5,5,0,0,0,5,5H57a5,5,0,0,0,5-5V12A5,5,0,0,0,57,7ZM29,12a2,2,0,1,1-2,2A2,2,0,0,1,29,12Zm-9,0a2,2,0,1,1-2,2A2,2,0,0,1,20,12Zm-9,0a2,2,0,1,1-2,2A2,2,0,0,1,11,12ZM60,52a3,3,0,0,1-3,3H7a3,3,0,0,1-3-3V20H60Z"/>
                        <path d="M49,27H39a1,1,0,0,1,0-2H49a1,1,0,0,1,0,2Z"/>
                        <path d="M55,33H33a1,1,0,0,1,0-2H55a1,1,0,0,1,0,2Z"/>
                        <path d="M55,39H33a1,1,0,0,1,0-2H55a1,1,0,0,1,0,2Z"/>
                        <path d="M55,45H33a1,1,0,0,1,0-2H55a1,1,0,0,1,0,2Z"/>
                        <path d="M55,51H8a1,1,0,0,1,0-2H55a1,1,0,0,1,0,2Z"/>
                        <path d="M19,34h8.95A10,10,0,0,0,19,25.05Z"/>
                        <path d="M18,36a1,1,0,0,1-1-1V25.05A10,10,0,1,0,27.95,36Z"/>
                      </g>
                    </svg>
                  </q-icon>
                </template>
              </ribbon-button>
            </button-group>
          </div>
        </ribbon-column>
        <ribbon-column v-if="showReportsPanel">
          <ribbon-button
            @click="showAllReports"
            class="show-reports"
            label="همه گزارش ها"
          >
            <template #icon>
              <q-icon
                color="primary"
                name="more_horiz"
              />
            </template>
          </ribbon-button>
        </ribbon-column>
      </ribbon-section>

      <ribbon-section name="revoke">
        <ribbon-column>
          <ribbon-button
            @click="revoke"
            class="revoke"
            label="ابطال"
          >
            <template #icon>
              <q-icon>
                <svg version="1.1" baseProfile="tiny" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                     xmlns:xlink="http://www.w3.org/1999/xlink"
                     x="0px" y="0px" viewBox="0 0 24 24" overflow="visible" xml:space="preserve">
<path fill="#EFB250" d="M17,24H7c-3.9,0-7-3.1-7-7L0,7c0-3.9,3.1-7,7-7l10,0c3.9,0,7,3.1,7,7v10C24,20.9,20.9,24,17,24z"/>
                  <path fill="#FFFFFF" stroke="#FFFFFF" stroke-miterlimit="10"
                        d="M17.3,7.8l-1.1-1.1L12,10.9L7.8,6.7L6.7,7.8l4.2,4.2l-4.2,4.2 l1.1,1.1l4.2-4.2l4.2,4.2l1.1-1.1L13.1,12L17.3,7.8z"/>
</svg>
              </q-icon>
            </template>
          </ribbon-button>
        </ribbon-column>
      </ribbon-section>
    </safa-ribbon>

    <safa-popup
      v-model="showRevokedRequest"
      width="500px"
      height="380px"
    >
      <RevokeRequest
        :taskInfo="taskInfo"
        @revokeDone="returnToKartable"
      />
    </safa-popup>

    <safa-popup
      title="ارسال به بایگانی دائم"
      v-model="showArchiveRequest"
      width="800px"
      height="500px"
    >
      <ArchiveRequest
        :taskInfo="taskInfo"
        @archivedRequest="returnToKartable"
        @hide="showArchiveRequest = false"
      />
    </safa-popup>

    <!--      {{taskInfo}}-->
  </div>
</template>

<script>
import { copyToClipboard } from 'quasar'
import RevokeRequest from './RevokeRequest'
import ArchiveRequest from './ArchiveRequest.vue'
// import kartableMixin from '../mixins/kartableMixin'

export default {
  name: 'TaskHeader',
  // mixins: [kartableMixin],
  components: { RevokeRequest, ArchiveRequest },
  props: {
    taskInfo: Object,
    cmd: String,
    reports: [Array, Object],
    forms: [Array, Object],
    disableAcceptAndSend: Boolean,
    taskMention: Object,
    isLoading: Boolean,
    showAcceptButton: Boolean,
    NotAllowSend: Boolean,
    showFormsPanel: Boolean,
    showReportsPanel: Boolean,
    enableReferenceButton: Boolean,
    enableBackButton: Boolean,
    isSimpleTaskType: Boolean,
    blacklistState: Object
  },
  computed: {
    filteredForms () {
      return this.forms.filter(({ Caption }) => Caption.convertToPersian().includes(this.quickSearch.convertToPersian())) || []
    },
    filteredReports () {
      return this.reports.filter(({ Caption }) => Caption.convertToPersian().includes(this.quickSearch.convertToPersian())) || []
    }
  },
  data () {
    return {
      activeTab: 'file',
      showRevokedRequest: false,
      showArchiveRequest: false,
      quickSearch: ''
    }
  },
  methods: {
    revoke () {
      this.showRevokedRequest = true
    },
    rcvokeDone () {
      this.showRevokedRequest = false
    },
    returnToKartable () {
      this.$emit('return-to-kartable')
      this.$root.$emit('refresh:kartable')
      if (this.showRevokedRequest) {
        this.showRevokedRequest = false
      }
      if (this.showArchiveRequest) {
        this.showArchiveRequest = false
      }
    },
    copyNidWorkItem () {
      copyToClipboard(this.taskInfo.NidWorkItem).then(() => {
        this.showSuccess('شماره فرآیند کپی شد.')
      })
    },
    copyBizcode () {
      copyToClipboard(this.taskInfo.BizCode).then(() => {
        this.showSuccess('کد کپی شد.')
      })
    },
    acceptAndSend () {
      this.$emit('send')
    },
    doneTask () {
      this.$emit('doneSimpleTask')
    },
    returnFile () {
      this.$emit('backFile')
    },
    referenceFile () {
      this.$emit('reference')
    },
    backToChecklist () {
      this.$emit('checklist')
    },
    showAllForms () {
      this.$emit('allforms')
    },
    showAllReports () {
      this.$emit('allreports')
    },
    showDetailsTab () {
      this.$emit('detailstab')
    },
    backToComments () {
      this.$emit('comments')
    },
    selectForm (form) {
      this.$emit('select:form', form)
    },
    selectReport (report) {
      this.$emit('select:report', report)
    },
    formEdit () {
      this.$emit('action:edit')
    },
    selectArchive () {
      this.$emit('select:archive')
    },
    changeExpanded (expanded) {
      this.$emit('change:expanded', expanded)
    }
  }
}
</script>

<style lang="scss">
.form__list,
.report__list {
  .ribbon-button {
    min-width: 68px;
    padding: 2px 4px 4px;
    overflow: hidden;

    span.rb--label {
      white-space: normal;
      white-space: normal;
      line-height: 12px;
      max-width: 85px;
      min-width: 62px;
      font-size: 9.5px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .rb--icon {
      height: 22px;

      > i {
        font-size: 22px !important;
      }
    }
  }
}

.ribbon-button.ribbon-btn-thumbnail:not(.form-button):not(.report-button) {
  .rb--icon {
    margin-top: 4px;
  }

  .rb--label {
    line-height: 12px;
    max-width: 80px;
    min-width: 50px;
    font-size: 10px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: normal;
    color: black;
  }
}

.accept-send:not([disabled]):hover {
  border: 1px solid var(--q-color-primary) !important;
  background: #e0f7e1 !important;

  body.body--dark & {
    background: var(--lighten10) !important;
    border-color: var(--dark-border) !important;
  }
}

.simple-task:not([disabled]):hover {
  border: 1px solid #2196f3 !important;
  background: #d6f0fd !important;

  body.body--dark & {
    background: var(--lighten3) !important;
    border-color: var(--dark-border) !important;
  }
}

.reference-button:not([disabled]):hover {
  border: 1px solid #4c6faf !important;
  background: #e0ecf7 !important;

  body.body--dark & {
    background: var(--lighten2) !important;
  }
}

.archive-button:not([disabled]):hover {
  border: 1px solid #4c6faf !important;
  background: #e0ecf7 !important;

  body.body--dark & {
    background: var(--lighten2) !important;
  }
}

.back-button:not([disabled]):hover {
  border: 1px solid #af5e4c !important;
  background: #ffebea !important;

  body.body--dark & {
    background: var(--lighten2) !important;
  }
}

//
//#task-header {
//  border-top: 1px solid rgba(0,0,0,.2);
//}

.input-flat {
  font-size: 13px;
  line-height: 1;
  border: none;
  background: none;
  color: blue;

  body.body--dark & {
    color: #fff;
  }
}
</style>
