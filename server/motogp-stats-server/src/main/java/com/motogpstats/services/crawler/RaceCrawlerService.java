package com.motogpstats.services.crawler;

import com.motogpstats.models.RaceResultCrawl;
import com.motogpstats.models.RaceStanding;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.math.NumberUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Iterator;
import java.util.Locale;
import java.util.regex.Pattern;

@Slf4j
@Service
public class RaceCrawlerService {
	@Value("${motogp.api.race-url}")
	private String raceUrl;

	public Mono<RaceResultCrawl> crawlRace(int year, String circuitCode, String category) {
		log.info("Crawl Race: [{}][{}][{}]", year, circuitCode, category);
		try {
			Document doc = Jsoup
					.connect(UriComponentsBuilder
							.fromHttpUrl(raceUrl)
							.buildAndExpand(year, circuitCode, category)
							.toUriString())
					.get();

			RaceResultCrawl result = parseStandings(doc, category);

			if (result.getDate() == null) {
				log.debug("No race parsed");
				return Mono.empty();
			} else {
				return Mono.just(result);
			}

		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	private void parseTableHeaders(Document document) {
		Element resultTable = document.selectFirst("table");
		Elements resultHeaders =
				resultTable.select("thead").first().select("tr").first().select("th");

		for (Element title : resultHeaders) {
			log.debug("{}", title.text());
		}
	}

	private RaceResultCrawl parseStandings(Document document, String category) {
		final RaceResultCrawl.RaceResultCrawlBuilder raceResultBuilder =
				RaceResultCrawl.builder();

		if (document.body().childNodeSize() == 0) {
			return raceResultBuilder.build();
		}

		raceResultBuilder.date(parseDate(document));
		raceResultBuilder.name("test");

		final Elements standings =
				document.select("table > tbody").first().select("tr");

		for (Element standing : standings) {
			Elements cols = standing.select("td");
			if (cols.size() <= 1) {
				continue;
			}

			Iterator<Element> col = cols.iterator();

			/*
			Row format:
			-----
			pos
			points
			num
			ruder name
			nation
			team
			bike
			speed
			time gap
			 */


			RaceStanding.RaceStandingBuilder raceStanding = RaceStanding
					.builder()
					.position(NumberUtils.toInt(col.next().text()));

					if (category.equalsIgnoreCase("motogp")) {
						raceStanding.points(NumberUtils.toInt(col.next().text()));
					}

					raceStanding.riderNumber(NumberUtils.toInt(col.next().text()))
					.riderName(col.next().text())
					.nationality(col.next().text())
					.team(col.next().text())
					.bike(col.next().text());

			col.next(); // skip speed columun
			raceStanding.time(col.next().text());

			raceResultBuilder.result(raceStanding.build());
		}

		RaceResultCrawl result = raceResultBuilder.build();
		log.debug("Crawl result: {}", result);
		return result;
	}

	private LocalDate parseDate(Document document) {
		String parsedDate = document.select("body > p").text();
		String[] splits = parsedDate.split(Pattern.quote(","));
		String adjustedDate = (splits[2] + splits[3]).trim();

		DateTimeFormatter formatter =
				DateTimeFormatter.ofPattern("MMMM dd yyyy", Locale.US);
		return LocalDate.parse(adjustedDate.trim(), formatter);
	}
}