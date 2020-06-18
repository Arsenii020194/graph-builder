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
class PlainGraphService : GraphService {

    override fun getGraphData(params: GraphParams): List<PointDto> {
        val data = ArrayList<PointDto>()
        val mgr = ScriptEngineManager()
        val engine = mgr.getEngineByName("JS")
        val vars: MutableMap<String, Any?> = HashMap()
        var i: Double = params.from
        while (i <= params.to) {
            vars[params.varName] = i
            val y: Double = engine.eval(params.expression, SimpleBindings(vars)) as Double
            data.add(PointDto(i, y))
            i += params.scale
            vars.clear()
        }
        return data
    }
}
