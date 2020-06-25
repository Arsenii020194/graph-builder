package com.gxb.graphbuilderbackend.controller

import com.gxb.graphbuilderbackend.domain.dto.PointDto
import com.gxb.graphbuilderbackend.domain.params.GraphParams
import com.gxb.graphbuilderbackend.service.GraphService
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class GraphController(val plainGraphService: GraphService) {

    @PostMapping("v1/graph-data")
    fun getGraphData(@RequestBody params: GraphParams): List<PointDto> {
        return plainGraphService.getGraphData(params)
    }
}
