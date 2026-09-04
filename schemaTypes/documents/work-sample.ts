import { defineType, defineField, defineArrayMember } from 'sanity'
import { icons } from '@sanity/icons'

export const workSample = defineType({
  name: 'workSample',
  title: 'Work Samples',
  type: 'document',
  icon: icons.image,
  fields: [
    defineField({
      name: 'title',
      title: 'Title / Artifact Name',
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
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Carousel', value: 'Carousel' },
          { title: 'Graphic', value: 'Graphic' },
          { title: 'Motion', value: 'Motion' },
          { title: 'Video', value: 'Video' },
          { title: 'Logo and Brands', value: 'Logo and Brands' },
          { title: 'Poster and Print', value: 'Poster and Print' },
          { title: 'Packaging', value: 'Packaging' },
          { title: 'Typography', value: 'Typography' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          { title: 'Image / Still', value: 'image' },
          { title: 'Video / Motion Loop', value: 'video' },
        ],
        layout: 'radio',
      },
      initialValue: 'image',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Work Sample Image (Primary/Cover)',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for accessibility and SEO.',
        }),
      ],
      description: 'Upload your high-res design, mockup, logo, or poster.',
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery / Carousel Images (Optional)',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            }),
            defineField({
              name: 'caption',
              type: 'string',
              title: 'Slide Caption / Note',
            }),
          ],
        }),
      ],
      description: 'Upload additional images/mockups here to open a multi-slide carousel in the popup.',
    }),
    defineField({
      name: 'videoFile',
      title: 'Video / Motion Clip',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      hidden: ({ parent }) => parent?.mediaType !== 'video',
      description: 'Direct video file upload for short loops and motion reels.',
    }),
    defineField({
      name: 'videoUrl',
      title: 'External Video URL (Optional)',
      type: 'url',
      hidden: ({ parent }) => parent?.mediaType !== 'video',
      description: 'Stream URL (e.g. Mux, Vimeo, Cloudinary, or direct mp4 URL).',
    }),
    defineField({
      name: 'ratio',
      title: 'Aspect Ratio',
      type: 'string',
      options: {
        list: [
          { title: '4:5 (Standard Art / Poster)', value: '4/5' },
          { title: '3:4 (Portrait)', value: '3/4' },
          { title: '1:1 (Square / Logo Mark)', value: '1/1' },
          { title: '16:9 (Landscape / Motion)', value: '16/9' },
          { title: '9:16 (Vertical Reel)', value: '9/16' },
          { title: '3:2 (Specimen)', value: '3/2' },
        ],
      },
      initialValue: '4/5',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      initialValue: () => new Date().getFullYear().toString(),
    }),
    defineField({
      name: 'clientOrBrand',
      title: 'Client / Studio / Self',
      type: 'string',
      description: 'Who this work was created for (e.g. Self-Initiated, Studio Specimen, Client Name).',
    }),
    defineField({
      name: 'description',
      title: 'Description & Craft Notes',
      type: 'text',
      rows: 3,
      description: 'Brief design context, typography choices, finishing techniques, or structure breakdown.',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: {
        layout: 'tags',
      },
      description: 'Keywords (e.g. Vector, Foil, Dieline, Minimal, Monochrome).',
    }),
    defineField({
      name: 'featured',
      title: 'Pin to Top / Featured',
      type: 'boolean',
      initialValue: false,
      description: 'Highlight this sample prominently in the archive.',
    }),
    defineField({
      name: 'order',
      title: 'Sort Order',
      type: 'number',
      initialValue: 1,
    }),
  ],
  orderings: [
    {
      title: 'Sort Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Newest First',
      name: 'yearDesc',
      by: [{ field: 'year', direction: 'desc' }],
    },
    {
      title: 'Title',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      year: 'year',
      mediaType: 'mediaType',
      image: 'image',
    },
    prepare({ title, category, year, mediaType, image }) {
      const categoryLabels: Record<string, string> = {
        GRAPHIC_DESIGN: 'Graphic Design',
        LOGOS: 'Logo & Mark',
        BRAND_IDENTITY: 'Brand Identity',
        PACKAGING: 'Packaging',
        POSTERS: 'Poster',
        SCREENPRINT: 'Screenprint',
        STUDIES: 'Visual Study',
        MOTION: 'Motion',
        TYPOGRAPHY: 'Typography',
      }
      const catLabel = (category && categoryLabels[category]) || category || 'Work Sample'
      return {
        title: title || 'Untitled Sample',
        subtitle: [catLabel, year, mediaType === 'video' ? '🎬 Video' : null]
          .filter(Boolean)
          .join(' • '),
        media: image,
      }
    },
  },
})
