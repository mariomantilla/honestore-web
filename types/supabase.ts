export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      articles: {
        Row: {
          author: string
          body: string
          created_at: string
          id: number
          title: string
          updated_at: string
        }
        Insert: {
          author: string
          body: string
          created_at?: string
          id?: number
          title: string
          updated_at?: string
        }
        Update: {
          author?: string
          body?: string
          created_at?: string
          id?: number
          title?: string
          updated_at?: string
        }
      }
      favourites: {
        Row: {
          created_at: string | null
          id: number
          shop: number
          updated_at: string | null
          user: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          shop: number
          updated_at?: string | null
          user: string
        }
        Update: {
          created_at?: string | null
          id?: number
          shop?: number
          updated_at?: string | null
          user?: string
        }
      }
      profiles: {
        Row: {
          id: string
          name: string | null
        }
        Insert: {
          id: string
          name?: string | null
        }
        Update: {
          id?: string
          name?: string | null
        }
      }
      shops: {
        Row: {
          address: string | null
          consent_proof: string | null
          created_at: string
          description: string | null
          email: string | null
          id: number
          instagram: string | null
          location: unknown | null
          location_coordinates: string | null
          logo: string | null
          name: string | null
          online: boolean
          owner: string | null
          owner_email: string | null
          owner_name: string | null
          phone: string | null
          published: boolean
          updated_at: string
          web: string | null
        }
        Insert: {
          address?: string | null
          consent_proof?: string | null
          created_at?: string
          description?: string | null
          email?: string | null
          id?: number
          instagram?: string | null
          location?: unknown | null
          location_coordinates?: string | null
          logo?: string | null
          name?: string | null
          online?: boolean
          owner?: string | null
          owner_email?: string | null
          owner_name?: string | null
          phone?: string | null
          published?: boolean
          updated_at?: string
          web?: string | null
        }
        Update: {
          address?: string | null
          consent_proof?: string | null
          created_at?: string
          description?: string | null
          email?: string | null
          id?: number
          instagram?: string | null
          location?: unknown | null
          location_coordinates?: string | null
          logo?: string | null
          name?: string | null
          online?: boolean
          owner?: string | null
          owner_email?: string | null
          owner_name?: string | null
          phone?: string | null
          published?: boolean
          updated_at?: string
          web?: string | null
        }
      }
      tagged_shops: {
        Row: {
          created_at: string | null
          id: number
          shop: number
          tag: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          shop: number
          tag: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          shop?: number
          tag?: number
          updated_at?: string | null
        }
      }
      tags: {
        Row: {
          created_at: string | null
          id: number
          name: string | null
          updateted_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          name?: string | null
          updateted_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string | null
          updateted_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_user: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      deleteUser: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      nearby_shops:
        | {
            Args: {
              location?: string
              search?: string
            }
            Returns: {
              address: string | null
              consent_proof: string | null
              created_at: string
              description: string | null
              email: string | null
              id: number
              instagram: string | null
              location: unknown | null
              location_coordinates: string | null
              logo: string | null
              name: string | null
              online: boolean
              owner: string | null
              owner_email: string | null
              owner_name: string | null
              phone: string | null
              published: boolean
              updated_at: string
              web: string | null
            }[]
          }
        | {
            Args: {
              location: string
            }
            Returns: {
              id: number
              created_at: string
              name: string
              description: string
              logo: string
              location: string
              updated_at: string
            }[]
          }
      popular_shops: {
        Args: {
          search?: string
        }
        Returns: {
          address: string | null
          consent_proof: string | null
          created_at: string
          description: string | null
          email: string | null
          id: number
          instagram: string | null
          location: unknown | null
          location_coordinates: string | null
          logo: string | null
          name: string | null
          online: boolean
          owner: string | null
          owner_email: string | null
          owner_name: string | null
          phone: string | null
          published: boolean
          updated_at: string
          web: string | null
        }[]
      }
      search_shops: {
        Args: {
          search?: string
        }
        Returns: {
          address: string | null
          consent_proof: string | null
          created_at: string
          description: string | null
          email: string | null
          id: number
          instagram: string | null
          location: unknown | null
          location_coordinates: string | null
          logo: string | null
          name: string | null
          online: boolean
          owner: string | null
          owner_email: string | null
          owner_name: string | null
          phone: string | null
          published: boolean
          updated_at: string
          web: string | null
        }[]
      }
      unaccent: {
        Args: {
          "": string
        }
        Returns: string
      }
      unaccent_init: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
