<template>
  <div
    :style="{height}"
    class="text-template"
    :class="[{'fit': fit, 'resize': resize, 'input--readonly': m==='r'}, (errorMessage === null ? '' : errorMessage ===''?'valid--feedback':'invalid--feedback')]"
  >
    <div
      class="row full-height"
      :class="{'q-col-gutter-x-sm': !labelShrink, 'label-shrink': labelShrink}"
    >
      <safa-label
        v-if="label"
        class="col-12 items-center"
        :class="{ 'col-sm-auto': !labelShrink }"
        style="max-height: 30px; display: inline-flex"
        :style="{ width: labelShrink ? '100%': labelWidth  }"
      >{{ label }}
      </safa-label>
      <div
        class="safa-text-input col-12"
        :class="{
          ' col-sm': !labelShrink,
        }"
      >
        <textarea
          :readonly="m==='r'"
          :value="value"
          @input="updateText"
          :rows="rows"
          v-bind="$attrs"
          class="full-height"
        />
        <div v-if="m==='e'" class="text-template-popup">
          <span class="q-px-sm q-py-xs" @click="showModal = true">
            <q-icon name="add_comment" color="primary" class="cursor-pointer"/>
          </span>
        </div>
      </div>
      <span :title="errorMessage" class="validation-error col-auto" v-if="errorMessage"><q-icon
        name="priority_high"></q-icon></span>
      <span class="validation-success col-auto" v-if="typeof errorMessage!=='null' && errorMessage === ''"><q-icon
        name="check"></q-icon></span>
    </div>
    <!-- <textarea v-model="value" />
    <safa-text
      type="textarea"
      v-model="value"
      :label="label"
      :rows="rows"
      :labelWidth="labelWidth"
      :label-shrink="labelShrink"
      v-bind="$attrs"
      v-on="$listeners"
      :m="m"
      :resizable="false"
    >
      <template
        v-slot:append
        v-if="m==='e'"
      >
        <div
          class="items-start full-height q-py-sm"
          style="width: 50px;"
        >
          <span
            class="q-my-sm q-mx-md"
            @click="showModal = true"
          >
            <q-icon
              name="add_comment"
              class="cursor-pointer"
            />
          </span>
        </div>
      </template>
    </safa-text> -->

    <q-dialog v-model="showModal">
      <q-card style="width: 600px; max-width: 100%; height: 600px; max-height: 80vh">
        <q-card-section class="row items-center q-pb-none">
          <q-space/>
          <q-btn
            icon="close"
            flat
            round
            dense
            v-close-popup
          />
        </q-card-section>
        <q-card-section>
          <q-list separator>
            <q-item class="q-mb-lg shadow-7 shadow-transition items-end rounded-borders">
              <q-item-section>
                <q-form
                  @submit="handleAddOrUpdate"
                  autofocus
                >
                  <div class="row">
                    <div class="col-12 col-md">
                      <input
                        style="height: 40px;width: 100%;"
                        :style="$q.dark.isActive?'background-color: var(--dark); color: var(--dark-text-color); border: 1px solid var(--dark-border) !important;' : 'background-color: unset; color: unset;'"
                        v-model="crudComment.title"
                        placeholder="عنوان ..."
                        class="no-border no-outline"
                        :tabindex="0"
                      />
                    </div>
                    <div class="col-auto">
                      <q-btn
                        round
                        flat
                        :icon="
                          expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'
                        "
                        @click.stop="expanded = !expanded"
                        tabindex="3"
                      />
                      <q-btn
                        icon="search"
                        flat
                        round
                        @click="load"
                        tabindex="4"
                      />
                    </div>
                  </div>
                  <q-slide-transition>
                    <div v-show="expanded">
                      <textarea
                        style="width: 100%;resize: none; max-width: 100%; min-height: 40px; display: inline-block"
                        :style="$q.dark.isActive?'background-color: var(--dark); color: var(--dark-text-color); border: 1px solid var(--dark-border) !important;' : 'background-color: unset; color: unset;'"
                        v-model="crudComment.desc"
                        placeholder="توضیحات ..."
                        class="no-border no-outline q-mt-md"
                        :rows="4"
                        :tabindex="1"
                      ></textarea>
                      <div class="q-mt-md flex justify-end">
                        <q-btn
                          flat
                          color="primary"
                          label="ذخیره اطلاعات"
                          type="submit"
                          :tabindex="2"
                          :disable="!crudComment.title"
                        />
                      </div>
                    </div>
                  </q-slide-transition>
                </q-form>
              </q-item-section>
            </q-item>
            <div v-if="loading">
              <q-skeleton height="40px"/>
              <br/>
              <q-skeleton height="40px"/>
              <br/>
              <q-skeleton height="30px"/>
              <br/>
              <q-skeleton height="40px"/>
              <br/>
              <q-skeleton height="40px"/>
              <br/>
              <q-skeleton height="70px"/>
              <br/>
              <q-skeleton height="50px"/>
            </div>
            <transition-group
              tag="div"
              name="slide"
            >
              <div
                v-for="(com,i) in commentFiltered"
                :key="`${com.id}_${i}`">
                <q-item
                  clickable
                  v-ripple
                >
                  <q-item-section
                    @click="handleSelect(com)"
                    v-close-popup
                  >
                    <q-item-label>{{ com.title }}</q-item-label>
                    <q-item-label caption>
                      <div class="commentBody">
                         {{ com.desc }}
                      </div>
                    </q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <div class="text-grey-8 q-gutter-xs">
                      <q-btn
                        class="gt-xs"
                        size="12px"
                        flat
                        dense
                        round
                        color="grey-6"
                        icon="edit"
                        @click="handleEdit(com)"
                      />
                      <q-separator vertical style="height: 12px; display: inline-block" />
                      <q-btn
                        class="gt-xs"
                        size="12px"
                        flat
                        dense
                        round
                        color="grey-6"
                        icon="delete"
                        @click="handleRemove(com)"
                      />
                    </div>
                  </q-item-section>
                </q-item>
                <q-separator spaced />
              </div>
            </transition-group>
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!--    <q-dialog
          v-model="customTextDialogModel"
          persistent
        >
          <q-card style="width: 700px; max-width: 90vw;">
            <q-card-section>
              <div class="text-h6">وارد کردن توضیحات:</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <safa-text
                v-model="customText"
                autofocus
                type="textarea"
                :rows="10"
                @keyup.ctrl.enter="saveCustomText"
              />
            </q-card-section>

            <q-card-actions
              align="left"
              class="text-primary"
            >
              <q-btn
                outline
                color="primary"
                label="لغو"
                v-close-popup
              />
              <q-btn
                color="primary"
                label="ذخیره اطلاعات"
                v-close-popup
                @click="saveCustomText"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>-->
  </div>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import { controlValidation, logTextInterface } from 'ui-core'

import { uid } from 'quasar'

export default {
  name: 'TextTemplate',
  mixins: [baseFormMixin, controlValidation, logTextInterface],
  props: {
    fit: {
      type: Boolean,
      default: true
    },
    resize: Boolean,
    value: String,
    formKey: String,
    label: String,
    m: {
      type: String,
      default: () => window.getKaisOpt('global_mode')
    },
    rows: {
      type: Number,
      default: 5
    },
    labelWidth: {
      type: [Number, String],
      default: () => window.getKaisOpt('global_labelWidth', 'auto')
    },
    labelShrink: {
      type: Boolean,
      default: () => Boolean(window.getKaisOpt('global_labelShrink', true))
    },
    height: {
      type: String,
      default: '100%'
    }
  },

  data () {
    return {
      loading: true,
      loadingCrud: false,
      result: null,
      expanded: false,
      crudComment: {
        title: '',
        desc: '',
        id: uid()
      },
      showModal: false,
      comments: []
      // customTextDialogModel: false,
      // customText: ''
    }
  },

  computed: {
    commentFiltered () {
      if (this.crudComment.title && !this.expanded) {
        return this.comments.filter(
          (x) =>
            (x.title + x.desc)
              .toLowerCase()
              .indexOf(this.crudComment.title.toLowerCase()) > -1
        )
      }

      return this.comments
    }
  },

  methods: {
    updateText (e) {
      this.changedValue = true
      this.$emit('input', e.target.value)
    },
    /* saveCustomText (ev) {
      this.$emit('input', this.customText)
      this.customTextDialogModel = false
    },
    showCustomTextDialog () {
      if (this.m !== 'e') return

      this.customTextDialogModel = true
    }, */
    handleAdd () {
      this.crudComment = {
        title: '',
        desc: '',
        id: uid()
      }
    },
    handleEdit (comment) {
      this.crudComment = { ...comment }
      this.expanded = true
    },
    handleRemove (comment) {
      this.$q
        .dialog({
          title: 'تایید حذف',
          message: 'آیا از حذف این گزینه اطمینان دارید؟',
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.handleRemovePermanently(comment)
          // // console.log('>>>> OK')
        })
        .onOk(() => {
        })
        .onCancel(() => {
          // // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // // console.log('I am triggered on both OK and Cancel')
        })
    },
    handleSelect (comment) {
      this.showConfirm('آیا متن انتخاب شده جایگزین متن شود ؟')
        .onOk(() => {
          this.$emit('input', comment.desc)
        }).onCancel(() => {
          let Comment = `${
            this.value +
              ` \n` +
              comment.desc
          }`
          this.$emit('input', Comment)
        })
    },

    handleAddOrUpdate () {
      if (!this.crudComment.title || !this.crudComment.desc) {
        this.expanded = true
        return
      }
      if (this.loadingCrud) {
        return
      }
      try {
        this.loadingCrud = true
        const list = [...this.comments]
        const index = list.findIndex(cmt => cmt.id === this.crudComment.id)
        if (index === -1) {
          list.push(Object.freeze({ ...this.crudComment }))
        } else {
          list.splice(index, 1, Object.freeze({ ...this.crudComment }))
        }
        this.$stKartable.dispatch('formSettings/saveSettings', {
          key: this.formKey,
          value: list
        }).then(value => {
          this.showSuccess('توضیحات با موفقیت ذخیره شد.')
          this.handleAdd()
          this.comments = list
          this.expanded = false
        }).catch(_ => {
          this.showError('خطا در سرویس توضیحات رخ داد')
        })
      } catch (e) {
        this.showError('خطا در سرویس توضیحات رخ داد')
      } finally {
        this.loadingCrud = false
      }
    },
    handleRemovePermanently (comment) {
      if (this.loadingCrud) {
        return
      }
      try {
        this.loadingCrud = true
        const index = this.comments.findIndex(cmt => cmt.id === comment.id)
        if (index === -1) return
        this.comments.splice(index, 1)
        this.$stKartable.dispatch('formSettings/saveSettings', {
          key: this.formKey,
          value: this.comments.map(Object.freeze)
        }).then(value => {
          this.showSuccess('توضیحات حذف شد')
        }).catch(_ => {
          this.showError('خطا در سرویس توضیحات رخ داد')
        })
      } catch (e) {
        this.showError('خطا در سرویس توضیحات رخ داد')
      } finally {
        this.loadingCrud = false
      }
    },
    async load () {
      if (!this.formKey) {
        this.loading = false

        return
      }
      try {
        this.loading = true
        const list = await this.$stKartable.dispatch('formSettings/getSettings', {
          key: this.formKey,
          defaultValue: []
        })
        this.comments = list
      } catch (e) {
        this.showError('خطا در سرویس توضیحات رخ داد')
      } finally {
        this.loading = false
      }
    }
  },
  created () {
    this.handleAdd()
  },
  watch: {
    /* value: {
      handler () {
        this.customText = this.value
      },
      immediate: true
    }, */
    showModal () {
      if (this.showModal === true) {
        this.load()
      }
    }
  }
}
</script>
<style lang="scss">
.text-template {
  .q-field--dense .q-field__control,
  .q-field--dense .q-field__marginal {
    min-height: 60px !important;
  }
}
.commentBody{
  white-space: pre-line;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */
{
  transform: translateY(10px);
  opacity: 0;
}

.text-template {
  textarea {
    border: solid 1px #777;
    background-color: #fff;
    color: black;
    width: 100%;
    outline: none;
    border-radius: 3px;
    box-sizing: border-box;
    padding: 6px 12px;
    transition: border 0.36s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &.input--readonly textarea {
    border: solid 1px #bebebe;
    background-color: #f5f5f5;
  }

  &:not(.input--readonly) {
    &.invalid--feedback {
      .safa-text-input > textarea {
        border: dashed 1px #0389ff !important;
      }
    }

    &.valid--feedback {
      .safa-text-input > textarea {
        border: solid 1px $positive !important;
      }
    }

    textarea:focus {
      box-shadow: -1px 0px 5px -1px rgb(0, 87, 184);
      transition: border 0.36s cubic-bezier(0.4, 0, 0.2, 1);
      border-color: rgba(0, 87, 184, 0.87);
    }
  }

  &.resize textarea {
    resize: vertical;
  }

  &:not(.resize) textarea {
    resize: none;
  }

  .safa-text-input {
    position: relative;

    .text-template-popup {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 20px;
    }
  }
}
</style>
