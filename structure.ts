import type { StructureResolver } from 'sanity/structure'
import { icons } from '@sanity/icons'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Portfolio Content')
    .items([
      S.listItem()
        .title('Featured Projects')
        .icon(icons.star)
        .schemaType('featuredProject')
        .child(
          S.documentTypeList('featuredProject')
            .title('Featured Projects')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),
      S.divider(),
      S.listItem()
        .title('Work Samples')
        .icon(icons.image)
        .schemaType('workSample')
        .child(
          S.documentTypeList('workSample')
            .title('All Work Samples')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => !['featuredProject', 'workSample'].includes(listItem.getId() || '')
      ),
    ])
