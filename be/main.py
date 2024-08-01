from fastapi import FastAPI, UploadFile
import torch
from src.model import CustomMobilenetV3
from src.upload import upload_img
from src.predict import pred_image
import logging

app = FastAPI()
logger = logging.getLogger(__name__)


@app.get("/")
def read_root():
    return "Klasifikasi Tingkat Kesegaran Ayam API"


@app.post("/predict")
async def upload(file: UploadFile):
    try:
        file_location = upload_img(file)
        output_size = 4
        device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
        path = "model/weights_best.pth"
        model = CustomMobilenetV3(output_size).to(device)
        weights = torch.load(path, map_location='cpu')
        model.load_state_dict(weights)

        predict_class = pred_image(file_location, model, device)

        [result, confident] = predict_class
    except Exception as e:
        logger.exception(msg=e.__class__.__name__)
        return {"message": "There was an error uploading the file"}
    finally:
        file.file.close()
    
    return { "result": result, "confident": confident }