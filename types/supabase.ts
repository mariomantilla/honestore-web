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
      categories: {
        Row: {
          created_at: string
          description: string
          id: number
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string
          id?: number
          name: string
          slug?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: number
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      comments: {
        Row: {
          created_at: string
          id: number
          shop: number
          text: string
          updated_at: string | null
          user: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          shop: number
          text: string
          updated_at?: string | null
          user?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          shop?: number
          text?: string
          updated_at?: string | null
          user?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_shop_fkey"
            columns: ["shop"]
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_user_fkey"
            columns: ["user"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      error_reports: {
        Row: {
          created_at: string
          error_info: string
          id: number
          shop: number
          updated_at: string
          user: string | null
        }
        Insert: {
          created_at?: string
          error_info: string
          id?: number
          shop: number
          updated_at?: string
          user?: string | null
        }
        Update: {
          created_at?: string
          error_info?: string
          id?: number
          shop?: number
          updated_at?: string
          user?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "error_reports_shop_fkey"
            columns: ["shop"]
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "error_reports_user_fkey"
            columns: ["user"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
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
      feedback: {
        Row: {
          comments: string | null
          created_at: string | null
          id: number
          rating: number | null
        }
        Insert: {
          comments?: string | null
          created_at?: string | null
          id?: number
          rating?: number | null
        }
        Update: {
          comments?: string | null
          created_at?: string | null
          id?: number
          rating?: number | null
        }
        Relationships: []
      }
      posts: {
        Row: {
          author: string
          body: string
          created_at: string
          description: string | null
          hero: string | null
          id: number
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          author: string
          body: string
          created_at?: string
          description?: string | null
          hero?: string | null
          id?: number
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          author?: string
          body?: string
          created_at?: string
          description?: string | null
          hero?: string | null
          id?: number
          slug?: string
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
          avatar: string | null
          bio: string | null
          id: string
          name: string | null
          role: string | null
        }
        Insert: {
          avatar?: string | null
          bio?: string | null
          id: string
          name?: string | null
          role?: string | null
        }
        Update: {
          avatar?: string | null
          bio?: string | null
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
          for_businesses: boolean
          for_customers: boolean
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
          for_businesses?: boolean
          for_customers?: boolean
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
          for_businesses?: boolean
          for_customers?: boolean
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
      shops_categories: {
        Row: {
          category: number
          created_at: string
          id: number
          shop: number
          updated_at: string
        }
        Insert: {
          category: number
          created_at?: string
          id?: number
          shop: number
          updated_at?: string
        }
        Update: {
          category?: number
          created_at?: string
          id?: number
          shop?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "shops_categories_category_fkey"
            columns: ["category"]
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shops_categories_shop_fkey"
            columns: ["shop"]
            referencedRelation: "shops"
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
          color: string
          created_at: string
          description: string
          icon: string
          id: number
          name: string
          updated_at: string
        }
        Insert: {
          color?: string
          created_at?: string
          description: string
          icon?: string
          id?: number
          name: string
          updated_at?: string
        }
        Update: {
          color?: string
          created_at?: string
          description?: string
          icon?: string
          id?: number
          name?: string
          updated_at?: string
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
              for_businesses: boolean
              for_customers: boolean
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
          for_businesses: boolean
          for_customers: boolean
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
          for_businesses: boolean
          for_customers: boolean
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
      similar_shops: {
        Args: {
          target_id: number
        }
        Returns: {
          address: string | null
          consent_proof: string | null
          created_at: string
          description: string | null
          email: string | null
          for_businesses: boolean
          for_customers: boolean
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

