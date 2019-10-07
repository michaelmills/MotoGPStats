package com.motogpstats.services.crawler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.motogpstats.models.CategoryCrawl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Service
public class CategoryCrawlerService {
	@Value("{motogp.api.category-url}")
	private String url;

	@Autowired
	private CrawlerClient client;

	public Flux<CategoryCrawl> crawl(Integer year, String circuitCode) {
		return client
				.get()
				.uri(url, year, circuitCode)
				.retrieve()
				.bodyToMono(String.class)
				.flatMapIterable(this::convertResponse);
	}

	private List<CategoryCrawl> convertResponse(String response) {
		try {
			ObjectMapper mapper = new ObjectMapper();
			return Arrays.asList(mapper.readValue(response, CategoryCrawl[].class));
		} catch (IOException e) {
			throw new RuntimeException("Unable to convert response: {}", e);
		}
	}
}
