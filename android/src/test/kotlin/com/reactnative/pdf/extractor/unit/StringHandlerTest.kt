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

  // ====================== MATCH ====================== //

  @Parameterized.Parameters
  fun matchWithoutExceptionsCases(): Any {
    val localText = TestUtils.loadText("multiline-unformatted.txt")
    val localRegexes = arrayOf(
      "(\\S+@\\w+\\.\\w+)".toRegex(),
      "([0-9]{3})\\.([0-9]{3})\\.([0-9]{3})-([0-9]{2})".toRegex()
    )
    val localExpectations = arrayOf("name.lastname@mail.com", "000.000.000-00")

    return listOf(
      arrayOf(" \n", localRegexes[0], ""),
      arrayOf(null, localRegexes[1], null),
      arrayOf(localText, localRegexes[0], localExpectations[0]),
      arrayOf(localText, localRegexes[1], localExpectations[1]),
    )
  }

  @Test
  @Parameters(method = "matchWithoutExceptionsCases")
  fun matchWithoutExceptionsCasesTest(text: String?, regex: Regex?, expected: String?) {
    val result = StringHandler.match(text, regex)
    Assert.assertEquals(expected, result)
  }
}
