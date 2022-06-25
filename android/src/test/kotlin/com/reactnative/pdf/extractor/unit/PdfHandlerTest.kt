package com.reactnative.pdf.extractor.unit

import android.net.Uri
import com.facebook.react.bridge.ReadableArray
import com.reactnative.pdf.extractor.core.PdfHandler
import com.reactnative.pdf.extractor.core.StringHandler
import com.reactnative.pdf.extractor.unit.utils.TestUtils
import com.reactnative.pdf.extractor.unit.utils.mocks.*

import io.mockk.*
import junitparams.JUnitParamsRunner
import junitparams.Parameters

import org.junit.After
import org.junit.Assert
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.junit.runners.Parameterized
import java.io.InputStream

@RunWith(JUnitParamsRunner::class)
class PdfHandlerTest {
  private val uri = UriMock()
  private val log = AndroidLogMock()
  private val stream = InputStreamMock()
  private val loader = PDDocumentMock()
  private val resolver = ContentResolverMock()
  private val boxResourceLoader = PDFBoxResourceLoaderMock()

  private val localUri = uri.mock()
  private val localStream = stream.mock()

  @Before
  fun setUp() {
    MockKAnnotations.init(this)
    log.mock()
    boxResourceLoader.mock()
  }

  @After
  fun destroy() {
    clearAllMocks()
  }

  // ====================== IS ENCRYPTED ====================== //

  @Parameterized.Parameters
  fun isEncryptedWithoutExceptionsCases(): Any {
    return listOf(
      arrayOf(localUri, localStream, 1, false), // check if PDF file is not encrypted
      arrayOf(localUri, localStream, 0, true), // check if PDF file is encrypted
    )
  }

  @Parameterized.Parameters
  fun isEncryptedWithExceptionsCases(): Any {
    val localException = Exception("File not found.")

    return listOf(
      arrayOf(localUri, null, 0, localException), // try check if PDF file is encrypted when STREAM was passed null
      arrayOf(null, localStream, 0, localException), // try check if PDF file is encrypted when URI was passed null
      arrayOf(null, null, 0, localException), // try check if PDF file is encrypted when URI and STREAM was passed null
    )
  }

  @Test
  @Parameters(method = "isEncryptedWithoutExceptionsCases")
  fun isEncryptedWithoutExceptionsCasesTest(uri: Uri?, stream: InputStream?, pages: Int, expected: Boolean) {
    loader.update(pages).mock()
    val localResolver = resolver.update(stream).mock()
    val result = PdfHandler.isEncrypted(uri, localResolver)

    Assert.assertEquals(expected, result)
  }

  @Test
  @Parameters(method = "isEncryptedWithExceptionsCases")
  fun isEncryptedWithExceptionsCasesTest(uri: Uri?, stream: InputStream?, pages: Int, expected: Exception) {
    loader.update(pages).mock()
    val localResolver = resolver.update(stream).mock()
    val exception = Assert.assertThrows(Exception::class.java) {
      PdfHandler.isEncrypted(uri, localResolver)
    }

    Assert.assertEquals(expected.message, exception.message)
  }

  // ====================== LOAD ====================== //

  @Parameterized.Parameters
  fun loadWithoutExceptionsCases(): List<Any> {
    return listOf(
      arrayOf(localUri, localStream, null, 1), // try load PDF file when it's not encrypted
      arrayOf(localUri, localStream, "password", 0), // try load PDF file when it's encrypted. (password required)
    )
  }

  @Parameterized.Parameters
  fun loadWithExceptionsCases(): List<Any> {
    val localException = Exception("Password is required.")

    return listOf(
      arrayOf(localUri, localStream, null, localException), // try load PDF file when password is required but was passed null
      arrayOf(localUri, localStream, "", localException), // try load PDF file when password is required but was passed empty
      arrayOf(localUri, localStream, "  ", localException), // try load PDF file when password is required but was passed blank
    )
  }

  @Test
  @Parameters(method = "loadWithoutExceptionsCases")
  fun loadWithoutExceptionsCasesTest(uri: Uri?, stream: InputStream?, password: String?, pages: Int) {
    val doc = loader.update(pages).mock().getDoc()
    val localResolver = resolver.update(stream).mock()
    val result = PdfHandler.load(uri, localResolver, password)

    Assert.assertEquals(doc, result)
  }

  @Test
  @Parameters(method = "loadWithExceptionsCases")
  fun loadWithExceptionsCasesTest(uri: Uri, stream: InputStream, password: String?, expected: Exception) {
    loader.update(0).mock()
    val localResolver = resolver.update(stream).mock()
    val exception = Assert.assertThrows(Exception::class.java) {
      PdfHandler.load(uri, localResolver, password)
    }

    Assert.assertEquals(expected.message, exception.message)
  }

  // ====================== GET NUMBER OF PAGES ====================== //

  @Parameterized.Parameters
  fun getNumberOfPagesWithoutExceptionsCases(): Any {
    return listOf(
      arrayOf(localUri, localStream, null, 1), // try get number of pages from PDF file when it's not encrypted
      arrayOf(localUri, localStream, "password", 0), // try get number of pages from PDF file when it's encrypted (password required)
    )
  }

  @Test
  @Parameters(method = "getNumberOfPagesWithoutExceptionsCases")
  fun getNumberOfPagesWithoutExceptionsCasesTest(uri: Uri?, stream: InputStream?, password: String?, pages: Int) {
    loader.update(pages).mock()
    val localResolver = resolver.update(stream).mock()
    val result = PdfHandler.getNumberOfPages(uri, localResolver, password)

    Assert.assertEquals(pages, result)
  }

// ====================== GET TEXT ====================== //

  @Parameterized.Parameters
  fun getTextWithoutExceptionsCases(): Any {
    val localText = TestUtils.loadText("multiline-unformatted.txt")

    return listOf(
      arrayOf(localUri, localStream, null, 1, null, localText), // try get text from PDF file when it's not encrypted without pattern
      arrayOf(localUri, localStream, "password", 0, null, localText), // try get text from PDF file when it's encrypted without pattern (password required)
    )
  }

  @Test
  @Parameters(method = "getTextWithoutExceptionsCases")
  fun getTextWithoutExceptionsCasesTest(uri: Uri, stream: InputStream, password: String?, pages: Int, patterns: ReadableArray?, text: String) {
    loader.update(pages).mock()
    PDFTextStripperMock().update(text).mock()

    val localResolver = resolver.update(stream).mock()
    val result = PdfHandler.getText(uri, localResolver, patterns, password)


    Assert.assertEquals(StringHandler.format(text), result)
  }
}

