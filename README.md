# Klasifikasi Citra Tingkat Kesegaran Daging Aya,

## Tech Stack

- **PyTorch**
- **React Native**
- **FastAPI**

## Struktur Proyek
- **`frontend/`**: Kode sumber untuk aplikasi mobile yang dibangun dengan React Native.
- **`backend/`**: Kode sumber untuk API yang dibangun dengan FastAPI.
- **`cnn/`**: Model-model deep learning yang dibangun dengan PyTorch.

## Instalasi

### Prerequisites

- [Node.js](https://nodejs.org/) (untuk React Native)
- [Python](https://www.python.org/) (untuk FastAPI dan PyTorch)

### Instalasi Backend
   ```bash
   cd be
   python -m venv venv
   .\myenv\Scripts\activate
   pip install -r requirements.txt
   uvicorn main:app --reload
  ```


### Instalasi Frontend
   ```bash
   cd fe
   npm install
   npm start
   npm run android
   ```
