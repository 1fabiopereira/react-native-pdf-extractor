package com.reactnative.pdf.extractor

import android.content.ContentResolver
import android.net.Uri

import com.facebook.react.bridge.*
import com.reactnative.pdf.extractor.core.PdfHandler
import com.tom_roush.pdfbox.android.PDFBoxResourceLoader

class PdfExtractorModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
  var path: Uri? = null

  init {
    PDFBoxResourceLoader.init(reactContext)
  }

  override fun getName(): String {
    return "PdfExtractor"
  }

  fun getCurrentUri(): Uri? {
    try {
      return if (path !== null) path else currentActivity?.intent?.data
    } catch (e: Exception) {
      e.printStackTrace()
      return null
    }
  }

  private fun getCurrentResolver(): ContentResolver? {
    try {
      return currentActivity?.contentResolver
    } catch (e: Exception) {
      e.printStackTrace()
      return null
    }
  }

  @ReactMethod
  fun getUri(promise: Promise) {
    try {
      val uri = getCurrentUri()
      val path = if(uri !== null) uri.toString() else null

      return promise.resolve(path)
    } catch (e:Exception) {
      e.printStackTrace()
      return promise.resolve(null)
    }
  }

  @ReactMethod
  fun setUri(uri: String, promise: Promise) {
    try {
      path = Uri.parse(uri)
      return promise.resolve(path.toString())
    } catch (e: Exception) {
      e.printStackTrace()
      return promise.reject(e)
    }
  }

  @ReactMethod
  fun canIExtract(promise: Promise) {
    try {
      val uri = getCurrentUri()
      val resolver = getCurrentResolver()

      return promise.resolve(uri !== null && resolver !== null)
    } catch (e: Exception) {
      e.printStackTrace()
      return promise.reject(e)
    }
  }

  @ReactMethod
  fun getText(password: String?, promise: Promise) {
    try {
      val uri = getCurrentUri()
      val resolver = getCurrentResolver()

      val data = PdfHandler.getText(uri, resolver, password)
      return promise.resolve(data)
    } catch (e: Exception) {
      e.printStackTrace()
      return promise.reject(e)
    }
  }

  @ReactMethod
  fun isEncrypted(promise: Promise) {
    try {
      val uri = getCurrentUri()
      val resolver = getCurrentResolver()

      val data = PdfHandler.isEncrypted(uri, resolver)
      return promise.resolve(data)
    } catch (e: Exception) {
      e.printStackTrace()
      return promise.reject(e)
    }
  }

  @ReactMethod
  fun getNumberOfPages(password: String?, promise: Promise) {
    try {
      val uri = getCurrentUri()
      val resolver = getCurrentResolver()

      val data = PdfHandler.getNumberOfPages(uri, resolver, password)
      return promise.resolve(data)
    } catch (e: Exception) {
      e.printStackTrace()
      return promise.reject(e)
    }
  }
}
