/**
 * Tipos generados de Supabase.
 *
 * Regenerar con:
 *   npm run db:types
 *
 * (Este archivo es un stub inicial — reemplázalo corriendo el comando
 *  arriba una vez que hayas conectado tu proyecto Supabase.)
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          slug: string;
          name: string;
          description: string | null;
          icon: string | null;
          image_url: string | null;
          parent_id: string | null;
          sort_order: number;
          featured: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["categories"]["Row"]> & {
          slug: string;
          name: string;
        };
        Update: Partial<Database["public"]["Tables"]["categories"]["Row"]>;
      };
      brands: {
        Row: {
          id: string;
          slug: string;
          name: string;
          description: string | null;
          logo_url: string | null;
          website: string | null;
          country: string | null;
          featured: boolean;
          sort_order: number;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["brands"]["Row"]> & {
          slug: string;
          name: string;
        };
        Update: Partial<Database["public"]["Tables"]["brands"]["Row"]>;
      };
      products: {
        Row: {
          id: string;
          sku: string;
          slug: string;
          name: string;
          short_desc: string | null;
          description: string | null;
          category_id: string | null;
          brand_id: string | null;
          images: string[];
          thumbnail_url: string | null;
          specs: Json;
          datasheet_url: string | null;
          price: number | null;
          price_visible: boolean;
          currency: string;
          stock_status: "en_stock" | "bajo_pedido" | "consultar" | "agotado";
          lead_time_days: number | null;
          min_order_qty: number;
          active: boolean;
          featured: boolean;
          search_tags: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["products"]["Row"]> & {
          sku: string;
          slug: string;
          name: string;
        };
        Update: Partial<Database["public"]["Tables"]["products"]["Row"]>;
      };
      quotes: {
        Row: {
          id: string;
          quote_number: string;
          company_name: string;
          contact_name: string;
          email: string;
          phone: string;
          rnc: string | null;
          city: string | null;
          items: Json;
          message: string | null;
          status: "nuevo" | "en_revision" | "enviada" | "cerrada_ganada" | "cerrada_perdida";
          source: "web" | "whatsapp" | "email" | "telefono" | "presencial";
          assigned_to: string | null;
          internal_notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["quotes"]["Row"]> & {
          company_name: string;
          contact_name: string;
          email: string;
          phone: string;
        };
        Update: Partial<Database["public"]["Tables"]["quotes"]["Row"]>;
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          company: string | null;
          subject: string | null;
          message: string;
          handled: boolean;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["contact_messages"]["Row"]> & {
          name: string;
          email: string;
          message: string;
        };
        Update: Partial<Database["public"]["Tables"]["contact_messages"]["Row"]>;
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
};
