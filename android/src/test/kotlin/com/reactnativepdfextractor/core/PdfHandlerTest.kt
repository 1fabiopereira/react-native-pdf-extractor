package com.reactnativepdfextractor.core

import android.content.ContentResolver
import android.net.Uri

import com.tom_roush.pdfbox.pdmodel.PDDocument
import io.mockk.*

import junitparams.JUnitParamsRunner
import junitparams.Parameters
import org.junit.Assert

import org.junit.Test
import org.junit.runner.RunWith
import org.junit.runners.Parameterized

import java.io.InputStream


@RunWith(JUnitParamsRunner::class)
class PdfHandlerTest {

  private fun streamMock(): InputStream {
    return mockk(relaxed = true)
  }

  private fun uriMock(): Uri {
    return mockk(relaxed = true)
  }

  // ====================== IS ENCRYPTED ====================== //

  @Parameterized.Parameters
  fun isEncryptedWithoutExceptionsCases(): Any {
    return listOf(
      arrayOf(uriMock(), streamMock(), 1, false), // check if PDF file is not encrypted
      arrayOf(uriMock(), streamMock(), 0, true), // check if PDF file is encrypted
    )
  }

  @Parameterized.Parameters
  fun isEncryptedWithExceptionsCases(): Any {
    val exception = Exception("File not found.")

    return listOf(
      arrayOf(uriMock(), null, 0, exception), // try check if PDF file is encrypted when STREAM was passed null
      arrayOf(null, streamMock(), 0, exception), // try check if PDF file is encrypted when URI was passed null
      arrayOf(null, null, 0, exception), // try check if PDF file is encrypted when URI and STREAM was passed null
    )
  }

  @Test
  @Parameters(method = "isEncryptedWithoutExceptionsCases")
  fun isEncryptedWithoutExceptionsCasesTest(uri: Uri?, stream: InputStream?, pages: Int, expected: Boolean) {
    val resolver = mockk<ContentResolver>(relaxed = true)
      every { resolver.openInputStream(any())  } returns stream

    val document = mockk<PDDocument>(relaxed = true)
      every { document.numberOfPages } returns pages
      every { document.close() } returns Unit

    mockkStatic(PDDocument::class)
      every { PDDocument.load(stream) } returns document

    val result = PdfHandler.isEncrypted(uri, resolver)

    Assert.assertEquals(expected, result)
  }

  @Test
  @Parameters(method = "isEncryptedWithExceptionsCases")
  fun isEncryptedWithExceptionsCasesTest(uri: Uri?, stream: InputStream?, pages: Int, expected: Exception) {
    val resolver = mockk<ContentResolver>(relaxed = true)
    every { resolver.openInputStream(any())  } returns stream

    val document = mockk<PDDocument>(relaxed = true)
    every { document.numberOfPages } returns pages
    every { document.close() } returns Unit

    mockkStatic(PDDocument::class)
    every { PDDocument.load(stream) } returns document

    val exception = Assert.assertThrows(Exception::class.java) {
      PdfHandler.isEncrypted(uri, resolver)
    }

    Assert.assertEquals(expected.message, exception.message)
  }

  // ====================== LOAD ====================== //

  @Parameterized.Parameters
  fun loadWithoutExceptionsCases(): List<Any> {
    return listOf(
      arrayOf(uriMock(), streamMock(), null, 1), // try load PDF file when it's not encrypted
      arrayOf(uriMock(), streamMock(), "password", 0), // try load PDF file when it's encrypted. (password required)
    )
  }

  @Parameterized.Parameters
  fun loadWithExceptionsCases(): List<Any> {
    val exception = Exception("Password is required.")

    return listOf(
      arrayOf(uriMock(), streamMock(), null, exception), // try load PDF file when password is required but was passed null
      arrayOf(uriMock(), streamMock(), "", exception), // try load PDF file when password is required but was passed empty
      arrayOf(uriMock(), streamMock(), "  ", exception), // try load PDF file when password is required but was passed blank
    )
  }

  @Test
  @Parameters(method = "loadWithoutExceptionsCases")
  fun loadWithoutExceptionsCasesTest(uri: Uri?, stream: InputStream?, password: String?, pages: Int) {
    val resolver = mockk<ContentResolver>(relaxed = true)
    every { resolver.openInputStream(any())  } returns stream

    val document = mockk<PDDocument>(relaxed = true)
    every { document.numberOfPages } returns pages
    every { document.close() } returns Unit

    mockkStatic(PDDocument::class)
    every { PDDocument.load(stream) } returns document
    every { PDDocument.load(stream, password) } returns document

    val result = PdfHandler.load(uri, resolver, password)

    Assert.assertEquals(document, result)
  }

  @Test
  @Parameters(method = "loadWithExceptionsCases")
  fun loadWithExceptionsCasesTest(uri: Uri, stream: InputStream, password: String?, expected: Exception) {
    val resolver = mockk<ContentResolver>(relaxed = true)
      every { resolver.openInputStream(uri)  } returns stream

    val document = mockk<PDDocument>(relaxed = true)
      every { document.numberOfPages } returns 0
      every { document.close() } returns Unit

    mockkStatic(PDDocument::class)
      every { PDDocument.load(stream) } returns document

    val exception = Assert.assertThrows(Exception::class.java) {
      PdfHandler.load(uri, resolver, password)
    }

    Assert.assertEquals(expected.message, exception.message)
  }

  // ====================== GET NUMBER OF PAGES ====================== //

  @Parameterized.Parameters
  fun getNumberOfPagesWithoutExceptionsCases(): Any {
    return listOf(
      arrayOf(uriMock(), streamMock(), null, 1), // try get number of pages from PDF file when it's not encrypted
      arrayOf(uriMock(), streamMock(), "password", 0), // try get number of pages from PDF file when it's encrypted (password required)
    )
  }

  @Test
  @Parameters(method = "getNumberOfPagesWithoutExceptionsCases")
  fun getNumberOfPagesWithoutExceptionsCasesTest(uri: Uri?, stream: InputStream?, password: String?, pages: Int) {
    val resolver = mockk<ContentResolver>(relaxed = true)
    every { resolver.openInputStream(any())  } returns stream

    val document = mockk<PDDocument>(relaxed = true)
    every { document.numberOfPages } returns pages
    every { document.close() } returns Unit

    mockkStatic(PDDocument::class)
    every { PDDocument.load(stream) } returns document
    every { PDDocument.load(stream, password) } returns document

    val result = PdfHandler.getNumberOfPages(uri, resolver, password)

    Assert.assertEquals(pages, result)
  }

// ====================== GET TEXT ====================== //

//  @Parameterized.Parameters
//  fun getTextWithoutExceptionsCases(): Any? {
//    val text = TestUtils.loadText("multiline-unformatted.txt")
//
//    return listOf(
//      arrayOf(uri, stream, null, 1, null, text), // try get text from PDF file when it's not encrypted without pattern
//      arrayOf(uri, stream, "password", 0, null, text), // try get text from PDF file when it's encrypted without pattern (password required)
//    )
//  }
//
//  @Test
//  @Parameters(method = "getTextWithoutExceptionsCases")
//  fun getTextWithoutExceptionCasesTest(uri: Uri?, stream: InputStream?, password: String?, pages: Int, patterns: ReadableArray?, text: String?) {
//    val resolver = mockk<ContentResolver>(relaxed = true)
//      every { resolver.openInputStream(any())  } returns stream
//
//    val document = mockk<PDDocument>(relaxed = true)
//      every { document.numberOfPages } returns pages
//      every { document.close() } returns Unit
//
//    mockkStatic(PDDocument::class)
//      every { PDDocument.load(stream) } returns document
//      every { PDDocument.load(stream, password) } returns document
//
//    val result = PdfHandler.getText(uri, resolver, patterns, password)
//
//    Assert.assertEquals(text, result)
//  }
}

