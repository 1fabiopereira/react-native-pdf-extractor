package com.reactnativepdfextractor.utils.mocks

import android.content.ContentResolver
import com.reactnativepdfextractor.utils.mocks.interfaces.Mock

import io.mockk.every
import io.mockk.mockk
import java.io.InputStream

class ContentResolverMock: Mock {
  private val resolver = mockk<ContentResolver>(relaxed = true)
  private var stream: InputStream? = null

  fun update(input: InputStream?): ContentResolverMock {
    stream = input
    return this
  }

  override fun mock(): ContentResolver {
    every { resolver.openInputStream(any())  } returns stream
    return resolver
  }
}
