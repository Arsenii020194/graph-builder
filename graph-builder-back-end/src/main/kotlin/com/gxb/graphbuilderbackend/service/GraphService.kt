package com.gxb.graphbuilderbackend.service

import com.gxb.graphbuilderbackend.domain.dto.PointDto
import com.gxb.graphbuilderbackend.domain.params.GraphParams

interface GraphService {
    fun getGraphData(params: GraphParams): List<PointDto>
}
