package com.motogpstats;

import com.motogpstats.handlers.RaceCrawlerHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RequestPredicate;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.ServerResponse;

import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.http.MediaType.APPLICATION_STREAM_JSON;
import static org.springframework.web.reactive.function.server.RequestPredicates.GET;
import static org.springframework.web.reactive.function.server.RequestPredicates.accept;
import static org.springframework.web.reactive.function.server.RequestPredicates.path;
import static org.springframework.web.reactive.function.server.RouterFunctions.nest;
import static org.springframework.web.reactive.function.server.RouterFunctions.route;

@Configuration
public class Router {
	private static final String DEFAULT_BASE_PATH = "/motogpstats/";
	private static final RequestPredicate ACCEPTS_JSON =
			accept(APPLICATION_JSON).or(accept(APPLICATION_STREAM_JSON));

	@Bean
	RouterFunction<ServerResponse> userInfoRoutes(RaceCrawlerHandler handler) {
		return nest(path(DEFAULT_BASE_PATH + "crawl"),
				route(GET("/").and(ACCEPTS_JSON), handler::get));
	}
}
