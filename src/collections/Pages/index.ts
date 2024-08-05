import { CollectionConfig, FieldHook } from 'payload'

import { HTMLConverterFeature, lexicalEditor, lexicalHTML } from '@payloadcms/richtext-lexical'

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
        beforeValidate: [formatSlug('page_title')],
      },
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
      name: 'bio_photo',
      label: 'Bio Photo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'key_message_1_title',
      type: 'text',
    },
    {
      name: 'key_message_1_body',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          // The HTMLConverter Feature is the feature which manages the HTML serializers.
          // If you do not pass any arguments to it, it will use the default serializers.
          HTMLConverterFeature({}),
        ],
      }),
    },
    {
      name: 'key_messages_title',
      type: 'text',
    },
    {
      name: 'key_messages_list',
      type: 'array',
      fields: [
        {
          name: 'key_message_icon',
          type: 'select',
          hasMany: false,
          options: [
            {
              label: 'Community',
              value: 'user-group',
            },
            {
              label: 'Governance',
              value: 'building-library',
            },
            {
              label: 'Leadership',
              value: 'building-office-2',
            },
          ],
        },
        {
          name: 'key_message_title',
          type: 'text',
        },
        {
          name: 'key_message_body',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'cta_1_title',
      type: 'text',
    },
    {
      name: 'cta_1_body',
      type: 'textarea',
    },
    {
      name: 'cta_2_title',
      type: 'text',
    },
    {
      name: 'cta_2_body',
      type: 'textarea',
    },
    {
      name: 'contact_form_title',
      type: 'text',
    },
    {
      name: 'contact_form_body',
      type: 'textarea',
    },
    lexicalHTML('key_message_1_body', { name: 'key_message_1_body_html' }),
  ],
}
