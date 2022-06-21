package com.reactnativepdfextractor.utils.mocks

import android.content.Context
import com.reactnativepdfextractor.utils.mocks.interfaces.Mock
import com.tom_roush.pdfbox.android.PDFBoxResourceLoader
import io.mockk.mockk

class PDFBoxResourceLoaderMock: Mock {
  private val context = mockk<Context>(relaxed = true)

  override fun mock() {
    PDFBoxResourceLoader.init(context)
  }
}
