// SmartLights

#include <Console.h>
#include <Bridge.h>
#include <YunServer.h>
#include <YunClient.h>

#include <FastLED.h>

#define LED_PIN     5
#define NUM_LEDS    100
#define BRIGHTNESS  255
#define LED_TYPE    WS2811
#define COLOR_ORDER RGB

#define UPDATES_PER_SECOND 100

/* State class */
// todo: move this to an external library
class State {
  private:
    String type; // hex|special
    String value; // hex_value|rainbow|strobe
    uint8_t startIndex;
  public:
    State ();
    State (String, String);
    String getType() {return type;}
    String getValue() {return value;}
    uint8_t getStartIndex() {return startIndex;}
    uint8_t incrementStartIndex() {return startIndex++;}
};

State::State() {
  type = "hex";
  value = "FFFFFF";
  startIndex = 0;
}

State::State(String _type, String _value) {
  type = _type;
  value = _value;
  startIndex = 0;
}
/* ========== */

// global LED array
CRGB leds[NUM_LEDS];

// global server object
YunServer server;


void setup() {
  // power-up safety delay
  delay( 1000 );

  // set pinmode
  pinMode(LED_BUILTIN, OUTPUT);

  // set up leds
  FastLED.addLeds<LED_TYPE, LED_PIN, COLOR_ORDER>(leds, NUM_LEDS).setCorrection( TypicalLEDStrip );
  FastLED.setBrightness(BRIGHTNESS);

  // initialize leds to white
  for( int i = 0; i < NUM_LEDS; i++) {
      leds[i] = CRGB::White;
  }
  FastLED.show();

  // begin bridge
  Bridge.begin();

  // begin console
  Console.begin();

  // listen on external ports
  server.noListenOnLocalhost();

  // start server
  server.begin();
}

// current state
State previousState;
State currentState;

void loop() {
  // listen for client request
  YunClient client = server.accept();
  
  if (client) {
    // expected command format: "/<type>/<value>"
    String command = client.readString();
    String commandType = command.substring(0, command.indexOf("/"));
    String commandValue = command.substring(command.indexOf("/") + 1);
    commandValue.trim();

    Console.println(commandValue);

    previousState = currentState;
    currentState = State(commandType, commandValue);
    
    client.stop();
  }

  updateLeds(currentState, previousState);

  FastLED.show();

  // LED update delay
  FastLED.delay(1000 / UPDATES_PER_SECOND);
}

void updateLeds(State& currentState, State& previousState) 
{
  if (currentState.getType() == "special") {
    if (currentState.getValue() == "rainbow")
      updateLedsFromPalette(currentState.incrementStartIndex(), RainbowColors_p);
    else if (currentState.getValue() == "strobe") {
      if (currentState.getStartIndex() < 5) {
        currentState.incrementStartIndex();
        
        updateLeds(previousState, previousState);
        FastLED.delay(500);
        updateLedsFromHex(stringToHex("000000"));
        FastLED.delay(500);
      } else {
        currentState = previousState;
      }
    }
  } else {
    updateLedsFromHex(stringToHex(currentState.getValue()));
  }
}

void updateLedsFromPalette(uint8_t colorIndex, CRGBPalette32 palette)
{
    for( int i = 0; i < NUM_LEDS; i++) {
        leds[i] = ColorFromPalette(
          palette, 
          colorIndex, 
          BRIGHTNESS, 
          LINEARBLEND
        );
        colorIndex += 3;
    }
}

void updateLedsFromHex(long hex) {
  for (int i = 0; i < NUM_LEDS; i++) {
    leds[i] = hex;
  }
}


long stringToHex(String hex) {
  char hexBuf[50];
  hex.toCharArray(hexBuf, 50);
  return strtol(hexBuf, NULL, 16);
}
