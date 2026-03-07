-- Create blogs table
CREATE TABLE blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  content TEXT NOT NULL,
  html_content JSONB,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_blogs_slug ON blogs(slug);
CREATE INDEX idx_blogs_created_at ON blogs(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Public blogs are viewable by everyone" ON blogs
  FOR SELECT USING (true);

-- Create policy for insert access (you can modify this based on your auth needs)
CREATE POLICY "Anyone can create blogs" ON blogs
  FOR INSERT WITH CHECK (true);

-- Create policy for update access (you can modify this based on your auth needs)
CREATE POLICY "Anyone can update blogs" ON blogs
  FOR UPDATE USING (true);

-- Create policy for delete access (you can modify this based on your auth needs)
CREATE POLICY "Anyone can delete blogs" ON blogs
  FOR DELETE USING (true);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at on row updates
CREATE TRIGGER update_blogs_updated_at 
  BEFORE UPDATE ON blogs 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
