import random
import os

def upload_img(file):
    os.makedirs("images", exist_ok=True)
    f = file.filename.split('.')
    [name, ext] = f
    filename = f"{name}_{random.randint(1,1000)}.{ext}"
    file_location = f"images/{filename}"
    with open(file_location, "wb+") as file_object:
        file_object.write(file.file.read())
    
    return file_location