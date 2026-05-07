from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import uvicorn

app = FastAPI()

# عشان الموقع يقدر يقرأ البيانات بدون مشاكل
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

@app.get("/data")
def get_data():
    try:
        # تأكدي إن اسم الملف هنا يطابق ملفك بالضبط
        df = pd.read_excel("Attendance_Final.xlsx") 
        return df.to_dict(orient="records")
    except:
        return []

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)