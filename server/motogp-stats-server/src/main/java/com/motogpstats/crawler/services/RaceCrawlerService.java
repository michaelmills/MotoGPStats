package com.motogpstats.crawler.services;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class RaceCrawlerService {
	private static final Logger logger =
			LoggerFactory.getLogger(RaceCrawlerService.class);

	public void crawlRace() {
		try {
			Document doc = Jsoup
					.connect(
							"http://www.motogp.com/en/ajax/results/parse/2018/AME/MotoGP/RAC")
					.get();
			Elements elements = doc.getElementsByTag("h1");

			for (Element el : elements) {
				logger.debug(el.text());
			}

			parseTableHeaders(doc);

		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	private void parseTableHeaders(Document document) {
		Element resultTable = document.selectFirst("table");
		Elements resultHeaders =
				resultTable.select("thead").first().select("tr").first().select("th");

		for (Element title : resultHeaders) {
			logger.debug("{}", title.text());
		}
	}

	private void parseResults(Document document) {

	}
}
