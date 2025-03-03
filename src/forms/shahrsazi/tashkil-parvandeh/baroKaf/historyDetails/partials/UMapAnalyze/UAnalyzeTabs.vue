<template>
  <div class="UEngineerInformation">
    <section padding>
      <h1 class="form-title text-h6 q-mb-lg"><span>برو کف</span></h1>
      <div class="row q-col-gutter-md">
      <div class="col-12">
          <q-tabs
            v-model="activeTab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
          >
            <q-tab
              name="mojaverin"
              label="مجاورین"
            />

            <q-tab
              name="deeps"
              label="عمق ها"
            />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="activeTab">
            <q-tab-panel name="mojaverin">
              <UMojaverin />
            </q-tab-panel>

            <q-tab-panel name="deeps">
              <UDeeps />
            </q-tab-panel>
          </q-tab-panels>
      </div>
      </div>
    </section>
  </div>
</template>

<script>
import UMojaverin from './partials/UMojaverin'
import UDeeps from './partials/UDeeps'

export default {
  name: 'baro-kaf',
  title: 'برو کف',
  components: {
    UMojaverin,
    UDeeps
  },
  data () {
    return {
      activeTab: 'mojaverin'
    }
  }
}
</script>
