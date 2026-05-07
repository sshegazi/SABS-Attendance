import serial
import pandas as pd
from datetime import datetime
import os
import time

# --- CONFIGURATION ---
SERIAL_PORT = 'COM3'  
BAUD_RATE = 115200
EXCEL_FILE = 'Attendance_Final.xlsx'

# --- STUDENT DATABASE ---
# This is used to verify the ID exists before trying to update the Excel file
student_db = {
    'id001': 'Sarah Mohammed Osman',
    'id002': 'Najla AL-Dossari',
    'id003': 'Reem ahmed',
    'id004': 'Alanoud Al-Sudairi',
    'id005': 'Hessa Al-Otaibi',
    'id006': 'Layan Al-Qahtani',
    'id007': 'Muneera Al-Subaie',
    'id008': 'Noura Al-Ghamdi',
    'id009': 'Sara Al-Zahrani',
    'id010': 'Jawaher Al-Mutairi',
    'id011': 'Fatimah Al-Shammari',
    'id012': 'Maha Al-Enazi',
    'id013': 'Lulwa Al-Rashidi',
    'id014': 'Asma Al-Harbi',
    'id015': 'Ghalia Al-Khalidi',
}

def update_attendance(student_id, name):
    try:
        # Load the existing file created by create_excel.py
        df = pd.read_excel(EXCEL_FILE)
        
        # Check if the ID exists in the 'Student ID' column
        if student_id in df['Student ID'].values:
            now = datetime.now()
            date_str = now.strftime('%Y-%m-%d')
            time_str = now.strftime('%H:%M:%S')
            
            # Find the row and update the 'Not Present' cells
            df.loc[df['Student ID'] == student_id, 'Date'] = date_str
            df.loc[df['Student ID'] == student_id, 'Time'] = time_str
            
            # Save the updated data back to Excel
            df.to_excel(EXCEL_FILE, index=False)
            print(f"✅ SUCCESS: {name} ({student_id}) marked PRESENT at {time_str}")
        else:
            print(f"⚠️ Warning: {student_id} found but not in the Excel Roster.")
            
    except Exception as e:
        print(f"❌ Excel Error: {e}")
        print("CRITICAL: Close the Excel file so Python can write to it!")

def main():
    print("----------------------------------------------")
    print(f"Connecting to ESP32 on {SERIAL_PORT}...")
    print("----------------------------------------------")
    
    try:
        ser = serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=1)
        time.sleep(2) 
        print("SYSTEM READY! Waiting for BLE scans...")
        print("(Note: Old system messages are being hidden for a clean demo)")

        while True:
            if ser.in_waiting > 0:
                # Read line and clean it up
                raw_line = ser.readline().decode('utf-8', errors='ignore').strip()
                
                if raw_line:
                    # Check if any ID from our database is hidden inside the ESP32 message
                    for student_id in student_db:
                        if student_id in raw_line:
                            update_attendance(student_id, student_db[student_id])
                            break # Found the ID, no need to keep checking this line
                    
                    # Note: System messages (like old names) are received but NOT printed
                    # This keeps your CMD screen clean for the judges.

    except Exception as e:
        print(f"\n❌ CONNECTION ERROR: {e}")
    finally:
        if 'ser' in locals() and ser.is_open:
            ser.close()

if __name__ == "__main__":
    main()