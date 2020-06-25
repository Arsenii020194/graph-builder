package com.gxb.graphbuilderbackend.service

import com.gxb.graphbuilderbackend.domain.dto.PointDto
import com.gxb.graphbuilderbackend.domain.params.GraphParams
import org.springframework.stereotype.Service
import java.util.*
import javax.script.ScriptEngineManager
import javax.script.SimpleBindings
import kotlin.collections.HashMap
import kotlin.collections.set


@Service
class PlainGraphService(val powTranspiler: Transpiler) : GraphService {

    override fun getGraphData(params: GraphParams): List<PointDto> {
        val data = ArrayList<PointDto>()
        val mgr = ScriptEngineManager()
        val engine = mgr.getEngineByName("JS")
        val vars: MutableMap<String, Any?> = HashMap()
        var i: Double = params.from
        val transpiled = powTranspiler.transpile(params.expression)
        while (i <= params.to) {
            vars[params.varName] = i
            val resY = engine.eval(transpiled, SimpleBindings(vars))
            val y: Double = if (resY == null) 0.0 else (if (resY is Int) resY.toDouble() else resY as Double)
            data.add(PointDto(i, y))
            i += params.step
            vars.clear()
        }
        return data
    }
}
