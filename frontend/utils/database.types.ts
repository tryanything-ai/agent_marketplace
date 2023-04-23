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
      agents: {
        Row: {
          avatar_url: string
          created_at: string | null
          description: string
          external_url: string
          fake: boolean
          id: number
          name: string
          pirce_description: string | null
          price: number | null
          slug: string
          user_id: string
        }
        Insert: {
          avatar_url: string
          created_at?: string | null
          description: string
          external_url: string
          fake?: boolean
          id?: number
          name: string
          pirce_description?: string | null
          price?: number | null
          slug: string
          user_id: string
        }
        Update: {
          avatar_url?: string
          created_at?: string | null
          description?: string
          external_url?: string
          fake?: boolean
          id?: number
          name?: string
          pirce_description?: string | null
          price?: number | null
          slug?: string
          user_id?: string
        }
      }
      email_capture: {
        Row: {
          created_at: string | null
          email: string
          id: number
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: number
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: number
        }
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
