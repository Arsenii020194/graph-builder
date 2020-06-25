package com.gxb.graphbuilderbackend.service

class PowTranspiler : Transpiler {
    override fun transpile(expression: String): String {
        var expressionCopy = expression
        var left = ""
        var right = ""
        for (i in expressionCopy.indices) {
            if (expressionCopy[i] == '^') {
                if (expression[i - 1] == ')') {
                    left = getLeftBracesExpr(expressionCopy, i)
                }
                if (expressionCopy[i + 1] == '(') {
                    right = getRightBracesExpr(expressionCopy, i)
                }
                if (expressionCopy[i + 1].isLetterOrDigit()) {
                    right = getRightDigitExpr(expressionCopy, i)
                }
                if (expression[i - 1].isLetterOrDigit()) {
                    left = getLeftDigitExpr(expressionCopy, i)
                }
                val startLeftIndex: Int = i - left.length
                expressionCopy = expressionCopy.slice(0 until startLeftIndex) +
                        "Math.pow($left, $right)" +
                        expressionCopy.slice(i + 1 +
                                right.length until expressionCopy.length)
            }
        }
        if (expressionCopy.contains('^')) {
            expressionCopy = transpile(expressionCopy)
        }
        return expressionCopy
    }

    private fun getLeftDigitExpr(expression: String, index: Int): String {
        var endIndexLeft = index - 1
        var left = ""
        while (endIndexLeft >= 0) {
            val expressionK = expression[endIndexLeft]
            if (!expressionK.isLetterOrDigit()) {
                break
            }
            left = "$expressionK$left"
            endIndexLeft--
        }
        return left
    }

    private fun getRightDigitExpr(expression: String, index: Int): String {
        var endIndexLeft = index + 1
        var left = ""
        while (endIndexLeft < expression.length) {
            val expressionK = expression[endIndexLeft]
            if (!expressionK.isLetterOrDigit()) {
                break
            }

            left = "$expressionK$left"
            endIndexLeft++
        }
        return left
    }

    private fun getLeftBracesExpr(expression: String, index: Int): String {
        var endIndexLeft = index - 1
        var closingCount = 0
        var openingCount = 0
        var left = ""
        while (endIndexLeft >= 0) {
            val expressionK = expression[endIndexLeft]
            if (expressionK == '(') {
                openingCount++
            }
            if (expressionK == ')') {
                closingCount++
            }
            if (openingCount == closingCount) {
                left = "$expressionK$left"
                break
            }

            left = "$expressionK$left"
            endIndexLeft--
        }
        return left
    }

    private fun getRightBracesExpr(expression: String, index: Int): String {
        var endIndexRight = index + 1
        var closingCount = 0
        var openingCount = 0
        var right = ""
        while (endIndexRight < expression.length) {
            val expressionK = expression[endIndexRight]
            if (expressionK == '(') {
                openingCount++
            }
            if (expressionK == ')') {
                closingCount++
            }
            if (openingCount == closingCount) {
                right = "$right$expressionK"
                break
            }

            right = "$right$expressionK"
            endIndexRight++
        }
        return right
    }
}
