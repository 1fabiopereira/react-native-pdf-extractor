package com.example.reactnativepdfextractor;

import android.os.Bundle;
import android.os.PersistableBundle;

import androidx.annotation.Nullable;
import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {
  @Override
  public void onCreate(@Nullable Bundle savedInstanceState, @Nullable PersistableBundle persistentState) {
    super.onCreate(savedInstanceState, persistentState);
  }

  @Override
  protected String getMainComponentName() {
    return "PdfExtractorExample";
  }
}
