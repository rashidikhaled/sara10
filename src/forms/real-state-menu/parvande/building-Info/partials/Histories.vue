<template>
    <safa-splitter v-model="splitterValueHorizontal" horizontal>
      <template v-slot:before>
        <fit>
          <safa-datatable
            title="شماره سند ملک"
            fit
            min-height="100px"
            height="100%"
            max-height="100%"
            v-model="melkDocumentNumber"
            helper="melkDocumentNumberColumns"
            :take="20"
            :addRow="false"
            :allowCopy="false"
            :deleteRow="false"
            :isEditable="true"
            class="q-mb-sm"
            :m="m"
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-splitter v-model="splitterValueVerticalR" vertical>
            <template v-slot:before>
              <safa-splitter v-model="splitterValueVerticalL" vertical>
                <template v-slot:before>
                  <fit>
                    <safa-datatable
                      title="اشتراکات"
                      fit
                      min-height="100px"
                      height="100%"
                      max-height="100%"
                      v-model="Shareds"
                      helper="SharedsColumns"
                      :m="m"
                      :take="20"
                      :addRow="false"
                      :allowCopy="false"
                      :deleteRow="false"
                      :isEditable="true"
                      class="q-mb-sm"
                    />
                  </fit>
                </template>
                <template v-slot:after>
                  <fit>
                    <safa-datatable
                      title="سوابق شهرسازی"
                      fit
                      min-height="100px"
                      height="100%"
                      max-height="100%"
                      v-model="shahrSaziHistory"
                      helper="shahrSaziHistoryColumns"
                      :m="m"
                      :take="20"
                      :addRow="false"
                      :allowCopy="false"
                      :deleteRow="false"
                      :isEditable="true"
                      class="q-mb-sm"
                    />
                  </fit>
                </template>
              </safa-splitter>
            </template>
            <template v-slot:after>
              <fit>
                <safa-datatable
                  title="سوابق کمیسیون ها"
                  fit
                  min-height="100px"
                  height="100%"
                  max-height="100%"
                  v-model="commissionHistory"
                  helper="commissionHistoryColumns"
                  :m="m"
                  :take="20"
                  :addRow="false"
                  :allowCopy="false"
                  :deleteRow="false"
                  :isEditable="true"
                  class="q-mb-sm"
                />
              </fit>
            </template>
          </safa-splitter>
        </fit>
      </template>
    </safa-splitter>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],

  data () {
    return {
      name: "Histories",

      // splitter
      horizontalSplitterModel: 50,
      VerticalSplitterModel: 50,
      splitterValueHorizontal: 50,
      splitterValueVerticalR: 50,
      splitterValueVerticalL: 50,

      // grids

      melkDocumentNumber: [],

      Shareds: [],

      shahrSaziHistory: [],

      commissionHistory: []
    }
  }
}
</script>
