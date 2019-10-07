package com.motogpstats.handlers;

import com.motogpstats.models.CrawlInfo;
import com.motogpstats.services.crawler.MotogpSiteCrawlerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.codec.DecodingException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import static org.springframework.web.reactive.function.server.ServerResponse.accepted;
import static org.springframework.web.reactive.function.server.ServerResponse.badRequest;
import static org.springframework.web.reactive.function.server.ServerResponse.status;

@Slf4j
@Component
public class MotogpSiteCrawlerHandler {

	@Autowired
	private MotogpSiteCrawlerService crawler;

	public Mono<ServerResponse> crawl(ServerRequest request) {
		log.info("Received MotoGP Crawl GET request");

		return request
				.bodyToMono(CrawlInfo.class)
				.doOnNext(crawlInfo -> crawler
						.crawl(crawlInfo.getStartYear(), crawlInfo.getEndYear())
						.subscribeOn(Schedulers.single())
						.subscribe())
				.then(accepted().build())
				.doOnError(throwable -> log.error("{}", throwable.getMessage()))
				.onErrorResume(IllegalArgumentException.class,
						e -> badRequest().syncBody(e.getMessage()))
				.onErrorResume(DecodingException.class,
						e -> badRequest().syncBody("Parameters invalid"))
				.onErrorResume(e -> status(HttpStatus.INTERNAL_SERVER_ERROR).build());
	}
}
