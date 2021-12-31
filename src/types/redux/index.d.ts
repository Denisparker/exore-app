declare type StateValue = {
  errors: { [key: string]: string }
  loadings: string[]
  serverProducts: Product[]
  localProducts: Product[]
  user: { name: string; password: string } | null
}

declare type Product = {
  title: string
  price: string
  image: string
  id: string
  description: string
  category: string
  public?: boolean
}
