package com.reactnativepdfextractor.utils.mocks

import com.reactnativepdfextractor.utils.mocks.interfaces.Mock
import com.tom_roush.pdfbox.pdmodel.PDDocument
import com.tom_roush.pdfbox.text.PDFTextStripper

import io.mockk.every
import io.mockk.mockk
import io.mockk.mockkConstructor

class PDFTextStripperMock(): Mock {
  private lateinit var text: String

  fun update(incoming: String?): PDFTextStripperMock {
    if (incoming != null) text = incoming
    return this
  }

  override fun mock() {
    mockkConstructor(PDFTextStripper::class)
    mockk<PDFTextStripper>(relaxed = true)
      every {
        anyConstructed<PDFTextStripper>()
          .getText(ofType(PDDocument::class))
      } returns text
  }
}
