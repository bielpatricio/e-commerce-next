export interface SizeProduct {
  size: 'P' | 'M' | 'G' | 'GG'
}

export interface Product extends SizeProduct {
  id: number
  title: string
  slug: string
  price: number
  image: string
  description: string
  featured: boolean
  amount: number
}
