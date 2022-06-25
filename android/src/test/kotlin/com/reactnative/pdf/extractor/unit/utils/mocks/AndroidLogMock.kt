package com.reactnative.pdf.extractor.unit.utils.mocks

import com.reactnative.pdf.extractor.unit.utils.mocks.interfaces.Mock
import io.mockk.every
import io.mockk.mockkStatic

import android.util.Log

class AndroidLogMock(): Mock {
  override fun mock() {
    mockkStatic(Log::class)
      every { Log.w(any(), any<Throwable>()) } returns Int.MAX_VALUE
      every { Log.w(any(), any<String>()) } returns Int.MAX_VALUE
  }
}
