import type { Template } from '@/types';

export const templates: Template[] = [
  {
    id: 'tpl_1',
    name: 'Product Launch',
    description: 'Introduce a new product with a compelling 60-second pitch.',
    image: 'https://images.pexels.com/photos/6476787/pexels-photo-6476787.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Marketing',
    duration: '0:60',
    useCase: 'Product announcements',
  },
  {
    id: 'tpl_2',
    name: 'Sales Presentation',
    description: 'Present data and metrics with an authoritative business avatar.',
    image: 'https://images.pexels.com/photos/8353803/pexels-photo-8353803.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Business',
    duration: '2:30',
    useCase: 'Sales meetings',
  },
  {
    id: 'tpl_3',
    name: 'Business Pitch',
    description: 'A persuasive pitch deck presentation for investors.',
    image: 'https://images.pexels.com/photos/6476776/pexels-photo-6476776.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Business',
    duration: '3:00',
    useCase: 'Investor pitches',
  },
  {
    id: 'tpl_4',
    name: 'Online Course',
    description: 'Teach a concept with an engaging educational avatar.',
    image: 'https://images.pexels.com/photos/6266984/pexels-photo-6266984.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Education',
    duration: '5:00',
    useCase: 'E-learning',
  },
  {
    id: 'tpl_5',
    name: 'Tutorial Video',
    description: 'Step-by-step instructional walkthrough for your product.',
    image: 'https://images.pexels.com/photos/8189630/pexels-photo-8189630.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Education',
    duration: '4:00',
    useCase: 'Onboarding',
  },
  {
    id: 'tpl_6',
    name: 'Live Class',
    description: 'Interactive classroom-style video for remote teaching.',
    image: 'https://images.pexels.com/photos/6325968/pexels-photo-6325968.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Education',
    duration: '10:00',
    useCase: 'Webinars',
  },
  {
    id: 'tpl_7',
    name: 'Studio Interview',
    description: 'Professional studio setting for interviews and Q&A sessions.',
    image: 'https://images.pexels.com/photos/18880006/pexels-photo-18880006.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Marketing',
    duration: '3:30',
    useCase: 'Brand content',
  },
  {
    id: 'tpl_8',
    name: 'Studio Production',
    description: 'Full studio production with professional lighting.',
    image: 'https://images.pexels.com/photos/134469/pexels-photo-134469.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Marketing',
    duration: '2:00',
    useCase: 'Promo videos',
  },
  {
    id: 'tpl_9',
    name: 'Product Showcase',
    description: 'Highlight product features with studio-quality visuals.',
    image: 'https://images.pexels.com/photos/5878878/pexels-photo-5878878.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Marketing',
    duration: '1:30',
    useCase: 'E-commerce',
  },
];

export function getTemplateById(id: string): Template | undefined {
  return templates.find((t) => t.id === id);
}
