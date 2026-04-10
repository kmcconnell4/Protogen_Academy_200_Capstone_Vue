import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        dark: true,
        colors: {
          background:  '#060412',
          surface:     '#0e0c1f',
          primary:     '#b89ef8',
          secondary:   '#cdb9fe',
          success:     '#4ade80',
          warning:     '#fbbf24',
          error:       '#f87171',
          'on-background': '#f0ebff',
          'on-surface':    '#f0ebff',
          'on-primary':    '#060412',
        },
      },
      light: {
        dark: false,
        colors: {
          background:  '#ede9fe',
          surface:     '#ffffff',
          primary:     '#7c3aed',
          secondary:   '#4c1d95',
          success:     '#16a34a',
          warning:     '#b45309',
          error:       '#b91c1c',
          'on-background': '#1e1b4b',
          'on-surface':    '#1e1b4b',
          'on-primary':    '#ffffff',
        },
      },
    },
  },
})
