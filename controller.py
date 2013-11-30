#!/usr/bin/python
from firebase import firebase
import serial, time
ser = serial.Serial('/dev/tty.usbmodemfd121', 9600, timeout = 0.1)
def send_and_receive( theinput ):
  ser.write( theinput )
  while True:
    try:
      time.sleep(0.01)
      #state = ser.readline()
      #print state
      break
    except:
      pass
  time.sleep(0.1)
firebase = firebase.FirebaseApplication('https://chesterlo.firebaseio.com', None)
while True:
  result = firebase.get('/telerobot/drive', None)
  if result['direction']=="forward":
    send_and_receive('1')
  elif result['direction']=="backward":
    send_and_receive('2')
  elif result['direction']=="left":
    send_and_receive('3')
  elif result['direction']=="right":
    send_and_receive('4')
  elif result['direction']=="stop":
    send_and_receive('5')
  else:
    time.sleep(0.1)
result = firebase.get('/telerobot/lasers', None)
print result

print result['state']

if result['state'] == "on":
  print "Lasers Activated"
else:
  print "Laser Offline"
