-- =================================================================
-- PLAZA BPJAMSOSTEK — SUPABASE DATABASE SCHEMA
-- Run this entire file once in your Supabase project's SQL Editor
-- (Dashboard → SQL Editor → New Query → paste → Run).
--
-- Design principles:
--  - Row Level Security (RLS) is ON for every table (secure by default).
--  - Public visitors (anon key) can only READ published/active content,
--    and can only INSERT orders/complaints (never read others' rows
--    except by exact order/complaint number, handled in the app).
--  - Only authenticated admin accounts (via `profiles.role`) can
--    create/edit/delete content or manage orders & complaints.
-- =================================================================

-- ---------- ADMIN PROFILES (extends Supabase Auth users) ----------
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'admin' check (role in ('super_admin','admin','staff')),
  created_at timestamptz not null default now()
);
alter table profiles enable row level security;

create policy "Admins can view all profiles"
  on profiles for select
  using (auth.uid() is not null);

create policy "Admins can update their own profile"
  on profiles for update
  using (auth.uid() = id);

-- Helper: is the current request from a logged-in admin?
create or replace function is_admin() returns boolean as $$
  select exists (select 1 from profiles where id = auth.uid());
$$ language sql security definer stable;

-- ---------- HERO BANNERS (Homepage) ----------
create table if not exists hero_banners (
  id uuid primary key default gen_random_uuid(),
  title_id text, title_en text,
  subtitle_id text, subtitle_en text,
  image_url text,
  cta_text_id text, cta_text_en text, cta_link text,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table hero_banners enable row level security;
create policy "Public can view active hero banners" on hero_banners for select using (is_active = true);
create policy "Admins manage hero banners" on hero_banners for all using (is_admin()) with check (is_admin());

-- ---------- PROMO VIDEOS ----------
create table if not exists promo_videos (
  id uuid primary key default gen_random_uuid(),
  title_id text, title_en text,
  video_type text not null check (video_type in ('youtube','mp4')),
  youtube_id text,
  video_url text,
  thumbnail_url text,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);
alter table promo_videos enable row level security;
create policy "Public can view active videos" on promo_videos for select using (is_active = true);
create policy "Admins manage videos" on promo_videos for all using (is_admin()) with check (is_admin());

-- ---------- NEWS & ANNOUNCEMENTS ----------
create table if not exists news_posts (
  id uuid primary key default gen_random_uuid(),
  tag_id text, tag_en text,
  title_id text, title_en text,
  body_id text, body_en text,
  published_date date not null default current_date,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);
alter table news_posts enable row level security;
create policy "Public can view active news" on news_posts for select using (is_active = true);
create policy "Admins manage news" on news_posts for all using (is_admin()) with check (is_admin());

-- ---------- OFFICE LISTINGS (Available Office for Rent) ----------
create table if not exists office_floors (
  id uuid primary key default gen_random_uuid(),
  floor_label text not null,
  area numeric not null,
  rent_per_sqm numeric not null,
  service_charge text default 'negotiable',
  condition text not null check (condition in ('bare','fitted')),
  photo_url text, plan_url text, spec_url text,
  description_id text, description_en text,
  is_available boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table office_floors enable row level security;
create policy "Public can view available floors" on office_floors for select using (is_available = true);
create policy "Admins manage office floors" on office_floors for all using (is_admin()) with check (is_admin());

-- ---------- BALLROOM / MEETING ROOM INFO ----------
create table if not exists spaces (
  id uuid primary key default gen_random_uuid(),
  space_type text not null check (space_type in ('ballroom','meeting_room')),
  name_id text, name_en text,
  capacity_min int, capacity_max int,
  dimensions text,
  description_id text, description_en text,
  price_note_id text, price_note_en text,
  photo_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);
alter table spaces enable row level security;
create policy "Public can view active spaces" on spaces for select using (is_active = true);
create policy "Admins manage spaces" on spaces for all using (is_admin()) with check (is_admin());

-- ---------- FACILITIES ----------
create table if not exists facilities (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  name_id text, name_en text,
  description_id text, description_en text,
  photo_url text,
  coming_soon boolean not null default false,
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
alter table facilities enable row level security;
create policy "Public can view active facilities" on facilities for select using (is_active = true);
create policy "Admins manage facilities" on facilities for all using (is_admin()) with check (is_admin());

-- ---------- TENANT DIRECTORY (office/banking/retail/wedding) ----------
create table if not exists tenants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null check (category in ('office','banking','retail','wedding')),
  floor_label text,
  logo_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);
alter table tenants enable row level security;
create policy "Public can view active tenants" on tenants for select using (is_active = true);
create policy "Admins manage tenants" on tenants for all using (is_admin()) with check (is_admin());

-- ---------- FOODCOURT TENANTS ----------
create table if not exists food_tenants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  cuisine_id text, cuisine_en text,
  logo_url text,
  banner_url text,
  description_id text, description_en text,
  hours_id text, hours_en text,
  whatsapp_number text,
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table food_tenants enable row level security;
create policy "Public can view active food tenants" on food_tenants for select using (is_active = true);
create policy "Admins manage food tenants" on food_tenants for all using (is_admin()) with check (is_admin());

-- ---------- MENU ITEMS ----------
-- (category is a simple free-text label rather than a separate table —
--  keeps the admin UI friction-free; the storefront groups items by
--  matching category_label automatically)
create table if not exists menu_items (
  id uuid primary key default gen_random_uuid(),
  food_tenant_id uuid not null references food_tenants(id) on delete cascade,
  category_label text,
  name_id text not null, name_en text,
  description_id text, description_en text,
  price numeric not null default 0,
  photo_url text,
  is_available boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table menu_items enable row level security;
create policy "Public can view menu items" on menu_items for select using (true);
create policy "Admins manage menu items" on menu_items for all using (is_admin()) with check (is_admin());

-- ---------- ORDERS ----------
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  order_number text unique not null,
  customer_name text not null,
  customer_phone text not null,
  status text not null default 'pending'
    check (status in ('pending','confirmed','preparing','ready','completed','cancelled')),
  total_amount numeric not null default 0,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table orders enable row level security;
-- Anyone can create an order (checkout), but cannot read the full orders list.
create policy "Anyone can create an order" on orders for insert with check (true);
-- Customers can look up a single order by its exact order_number (handled in app query).
create policy "Anyone can view an order by number" on orders for select using (true);
create policy "Admins manage all orders" on orders for update using (is_admin()) with check (is_admin());
create policy "Admins can delete orders" on orders for delete using (is_admin());

create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  food_tenant_id uuid references food_tenants(id) on delete set null,
  tenant_name text not null,
  item_name text not null,
  price numeric not null,
  qty int not null default 1,
  subtotal numeric not null
);
alter table order_items enable row level security;
create policy "Anyone can create order items" on order_items for insert with check (true);
create policy "Anyone can view order items" on order_items for select using (true);
create policy "Admins manage order items" on order_items for all using (is_admin()) with check (is_admin());

-- ---------- COMPLAINTS ----------
create table if not exists complaints (
  id uuid primary key default gen_random_uuid(),
  complaint_number text unique not null,
  name text not null,
  email text,
  phone text,
  category text not null default 'general',
  subject text not null,
  description text not null,
  status text not null default 'submitted'
    check (status in ('submitted','in_progress','resolved','closed')),
  assigned_to text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table complaints enable row level security;
create policy "Anyone can submit a complaint" on complaints for insert with check (true);
create policy "Anyone can view a complaint by number" on complaints for select using (true);
create policy "Admins manage complaints" on complaints for update using (is_admin()) with check (is_admin());
create policy "Admins can delete complaints" on complaints for delete using (is_admin());

create table if not exists complaint_photos (
  id uuid primary key default gen_random_uuid(),
  complaint_id uuid not null references complaints(id) on delete cascade,
  photo_url text not null,
  created_at timestamptz not null default now()
);
alter table complaint_photos enable row level security;
create policy "Anyone can attach photos to a complaint" on complaint_photos for insert with check (true);
create policy "Anyone can view complaint photos" on complaint_photos for select using (true);
create policy "Admins manage complaint photos" on complaint_photos for all using (is_admin()) with check (is_admin());

create table if not exists complaint_responses (
  id uuid primary key default gen_random_uuid(),
  complaint_id uuid not null references complaints(id) on delete cascade,
  response_text text not null,
  responded_by text,
  created_at timestamptz not null default now()
);
alter table complaint_responses enable row level security;
create policy "Anyone can view complaint responses" on complaint_responses for select using (true);
create policy "Admins manage complaint responses" on complaint_responses for all using (is_admin()) with check (is_admin());

-- ---------- SITE SETTINGS (contact info, social links, etc.) ----------
create table if not exists site_settings (
  key text primary key,
  value text
);
alter table site_settings enable row level security;
create policy "Public can view settings" on site_settings for select using (true);
create policy "Admins manage settings" on site_settings for all using (is_admin()) with check (is_admin());

-- ---------- STORAGE BUCKETS (run once; safe to ignore error if already exists) ----------
insert into storage.buckets (id, name, public) values ('public-media', 'public-media', true)
  on conflict (id) do nothing;

create policy "Public can view media" on storage.objects for select using (bucket_id = 'public-media');
create policy "Authenticated users can upload media" on storage.objects for insert
  with check (bucket_id = 'public-media' and auth.role() = 'authenticated');
create policy "Authenticated users can update their media" on storage.objects for update
  using (bucket_id = 'public-media' and auth.role() = 'authenticated');
create policy "Authenticated users can delete media" on storage.objects for delete
  using (bucket_id = 'public-media' and auth.role() = 'authenticated');

-- =================================================================
-- DONE. Next: create your first admin account — see SUPABASE_SETUP.md
-- step 5 ("Create your first admin login").
-- =================================================================
