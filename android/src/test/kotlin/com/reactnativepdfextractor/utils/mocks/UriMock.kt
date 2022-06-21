package com.reactnativepdfextractor.utils.mocks

import com.reactnativepdfextractor.utils.mocks.interfaces.Mock
import io.mockk.mockk
import android.net.Uri

class UriMock: Mock {
  private var uri = mockk<Uri>(relaxed = true)

  override fun mock(): Uri {
    return uri
  }
}
