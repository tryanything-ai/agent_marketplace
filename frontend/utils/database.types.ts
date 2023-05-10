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
      item_tags: {
        Row: {
          created_at: string | null
          id: string
          item_id: string
          tag_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          item_id: string
          tag_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          item_id?: string
          tag_id?: string
        }
      }
      items: {
        Row: {
          avatar_url: string | null
          blob: Json | null
          bot_id: string | null
          created_at: string | null
          description: string | null
          external_notes: string | null
          external_unique_id: string | null
          id: string
          internal_notes: string | null
          name: string | null
          public: boolean | null
          url: string | null
          what_it_does: string | null
        }
        Insert: {
          avatar_url?: string | null
          blob?: Json | null
          bot_id?: string | null
          created_at?: string | null
          description?: string | null
          external_notes?: string | null
          external_unique_id?: string | null
          id?: string
          internal_notes?: string | null
          name?: string | null
          public?: boolean | null
          url?: string | null
          what_it_does?: string | null
        }
        Update: {
          avatar_url?: string | null
          blob?: Json | null
          bot_id?: string | null
          created_at?: string | null
          description?: string | null
          external_notes?: string | null
          external_unique_id?: string | null
          id?: string
          internal_notes?: string | null
          name?: string | null
          public?: boolean | null
          url?: string | null
          what_it_does?: string | null
        }
      }
      profiles: {
        Row: {
          avatar_url: string | null
          email: string | null
          ethos_blob: Json | null
          full_name: string | null
          id: string
          source: string | null
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          email?: string | null
          ethos_blob?: Json | null
          full_name?: string | null
          id: string
          source?: string | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          email?: string | null
          ethos_blob?: Json | null
          full_name?: string | null
          id?: string
          source?: string | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
      }
      tags: {
        Row: {
          created_at: string | null
          display_name: string
          id: string
          uuid: string
        }
        Insert: {
          created_at?: string | null
          display_name: string
          id: string
          uuid?: string
        }
        Update: {
          created_at?: string | null
          display_name?: string
          id?: string
          uuid?: string
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
