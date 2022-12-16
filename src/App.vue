<template>
  <v-app>
    <v-app-bar color="primary">
      <template v-slot:prepend>
        <v-icon @click="$router.push('/')">mdi-gender-male-female</v-icon>
      </template>

      <v-app-bar-title><span @click="$router.push('/')" style="cursor: pointer;">EDOS</span></v-app-bar-title>

      <v-btn icon @click="dialog = true">
        <v-icon>mdi-email</v-icon>
      </v-btn>

      <v-btn icon @click="toggleTheme">
        <v-icon>{{ theme.global.current.value.dark ? 'mdi-brightness-7' : 'mdi-brightness-4' }}</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main style="background-color: rgba(0, 0, 0, 0.05);">
      <RouterView />

      <v-dialog v-model="dialog" max-width="30rem">
        <v-card title="Contact us">
          <v-card-text>
            <v-list lines="two">
              <v-list-item
                title="Yuhui Shi"
              >
                <template v-slot:prepend>
                  <v-avatar>
                    <v-img :src="avatar_syh"></v-img>
                  </v-avatar>
                </template>
                <template v-slot:subtitle>
                  <span class="font-weight-bold">shiyuhui221@mails.ucas.ac.cn</span>
                </template>
                <template v-slot:append>
                  <v-btn color="primary" icon="mdi-email-edit" variant="text" href="mailto:shiyuhui221@mails.ucas.ac.cn"></v-btn>
                </template>
              </v-list-item>

              <v-divider inset></v-divider>

              <v-list-item
                title="Yuyan Bu"
              >
                <template v-slot:prepend>
                  <v-avatar>
                    <v-img :src="avatar_byy"></v-img>
                  </v-avatar>
                </template>
                <template v-slot:subtitle>
                  <span class="font-weight-bold">buyuyan22@mails.ucas.ac.cn</span>
                </template>
                <template v-slot:append>
                  <v-btn color="primary" icon="mdi-email-edit" variant="text" href="mailto:buyuyan22@mails.ucas.ac.cn"></v-btn>
                </template>
              </v-list-item>

              <v-divider inset></v-divider>

              <v-list-item
                title="Yuting Wang"
              >
                <template v-slot:prepend>
                  <v-avatar>
                    <v-img :src="avatar_wyt"></v-img>
                  </v-avatar>
                </template>
                <template v-slot:subtitle>
                  <span class="font-weight-bold">wangyuting221@mails.ucas.ac.cn</span>
                </template>
                <template v-slot:append>
                  <v-btn color="primary" icon="mdi-email-edit" variant="text" href="mailto:wangyuting221@mails.ucas.ac.cn"></v-btn>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" variant="text" @click="dialog = false" class="mr-3">Confirm</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-main>
  </v-app>
</template>

<script setup>
  import { ref } from 'vue'
  import { RouterView } from 'vue-router'
  import { useTheme } from 'vuetify'

  import avatar_syh from '@/assets/avatar/syh.jpg'
  import avatar_byy from '@/assets/avatar/byy.jpg'
  import avatar_wyt from '@/assets/avatar/wyt.jpg'

  const theme = useTheme()
  const toggleTheme = () => theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'

  const dialog = ref(false)
</script>
