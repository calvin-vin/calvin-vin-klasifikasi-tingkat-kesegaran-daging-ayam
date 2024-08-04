# Klasifikasi Citra Tingkat Kesegaran Daging Ayam menggunakan MobileNetV3

# Classification of Chicken Meat Freshnes using MobileNetV3

## Tech Stack

- **Frontend (`fe/`): **React Native\*\*
- **Backend (`be/`): **FastAPI\*\*
- **CNN (`cnn/`): **PyTorch\*\*

## CNN Model

### Classes/Labels

- **Sangat Segar (ss)**
- **Segar-Normal (sn)**
- **Normal-Busuk (nb)**
- **Busuk (b)**

#### Dataset Sample

<img src="assets/sample.jpg" alt="Sampel Dataset" width="400"/>

#### Training

<img src="assets/training.png" alt="Training" width="500"/>

#### Confusion Matrix Validation

<img src="assets/cm.png" alt="Confusion Matrix" width="400"/>

## Instalasi

### Prerequisites

- [Node.js](https://nodejs.org/) - Running React Native.
- [Python](https://www.python.org/) - Running FastAPI and PyTorch.

### Backend Installation

```bash
cd be
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend Installation

```bash
cd fe
npm install
npm start
npm run android
```

#### Layout

<img src="assets/layout_app.png" alt="Layout App" width="300"/>
