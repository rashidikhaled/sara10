<template>
  <!--<div>
    <q-dialog v-model="show" @hide="onHide" maximized>
      <q-card>
        <q-card-section class="column items-center no-wrap q-pa-none full-height">
          <div class="dialog-header full-width q-py-sm q-px-md bg-grey-3 border-bottom">
            <slot name="header">
              <div class="row">
                <span class="close-modal" @click="closeModal"><q-icon name="close"></q-icon></span>
                <h1 class="dialog-title">{{ title }}</h1>
              </div>
            </slot>
          </div>
          <div class="dialog-body full-height full-width q-px-md q-py-lg">
            <slot></slot>
          </div>
          <div class="dialog-footer full-width q-px-md q-py-sm">
            <slot name="footer"></slot>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>-->
  <SafaWindow
    :maximized="true"
    :padding="false"
    :title="title"
    :value="show"
    @hide="onHide"
    @input="$emit('onCloseModal', $event)"
    v-bind="$attrs">
    <slot/>
  </SafaWindow>
</template>

<script>

export default {
  name: 'ShowModal',
  data: function () {
    return {}
  },
  props: {
    title: String,
    show: Boolean,
    afterHide: Function
  },
  methods: {
    onHide (e) {
      this.$emit('hide', e)
    },
    closeModal () {
      this.$emit('onCloseModal', false)
    }
  }
}
</script>

<style lang="scss">
  .dialog-title {
    font-size: 18px;
    line-height: normal;
    margin: 0;
  }

  .close-modal {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    font-size: 20px;
    color: #202020;
    opacity: .4;
    cursor: pointer;
    transition: .35s all ease-out;

    &:hover {
      opacity: .8;
      transition: .35s all ease-in;
    }
  }
</style>
