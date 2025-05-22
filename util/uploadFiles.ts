import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';

const supabase = createClient(
  '',
  '');

async function generateUniqueFilename(extension: string): Promise<string> {
  const timestamp = new Date().getTime();
  const randomString = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${randomString}.${extension}`;
}

async function processImage(file: string): Promise<{ name: string; url: string }> {
  const originalFileName = path.basename(file);
  const extension = path.extname(originalFileName).toLowerCase().substring(1);
  const uniqueFileName = await generateUniqueFilename(extension);
  const tempFile = path.join(__dirname, 'temp', uniqueFileName);

  // Create temp directory if it doesn't exist
  fs.mkdirSync(path.join(__dirname, 'temp'), { recursive: true });

  // Resize image to max 1024 height while maintaining aspect ratio
  await sharp(file)
    .resize(null, 1024, {
      fit: 'inside',
      withoutEnlargement: true
    })
    .toFile(tempFile);

  // Upload to Supabase
  const { data, error } = await supabase.storage
    .from('avatar-mash')
    .upload(uniqueFileName, fs.createReadStream(tempFile), {
      duplex: 'half',
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    console.error(`Upload error for ${originalFileName}:`, error);
    throw error;
  }

  // Clean up temp file
  fs.unlinkSync(tempFile);

  // Get public URL
  const publicUrl = supabase.storage
    .from('avatar-mash')
    .getPublicUrl(uniqueFileName).data.publicUrl;

  if (!publicUrl) {
    throw new Error(`Failed to get public URL for ${uniqueFileName}`);
  }

  return { name: uniqueFileName, url: publicUrl };
}

async function addAvatarToDatabase(url: string): Promise<void> {
  const { error } = await supabase
    .from('Avatars')
    .insert({ image: url, elo: 1300 });

  if (error) throw error;
}

async function main() {
  try {
    // Get all image files from the images directory
    const imagesDir = path.join(__dirname, 'images');
    const files = fs.readdirSync(imagesDir)
      .filter(file => file.match(/\.(jpg|jpeg|png)$/i));

    if (files.length === 0) {
      console.log('No image files found in the images directory');
      return;
    }

    console.log(`Found ${files.length} images to process`);

    for (const file of files) {
      const fullPath = path.join(imagesDir, file);
      console.log(`Processing ${file}...`);

      try {
        const { url } = await processImage(fullPath);
        await addAvatarToDatabase(url);
        console.log(`Successfully processed and uploaded ${file}`);
      } catch (error) {
        console.error(`Error processing ${file}:`, error);
      }
    }

    console.log('All images processed successfully!');
  } catch (error) {
    console.error('Error in main process:', error);
  }
}

// Run the script
main();