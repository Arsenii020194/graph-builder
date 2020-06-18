package com.gxb.graphbuilderbackend

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter


@SpringBootApplication
@Configuration
class GraphBuilderBackEndApplication{

	@Bean
	fun corsConfigurer(): WebMvcConfigurer? {
		return object : WebMvcConfigurerAdapter() {
			override fun addCorsMappings(registry: CorsRegistry) {
				registry.addMapping("/**")
			}
		}
	}
}

fun main(args: Array<String>) {
	runApplication<GraphBuilderBackEndApplication>(*args)

}
