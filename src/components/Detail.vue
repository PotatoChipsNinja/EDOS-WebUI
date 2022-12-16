<template>
  <v-container>
    <v-responsive class="d-flex text-center">
      <div class="d-flex justify-center">
        <div style="width: 80%;">
          <div class="py-6" />
          <v-card class="my-3" id="report">
            <blockquote class="ma-3 text-h5 font-weight-bold">
              {{ $route.params.text }}
            </blockquote>

            <v-divider></v-divider>

            <div v-if="loading" class="my-12">
              <v-progress-circular indeterminate color="primary" class="mb-3"></v-progress-circular>
              <div class="text-h5">Calculating</div>
            </div>

            <div v-if="hasError" class="my-12">
              <v-icon color="error" size="large" class="mb-3">mdi-alert-circle</v-icon>
              <div class="text-h5">An error occurred while communicating with the server</div>
            </div>

            <div class="d-flex justify-space-around" v-if="!loading && !hasError">
              <v-col cols="4">
                <v-card-text class="text-h6">
                  Binary Sexism Detection
                </v-card-text>

                <v-table>
                  <thead>
                    <tr>
                      <th class="text-center text-subtitle-1 font-weight-medium" style="width: 50%;">
                        Label
                      </th>
                      <th class="text-center text-subtitle-1 font-weight-medium">
                        Probability
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in result[0]">
                      <td class="text-body-1">{{ item['label'] }}</td>
                      <td class="text-body-1">
                        <v-progress-linear
                          :model-value="item['probability'] * 100"
                          height="24"
                          :color="progressColor(item['probability'] * 100)"
                        >
                          <strong>{{ (item['probability'] * 100).toFixed(2) }}%</strong>
                        </v-progress-linear>
                      </td>
                    </tr>
                  </tbody>
                </v-table>
              </v-col>
              <v-divider vertical></v-divider>
              <v-col cols="4">
                <v-card-text class="text-h6">
                  Category of Sexism
                </v-card-text>

                <v-table>
                  <thead>
                    <tr>
                      <th class="text-center text-subtitle-1 font-weight-medium" style="width: 50%;">
                        Label
                      </th>
                      <th class="text-center text-subtitle-1 font-weight-medium">
                        Probability
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in result[1]">
                      <td class="text-body-1">{{ item['label'].substring(3) }}</td>
                      <td class="text-body-1">
                        <v-progress-linear
                          :model-value="item['probability'] * 100"
                          height="24"
                          :color="progressColor(item['probability'] * 100)"
                        >
                          <strong>{{ (item['probability'] * 100).toFixed(2) }}%</strong>
                        </v-progress-linear>
                      </td>
                    </tr>
                  </tbody>
                </v-table>
              </v-col>
              <v-divider vertical></v-divider>
              <v-col cols="4">
                <v-card-text class="text-h6">
                  Fine-grained Vector of Sexism
                </v-card-text>

                <v-table>
                  <thead>
                    <tr>
                      <th class="text-center text-subtitle-1 font-weight-medium" style="width: 50%;">
                        Label
                      </th>
                      <th class="text-center text-subtitle-1 font-weight-medium">
                        Probability
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in result[2]">
                      <td class="text-body-1">{{ item['label'].substring(4) }}</td>
                      <td class="text-body-1">
                        <v-progress-linear
                          :model-value="item['probability'] * 100"
                          height="24"
                          :color="progressColor(item['probability'] * 100)"
                        >
                          <strong>{{ (item['probability'] * 100).toFixed(2) }}%</strong>
                        </v-progress-linear>
                      </td>
                    </tr>
                  </tbody>
                </v-table>
              </v-col>
            </div>

            <v-divider></v-divider>

            <v-card-actions>
              <div class="d-flex justify-space-around" style="width: 100%;">
                <v-btn prepend-icon="mdi-arrow-left-circle" color="primary" @click="$router.push('/')">Back home</v-btn>
                <v-btn prepend-icon="mdi-printer" color="success" v-print="'#report'">Print Report</v-btn>
              </div>
            </v-card-actions>
          </v-card>
        </div>
      </div>
    </v-responsive>
  </v-container>
</template>

<style scoped>
  blockquote::before {
    content: open-quote;
  }

  blockquote::after {
    content: close-quote;
  }

  blockquote::before, blockquote::after {
    opacity: 0.25;
    padding: 0 10px;
    font-size: 3em;
  }

  blockquote {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px;
    padding: 20px 10px;
    border-radius: 10px;
  }
</style>

<script setup>
  import { onMounted, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import axios from 'axios'

  onMounted(() => {
    loading.value = true
    hasError.value = false
    axios.get('/predict', {
      params: {
        text: route.params.text
      }
    })
    .then(function (response) {
      result.value = response.data
    })
    .catch(function (error) {
      console.log(error)
      hasError.value = true
    })
    .then(function () {
      loading.value = false
    })
  })

  const route = useRoute()
  const loading = ref(true)
  const hasError = ref(false)
  const result = ref([])
  const progressColor = (value) => {
    if (value > 90) return 'success'
    if (value > 60) return 'warning'
    return 'error'
  }
</script>
