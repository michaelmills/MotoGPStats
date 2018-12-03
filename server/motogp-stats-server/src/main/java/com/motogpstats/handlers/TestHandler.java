package com.motogpstats.handlers;

import com.motogpstats.crawler.services.RaceCrawlerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import static org.springframework.web.reactive.function.server.ServerResponse.accepted;

@Component
public class TestHandler {
	private static final Logger logger = LoggerFactory.getLogger(TestHandler.class);

	@Autowired
	private RaceCrawlerService raceCrawlerService;

	public Mono<ServerResponse> get(ServerRequest request) {
		logger.info("Received Test GET request");

		raceCrawlerService.crawlRace();

		return accepted().build();
	}
}
