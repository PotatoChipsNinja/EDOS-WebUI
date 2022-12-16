<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <v-icon size="200" color="purple-darken-2">mdi-gender-male-female</v-icon>
      <h1 class="text-h3 font-weight-bold mt-5">Explainable Detection of Online Sexism</h1>

      <div class="py-6" />

      <v-row justify="center">
        <v-col cols="5">
          <v-card variant="outlined" height="100%">
            <v-card-item class="mb-15">
              <div class="text-h5 my-3">
                Example
              </div>

              <div v-if="loading" style="margin-top: 6rem;">
                <v-progress-circular indeterminate color="primary" class="mb-3"></v-progress-circular>
                <div class="text-h5">Loading</div>
              </div>

              <div v-if="hasError" style="margin-top: 6rem;">
                <v-icon color="error" size="large" class="mb-3">mdi-alert-circle</v-icon>
                <div class="text-h5">An error occurred while communicating with the server</div>
              </div>

              <v-card v-if="!loading && !hasError" v-for="item in examples" :text="item" variant="tonal" class="text-left my-1" @click="query(item)"></v-card>
            </v-card-item>
            <div class="mb-5 card-footer">
              <v-btn color="primary" prepend-icon="mdi-refresh" @click="refresh" :disabled="loading">Refresh</v-btn>
            </div>
          </v-card>
        </v-col>
        <v-divider vertical></v-divider>
        <v-col cols="3">
          <v-card variant="outlined" height="100%">
            <v-card-item class="mb-15">
              <div class="text-h5 my-3">
                Custom
              </div>
              <v-textarea v-model="text" label="Text to be detected" rows="10"></v-textarea>
            </v-card-item>
            <div class="mb-5 card-footer">
              <v-btn color="primary" prepend-icon="mdi-cloud-upload" @click="query(text)">Detect</v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<style scoped>
  .card-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }
</style>

<script setup>
  import { onMounted, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import axios from 'axios'

  onMounted(() => {
    refresh()
  })

  const refresh = () => {
    loading.value = true
    hasError.value = false
    axios.get('/example')
    .then(function (response) {
      examples.value = response.data
    })
    .catch(function (error) {
      console.log(error)
      hasError.value = true
    })
    .then(function () {
      loading.value = false
    })
  }
  
  const text = ref("")
  const router = useRouter()
  const query = (text) => {
    if (text.length > 0) {
      router.push(`/detail/${encodeURIComponent(text)}`)
    }
  }
  const loading = ref(true)
  const hasError = ref(false)
  const examples = ref([])
</script>
