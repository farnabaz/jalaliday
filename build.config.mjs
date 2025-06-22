import { defineBuildConfig } from 'obuild/config'

export default defineBuildConfig({
  entries: [
    {
      type: 'bundle',
      input: [
        './src/index.ts',
        './src/dayjs/index.ts',
        './src/dayjs/plugin.ts',
        './src/intl/index.ts',
      ],
    },
  ],
})
