package com.motogpstats.services.crawler;

import reactor.core.publisher.Flux;

public interface CrawlerService<T, R> {
	Flux<R> crawl(T identifier);
}
