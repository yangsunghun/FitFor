export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bookmarks: {
        Row: {
          created_at: string | null
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookmarks_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookmarks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_fevertime_rooms: {
        Row: {
          chat_per_hour: string | null
          created_at: string | null
          id: string
          room_id: string | null
        }
        Insert: {
          chat_per_hour?: string | null
          created_at?: string | null
          id?: string
          room_id?: string | null
        }
        Update: {
          chat_per_hour?: string | null
          created_at?: string | null
          id?: string
          room_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_fevertime_rooms_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "chat_rooms"
            referencedColumns: ["room_id"]
          },
        ]
      }
      chat_members: {
        Row: {
          isActive: boolean
          isAdmin: boolean
          member_id: string
          room_id: string
        }
        Insert: {
          isActive?: boolean
          isAdmin?: boolean
          member_id: string
          room_id: string
        }
        Update: {
          isActive?: boolean
          isAdmin?: boolean
          member_id?: string
          room_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_members_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_members_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "chat_rooms"
            referencedColumns: ["room_id"]
          },
        ]
      }
      chat_messages: {
        Row: {
          content: string | null
          created_at: string
          image_url: string | null
          member_id: string
          message_id: string
          room_id: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          image_url?: string | null
          member_id: string
          message_id?: string
          room_id: string
        }
        Update: {
          content?: string | null
          created_at?: string
          image_url?: string | null
          member_id?: string
          message_id?: string
          room_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_member_id_room_id_fkey"
            columns: ["member_id", "room_id"]
            isOneToOne: false
            referencedRelation: "chat_members"
            referencedColumns: ["member_id", "room_id"]
          },
          {
            foreignKeyName: "chat_messages_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "chat_rooms"
            referencedColumns: ["room_id"]
          },
        ]
      }
      chat_rooms: {
        Row: {
          created_at: string
          isActive: boolean
          room_id: string
          room_tags: string[]
          room_thumbnail_url: string | null
          room_title: string
          user_id: string
        }
        Insert: {
          created_at?: string
          isActive?: boolean
          room_id?: string
          room_tags: string[]
          room_thumbnail_url?: string | null
          room_title: string
          user_id: string
        }
        Update: {
          created_at?: string
          isActive?: boolean
          room_id?: string
          room_tags?: string[]
          room_thumbnail_url?: string | null
          room_title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_rooms_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          content: string
          created_at: string
          id: string
          post_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          post_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          post_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      likes: {
        Row: {
          created_at: string | null
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          body_size: number[]
          comments: number
          content: string
          created_at: string
          id: string
          images: string[]
          is_saved: boolean
          likes: number
          tags: string[]
          thumbnail_blur_url: string | null
          upload_place: string | null
          user_id: string
          view: number
        }
        Insert: {
          body_size: number[]
          comments: number
          content: string
          created_at?: string
          id?: string
          images: string[]
          is_saved?: boolean
          likes: number
          tags: string[]
          thumbnail_blur_url?: string | null
          upload_place?: string | null
          user_id: string
          view: number
        }
        Update: {
          body_size?: number[]
          comments?: number
          content?: string
          created_at?: string
          id?: string
          images?: string[]
          is_saved?: boolean
          likes?: number
          tags?: string[]
          thumbnail_blur_url?: string | null
          upload_place?: string | null
          user_id?: string
          view?: number
        }
        Relationships: [
          {
            foreignKeyName: "posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      purchase: {
        Row: {
          buy_link: string | null
          description: string | null
          id: string
          image_url: string
          post_id: string
          title: string
        }
        Insert: {
          buy_link?: string | null
          description?: string | null
          id?: string
          image_url: string
          post_id: string
          title: string
        }
        Update: {
          buy_link?: string | null
          description?: string | null
          id?: string
          image_url?: string
          post_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "purchase_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string
          gender: string
          id: string
          introduction: string
          is_verified: boolean
          nickname: string
          onboard: boolean
          profile_image: string | null
        }
        Insert: {
          created_at?: string
          email: string
          gender?: string
          id?: string
          introduction?: string
          is_verified?: boolean
          nickname: string
          onboard?: boolean
          profile_image?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          gender?: string
          id?: string
          introduction?: string
          is_verified?: boolean
          nickname?: string
          onboard?: boolean
          profile_image?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_fever_rooms: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      increment_view: {
        Args: {
          post_id: string
        }
        Returns: undefined
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
