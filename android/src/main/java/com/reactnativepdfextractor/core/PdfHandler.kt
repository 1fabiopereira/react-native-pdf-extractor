package com.reactnativepdfextractor.core

import android.util.Log
import com.tom_roush.pdfbox.pdmodel.PDDocument
import com.tom_roush.pdfbox.text.PDFTextStripper

class PdfHandler {
    companion object {
      @JvmStatic
      fun extract(file: PDDocument?): String? {
        if (file == null) return null
        var data = ""

        try {
          data = PDFTextStripper().getText(file)
        } catch (e: Exception) {
          e.message?.let { Log.println( Log.ERROR, "PDF-EXTRACTOR", it) }
        } finally {
          file.close()
        }

        return StringHandler.format(data)
      }
  }
}
