package com.gxb.graphbuilderbackend.controller

import com.gxb.graphbuilderbackend.domain.dto.PointDto
import com.gxb.graphbuilderbackend.domain.params.GraphParams
import com.gxb.graphbuilderbackend.service.GraphService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class GraphController(val plainGraphService: GraphService) {

    @GetMapping("v1/graph-data")
    fun getGraphData(params: GraphParams): List<PointDto> {
        return plainGraphService.getGraphData(params)
    }
}
