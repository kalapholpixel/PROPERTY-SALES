-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC(15, 2) NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('house', 'land')),
  location VARCHAR(255) NOT NULL,
  bedrooms INTEGER DEFAULT 0,
  bathrooms INTEGER DEFAULT 0,
  area NUMERIC(10, 2) NOT NULL,
  images TEXT[] DEFAULT '{}',
  latitude NUMERIC(10, 8) DEFAULT 0,
  longitude NUMERIC(11, 8) DEFAULT 0,
  features TEXT[] DEFAULT '{}',
  sold BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create inquiries table
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create storage bucket for property images
-- Note: This should be done through the Supabase dashboard
-- CREATE STORAGE bucket named 'property-images' with public access

-- Enable RLS (Row Level Security)
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to properties
CREATE POLICY "Public read access to properties"
  ON properties
  FOR SELECT
  TO public
  USING (true);

-- Create policies for authenticated users to manage properties
CREATE POLICY "Authenticated users can insert properties"
  ON properties
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update properties"
  ON properties
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete properties"
  ON properties
  FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for inquiries
CREATE POLICY "Public can insert inquiries"
  ON inquiries
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Public can read inquiries"
  ON inquiries
  FOR SELECT
  TO public
  USING (true);

-- Create indexes for better performance
CREATE INDEX properties_type_idx ON properties(type);
CREATE INDEX properties_location_idx ON properties(location);
CREATE INDEX properties_sold_idx ON properties(sold);
CREATE INDEX inquiries_property_id_idx ON inquiries(property_id);
CREATE INDEX inquiries_created_at_idx ON inquiries(created_at);
