import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '1dszml06',
    dataset: 'production',
  },
  deployment: {
    appId: 'u5egknpljqhq42sulby40510',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
  typegen: {
    path: '../Portfolio AGY/{app,components,lib,data}/**/*.{ts,tsx,js,jsx}',
    schema: 'schema.json',
    generates: '../Portfolio AGY/sanity.types.ts',
  },
  server: {
    port: 4001,
  },
})
