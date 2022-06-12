package com.reactnativepdfextractor.core

import android.content.ContentResolver
import android.net.Uri
import android.util.Log
import com.facebook.react.bridge.ReadableArray
import com.tom_roush.pdfbox.pdmodel.PDDocument
import com.tom_roush.pdfbox.text.PDFTextStripper
import kotlinx.coroutines.async
import kotlinx.coroutines.runBlocking
import java.io.InputStream

class PdfHandler {
    companion object {
      @JvmStatic
      fun isEncrypted(uri: Uri?, resolver: ContentResolver?): Boolean = runBlocking {
        val deferred = async {
          val stream = openInputStreamFile(uri, resolver)

          // Check input stream
          if (stream === null) throw Exception("File not found.")

          // Try open file and get if is encrypted
          try {
            val document = PDDocument.load(stream)
            val hasPassword = document.isEncrypted

            document.close()
            stream.close()

            return@async hasPassword
          } catch (e: Exception) {
            val regex = Regex("((\\s(decrypt)\\s)|\\s(password)\\s|(incorrect))")
            return@async e.message?.let { regex.containsMatchIn(it) } == true
          }
        }

        return@runBlocking deferred.await()
      }

      @JvmStatic
      fun getText(uri: Uri?, resolver: ContentResolver?, patterns: ReadableArray?, password: String?): String? = runBlocking {
        val deferred = async {
          val document = load(uri, resolver, password)

          // Apply match patterns
          val data = if (patterns === null) {
            extract(document)
          }  else {
            extractWithPattern(document, patterns)
          }

          document?.close()

          return@async data
        }

        return@runBlocking deferred.await()
      }

      @JvmStatic
      fun getNumberOfPages(uri: Uri?, resolver: ContentResolver?, password: String?): Int? = runBlocking {
        val deferred = async {
          val document = load(uri, resolver, password)
          val pages = document?.numberOfPages

          document?.close()

          return@async pages
        }

        return@runBlocking deferred.await()
      }

      @JvmStatic
      private fun load(uri: Uri?, resolver: ContentResolver?, password: String?): PDDocument? = runBlocking {
        val deferred = async {
          val encrypted = isEncrypted(uri, resolver)

          // Check password is required and was provide
          if (encrypted && password === null) throw Exception("Password is required.")

          val stream = openInputStreamFile(uri, resolver)

          // Check input stream
          if (stream === null) throw Exception("File not found.")

          // Apply password if necessary and get PDDocument instance
          return@async if (encrypted) {
            PDDocument.load(stream, password)
          } else {
            PDDocument.load(stream)
          }
        }

        return@runBlocking deferred.await()
      }

      @JvmStatic
      private fun openInputStreamFile(uri: Uri?, resolver: ContentResolver?): InputStream? = runBlocking {
        val deferred = async {
          return@async if (uri !== null && resolver !== null) {
            resolver.openInputStream(uri)
          } else {
            null
          }
        }

        return@runBlocking deferred.await()
      }

      @JvmStatic
      private fun extract(document: PDDocument?): String? = runBlocking {
        val deferred = async {
          if (document === null) return@async null
          val data = PDFTextStripper().getText(document)
          return@async StringHandler.format(data)
        }

        return@runBlocking deferred.await()
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
