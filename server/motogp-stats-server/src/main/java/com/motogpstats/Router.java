package com.motogpstats;

import com.motogpstats.handlers.MotogpSiteCrawlerHandler;
import com.motogpstats.handlers.RaceHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RequestPredicate;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.ServerResponse;

import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.http.MediaType.APPLICATION_STREAM_JSON;
import static org.springframework.web.reactive.function.server.RequestPredicates.GET;
import static org.springframework.web.reactive.function.server.RequestPredicates.PUT;
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
	RouterFunction<ServerResponse> crawlRoutes(MotogpSiteCrawlerHandler handler) {
		return nest(path(DEFAULT_BASE_PATH + "crawl"),
				route(PUT("/").and(ACCEPTS_JSON), handler::crawl));
	}

	@Bean
	RouterFunction<ServerResponse> raceRoutes(RaceHandler handler) {
		return nest(path(DEFAULT_BASE_PATH + "race"),
				route(GET("/circuits").and(ACCEPTS_JSON),
						handler::getRaceCircuits).andRoute(
						GET("/results").and(ACCEPTS_JSON), handler::getRaceResults));
	}
}
