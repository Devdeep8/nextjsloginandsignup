import { writeFile } from "fs/promises";

export async function POST(req) {
    try {
        const imageBuffer = await req.arrayBuffer(); // Read the image data as a buffer
        if (!imageBuffer || imageBuffer.length === 0) {
            return new Response(JSON.stringify({ success: false, message: 'Please upload the image' }), { status: 400 });
        }

        const path = `./public/uploads/${Date.now()}.jpg`; // Adjust the file extension as per your image type
        await writeFile(path, Buffer.from(imageBuffer));

        return new Response(JSON.stringify({ success: true, message: 'File uploaded successfully' }), { status: 201 });
    } catch (error) {
        console.error('Error uploading file:', error);
        return new Response(JSON.stringify({ success: false, message: 'Internal server error' }), { status: 500 });
    }
}
