package com.gxb.graphbuilderbackend.service

interface Transpiler {
    fun transpile(expression: String): String
}
