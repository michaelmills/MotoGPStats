package com.motogpstats;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class RaceCrawlerIT extends BaseIntegrationTest {

	private static final String CRAWL_ENDPOINT = "/motogpstats/crawl/";

	@Test
	public void getAll() {
		this.webClient
				.get()
				.uri(CRAWL_ENDPOINT)
				.accept(MediaType.APPLICATION_JSON)
				.exchange()
				.expectStatus()
				.isAccepted();
	}
}
