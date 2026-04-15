import fs from 'fs';
import path from 'path';

const testFile = 'c:/Users/Sumit Pujari/Desktop/SP_Website/SP-Events/public/assets/client_transparent_images/z_test_dynamic_logo.png';

try {
    // 1. Create a dummy file
    fs.writeFileSync(testFile, 'dummy content');
    console.log('Created test file');

    // 2. Wait a bit for dev server to potentially pick it up (though API reads fs directly)
    setTimeout(async () => {
        // Since I can't fetch from the local dev server easily without a browser, 
        // I will just check if my API logic works by running it in a script.
        
        const imagesDirectory = 'c:/Users/Sumit Pujari/Desktop/SP_Website/SP-Events/public/assets/client_transparent_images';
        const files = fs.readdirSync(imagesDirectory);
        const imageExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.svg'];
        const brandFiles = files.filter(file => 
            imageExtensions.includes(path.extname(file).toLowerCase()) &&
            !file.includes('_demo')
        );

        if (brandFiles.includes('z_test_dynamic_logo.png')) {
            console.log('SUCCESS: API logic would pick up the new file.');
        } else {
            console.log('FAILURE: API logic missed the new file.');
        }

        // 3. Cleanup
        fs.unlinkSync(testFile);
        console.log('Removed test file');
    }, 1000);

} catch (err) {
    console.error(err);
}
