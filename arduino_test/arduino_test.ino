#include <ArduinoJson.h>



void setup() {
  Serial.begin(9600);

}

void loop() {
    const int capacity = JSON_ARRAY_SIZE(3) + 4*JSON_OBJECT_SIZE(4);
  StaticJsonDocument<capacity> doc;

  JsonObject obj1 = doc.createNestedObject();
  obj1["receiver"] = "a";
  obj1["angle"] = "12";
  obj1["gps"] = "40";
  obj1["signalStrength"] = "12";
  
  JsonObject obj2 = doc.createNestedObject();
  obj2["receiver"] = "b";
  obj2["angle"] = "12";
  obj2["gps"] = "40";
  obj2["signalStrength"] = "12";
  
  JsonObject obj3 = doc.createNestedObject();
  obj3["receiver"] = "c";
  obj3["angle"] = "12";
  obj3["gps"] = "40";
  obj3["signalStrength"] = "12";

  String output;
  serializeJson(doc, output);
  serializeJson(doc, Serial);

  Serial.write("|");
}
