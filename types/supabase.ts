export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
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
        Relationships: [
          {
            foreignKeyName: "favourites_shop_fkey"
            columns: ["shop"]
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favourites_user_fkey"
            columns: ["user"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      posts: {
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
        Relationships: [
          {
            foreignKeyName: "posts_author_fkey"
            columns: ["author"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          id: string
          name: string | null
          role: string | null
        }
        Insert: {
          id: string
          name?: string | null
          role?: string | null
        }
        Update: {
          id?: string
          name?: string | null
          role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      shop_claims: {
        Row: {
          created_at: string | null
          id: number
          shop: number
          updated_at: string
          user: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          shop: number
          updated_at?: string
          user?: string
        }
        Update: {
          created_at?: string | null
          id?: number
          shop?: number
          updated_at?: string
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "shop_claims_shop_fkey"
            columns: ["shop"]
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shop_claims_user_fkey"
            columns: ["user"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
          logo_path: string | null
          name: string | null
          online: boolean
          owner: string | null
          owner_email: string | null
          owner_name: string | null
          phone: string | null
          published: boolean
          slug: string
          updated_at: string
          web: string | null
          whatsapp: string | null
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
          logo_path?: string | null
          name?: string | null
          online?: boolean
          owner?: string | null
          owner_email?: string | null
          owner_name?: string | null
          phone?: string | null
          published?: boolean
          slug?: string
          updated_at?: string
          web?: string | null
          whatsapp?: string | null
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
          logo_path?: string | null
          name?: string | null
          online?: boolean
          owner?: string | null
          owner_email?: string | null
          owner_name?: string | null
          phone?: string | null
          published?: boolean
          slug?: string
          updated_at?: string
          web?: string | null
          whatsapp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shops_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
        Relationships: [
          {
            foreignKeyName: "tagged_shops_shop_fkey"
            columns: ["shop"]
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tagged_shops_tag_fkey"
            columns: ["tag"]
            referencedRelation: "tags"
            referencedColumns: ["id"]
          }
        ]
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
        Relationships: []
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
              logo_path: string | null
              name: string | null
              online: boolean
              owner: string | null
              owner_email: string | null
              owner_name: string | null
              phone: string | null
              published: boolean
              slug: string
              updated_at: string
              web: string | null
              whatsapp: string | null
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
          logo_path: string | null
          name: string | null
          online: boolean
          owner: string | null
          owner_email: string | null
          owner_name: string | null
          phone: string | null
          published: boolean
          slug: string
          updated_at: string
          web: string | null
          whatsapp: string | null
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
          logo_path: string | null
          name: string | null
          online: boolean
          owner: string | null
          owner_email: string | null
          owner_name: string | null
          phone: string | null
          published: boolean
          slug: string
          updated_at: string
          web: string | null
          whatsapp: string | null
        }[]
      }
      slugify: {
        Args: {
          value: string
        }
        Returns: string
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
