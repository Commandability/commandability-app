package com.commandability;

import com.facebook.react.ReactActivity;

// commandability-mod: react-native-bootsplash
import android.os.Bundle;
import com.zoontek.rnbootsplash.RNBootSplash;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "commandability";
  }

  // commandability-mod: react-native-bootsplash
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    RNBootSplash.init(this); // <- initialize the splash screen
    super.onCreate(null); // or super.onCreate(null) with react-native-screens
  }
}
