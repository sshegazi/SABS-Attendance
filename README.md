# Smart Attendance Beacon System (SABS) 
This project is a real-time attendance system.
It uses an ESP32 to scan IDs, Python to update an Excel database, and a Web Dashboard for live viewing 

##Tech Stack 
- **hardware:** ESP32, RFID/Sensor module
- **Backend:** Python 3.x, FastAPI, Pandas
- **Database:** Microsoft Excel ('.xlsx')
- **Frontend:** HTML5, CSS3, JavaScript

## Execution Steps 

### 1.Hardware Setup 
- Connect your ESP32 to your computer via USB.
- Ensure the 'attendance.py' script is configured to correct **COM Port**.

###2. Install Dependencies
Open your terminal/command prompt and run: 
''''bash
pip install fastapi uvicorn pandas openpyxl
 
## How to run : 
1. Run 'python create_exsel.py'
2. Run 'python bridge.py'
3. Open  'index.html'
4. Run 'python attendance.py'



