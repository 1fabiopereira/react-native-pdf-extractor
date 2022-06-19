package com.reactnativepdfextractor.core

import android.content.ContentResolver
import android.net.Uri
import com.facebook.react.bridge.ReadableArray
import com.tom_roush.pdfbox.pdmodel.PDDocument
import com.tom_roush.pdfbox.text.PDFTextStripper
import kotlinx.coroutines.async
import kotlinx.coroutines.runBlocking
import java.io.InputStream

open class PdfHandler {
    companion object {
      @JvmStatic
      fun isEncrypted(uri: Uri?, resolver: ContentResolver?): Boolean {
        val stream = openInputStreamFile(uri, resolver)

        // Check input stream
        if (stream === null) throw Exception("File not found.")

        // Try open file and get if is encrypted
        return try {
          val document = PDDocument.load(stream)
          // val isEncrypted = document.isEncrypted - TODO: Check why this line return wrong value
          val pages = document.numberOfPages

          document.close()
          stream.close()

          pages <= 0
        } catch (e: Exception) {
          val regex = Regex("((\\s(decrypt)\\s)|\\s(password)\\s|(incorrect))")
          e.message?.let { regex.containsMatchIn(it) } == true
        }
      }

      @JvmStatic
      fun getText(uri: Uri?, resolver: ContentResolver?, patterns: ReadableArray?, password: String?): String? {
        val document = load(uri, resolver, password)

        // Apply match patterns
        val data = if (patterns === null) {
          extract(document)
        }  else {
          extractWithPattern(document, patterns)
        }

        document?.close()

        return data
      }

      @JvmStatic
      fun getNumberOfPages(uri: Uri?, resolver: ContentResolver?, password: String?): Int? {
        val document = load(uri, resolver, password)
        val pages = document?.numberOfPages

        document?.close()

        return pages
      }

      @JvmStatic
      fun load(uri: Uri?, resolver: ContentResolver?, password: String?): PDDocument? {
        val encrypted = isEncrypted(uri, resolver)

        // Check password is required and was provide
        if (encrypted && (password === null || password.isEmpty() || password.isBlank())) throw Exception("Password is required.")

        val stream = openInputStreamFile(uri, resolver)

        // Apply password if necessary and get PDDocument instance
        return if (encrypted) {
          PDDocument.load(stream, password)
        } else {
          PDDocument.load(stream)
        }
      }

      @JvmStatic
      private fun openInputStreamFile(uri: Uri?, resolver: ContentResolver?): InputStream? {
        return if (uri !== null && resolver !== null) {
          resolver.openInputStream(uri)
        } else {
          null
        }
      }

      @JvmStatic
      fun extract(document: PDDocument?): String? {
          if (document === null) return null
          val data = PDFTextStripper().getText(document)
          return StringHandler.format(data)
      }

      @JvmStatic
      private fun extractWithPattern(document: PDDocument?, patterns: ReadableArray): String = runBlocking {
        val deferred = async {
          val data = extract(document)

          val regexes = patterns.toArrayList()
            .map { pattern -> pattern.toString().toRegex() }

          val matches = regexes
            .map { regex -> StringHandler.match(data, regex) }
            .filter { match -> !match.isNullOrEmpty() }

          return@async matches.toSet().toList().joinToString("\n")
        }

        return@runBlocking deferred.await()
      }
    }
}
