package com.motogpstats.services.crawler;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.client.reactive.ClientHttpConnector;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.netty.http.client.HttpClient;

@Component
public class CrawlerClient {
	private static final ClientHttpConnector httpConnector =
			new ReactorClientHttpConnector(HttpClient.newConnection());

	@Value("{motogp.api.base}")
	private String url;

	WebClient.RequestHeadersUriSpec<?> get() {
		return WebClient
				.builder()
				.clientConnector(httpConnector)
				.baseUrl(url)
				.build()
				.get();
	}
}
