import { CollectionConfig, FieldHook } from 'payload'

const format = (val: string): string =>
  val
    .replace(/ /g, '-')
    .replace(/[^\w-/]+/g, '')
    .toLowerCase()

const formatSlug =
  (fallback: string): FieldHook =>
  ({ value, originalDoc, data }) => {
    if (typeof value === 'string') {
      return format(value)
    }
    const fallbackData = data?.[fallback] || originalDoc?.[fallback]

    if (fallbackData && typeof fallbackData === 'string') {
      return format(fallbackData)
    }

    return value
  }

export const PagesCollection: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [formatSlug('title')],
      },
      required: true,
    },
    {
      name: 'bio_photo',
      label: 'Bio Photo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'page_title',
      type: 'text',
    },
    {
      name: 'banner_title',
      type: 'text',
    },
    {
      name: 'banner_subtitle',
      type: 'text',
    },
    {
      name: 'content',
      type: 'richText',
    },
  ],
}
