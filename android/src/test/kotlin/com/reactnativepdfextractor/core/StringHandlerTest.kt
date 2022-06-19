package com.reactnativepdfextractor.core

import com.reactnativepdfextractor.utils.TestUtils

import junitparams.JUnitParamsRunner
import junitparams.Parameters

import org.junit.jupiter.api.Assertions
import org.junit.Test
import org.junit.runner.RunWith
import org.junit.runners.Parameterized

@RunWith(JUnitParamsRunner::class)
class StringHandlerTest {

  // ====================== FORMAT ====================== //

  @Parameterized.Parameters
  fun formatWithoutExceptionsCases(): Any {
    val text = TestUtils.loadText("multiline-unformatted.txt")
    val expected = TestUtils.removeExtraLine(TestUtils.loadText("multiline-formatted.txt"))

    return listOf(
      arrayOf(" \n", "", false),
      arrayOf(null, null, false),
      arrayOf(text, expected, true),
    )
  }

  @Test
  @Parameters(method = "formatWithoutExceptionsCases")
  fun formatWithoutExceptionsCasesTest(
    text: String?,
    expected: String?,
    checkEmpty: Boolean) {
    val result = StringHandler.format(text)

    if (checkEmpty) Assertions.assertTrue(result!!.isNotEmpty())
    Assertions.assertEquals(expected, result)
  }

  // ====================== MATCH ====================== //

  @Parameterized.Parameters
  fun matchWithoutExceptionsCases(): Any {
    val text = TestUtils.loadText("multiline-unformatted.txt")

    val regexes = arrayOf(
      "(\\S+@\\w+\\.\\w+)".toRegex(),
      "([0-9]{3})\\.([0-9]{3})\\.([0-9]{3})-([0-9]{2})".toRegex()
    )

    val expectations = arrayOf(
      "name.lastname@mail.com",
      "000.000.000-00"
    )

    return listOf(
      arrayOf(" \n", regexes[0], "", false),
      arrayOf(null, regexes[1], null, false),
      arrayOf(text, regexes[0], expectations[0], true),
      arrayOf(text, regexes[1], expectations[1], true),
    )
  }

  @Test
  @Parameters(method = "matchWithoutExceptionsCases")
  fun matchWithoutExceptionsCasesTest(
    text: String?,
    regex: Regex?,
    expected: String?,
    checkEmpty: Boolean
  ) {
    val result = StringHandler.match(text, regex)

    if (checkEmpty) Assertions.assertTrue(result!!.isNotEmpty())
    Assertions.assertEquals(expected, result)
  }
}
