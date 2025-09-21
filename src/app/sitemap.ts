import { MetadataRoute } from 'next'
import { calculators } from '@/lib/calculators-data'

const URL = 'https://procalc.app' // Replace with your actual domain

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    {
      url: `${URL}/`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 1,
    },
    {
      url: `${URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    {
      url: `${URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${URL}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]

  const calculatorRoutes = calculators.map((calculator) => ({
    url: `${URL}/calculator/${calculator.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...calculatorRoutes]
}
