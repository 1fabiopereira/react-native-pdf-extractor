package com.reactnativepdfextractor.utils.mocks

import com.reactnativepdfextractor.utils.mocks.interfaces.Mock
import io.mockk.mockk
import java.io.InputStream

class InputStreamMock: Mock {
  private val inputStream = mockk<InputStream>(relaxed = true)

  override fun mock(): InputStream {
    return inputStream
  }
}
