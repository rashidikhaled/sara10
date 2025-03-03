<template>
<q-btn-dropdown
    :disable="mode === 'r'"
    dense
    flat
    round
    size="sm"
    >
        <!-- <q-tooltip>
            بیشتر
        </q-tooltip> -->
        <q-list
            dense
            separator
        >
            <q-item
            v-for="(item,index ) in values" :key="index"
            :disable="mode === 'r'"
            @click="onClick(item.id)"
            clickable
            dense
            v-close-popup
            >
                <q-item-section avatar>
                    <q-icon
                    color="primary"
                    :name="item.iconName"
                    />
                </q-item-section>
                <q-item-section>
                    <q-item-label>{{item.labelName}}</q-item-label>
                </q-item-section>
            </q-item>
        </q-list>
    </q-btn-dropdown>
</template>
<script>

export default {
  name: 'DropdownWithIcon',
  components: {
  },
  props: {
    values: {
      type: Array
    },
    mode: {
      type: String,
      default: 'e'
    }
  },
  methods: {
    onClick (val) {
      this.$emit('selectedValue', val)
    }
  }
}
</script>
<style lang="scss">

</style>
