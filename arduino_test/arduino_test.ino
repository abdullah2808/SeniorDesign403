#include <ArduinoJson.h>



void setup() {
  Serial.begin(9600);
  const int capacity = JSON_ARRAY_SIZE(3) + 4*JSON_OBJECT_SIZE(4);
  StaticJsonDocument<capacity> doc;


  JsonObject obj1 = doc.createNestedObject();
  obj1["receiver"] = "A";
  obj1["angle"] = "42";
  obj1["gps"] = "30";
  obj1["signalStrength"] = "12";
  
  JsonObject obj2 = doc.createNestedObject();
  obj2["receiver"] = "B";
  obj2["angle"] = "60";
  obj2["gps"] = "20";
  obj2["signalStrength"] = "12";
  
  JsonObject obj3 = doc.createNestedObject();
  obj3["receiver"] = "C";
  obj3["angle"] = "12";
  obj3["gps"] = "10";
  obj3["signalStrength"] = "12";

  String output;
  serializeJson(doc, output);
  serializeJson(doc, Serial);

  Serial.write("|");

}

void loop() {

}
