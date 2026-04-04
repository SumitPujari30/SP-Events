import os
from PIL import Image
import concurrent.futures
from multiprocessing import cpu_count

# Target directory
TARGET_DIR = os.path.join(os.getcwd(), 'public', 'assets', 'webp_images')
MAX_WIDTH = 1920
QUALITY = 75

def optimize_image(file_path):
    try:
        with Image.open(file_path) as img:
            # Check if resize is needed
            width, height = img.size
            if width > MAX_WIDTH:
                ratio = MAX_WIDTH / width
                new_size = (MAX_WIDTH, int(height * ratio))
                img = img.resize(new_size, Image.Resampling.LANCZOS)
            
            # Save optimized version in place
            # Removing EXIF data by not passing it to save()
            img.save(file_path, 'WEBP', quality=QUALITY, method=6)
            return os.path.getsize(file_path)
    except Exception as e:
        print(f"Error optimizing {file_path}: {e}")
        return None

def main():
    if not os.path.exists(TARGET_DIR):
        print(f"Directory not found: {TARGET_DIR}")
        return

    file_paths = []
    start_size = 0
    for root, dirs, files in os.walk(TARGET_DIR):
        for file in files:
            if file.lower().endswith('.webp'):
                fpath = os.path.join(root, file)
                file_paths.append(fpath)
                start_size += os.path.getsize(fpath)

    total_files = len(file_paths)
    print(f"Found {total_files} images to optimize (~{start_size / (1024*1024):.2f} MB)")
    print(f"Using {cpu_count()} CPU cores for parallel processing...")

    end_size = 0
    optimized_count = 0
    
    # Use ThreadPoolExecutor for I/O bound tasks (Pillow's GIL handling is decent for some ops)
    # Actually ProcessPoolExecutor is better for CPU bound compression like method=6
    with concurrent.futures.ThreadPoolExecutor(max_workers=cpu_count()) as executor:
        futures = {executor.submit(optimize_image, fp): fp for fp in file_paths}
        
        for i, future in enumerate(concurrent.futures.as_completed(futures)):
            result = future.result()
            if result is not None:
                end_size += result
                optimized_count += 1
            
            if (i + 1) % 50 == 0:
                print(f"Processed {i+1}/{total_files} images...")

    print("\nOptimization Complete!")
    print(f"Total images found: {total_files}")
    print(f"Successfully optimized: {optimized_count}")
    print(f"Start size: {start_size / (1024*1024):.2f} MB")
    print(f"End size: {end_size / (1024*1024):.2f} MB")
    print(f"Space saved: {(start_size - end_size) / (1024*1024):.2f} MB ({((start_size - end_size) / start_size) * 100:.1f}%)")

if __name__ == "__main__":
    main()
