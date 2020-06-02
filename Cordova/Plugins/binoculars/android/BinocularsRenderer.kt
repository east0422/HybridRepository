package com.luminagic.rinnegan.binoculars

import android.content.Context
import android.graphics.Canvas
import android.graphics.SurfaceTexture
import android.opengl.GLES11Ext
import android.opengl.GLES20
import android.opengl.GLSurfaceView
import android.opengl.GLUtils
import android.util.Log
import android.view.Surface
import java.lang.Exception
import java.nio.ByteBuffer
import java.nio.ByteOrder
import javax.microedition.khronos.egl.EGLConfig
import javax.microedition.khronos.opengles.GL10

class BinocularsRenderer(val context: Context) : GLSurfaceView.Renderer {
    private var surface: Surface? = null
    private var surfaceTexture: SurfaceTexture? = null
    private var progId = 0
    private var textureId = 0

    override fun onDrawFrame(gl: GL10?) {
        synchronized(this) {
            surfaceTexture?.updateTexImage()
        }

        GLES20.glClear(GLES20.GL_COLOR_BUFFER_BIT or GLES20.GL_DEPTH_BUFFER_BIT);
        GLES20.glUseProgram(progId)
        GLES20.glTexParameteri(GLES20.GL_TEXTURE_2D, GLES20.GL_TEXTURE_MIN_FILTER, GLES20.GL_LINEAR_MIPMAP_LINEAR)
        GLES20.glTexParameteri(GLES20.GL_TEXTURE_2D, GLES20.GL_TEXTURE_MAG_FILTER, GLES20.GL_LINEAR)

        val aPosition = GLES20.glGetAttribLocation(progId, "a_Position")
        val aTexturePosition = GLES20.glGetAttribLocation(progId, "a_TextureCoordinates")
        val uTextureUnit = GLES20.glGetUniformLocation(progId, "u_TextureUnit")

        GLES20.glBindTexture(GLES11Ext.GL_TEXTURE_EXTERNAL_OES, textureId)
        GLES20.glActiveTexture(GLES20.GL_TEXTURE0)
        // vertex
        vertexData.position(0)
        GLES20.glVertexAttribPointer(aPosition, 2, GLES20.GL_FLOAT, false, 4 * 4, vertexData)
        GLES20.glEnableVertexAttribArray(aPosition)
        // texture
        vertexData.position(2)
        GLES20.glVertexAttribPointer(aTexturePosition, 2, GLES20.GL_FLOAT, false, 4 * 4, vertexData)
        GLES20.glEnableVertexAttribArray(aTexturePosition)
        GLES20.glUniform1i(uTextureUnit, 0)

        GLES20.glDrawArrays(GLES20.GL_TRIANGLES, 0, 12)
        logGlError("glDraw")
    }

    override fun onSurfaceChanged(gl: GL10?, width: Int, height: Int) {
        textureId = createTexture()
        if (textureId > 0) {
            surfaceTexture = SurfaceTexture(textureId).apply {
                setDefaultBufferSize(width / 2, height) // horizontal layout
            }
            surface = Surface(surfaceTexture)
            GLES20.glViewport(0, 0, width, height);
        }
    }

    private fun createTexture(): Int {
        surface?.release()
        surfaceTexture?.release()
        surface = null
        surfaceTexture = null

        val textures = IntArray(1)

        GLES20.glActiveTexture(GLES20.GL_TEXTURE0)
        GLES20.glGenTextures(1, textures, 0)
        logGlError("Create texture")

        GLES20.glBindTexture(GLES11Ext.GL_TEXTURE_EXTERNAL_OES, textures[0])
        logGlError("Bind texture")

        return textures[0]
    }

    override fun onSurfaceCreated(gl: GL10?, config: EGLConfig?) {
        // Set the background clear color to black.
        GLES20.glClearColor(0.3f, 0.3f, 1.0f, 0.0f)
        val vertexShader = shader(vertexShaderSrc, GLES20.GL_VERTEX_SHADER)
        val fragmentShader = shader(fragmentShaderSrc, GLES20.GL_FRAGMENT_SHADER)

        progId = GLES20.glCreateProgram()
        GLES20.glAttachShader(progId, vertexShader)
        GLES20.glAttachShader(progId, fragmentShader)
        GLES20.glLinkProgram(progId)
    }

    fun render(action: (Canvas) -> Unit) {
        try {
            val canvas = surface?.lockCanvas(null)
            canvas?.also {
                action(canvas)

                surface?.unlockCanvasAndPost(canvas)
            }
        } catch (e: Exception) {
            Log.e(TAG, "Exception at rendering $e")
        }
    }

    fun shader(source: String, type: Int): Int {
        val shaderId = GLES20.glCreateShader(type)
        GLES20.glShaderSource(shaderId, source)
        GLES20.glCompileShader(shaderId)
        return shaderId
    }

    companion object {
        private val TAG = BinocularsRenderer::class.java.simpleName;

        private val triangles = floatArrayOf(
                // triangle and texture coordinates
                // X, Y, S, T
                // left view, two triangles
                -1f, -1f, 0f, 1f,
                0f, 1f, 1f, 0f,
                -1f, 1f, 0f, 0f,
                -1f, -1f, 0f, 1f,
                0f, -1f, 1f, 1f,
                0f, 1f, 1f, 0f,

                // right view, two triangles
                0f, -1f, 0f, 1f,
                1f, 1f, 1f, 0f,
                0f, 1f, 0f, 0f,
                0f, -1f, 0f, 1f,
                1f, -1f, 1f, 1f,
                1f, 1f, 1f, 0f
        )

        private val vertexData = ByteBuffer
                .allocateDirect(triangles.size * 4) // bytes of float
                .order(ByteOrder.nativeOrder())
                .asFloatBuffer()
                .apply { put(triangles) }

        private val vertexShaderSrc = """
            attribute vec4 a_Position;
            attribute vec2 a_TextureCoordinates;

            varying vec2 v_TextureCoordinates;

            void main()
            {
                v_TextureCoordinates = a_TextureCoordinates;
                gl_Position = a_Position;
            }
        """.trimIndent()

        private val fragmentShaderSrc = """
            #extension GL_OES_EGL_image_external : require

            precision mediump float;

            uniform samplerExternalOES u_TextureUnit;
            varying vec2 v_TextureCoordinates;

            void main()
            {
                gl_FragColor = texture2D(u_TextureUnit, v_TextureCoordinates);
            }
        """.trimIndent()

        private fun logGlError(s: String) {
            while (true) {
                val error = GLES20.glGetError()
                if (error == GLES20.GL_NO_ERROR) {
                    break;
                }
                Log.e(TAG, "$s: glError ${GLUtils.getEGLErrorString(error)}");
            }
        }
    }
}

