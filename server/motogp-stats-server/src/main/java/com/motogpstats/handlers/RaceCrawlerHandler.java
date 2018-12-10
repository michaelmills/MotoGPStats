package com.motogpstats.handlers;

import com.motogpstats.services.crawler.RaceCrawlerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import static org.springframework.web.reactive.function.server.ServerResponse.accepted;

@Slf4j
@Component
public class RaceCrawlerHandler {
	@Autowired
	private RaceCrawlerService raceCrawlerService;

	public Mono<ServerResponse> get(ServerRequest request) {
		log.info("Received Test GET request");

		raceCrawlerService.crawlRace();

		return accepted().build();
	}
}
