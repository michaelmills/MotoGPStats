package com.motogpstats;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.test.web.reactive.server.WebTestClient;

public class BaseIntegrationTest {
	@Autowired
	protected ApplicationContext context;

	@Autowired
	protected WebTestClient webClient;
}