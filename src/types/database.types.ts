export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      brands: {
        Row: {
          country: string | null
          created_at: string | null
          description: string | null
          featured: boolean | null
          id: string
          logo_url: string | null
          name: string
          slug: string
          sort_order: number | null
          website: string | null
        }
        Insert: {
          country?: string | null
          created_at?: string | null
          description?: string | null
          featured?: boolean | null
          id?: string
          logo_url?: string | null
          name: string
          slug: string
          sort_order?: number | null
          website?: string | null
        }
        Update: {
          country?: string | null
          created_at?: string | null
          description?: string | null
          featured?: boolean | null
          id?: string
          logo_url?: string | null
          name?: string
          slug?: string
          sort_order?: number | null
          website?: string | null
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string | null
          description: string | null
          featured: boolean | null
          icon: string | null
          id: string
          image_url: string | null
          name: string
          parent_id: string | null
          slug: string
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          featured?: boolean | null
          icon?: string | null
          id?: string
          image_url?: string | null
          name: string
          parent_id?: string | null
          slug: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          featured?: boolean | null
          icon?: string | null
          id?: string
          image_url?: string | null
          name?: string
          parent_id?: string | null
          slug?: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_messages: {
        Row: {
          company: string | null
          created_at: string | null
          email: string
          handled: boolean | null
          id: string
          message: string
          name: string
          phone: string | null
          subject: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          email: string
          handled?: boolean | null
          id?: string
          message: string
          name: string
          phone?: string | null
          subject?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string | null
          email?: string
          handled?: boolean | null
          id?: string
          message?: string
          name?: string
          phone?: string | null
          subject?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          active: boolean | null
          brand_id: string | null
          category_id: string | null
          created_at: string | null
          currency: string | null
          datasheet_url: string | null
          description: string | null
          featured: boolean | null
          id: string
          images: string[] | null
          lead_time_days: number | null
          min_order_qty: number | null
          name: string
          price: number | null
          price_visible: boolean | null
          search_tags: string | null
          short_desc: string | null
          sku: string
          slug: string
          specs: Json | null
          stock_status: string | null
          stock_quantity: number | null
          thumbnail_url: string | null
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          brand_id?: string | null
          category_id?: string | null
          created_at?: string | null
          currency?: string | null
          datasheet_url?: string | null
          description?: string | null
          featured?: boolean | null
          id?: string
          images?: string[] | null
          lead_time_days?: number | null
          min_order_qty?: number | null
          name: string
          price?: number | null
          price_visible?: boolean | null
          search_tags?: string | null
          short_desc?: string | null
          sku: string
          slug: string
          specs?: Json | null
          stock_status?: string | null
          stock_quantity?: number | null
          thumbnail_url?: string | null
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          brand_id?: string | null
          category_id?: string | null
          created_at?: string | null
          currency?: string | null
          datasheet_url?: string | null
          description?: string | null
          featured?: boolean | null
          id?: string
          images?: string[] | null
          lead_time_days?: number | null
          min_order_qty?: number | null
          name?: string
          price?: number | null
          price_visible?: boolean | null
          search_tags?: string | null
          short_desc?: string | null
          sku?: string
          slug?: string
          specs?: Json | null
          stock_status?: string | null
          stock_quantity?: number | null
          thumbnail_url?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      product_variants: {
        Row: {
          active: boolean
          attributes: Json
          created_at: string
          id: string
          label: string
          price: number | null
          product_id: string
          sku: string
          sort_order: number
          stock_quantity: number | null
          stock_status: string
          updated_at: string
          weight_kg: number | null
        }
        Insert: {
          active?: boolean
          attributes?: Json
          created_at?: string
          id?: string
          label: string
          price?: number | null
          product_id: string
          sku: string
          sort_order?: number
          stock_quantity?: number | null
          stock_status?: string
          updated_at?: string
          weight_kg?: number | null
        }
        Update: {
          active?: boolean
          attributes?: Json
          created_at?: string
          id?: string
          label?: string
          price?: number | null
          product_id?: string
          sku?: string
          sort_order?: number
          stock_quantity?: number | null
          stock_status?: string
          updated_at?: string
          weight_kg?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "product_variants_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      site_settings: {
        Row: {
          key: string
          updated_at: string
          value: string | null
        }
        Insert: {
          key: string
          updated_at?: string
          value?: string | null
        }
        Update: {
          key?: string
          updated_at?: string
          value?: string | null
        }
        Relationships: []
      }
      quotes: {
        Row: {
          assigned_to: string | null
          city: string | null
          company_name: string
          contact_name: string
          created_at: string | null
          email: string
          id: string
          internal_notes: string | null
          items: Json
          message: string | null
          phone: string
          quote_number: string
          rnc: string | null
          source: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          city?: string | null
          company_name: string
          contact_name: string
          created_at?: string | null
          email: string
          id?: string
          internal_notes?: string | null
          items?: Json
          message?: string | null
          phone: string
          quote_number?: string
          rnc?: string | null
          source?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          city?: string | null
          company_name?: string
          contact_name?: string
          created_at?: string | null
          email?: string
          id?: string
          internal_notes?: string | null
          items?: Json
          message?: string | null
          phone?: string
          quote_number?: string
          rnc?: string | null
          source?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      show_limit: { Args: never; Returns: number }
      show_trgm: { Args: { "": string }; Returns: string[] }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const

