package com.commandability;

// commandability-mod: react-native-bootsplash
import android.os.Bundle;

import com.facebook.react.ReactActivity;
// commandability-mod: react-native-bootsplash
import com.zoontek.rnbootsplash.RNBootSplash;

public class MainActivity extends ReactActivity {
  // commandability-mod: react-native-bootsplash
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    RNBootSplash.init(R.drawable.bootsplash, MainActivity.this); // <- display the generated bootsplash.xml drawable over our MainActivity
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "commandability";
  }
}
