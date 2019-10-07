package com.motogpstats.services.crawler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.motogpstats.models.CategoryCrawl;
import com.motogpstats.models.SessionCrawl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Service
public class SessionCrawlerService {
	@Value("{motogp.api.session-url}")
	private String url;

	@Autowired
	private CrawlerClient client;

	public Flux<SessionCrawl> crawl(Integer year, String circuitCode, String category) {
		return client
				.get()
				.uri(url, year, circuitCode, category)
				.retrieve()
				.bodyToMono(String.class)
				.flatMapIterable(this::convertResponse);
	}

	private List<SessionCrawl> convertResponse(String response) {
		try {
			ObjectMapper mapper = new ObjectMapper();
			return Arrays.asList(mapper.readValue(response, SessionCrawl[].class));
		} catch (IOException e) {
			throw new RuntimeException("Unable to convert response: {}", e);
		}
	}
}
