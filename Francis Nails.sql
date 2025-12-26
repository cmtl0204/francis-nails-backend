CREATE TABLE "branches" (
  "id" uuid PRIMARY KEY,
  "name" varchar,
  "phone" varchar,
  "email" varchar,
  "address" varchar,
  "city" varchar,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "business_settings" (
  "id" uuid PRIMARY KEY,
  "branch_id" uuid,
  "legal_name" varchar,
  "tax_id" varchar,
  "invoice_series" varchar,
  "currency" varchar,
  "timezone" varchar,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "roles" (
  "id" uuid PRIMARY KEY,
  "name" varchar UNIQUE,
  "created_at" timestamp
);

CREATE TABLE "users" (
  "id" uuid PRIMARY KEY,
  "branch_id" uuid,
  "role_id" uuid,
  "full_name" varchar,
  "email" varchar UNIQUE,
  "phone" varchar,
  "password_hash" varchar,
  "is_active" boolean,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "customers" (
  "id" uuid PRIMARY KEY,
  "branch_id" uuid,
  "identification" varchar,
  "full_name" varchar,
  "email" varchar,
  "phone" varchar,
  "birth_date" date,
  "notes" text,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "staff_profiles" (
  "id" uuid PRIMARY KEY,
  "user_id" uuid UNIQUE,
  "display_name" varchar,
  "specialty" varchar,
  "color_tag" varchar,
  "commission_type" varchar,
  "commission_value" decimal,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "staff_working_hours" (
  "id" uuid PRIMARY KEY,
  "staff_id" uuid,
  "weekday" int,
  "start_time" time,
  "end_time" time,
  "break_start" time,
  "break_end" time,
  "is_day_off" boolean,
  "created_at" timestamp
);

CREATE TABLE "staff_time_off" (
  "id" uuid PRIMARY KEY,
  "staff_id" uuid,
  "start_at" timestamp,
  "end_at" timestamp,
  "reason" varchar,
  "created_at" timestamp
);

CREATE TABLE "service_categories" (
  "id" uuid PRIMARY KEY,
  "branch_id" uuid,
  "name" varchar,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "services" (
  "id" uuid PRIMARY KEY,
  "branch_id" uuid,
  "category_id" uuid,
  "name" varchar,
  "description" text,
  "duration_min" int,
  "base_price" decimal,
  "is_active" boolean,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "appointment_statuses" (
  "id" int PRIMARY KEY,
  "code" varchar UNIQUE,
  "label" varchar
);

CREATE TABLE "appointments" (
  "id" uuid PRIMARY KEY,
  "branch_id" uuid,
  "customer_id" uuid,
  "staff_id" uuid,
  "status_id" int,
  "start_at" timestamp,
  "end_at" timestamp,
  "notes" text,
  "source" varchar,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "appointment_services" (
  "id" uuid PRIMARY KEY,
  "appointment_id" uuid,
  "service_id" uuid,
  "duration_min" int,
  "price" decimal,
  "created_at" timestamp
);

CREATE TABLE "product_categories" (
  "id" uuid PRIMARY KEY,
  "branch_id" uuid,
  "name" varchar,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "products" (
  "id" uuid PRIMARY KEY,
  "branch_id" uuid,
  "category_id" uuid,
  "sku" varchar,
  "name" varchar,
  "description" text,
  "unit" varchar,
  "cost_price" decimal,
  "sale_price" decimal,
  "track_stock" boolean,
  "is_active" boolean,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "stock_locations" (
  "id" uuid PRIMARY KEY,
  "branch_id" uuid,
  "name" varchar,
  "created_at" timestamp
);

CREATE TABLE "stock_balances" (
  "id" uuid PRIMARY KEY,
  "product_id" uuid,
  "location_id" uuid,
  "quantity" decimal,
  "updated_at" timestamp
);

CREATE TABLE "suppliers" (
  "id" uuid PRIMARY KEY,
  "branch_id" uuid,
  "name" varchar,
  "phone" varchar,
  "email" varchar,
  "tax_id" varchar,
  "address" varchar,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "purchases" (
  "id" uuid PRIMARY KEY,
  "branch_id" uuid,
  "supplier_id" uuid,
  "document_number" varchar,
  "purchased_at" date,
  "subtotal" decimal,
  "tax" decimal,
  "total" decimal,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "purchase_items" (
  "id" uuid PRIMARY KEY,
  "purchase_id" uuid,
  "product_id" uuid,
  "qty" decimal,
  "unit_cost" decimal,
  "total" decimal
);

CREATE TABLE "inventory_movements" (
  "id" uuid PRIMARY KEY,
  "branch_id" uuid,
  "product_id" uuid,
  "location_id" uuid,
  "type" varchar,
  "reason" varchar,
  "ref_table" varchar,
  "ref_id" uuid,
  "qty" decimal,
  "created_at" timestamp
);

CREATE TABLE "invoice_statuses" (
  "id" int PRIMARY KEY,
  "code" varchar UNIQUE,
  "label" varchar
);

CREATE TABLE "invoices" (
  "id" uuid PRIMARY KEY,
  "branch_id" uuid,
  "customer_id" uuid,
  "appointment_id" uuid,
  "status_id" int,
  "invoice_number" varchar,
  "issued_at" timestamp,
  "subtotal" decimal,
  "discount" decimal,
  "tax" decimal,
  "total" decimal,
  "created_by" uuid,
  "notes" text,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "invoice_items" (
  "id" uuid PRIMARY KEY,
  "invoice_id" uuid,
  "item_type" varchar,
  "service_id" uuid,
  "product_id" uuid,
  "description" varchar,
  "qty" decimal,
  "unit_price" decimal,
  "discount" decimal,
  "tax" decimal,
  "total" decimal
);

CREATE TABLE "payment_methods" (
  "id" uuid PRIMARY KEY,
  "branch_id" uuid,
  "name" varchar,
  "created_at" timestamp
);

CREATE TABLE "payments" (
  "id" uuid PRIMARY KEY,
  "invoice_id" uuid,
  "method_id" uuid,
  "amount" decimal,
  "paid_at" timestamp,
  "reference" varchar,
  "created_at" timestamp
);

CREATE UNIQUE INDEX ON "customers" ("branch_id", "identification");

CREATE UNIQUE INDEX ON "staff_working_hours" ("staff_id", "weekday");

CREATE UNIQUE INDEX ON "service_categories" ("branch_id", "name");

CREATE UNIQUE INDEX ON "services" ("branch_id", "name");

CREATE INDEX ON "appointments" ("branch_id", "start_at");

CREATE INDEX ON "appointments" ("staff_id", "start_at");

CREATE INDEX ON "appointments" ("customer_id", "start_at");

CREATE INDEX ON "appointment_services" ("appointment_id", "service_id");

CREATE UNIQUE INDEX ON "product_categories" ("branch_id", "name");

CREATE UNIQUE INDEX ON "products" ("branch_id", "sku");

CREATE INDEX ON "products" ("branch_id", "name");

CREATE UNIQUE INDEX ON "stock_locations" ("branch_id", "name");

CREATE UNIQUE INDEX ON "stock_balances" ("product_id", "location_id");

CREATE INDEX ON "inventory_movements" ("product_id", "created_at");

CREATE UNIQUE INDEX ON "invoices" ("branch_id", "invoice_number");

CREATE INDEX ON "invoices" ("customer_id", "issued_at");

CREATE UNIQUE INDEX ON "payment_methods" ("branch_id", "name");

ALTER TABLE "business_settings" ADD FOREIGN KEY ("branch_id") REFERENCES "branches" ("id");

ALTER TABLE "users" ADD FOREIGN KEY ("branch_id") REFERENCES "branches" ("id");

ALTER TABLE "users" ADD FOREIGN KEY ("role_id") REFERENCES "roles" ("id");

ALTER TABLE "customers" ADD FOREIGN KEY ("branch_id") REFERENCES "branches" ("id");

ALTER TABLE "staff_profiles" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "staff_working_hours" ADD FOREIGN KEY ("staff_id") REFERENCES "staff_profiles" ("id");

ALTER TABLE "staff_time_off" ADD FOREIGN KEY ("staff_id") REFERENCES "staff_profiles" ("id");

ALTER TABLE "service_categories" ADD FOREIGN KEY ("branch_id") REFERENCES "branches" ("id");

ALTER TABLE "services" ADD FOREIGN KEY ("branch_id") REFERENCES "branches" ("id");

ALTER TABLE "services" ADD FOREIGN KEY ("category_id") REFERENCES "service_categories" ("id");

ALTER TABLE "appointments" ADD FOREIGN KEY ("branch_id") REFERENCES "branches" ("id");

ALTER TABLE "appointments" ADD FOREIGN KEY ("customer_id") REFERENCES "customers" ("id");

ALTER TABLE "appointments" ADD FOREIGN KEY ("staff_id") REFERENCES "staff_profiles" ("id");

ALTER TABLE "appointments" ADD FOREIGN KEY ("status_id") REFERENCES "appointment_statuses" ("id");

ALTER TABLE "appointment_services" ADD FOREIGN KEY ("appointment_id") REFERENCES "appointments" ("id");

ALTER TABLE "appointment_services" ADD FOREIGN KEY ("service_id") REFERENCES "services" ("id");

ALTER TABLE "product_categories" ADD FOREIGN KEY ("branch_id") REFERENCES "branches" ("id");

ALTER TABLE "products" ADD FOREIGN KEY ("branch_id") REFERENCES "branches" ("id");

ALTER TABLE "products" ADD FOREIGN KEY ("category_id") REFERENCES "product_categories" ("id");

ALTER TABLE "stock_locations" ADD FOREIGN KEY ("branch_id") REFERENCES "branches" ("id");

ALTER TABLE "stock_balances" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");

ALTER TABLE "stock_balances" ADD FOREIGN KEY ("location_id") REFERENCES "stock_locations" ("id");

ALTER TABLE "suppliers" ADD FOREIGN KEY ("branch_id") REFERENCES "branches" ("id");

ALTER TABLE "purchases" ADD FOREIGN KEY ("branch_id") REFERENCES "branches" ("id");

ALTER TABLE "purchases" ADD FOREIGN KEY ("supplier_id") REFERENCES "suppliers" ("id");

ALTER TABLE "purchase_items" ADD FOREIGN KEY ("purchase_id") REFERENCES "purchases" ("id");

ALTER TABLE "purchase_items" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");

ALTER TABLE "inventory_movements" ADD FOREIGN KEY ("branch_id") REFERENCES "branches" ("id");

ALTER TABLE "inventory_movements" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");

ALTER TABLE "inventory_movements" ADD FOREIGN KEY ("location_id") REFERENCES "stock_locations" ("id");

ALTER TABLE "invoices" ADD FOREIGN KEY ("branch_id") REFERENCES "branches" ("id");

ALTER TABLE "invoices" ADD FOREIGN KEY ("customer_id") REFERENCES "customers" ("id");

ALTER TABLE "invoices" ADD FOREIGN KEY ("appointment_id") REFERENCES "appointments" ("id");

ALTER TABLE "invoices" ADD FOREIGN KEY ("status_id") REFERENCES "invoice_statuses" ("id");

ALTER TABLE "invoices" ADD FOREIGN KEY ("created_by") REFERENCES "users" ("id");

ALTER TABLE "invoice_items" ADD FOREIGN KEY ("invoice_id") REFERENCES "invoices" ("id");

ALTER TABLE "invoice_items" ADD FOREIGN KEY ("service_id") REFERENCES "services" ("id");

ALTER TABLE "invoice_items" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");

ALTER TABLE "payment_methods" ADD FOREIGN KEY ("branch_id") REFERENCES "branches" ("id");

ALTER TABLE "payments" ADD FOREIGN KEY ("invoice_id") REFERENCES "invoices" ("id");

ALTER TABLE "payments" ADD FOREIGN KEY ("method_id") REFERENCES "payment_methods" ("id");
