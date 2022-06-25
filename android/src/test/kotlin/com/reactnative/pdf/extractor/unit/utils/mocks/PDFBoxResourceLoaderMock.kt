package com.reactnative.pdf.extractor.unit.utils.mocks

import android.content.Context
import com.reactnative.pdf.extractor.unit.utils.mocks.interfaces.Mock
import com.tom_roush.pdfbox.android.PDFBoxResourceLoader
import io.mockk.mockk

class PDFBoxResourceLoaderMock(): Mock {
  private val context = mockk<Context>(relaxed = true)

  override fun mock() {
    PDFBoxResourceLoader.init(context)
  }
}
