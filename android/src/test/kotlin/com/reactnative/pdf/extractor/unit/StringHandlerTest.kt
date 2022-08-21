package com.reactnative.pdf.extractor.unit

import com.reactnative.pdf.extractor.core.StringHandler
import com.reactnative.pdf.extractor.unit.utils.TestUtils
import io.mockk.MockKAnnotations
import io.mockk.clearAllMocks

import junitparams.JUnitParamsRunner
import junitparams.Parameters
import org.junit.After

import org.junit.Assert
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.junit.runners.Parameterized

@RunWith(JUnitParamsRunner::class)
class StringHandlerTest {

  @Before
  fun setUp() {
    MockKAnnotations.init(this)
  }

  @After
  fun destroy() {
    clearAllMocks()
  }

  // ====================== FORMAT ====================== //

  @Parameterized.Parameters
  fun formatWithoutExceptionsCases(): List<Array<out String?>> {
    val localText = TestUtils.loadText("multiline-unformatted.txt")
    val localExpected = TestUtils.removeExtraLine(TestUtils.loadText("multiline-formatted.txt"))

    return listOf(
      arrayOf(" \n", ""),
      arrayOf(null, null),
      arrayOf(localText, localExpected),
    )
  }

  @Test
  @Parameters(method = "formatWithoutExceptionsCases")
  fun formatWithoutExceptionsCasesTest(text: String?, expected: String?) {
    val result = StringHandler.format(text)
    Assert.assertEquals(expected, result)
  }
}
