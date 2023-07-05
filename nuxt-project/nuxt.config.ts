// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  ssr: true,
  devServer: {
    port: 3000
  },
  modules: [
    "@nuxtjs/google-fonts",
    "@nuxtjs/apollo",
    "@invictus.codes/nuxt-vuetify"
  ],
  apollo: {
    clients: {
      default: {
        httpEndpoint: process.env.VITE_GRAPHQL_END_POINT ?? "",
        httpLinkOptions: {
          headers: {
            "x-hasura-admin-secret": process.env.VITE_GRAPHQL_ADMIN_SECRET ?? ""
          }
        }
      }
    }
  },
  devtools: { enabled: false },
  telemetry: false,
  googleFonts: {
    families: {
      Roboto: true,
      Lobster: true,
      "Josefin+Sans": true,
      Lato: [100, 300],
      Raleway: {
        wght: [100, 400],
        ital: [100]
      }
    }
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: "@use \"@/assets/_colors.scss\" as *;"
        }
      }
    }
  }
});