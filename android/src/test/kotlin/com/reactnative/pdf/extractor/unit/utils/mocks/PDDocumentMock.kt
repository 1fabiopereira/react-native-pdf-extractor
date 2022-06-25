package com.reactnative.pdf.extractor.unit.utils.mocks

import com.reactnative.pdf.extractor.unit.utils.mocks.interfaces.Mock
import com.tom_roush.pdfbox.pdmodel.PDDocument

import io.mockk.every
import io.mockk.mockk
import io.mockk.mockkStatic

import java.io.InputStream

class PDDocumentMock(): Mock {
  private var document: PDDocument = mockk(relaxed = true)
  private var totalOfPages: Int = 0

  fun update(pages: Int): PDDocumentMock {
    totalOfPages = pages
    return this
  }

  fun getDoc(): PDDocument {
    return document
  }

  override fun mock(): PDDocumentMock {
    mockkStatic(PDDocument::class)
      every { PDDocument.load(ofType(InputStream::class)) } returns document
      every { PDDocument.load(ofType(InputStream::class), ofType(String::class)) } returns document
      every { document.numberOfPages } returns totalOfPages
      every { document.close() } returns Unit

    return this
  }
}
