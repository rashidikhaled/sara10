<template>
  <div class="safa-notice flex items-center justify-center" :style="{ padding: `${paddingSize}` }" :class="`notice-${type} q-mb-${margin ? 'sm':'none'}`">
    <span><q-icon :name="icon" size="21px"/>&nbsp;<slot>{{ message }}</slot></span>
  </div>
</template>

<script>
export default {
  name: 'SafaNotice',
  props: {
    message: String,
    type: {
      type: String,
      default: 'default' // warning, success, info, default, danger
    },
    margin: {
      type: Boolean,
      default: true
    },
    paddingSize: {
      type: String,
      default: "8px"
    }
  },
  computed: {
    icon () {
      if (this.type === 'warning') {
        return 'warning_amber'
      } else if (this.type === 'success') {
        return 'check_circle'
      } else if (this.type === 'danger') {
        return 'report'
      } else if (this.type === 'error ') return 'error_outline'
      return 'info'
    }
  }
}
</script>

<style scoped lang="scss">
@mixin dark_notice($color, $bgColor, $borderColor) {
  --safa-notic-opacity: 0.1;
  background-color: rgba(darken($bgColor, 40%), var(--safa-notic-opacity));
  border-color: rgba(darken($borderColor, 40%), var(--safa-notic-opacity));
  color: lighten($color, 20%);
}

.safa-notice {
  // padding: 8px;
  border-radius: 3px;
  text-align: center;
  background-color: #e1f8f9;
  color: #025faf;
  border: 1px solid #a0cacd;

  body.body--dark & {
      @include dark_notice(#025faf, #e1f8f9, #a0cacd);
  }

  &.notice-warning {
    background-color: #fbf9e5;
    border-color: #a9a247;
    color: #6c4508;

    body.body--dark & {
      @include dark_notice(#6c4508, #fbf9e5, #a9a247);
    }
  }

  &.notice-danger {
    background-color: #ffc5ca;
    border-color: red;
    color: red;

    body.body--dark & {
      @include dark_notice(#6c0808, #fbf9e51e, #a9a34724);
    }
  }

  &.notice-success {
    background-color: #deffd9;
    border: 1px solid #85c785;
    color: #148714;

    body.body--dark & {
      @include dark_notice(#148714, #deffd9, #85c785);
    }
  }
}

</style>
