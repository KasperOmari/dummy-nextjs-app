from fastapi import FastAPI, HTTPException, Body
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import base64
import time
import uuid
import os

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with your frontend's URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define Pydantic model for the input
class ImageData(BaseModel):
    image_data: str

images_path = "./images"
# Ensure the images directory exists
os.makedirs(images_path, exist_ok=True)

@app.post("/upload_image")
async def upload_image(data: ImageData = Body(...)):
    # Get the base64 image data
    image_data = data.image_data
    
    # Check if the base64 string is in the correct format
    if not image_data.startswith("data:image"):
        raise HTTPException(status_code=400, detail="Invalid image data format")

    # Split the base64 data from the metadata (like "data:image/png;base64,")
    header, encoded_data = image_data.split(",", 1)
    
    # Decode the image data
    try:
        decoded_data = base64.b64decode(encoded_data)
    except Exception as e:
        raise HTTPException(status_code=400, detail="Failed to decode base64 data")

    # Extract the file extension from the header
    file_extension = header.split(";")[0].split("/")[1]  # png, jpeg, etc.
    timestamp = int(time.time())  # Unix timestamp (seconds)
    unique_filename = f"{timestamp}_{uuid.uuid4()}.{file_extension}"
    file_location = os.path.join(images_path, unique_filename)

    # Save the file to the server
    with open(file_location, "wb") as f:
        f.write(decoded_data)

    return {"image": unique_filename}


@app.get("/image")
async def get_image(id: str):
    for image in os.listdir(images_path):
        # Separate file name and extension
        base_name, _ = os.path.splitext(image)
        if base_name == id:
            return FileResponse(os.path.join(images_path, image))
    
    raise HTTPException(status_code=404, detail="Image not found")

@app.get("/list_images")
async def list_images():
    image_id_list = []
    
    for image in os.listdir(images_path):
        # Separate file name and extension
        if image.lower().endswith(("png", "jpg", "jpeg")):
            file_path = os.path.join(images_path, image)
            # Get the modification time of the image
            mod_time = os.path.getmtime(file_path)
            # Append to the list with the modification time
            image_id_list.append({"id": image.split(".")[0], "mod_time": mod_time})

    # Sort the list by modification time in ascending order (oldest first)
    image_id_list.sort(key=lambda x: x["mod_time"])
    image_id_list.reverse()

    # Return the images sorted by creation time
    return {"files": image_id_list if image_id_list else "No Images found"}
