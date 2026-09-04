import { defineType, defineField, defineArrayMember } from 'sanity'
import { icons } from '@sanity/icons'

export const featuredProject = defineType({
  name: 'featuredProject',
  title: 'Featured Projects',
  type: 'document',
  icon: icons.star,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'index',
      title: 'Index Number',
      type: 'string',
      description: 'Display index (e.g. 01, 02)',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'e.g. Brand Identity, Brand Analysis, Digital & Web, AI Direction',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      initialValue: () => new Date().getFullYear().toString(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      description: 'e.g. Identity, Packaging & Art Direction',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }),
      ],
    }),
    defineField({
      name: 'tools',
      title: 'Tools & Software',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 2,
      description: 'One or two punchy sentences describing the project.',
    }),
    defineField({
      name: 'intro',
      title: 'Introduction',
      type: 'text',
      rows: 3,
      description: 'Detailed introductory context.',
    }),
    defineField({
      name: 'context',
      title: 'Context Points',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      description: 'Key context or problem statements.',
    }),
    defineField({
      name: 'concept',
      title: 'Concept Explanations',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'conceptItem',
          title: 'Concept Block',
          fields: [
            defineField({
              name: 'heading',
              title: 'Heading',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'body',
              title: 'Body Text',
              type: 'text',
              rows: 3,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'heading',
              subtitle: 'body',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'pullQuote',
      title: 'Pull Quote',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'systemNotes',
      title: 'System Notes',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      description: 'Bullet points about the visual system or rules.',
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery Items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'galleryItem',
          title: 'Gallery Specimen',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              fields: [
                defineField({
                  name: 'alt',
                  type: 'string',
                  title: 'Alt text',
                }),
              ],
            }),
            defineField({
              name: 'label',
              title: 'Specimen Label',
              type: 'string',
              description: 'e.g. WORDMARK SPECIMEN, PACKAGING FRONT',
            }),
            defineField({
              name: 'style',
              title: 'Plate Style',
              type: 'string',
              options: {
                list: [
                  { title: 'Specimen', value: 'specimen' },
                  { title: 'Letter', value: 'letter' },
                  { title: 'Grid', value: 'grid' },
                  { title: 'Halftone', value: 'halftone' },
                  { title: 'Mesh', value: 'mesh' },
                  { title: 'Scan', value: 'scan' },
                ],
              },
              initialValue: 'specimen',
            }),
            defineField({
              name: 'ratio',
              title: 'Aspect Ratio',
              type: 'string',
              options: {
                list: [
                  { title: '3:2', value: '3/2' },
                  { title: '4:5', value: '4/5' },
                  { title: '16:9', value: '16/9' },
                  { title: '1:1', value: '1/1' },
                  { title: '3:4', value: '3/4' },
                ],
              },
              initialValue: '3/2',
            }),
            defineField({
              name: 'span',
              title: 'Layout Span',
              type: 'string',
              options: {
                list: [
                  { title: 'Full (100%)', value: 'full' },
                  { title: 'Wide (66%)', value: 'wide' },
                  { title: 'Half (50%)', value: 'half' },
                  { title: 'Tall', value: 'tall' },
                ],
              },
              initialValue: 'half',
            }),
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'ratio',
              media: 'image',
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title || 'Gallery Image',
                subtitle: subtitle ? `Ratio: ${subtitle}` : undefined,
                media,
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'video',
      title: 'Motion & Video Reel',
      type: 'object',
      fields: [
        defineField({
          name: 'poster',
          title: 'Poster Image',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'src',
          title: 'Video File or Stream URL',
          type: 'url',
          description: 'URL to video stream or hosted asset.',
        }),
        defineField({
          name: 'title',
          title: 'Video Title / Caption',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Featured On Homepage',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle on to include this in the top Featured Projects section.',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 1,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Year, Newest First',
      name: 'yearDesc',
      by: [{ field: 'year', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      index: 'index',
      media: 'coverImage',
    },
    prepare({ title, subtitle, index, media }) {
      return {
        title: index ? `${index} — ${title}` : title,
        subtitle,
        media,
      }
    },
  },
})
