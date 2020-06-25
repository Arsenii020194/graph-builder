package com.gxb.graphbuilderbackend.configuration

import com.gxb.graphbuilderbackend.service.PowTranspiler
import com.gxb.graphbuilderbackend.service.Transpiler
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class GraphServiceConfig {

    @Bean
    fun powTranspiler(): Transpiler {
        return PowTranspiler()
    }
}
