<template>
  <span class="text-center" style="min-width: 26px; cursor: help" dir="ltr">
    <q-icon
      :color="row.AgentCount > 0 ? 'primary' : 'grey'"
      style="width: 18px; text-align: center"
      :name="
        row.AgentCount === 0
          ? 'person_outline'
          : row.AgentCount > 1
          ? 'people'
          : 'person'
      "
      size="xs"
    />
    {{ row.AgentCount }}
    <q-tooltip
      v-if="row.AgentCount > 0"
      content-class="bg-white text-grey-8 shadow-3"
      :delay="700"
      :offset="[0, 10]"
    >
      <div style="font-size: 12px" class="text-bold text-primary q-mb-sm">
        نماینده های تایید کننده:
      </div>
      <div class="data-info">
        <div
          v-for="(agent, index) in agentsName"
          :key="index"
          class="q-mb-sm flex items-center no-wrap ellipsis"
        >
          <span
            ><q-icon name="check" color="positive" size="14px" />&nbsp;</span
          >
          <span>{{ agent }}</span>
        </div>
      </div>
    </q-tooltip>
  </span>
</template>

<script>
export default {
  name: "CKRAgents",
  props: {
    row: Object
  },
  computed: {
    agentsName () {
      const { AgentName } = this.row
      return (
        (AgentName &&
          AgentName.split("-").map((ch) =>
            ((ch && ch.split("|")[0]) || "").trim()
          )) ||
        []
      )
    }
  }
}
</script>
