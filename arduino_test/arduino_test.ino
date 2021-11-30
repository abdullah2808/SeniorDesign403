#include <ArduinoJson.h>



void setup() {
  Serial.begin(9600);
  StaticJsonDocument<384> doc;

  JsonArray receivers = doc.createNestedArray("receivers");

  JsonObject receivers_0 = receivers.createNestedObject();
  receivers_0["receiver"] = "A";
  receivers_0["angle"] = "305";

  JsonObject receivers_0_gps = receivers_0.createNestedObject("gps");
  receivers_0_gps["lat"] = "31.464863053148537";
  receivers_0_gps["lon"] = "-97.21600291602776";
  receivers_0["signalStrength"] = "79.1";

  JsonObject receivers_1 = receivers.createNestedObject();
  receivers_1["receiver"] = "B";
  receivers_1["angle"] = "179";

  JsonArray receivers_1_gps = receivers_1.createNestedObject("gps");
  receivers_1_gps["lat"] = "31.464863053148537";
  receivers_1_gps["lon"] = "-97.21600291602776";
  receivers_1["signalStrength"] = "78.10";

  JsonObject receivers_2 = receivers.createNestedObject();
  receivers_2["receiver"] = "C";
  receivers_2["angle"] = "0";

  JsonObject receivers_2_gps = receivers_2.createNestedObject("gps");
  receivers_2_gps["lat"] = "31.465134511547053";
  receivers_2_gps["lon"] = "-97.2197810602022";
  receivers_2["signalStrength"] = "77.6";
  String output;
  serializeJson(doc, output);
  serializeJson(doc, Serial);
  Serial.write("|");

}

void loop() {

}
